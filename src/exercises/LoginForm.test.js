import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from './LoginForm';

describe('LoginForm Component', () => {
  test('renders form with initial empty inputs', () => {
    render(<LoginForm />);
    
    // Check if form elements are rendered
    expect(screen.getByText('Login Form')).toBeInTheDocument();
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    
    // Check if inputs are initially empty
    expect(screen.getByLabelText('Email:')).toHaveValue('');
    expect(screen.getByLabelText('Password:')).toHaveValue('');
  });

  test('allows typing in email field', () => {
    render(<LoginForm />);
    
    const emailInput = screen.getByLabelText('Email:');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    expect(emailInput).toHaveValue('test@example.com');
  });

  test('allows typing in password field', () => {
    render(<LoginForm />);
    
    const passwordInput = screen.getByLabelText('Password:');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    expect(passwordInput).toHaveValue('password123');
  });

  test('shows email validation error for invalid email', () => {
    render(<LoginForm />);
    
    const emailInput = screen.getByLabelText('Email:');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    
    expect(screen.getByText('Email must contain @ symbol')).toBeInTheDocument();
  });

  test('shows password validation error for short password', () => {
    render(<LoginForm />);
    
    const passwordInput = screen.getByLabelText('Password:');
    fireEvent.change(passwordInput, { target: { value: '123' } });
    
    expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument();
  });

  test('clears email error when valid email is entered', () => {
    render(<LoginForm />);
    
    const emailInput = screen.getByLabelText('Email:');
    
    // First enter invalid email
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    expect(screen.getByText('Email must contain @ symbol')).toBeInTheDocument();
    
    // Then enter valid email
    fireEvent.change(emailInput, { target: { value: 'valid@email.com' } });
    expect(screen.queryByText('Email must contain @ symbol')).not.toBeInTheDocument();
  });

  test('clears password error when valid password is entered', () => {
    render(<LoginForm />);
    
    const passwordInput = screen.getByLabelText('Password:');
    
    // First enter invalid password
    fireEvent.change(passwordInput, { target: { value: '123' } });
    expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument();
    
    // Then enter valid password
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(screen.queryByText('Password must be at least 6 characters')).not.toBeInTheDocument();
  });

  test('shows success message on valid form submission', () => {
    render(<LoginForm />);
    
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const submitButton = screen.getByRole('button', { name: 'Login' });
    
    // Fill in valid form data
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    // Submit the form
    fireEvent.click(submitButton);
    
    // Check for success message
    expect(screen.getByText('Login Successful!')).toBeInTheDocument();
    expect(screen.getByText('Welcome back!')).toBeInTheDocument();
  });

  test('does not show success message on invalid form submission', () => {
    render(<LoginForm />);
    
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const submitButton = screen.getByRole('button', { name: 'Login' });
    
    // Fill in invalid form data
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { value: '123' } });
    
    // Submit the form
    fireEvent.click(submitButton);
    
    // Check that success message is not shown
    expect(screen.queryByText('Login Successful!')).not.toBeInTheDocument();
    expect(screen.queryByText('Welcome back!')).not.toBeInTheDocument();
    
    // Check that form is still visible
    expect(screen.getByText('Login Form')).toBeInTheDocument();
  });

  test('validates both email and password on submission', () => {
    render(<LoginForm />);
    
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const submitButton = screen.getByRole('button', { name: 'Login' });
    
    // Fill in partially valid form (valid email, invalid password)
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: '123' } });
    
    // Submit the form
    fireEvent.click(submitButton);
    
    // Check that success message is not shown
    expect(screen.queryByText('Login Successful!')).not.toBeInTheDocument();
    
    // Check that password error is still visible
    expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument();
  });

  test('submit button is always enabled', () => {
    render(<LoginForm />);
    
    const submitButton = screen.getByRole('button', { name: 'Login' });
    
    // Check that button is not disabled initially
    expect(submitButton).not.toBeDisabled();
    
    // Fill in invalid data
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { value: '123' } });
    
    // Check that button is still not disabled
    expect(submitButton).not.toBeDisabled();
  });
});

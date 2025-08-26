import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Counter from './Counter';

describe('Counter Component', () => {
  test('displays initial count of 0', () => {
    render(<Counter />);
    
    // Check if the initial count is displayed correctly
    expect(screen.getByText('Counter: 0')).toBeInTheDocument();
  });

  test('increments count when increment button is clicked', () => {
    render(<Counter />);
    
    // Get the increment button and click it
    const incrementButton = screen.getByText('Increment');
    fireEvent.click(incrementButton);
    
    // Check if the count increased to 1
    expect(screen.getByText('Counter: 1')).toBeInTheDocument();
  });

  test('decrements count when decrement button is clicked', () => {
    render(<Counter />);
    
    // First increment to 1, then decrement
    const incrementButton = screen.getByText('Increment');
    const decrementButton = screen.getByText('Decrement');
    
    fireEvent.click(incrementButton);
    fireEvent.click(decrementButton);
    
    // Check if the count is back to 0
    expect(screen.getByText('Counter: 0')).toBeInTheDocument();
  });

  test('resets count to 0 when reset button is clicked', () => {
    render(<Counter />);
    
    // First increment a few times
    const incrementButton = screen.getByText('Increment');
    const resetButton = screen.getByText('Reset');
    
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    
    // Check that count is 3
    expect(screen.getByText('Counter: 3')).toBeInTheDocument();
    
    // Click reset
    fireEvent.click(resetButton);
    
    // Check that count is reset to 0
    expect(screen.getByText('Counter: 0')).toBeInTheDocument();
  });

  test('can increment multiple times', () => {
    render(<Counter />);
    
    const incrementButton = screen.getByText('Increment');
    
    // Click increment 5 times
    for (let i = 0; i < 5; i++) {
      fireEvent.click(incrementButton);
    }
    
    // Check if the count is 5
    expect(screen.getByText('Counter: 5')).toBeInTheDocument();
  });

  test('can decrement below zero', () => {
    render(<Counter />);
    
    const decrementButton = screen.getByText('Decrement');
    
    // Click decrement 3 times
    for (let i = 0; i < 3; i++) {
      fireEvent.click(decrementButton);
    }
    
    // Check if the count is -3
    expect(screen.getByText('Counter: -3')).toBeInTheDocument();
  });

  test('all buttons are present and clickable', () => {
    render(<Counter />);
    
    // Check if all buttons are rendered
    expect(screen.getByText('Increment')).toBeInTheDocument();
    expect(screen.getByText('Decrement')).toBeInTheDocument();
    expect(screen.getByText('Reset')).toBeInTheDocument();
    
    // Check if buttons are clickable (not disabled)
    expect(screen.getByText('Increment')).not.toBeDisabled();
    expect(screen.getByText('Decrement')).not.toBeDisabled();
    expect(screen.getByText('Reset')).not.toBeDisabled();
  });
});

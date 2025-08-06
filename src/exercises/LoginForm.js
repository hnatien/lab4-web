import React, { useState } from 'react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email) => {
    return email.includes('@');
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value && !validateEmail(value)) {
      setEmailError('Email must contain @ symbol');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value && !validatePassword(value)) {
      setPasswordError('Password must be at least 6 characters');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(email) && validatePassword(password)) {
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div style={{ textAlign: 'center', padding: '16px' }}>
        <h2>Login Successful!</h2>
        <p>Welcome back!</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '16px' }}>
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '12px' }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '4px',
              border: emailError ? '1px solid black' : '1px solid black'
            }}
          />
          {emailError && <p style={{ color: 'black', fontSize: '12px' }}>{emailError}</p>}
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '4px',
              border: passwordError ? '1px solid black' : '1px solid black'
            }}
          />
          {passwordError && <p style={{ color: 'black', fontSize: '12px' }}>{passwordError}</p>}
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: 'white',
            color: 'black',
            border: '1px solid black',
            padding: '8px 16px',
            cursor: 'pointer',
            width: '100%'
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm; 
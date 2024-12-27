import React, { useState } from 'react';

const LoginForm = ({ onSwitchToSignup, setResult, setError, onLoginSuccess }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setResult('');
    try {
      const response = await fetch('http://localhost/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setResult('Login successful!');
        onLoginSuccess();
      } else {
        setError(data.message || 'Login failed.');
      }
    } catch (err) {
      setError('Error communicating with the server.');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Log In</h2>
      <input name="email" type="email" placeholder="Enter your email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Enter your password" onChange={handleChange} required />
      <button type="submit">Log In</button>
      <p>
        Don't have an account? <span onClick={onSwitchToSignup}>Sign up</span>
      </p>
    </form>
  );
};

export default LoginForm;

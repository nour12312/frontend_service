import React, { useState } from 'react';

const SignupForm = ({ onSwitchToLogin, setResult, setError }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setResult('');
    try {
      const response = await fetch('http://localhost/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.status === 201) {
        setResult('Sign Up successful! Please log in.');
      } else {
        setError(data.message || 'Sign Up failed.');
      }
    } catch (err) {
      setError('Error communicating with the server.');
    }
  };

return (
    <form onSubmit={handleSignup}>
    <h2>Sign Up</h2>
      <input name="email" type="email" placeholder="Enter your email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Enter your password" onChange={handleChange} required />
      <input name="firstName" type="text" placeholder="Enter your first name" onChange={handleChange} required />
      <input name="lastName" type="text" placeholder="Enter your last name" onChange={handleChange} required />
      <button type="submit">Sign Up</button>
      <p>
        Already have an account? <span onClick={onSwitchToLogin}>Log in</span>
      </p>
    </form>
  );
};
export default SignupForm;

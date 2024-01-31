import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(''); // Add email state

  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send registration data to the backend API
    axios.post('http://localhost:4444/api/users/register', {
      username,
      email,
      password,
    })
    .then(response => {
      console.log('Registration successful:', response.data);
      // Optionally, redirect or show a success message
      toast.success('Registration successful');
      navigate('/login'); // Navigate to the login page after successful registration
    })
    .catch(error => {
      if (error.response && error.response.status === 409) {
        // User is already registered
        toast.error('User is already registered. Please try a different username or email.');
      } else {
        console.error('Error registering:', error);
        toast.error('Error registering. Please try again.');
      }
    });
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Register</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <label className="register-label">Username:
          <input className="register-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label className="register-label">Email:
        <input className="register-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
        <label className="register-label">Password:
          <input className="register-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button className="register-button" type="submit">Register</button>
      </form>
      <p className="register-login-link">Already registered? <Link to="/login" className="register-login">Login</Link></p>
    </div>
  );
}

export default Register;

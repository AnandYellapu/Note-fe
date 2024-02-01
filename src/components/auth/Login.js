import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://note-server-gu2m.onrender.com/api/users/login', {
      username,
      password,
    })
    .then(response => {
      const token = response.data.token;
      localStorage.setItem('token', token);
      console.log('Login successful');
      toast.success('Login successful');
      navigate('/tasklist');
    })
    .catch(error => {
      console.error('Error logging in:', error);
      toast.error('Error logging in. Please check your credentials and try again.');
    });
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="login-label">Username:
          <input className="login-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label className="login-label">Password:
          <input className="login-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button className="login-button" type="submit">Login</button>
      </form>
      <p className="login-register-link">Not yet registered? <Link to="/register" className="login-register">Register</Link></p>
    </div>
  );
}

export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ScaleLoader } from 'react-spinners';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Lock from '@mui/icons-material/Lock';
import SendIcon from '@mui/icons-material/Send';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios.post('https://note-be-rgsa.onrender.com/api/users/login', {
      username,
      password,
    })
    .then(response => {
      const token = response.data.token;
      localStorage.setItem('token', token);
      console.log('Login successful');
      toast.success('Login successful');

      setTimeout(() => {
        setLoading(false);
        navigate('/tasklist');
      }, 3000);
    })
    .catch(error => {
      console.error('Error logging in:', error);
      toast.error('Error logging in. Please check your credentials and try again.');
      setLoading(false);
    });
  };

  return (
    <Paper elevation={3} className="login-container" style={{ padding: '20px', maxWidth: '400px', margin: 'auto', marginTop: '50px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          InputProps={{
            startAdornment: (
              <AccountCircle color="action" />
            ),
          }}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <Lock color="action" />
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
          fullWidth
          style={{ marginTop: '20px' }}
          endIcon={<SendIcon />}
        >
          {loading ? (
            <ScaleLoader color="#fff" loading={loading} height={20} width={3} radius={2} margin={2} />
          ) : (
            'Login'
          )}
        </Button>
      </form>
      <Typography variant="body2" align="center" style={{ marginTop: '20px' }}>
        Not yet registered? <Link to="/register">Register</Link>
      </Typography>
    </Paper>
  );
}

export default Login;


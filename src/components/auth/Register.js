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
import Email from '@mui/icons-material/Email';
import Lock from '@mui/icons-material/Lock';
import SendIcon from '@mui/icons-material/Send';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios.post('https://note-be-production.up.railway.app/api/users/register', {
      username,
      email,
      password,
    })
    .then(response => {
      console.log('Registration successful:', response.data);
      toast.success('Registration successful');
      setTimeout(() => {
        setLoading(false);
        navigate('/login');
      }, 4000);
    })
    .catch(error => {
      if (error.response && error.response.status === 409) {
        toast.error('User is already registered. Please try a different username or email.');
      } else {
        console.error('Error registering:', error);
        toast.error('Error registering. Please try again.');
      }
    })
    .finally(() => {
      setTimeout(() => {
        setLoading(false);
      }, 4000);
    });
  };

  return (
    <Paper elevation={3} className="register-container" style={{ padding: '20px', maxWidth: '400px', margin: 'auto', marginTop: '50px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Register
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
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            startAdornment: (
              <Email color="action" />
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
          {loading ? <ScaleLoader color="#fff" loading={loading} height={20} width={3} radius={2} margin={2} /> : 'Register'}
        </Button>
      </form>
      <Typography variant="body2" align="center" style={{ marginTop: '20px' }}>
        Already registered? <Link to="/login">Login</Link>
      </Typography>
    </Paper>
  );
}

export default Register;

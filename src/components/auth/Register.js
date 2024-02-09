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
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const navigate = useNavigate();

  const calculatePasswordStrength = (password) => {
    if (password.length < 8) {
      return 'Weak';
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar) {
      return 'Strong';
    } else if ((hasUpperCase && hasLowerCase) || (hasUpperCase && hasNumber) || (hasLowerCase && hasNumber) || (hasLowerCase && hasSpecialChar) || (hasNumber && hasSpecialChar)) {
      return 'Medium';
    } else {
      return 'Weak';
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const strength = calculatePasswordStrength(newPassword);
    setPasswordStrength(strength);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // Prevent multiple submissions while loading
    setLoading(true);
  
    try {
      const response = await axios.post('https://note-be-rgsa.onrender.com/api/users/register', {
        username,
        email,
        password,
      });
      console.log('Registration successful:', response.data);
      toast.success('Registration successful');
      setTimeout(() => {
        setLoading(false);
        navigate('/login');
      }, 4000);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.error;
        if (errorMessage === 'Username and email already exist.') {
          toast.error('Username and email already exist. Please try different credentials.');
        } else if (errorMessage === 'Username already exists.') {
          toast.error('Username already exists. Please try a different username.');
        } else if (errorMessage === 'Email already exists.') {
          toast.error('Email already exists. Please try a different email.');
        } else {
          console.error('Error registering:', error);
          toast.error('Error registering. Please try again.');
        }
      } else {
        console.error('Error registering:', error);
        toast.error('Error registering. Please try again.');
      }
      setLoading(false);
    }
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
          disabled={loading} // Disable input when loading
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
          disabled={loading} // Disable input when loading
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
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={handlePasswordChange}
          disabled={loading} // Disable input when loading
          InputProps={{
            startAdornment: (
              <Lock color="action" />
            ),
            endAdornment: (
              <Button onClick={togglePasswordVisibility} style={{ minWidth: 'auto' }}>
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </Button>
            ),
          }}
        />
        <Typography variant="body2" style={{ marginTop: '10px' }}>
          Password Strength: <strong>{passwordStrength}</strong>
        </Typography>
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

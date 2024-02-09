// ResetPassword.js
import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import LockIcon from '@mui/icons-material/Lock';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match. Please try again.');
      return;
    }
    setLoading(true);

    axios.post(`https://note-be-rgsa.onrender.com/api/users/reset-password/${token}`, { password })
      .then(response => {
        toast.success('Password reset successful. You can now login with your new password.');
        setLoading(false);
        navigate('/login'); // Navigate to login page
      })
      .catch(error => {
        console.error('Error resetting password:', error);
        toast.error('Error resetting password. Please try again.');
        setLoading(false);
      });
  };

  return (
    <Paper elevation={3} className="reset-password-container" style={{ padding: '20px', maxWidth: '400px', margin: 'auto', marginTop: '50px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Reset Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="New Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          autoFocus
          required
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          id="confirmPassword"
          required
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
          fullWidth
          style={{ marginTop: '20px' }}
          endIcon={<LockIcon />}
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </Button>
      </form>
    </Paper>
  );
}

export default ResetPassword;

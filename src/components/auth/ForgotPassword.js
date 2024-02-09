import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Call your API to send a password reset email
    axios.post('https://note-be-rgsa.onrender.com/api/users/forgot-password', { email })
      .then(response => {
        console.log('Password reset email sent successfully');
        toast.success('Password reset email sent successfully.Please reset password via link sent to your email');
        setLoading(false);
        navigate('/'); // Redirect to login page after sending the email
      })
      .catch(error => {
        console.error('Error sending password reset email:', error);
        toast.error('Error sending password reset email. Please try again.');
        setLoading(false);
      });
  };

  return (
    <Paper elevation={3} className="forgot-password-container" style={{ padding: '20px', maxWidth: '400px', margin: 'auto', marginTop: '50px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Forgot Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          autoFocus
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
          fullWidth
          style={{ marginTop: '20px' }}
          endIcon={<ArrowBackIcon />}
        >
          {loading ? 'Sending...' : 'Send Password Reset Email'}
        </Button>
      </form>
    </Paper>
  );
}

export default ForgotPassword;

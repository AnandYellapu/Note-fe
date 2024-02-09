// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { ScaleLoader } from 'react-spinners';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import Lock from '@mui/icons-material/Lock';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// import SendIcon from '@mui/icons-material/Send';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false); // New state for "Remember Me" feature
//   const navigate = useNavigate();

//   // Check localStorage on component mount to see if the user chose "Remember Me"
//   useEffect(() => {
//     const rememberMeValue = localStorage.getItem('rememberMe');
//     if (rememberMeValue) {
//       setRememberMe(true);
//     }
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoading(true);

//     axios.post('https://note-be-rgsa.onrender.com/api/users/login', {
//       username,
//       password,
//     })
//     .then(response => {
//       const token = response.data.token;
//       localStorage.setItem('token', token);
//       console.log('Login successful');
//       toast.success('Login successful');

//       // Store rememberMe state in localStorage if the user opted in
//       if (rememberMe) {
//         localStorage.setItem('rememberMe', true);
//       } else {
//         // Clear rememberMe state from localStorage if the user did not opt in
//         localStorage.removeItem('rememberMe');
//       }

//       setTimeout(() => {
//         setLoading(false);
//         navigate('/tasklist');
//       }, 3000);
//     })
//     .catch(error => {
//       if (error.response && error.response.status === 400) {
//         const errorMessage = error.response.data.error;
//         if (errorMessage === 'Invalid username.') {
//           toast.error('Invalid username. Please try again.');
//         } else if (errorMessage === 'Invalid password.') {
//           toast.error('Invalid password. Please try again.');
//         } else if (errorMessage === 'Invalid username or password.') {
//           toast.error('Invalid username or password. Please try again.');
//         } else {
//           console.error('Error logging in:', error);
//           toast.error('Error logging in. Please check your credentials and try again.');
//         }
//       } else {
//         console.error('Error logging in:', error);
//         toast.error('Error logging in. Please check your credentials and try again.');
//       }
//       setLoading(false);
//     });
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const toggleRememberMe = () => {
//     setRememberMe(!rememberMe);
//   };

//   return (
//     <Paper elevation={3} className="login-container" style={{ padding: '20px', maxWidth: '400px', margin: 'auto', marginTop: '50px' }}>
//       <Typography variant="h4" align="center" gutterBottom>
//         Login
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           label="Username"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           InputProps={{
//             startAdornment: (
//               <AccountCircle color="action" />
//             ),
//           }}
//           id="username" // Add id for accessibility
//           autoFocus // Automatically focus on the username field when the page loads
//         />
//         <TextField
//           label="Password"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           type={showPassword ? 'text' : 'password'}
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           InputProps={{
//             startAdornment: (
//               <Lock color="action" />
//             ),
//             endAdornment: (
//               <Button onClick={togglePasswordVisibility} tabIndex={-1}>
//                 {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
//               </Button>
//             ),
//           }}
//           id="password" // Add id for accessibility
//         />
//         <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
//           <input type="checkbox" id="rememberMeCheckbox" checked={rememberMe} onChange={toggleRememberMe} />
//           <label htmlFor="rememberMeCheckbox">Remember Me</label>
//         </div>
//         <Button
//           variant="contained"
//           color="primary"
//           type="submit"
//           disabled={loading}
//           fullWidth
//           style={{ marginTop: '20px' }}
//           endIcon={<SendIcon />}
//           id="loginButton" // Add id for accessibility
//         >
//           {loading ? (
//             <ScaleLoader color="#fff" loading={loading} height={20} width={3} radius={2} margin={2} />
//           ) : (
//             'Login'
//           )}
//         </Button>
//       </form>
//       <Typography variant="body2" align="center" style={{ marginTop: '20px' }}>
//         Not yet registered? <Link to="/register">Register</Link>
//       </Typography>
//     </Paper>
//   );
// }

// export default Login;











import React, { useState, useEffect } from 'react';
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
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SendIcon from '@mui/icons-material/Send';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const rememberMeValue = localStorage.getItem('rememberMe');
    if (rememberMeValue) {
      setRememberMe(true);
    }
  }, []);

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

      if (rememberMe) {
        localStorage.setItem('rememberMe', true);
      } else {
        localStorage.removeItem('rememberMe');
      }

      setTimeout(() => {
        setLoading(false);
        navigate('/tasklist');
      }, 3000);
    })
    .catch(error => {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.error;
        if (errorMessage === 'Invalid username.') {
          toast.error('Invalid username. Please try again.');
        } else if (errorMessage === 'Invalid password.') {
          toast.error('Invalid password. Please try again.');
        } else if (errorMessage === 'Invalid username or password.') {
          toast.error('Invalid username or password. Please try again.');
        } else {
          console.error('Error logging in:', error);
          toast.error('Error logging in. Please check your credentials and try again.');
        }
      } else {
        console.error('Error logging in:', error);
        toast.error('Error logging in. Please check your credentials and try again.');
      }
      setLoading(false);
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
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
          id="username"
          autoFocus
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <Lock color="action" />
            ),
            endAdornment: (
              <Button onClick={togglePasswordVisibility} tabIndex={-1}>
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </Button>
            ),
          }}
          id="password"
        />
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <input type="checkbox" id="rememberMeCheckbox" checked={rememberMe} onChange={toggleRememberMe} />
          <label htmlFor="rememberMeCheckbox">Remember Me</label>
        </div>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
          fullWidth
          style={{ marginTop: '20px' }}
          endIcon={<SendIcon />}
          id="loginButton"
        >
          {loading ? (
            <ScaleLoader color="#fff" loading={loading} height={20} width={3} radius={2} margin={2} />
          ) : (
            'Login'
          )}
        </Button>
      </form>
      <Typography variant="body2" align="center" style={{ marginTop: '20px' }}>
        <Link to="/forgot-password">Forgot Password?</Link>
      </Typography>
      <Typography variant="body2" align="center" style={{ marginTop: '20px' }}>
        Not yet registered? <Link to="/register">Register</Link>
      </Typography>
    </Paper>
  );
}

export default Login;

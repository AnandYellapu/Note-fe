// import React, { useState, useEffect } from 'react';
// import { Typography, Box } from '@mui/material';


// const Footer = () => {
//   const [currentDateTime, setCurrentDateTime] = useState(Date.now());

//   useEffect(() => {
//     const updateDateTime = () => {
//       setCurrentDateTime(Date.now());
//     };

//     // Update date and time every second
//     const intervalId = setInterval(updateDateTime, 1000);

//     // Clear the interval on component unmount
//     return () => clearInterval(intervalId);
//   }, []);

//   return (
//     <Box component="footer" className='footer-Container'>
//       <Typography variant="body2" color="textSecondary" className='footer-Text'>
//         Note Maker &copy; {new Date().getFullYear()}
//       </Typography>
//       <Typography variant="body2" color="textSecondary" className='footer-date'>
//         Date and Time: {new Date(currentDateTime).toLocaleString()}
//       </Typography>
//     </Box>
//   );
// };

// export default Footer;









import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';

const Footer = () => {
  const [currentDateTime, setCurrentDateTime] = useState(Date.now());

  useEffect(() => {
    const updateDateTime = () => {
      setCurrentDateTime(Date.now());
    };

    // Update date and time every second
    const intervalId = setInterval(updateDateTime, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#f0f0f0',
        padding: '10px',
        textAlign: 'center',
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        borderTop: '1px solid #ccc',
      }}
    >
      <Typography variant="body2" color="textSecondary">
        Note Maker &copy; {new Date().getFullYear()}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Date and Time: {new Date(currentDateTime).toLocaleString()}
      </Typography>
    </Box>
  );
};

export default Footer;

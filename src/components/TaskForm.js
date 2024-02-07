// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import { toast } from 'react-toastify';
// // import SyncLoader from 'react-spinners/SyncLoader';
// // import TextField from '@mui/material/TextField';
// // import Button from '@mui/material/Button';
// // import FormControl from '@mui/material/FormControl';
// // import InputLabel from '@mui/material/InputLabel';
// // import Select from '@mui/material/Select';
// // import MenuItem from '@mui/material/MenuItem';
// // import Typography from '@mui/material/Typography';
// // import AlarmOnIcon from '@mui/icons-material/AlarmOn';
// // import EventNoteIcon from '@mui/icons-material/EventNote';
// // import DescriptionIcon from '@mui/icons-material/Description';
// // import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
// // import LocalOfferIcon from '@mui/icons-material/LocalOffer';
// // import NoteAddIcon from '@mui/icons-material/NoteAdd';
// // import moment from 'moment-timezone';

// // const TaskForm = () => {
// //   const [title, setTitle] = useState('');
// //   const [description, setDescription] = useState('');
// //   const [deadline, setDeadline] = useState('');
// //   const [priority, setPriority] = useState('');
// //   const [tags, setTags] = useState('');
// //   const [reminder, setReminder] = useState('');
// //   const [loading, setLoading] = useState(false);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);

// //     // Basic form validation
// //     if (!title || !description || !deadline) {
// //       toast.error('Please fill in all required fields');
// //       setLoading(false);
// //       return;
// //     }

// //     // Continue with API call
// //     const formData = {
// //       title,
// //       description,
// //       // Convert deadline to 'Asia/Kolkata' timezone during task creation
// //       deadline: moment(deadline).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss'),
// //       priority,
// //       tags,
// //       // Convert reminder to 'Asia/Kolkata' timezone during task creation
// //       reminder: reminder ? moment(reminder).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss') : '',
// //     };

// //     try {
// //       const response = await axios.post('https://note-be-rgsa.onrender.com/api/tasks/create', formData, {
// //         headers: {
// //           Authorization: localStorage.getItem('token'),
// //         },
// //       });

// //       console.log('Task created successfully:', response.data);
// //       toast.success('Task created successfully');
// //     } catch (error) {
// //       console.error('Error creating task:', error);

// //       if (error.response) {
// //         toast.error(`Error: ${error.response.data.message}`);
// //       } else if (error.request) {
// //         toast.error('No response from the server. Please try again.');
// //       } else {
// //         toast.error('An error occurred. Please try again.');
// //       }
// //     } finally {
// //       setLoading(false);
// //       // Clear the form fields
// //       setTitle('');
// //       setDescription('');
// //       setDeadline('');
// //       setPriority('');
// //       setTags('');
// //       setReminder('');
// //     }
// //   };

// //   return (
// //     <div style={{ textAlign: 'center', maxWidth: '1200px', margin: 'auto', marginTop: '50px' }}>
// //       <Typography variant="h4" gutterBottom>
// //         <NoteAddIcon fontSize="large" />
// //         Make Your New Note
// //       </Typography>
// //       <form onSubmit={handleSubmit}>
// //         <TextField
// //           label="Title"
// //           variant="outlined"
// //           fullWidth
// //           margin="normal"
// //           value={title}
// //           onChange={(e) => setTitle(e.target.value)}
// //           InputProps={{
// //             startAdornment: <EventNoteIcon />,
// //           }}
// //         />
// //         <TextField
// //           label="Description"
// //           variant="outlined"
// //           fullWidth
// //           margin="normal"
// //           multiline
// //           value={description}
// //           onChange={(e) => setDescription(e.target.value)}
// //           InputProps={{
// //             startAdornment: <DescriptionIcon />,
// //           }}
// //         />
// //         <TextField
// //           label="Deadline"
// //           type="date"
// //           variant="outlined"
// //           fullWidth
// //           margin="normal"
// //           value={deadline}
// //           onChange={(e) => setDeadline(e.target.value)}
// //           InputProps={{
// //             startAdornment: <AlarmOnIcon />,
// //           }}
// //         />
// //         <FormControl fullWidth variant="outlined" margin="normal">
// //           <InputLabel>Priority</InputLabel>
// //           <Select
// //             label="Priority"
// //             value={priority}
// //             onChange={(e) => setPriority(e.target.value)}
// //             startAdornment={<PriorityHighIcon />}
// //           >
// //             <MenuItem value="">
// //               <em>Select Priority</em>
// //             </MenuItem>
// //             <MenuItem value="high">High</MenuItem>
// //             <MenuItem value="medium">Medium</MenuItem>
// //             <MenuItem value="low">Low</MenuItem>
// //           </Select>
// //         </FormControl>
// //         <TextField
// //           label="Tags"
// //           variant="outlined"
// //           fullWidth
// //           margin="normal"
// //           value={tags}
// //           onChange={(e) => setTags(e.target.value)}
// //           InputProps={{
// //             startAdornment: <LocalOfferIcon />,
// //           }}
// //         />
// //         <TextField
// //           label="Reminder"
// //           type="datetime-local"
// //           variant="outlined"
// //           fullWidth
// //           margin="normal"
// //           value={reminder}
// //           onChange={(e) => setReminder(e.target.value)}
// //           InputProps={{
// //             startAdornment: <AlarmOnIcon />,
// //           }}
// //         />
// //         <Button
// //           variant="contained"
// //           color="primary"
// //           type="submit"
// //           disabled={loading}
// //           fullWidth
// //           style={{ marginTop: '20px' }}
// //           startIcon={loading ? <SyncLoader size={10} color="white" /> : <NoteAddIcon />}
// //         >
// //           Create Task
// //         </Button>
// //       </form>
// //     </div>
// //   );
  
// // };

// // export default TaskForm;








// import React, { useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import SyncLoader from 'react-spinners/SyncLoader';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import Typography from '@mui/material/Typography';
// import AlarmOnIcon from '@mui/icons-material/AlarmOn';
// import EventNoteIcon from '@mui/icons-material/EventNote';
// import DescriptionIcon from '@mui/icons-material/Description';
// import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
// import LocalOfferIcon from '@mui/icons-material/LocalOffer';
// import NoteAddIcon from '@mui/icons-material/NoteAdd';


// const TaskForm = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [deadline, setDeadline] = useState('');
//   const [priority, setPriority] = useState('');
//   const [tags, setTags] = useState('');
//   const [reminder, setReminder] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     // Basic form validation
//     if (!title || !description || !deadline) {
//       toast.error('Please fill in all required fields');
//       setLoading(false);
//       return;
//     }

//     // Continue with API call
//     const formData = {
//       title,
//       description,
//       deadline,
//       priority,
//       tags,
//       reminder,
//     };

//     try {
//       const response = await axios.post('https://note-be-rgsa.onrender.com/api/tasks/create', formData, {
//         headers: {
//           Authorization: localStorage.getItem('token'),
//         },
//       });

//       console.log('Task created successfully:', response.data);
//       toast.success('Task created successfully');
//     } catch (error) {
//       console.error('Error creating task:', error);

//       if (error.response) {
//         toast.error(`Error: ${error.response.data.message}`);
//       } else if (error.request) {
//         toast.error('No response from the server. Please try again.');
//       } else {
//         toast.error('An error occurred. Please try again.');
//       }
//     } finally {
//       setLoading(false);
//       // Clear the form fields
//       setTitle('');
//       setDescription('');
//       setDeadline('');
//       setPriority('');
//       setTags('');
//       setReminder('');
//     }
//   };

//   return (
//     <div style={{ textAlign: 'center', maxWidth: '1200px', margin: 'auto', marginTop: '50px' }}>
//       <Typography variant="h4" gutterBottom>
//         <NoteAddIcon fontSize="large" />
//         Make Your New Note
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           label="Title"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           InputProps={{
//             startAdornment: <EventNoteIcon />,
//           }}
//         />
//         <TextField
//           label="Description"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           multiline
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           InputProps={{
//             startAdornment: <DescriptionIcon />,
//           }}
//         />
//         <TextField
//           label="Deadline"
//           type="date"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           value={deadline}
//           onChange={(e) => setDeadline(e.target.value)}
//           InputProps={{
//             startAdornment: <AlarmOnIcon />,
//           }}
//         />
//         <FormControl fullWidth variant="outlined" margin="normal">
//           <InputLabel>Priority</InputLabel>
//           <Select
//             label="Priority"
//             value={priority}
//             onChange={(e) => setPriority(e.target.value)}
//             startAdornment={<PriorityHighIcon />}
//           >
//             <MenuItem value="">
//               <em>Select Priority</em>
//             </MenuItem>
//             <MenuItem value="high">High</MenuItem>
//             <MenuItem value="medium">Medium</MenuItem>
//             <MenuItem value="low">Low</MenuItem>
//           </Select>
//         </FormControl>
//         <TextField
//           label="Tags"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           value={tags}
//           onChange={(e) => setTags(e.target.value)}
//           InputProps={{
//             startAdornment: <LocalOfferIcon />,
//           }}
//         />
//         <TextField
//           label="Deadline"
//           type="datetime-local"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           value={reminder}
//           onChange={(e) => setDeadline(e.target.value)}
//           InputProps={{
//             startAdornment: <AlarmOnIcon />,
//           }}
//         />
//         <Button
//           variant="contained"
//           color="primary"
//           type="submit"
//           disabled={loading}
//           fullWidth
//           style={{ marginTop: '20px' }}
//           startIcon={loading ? <SyncLoader size={10} color="white" /> : <NoteAddIcon />}
//         >
//           Create Task
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default TaskForm;










import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import SyncLoader from 'react-spinners/SyncLoader';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import EventNoteIcon from '@mui/icons-material/EventNote';
import DescriptionIcon from '@mui/icons-material/Description';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('');
  const [tags, setTags] = useState('');
  const [reminder, setReminder] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Basic form validation
    if (!title || !description || !deadline) {
      toast.error('Please fill in all required fields');
      setLoading(false);
      return;
    }

    // let adjustedReminder = null;
    // if (reminder) {
    //   const reminderDate = new Date(reminder);
    //   reminderDate.setHours(reminderDate.getHours() - 5); // Subtract 5 hours
    //   reminderDate.setMinutes(reminderDate.getMinutes() - 31); // Subtract 31 minutes
    //   adjustedReminder = reminderDate.toISOString().slice(0, 16).replace('T', ' '); // Format to 'YYYY-MM-DDTHH:mm'
    // }

    // Continue with API call
    const formData = {
      title,
      description,
      deadline,
      priority,
      tags,
      // // Convert reminder to 'YYYY-MM-DDTHH:mm' format
      // reminder: reminder ? reminder.replace('T', ' ') : '',
      reminder,
    };

    try {
      const response = await axios.post('https://note-be-rgsa.onrender.com/api/tasks/create', formData, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });

      console.log('Task created successfully:', response.data);
      toast.success('Task created successfully');
    } catch (error) {
      console.error('Error creating task:', error);

      if (error.response) {
        toast.error(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        toast.error('No response from the server. Please try again.');
      } else {
        toast.error('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
      // Clear the form fields
      setTitle('');
      setDescription('');
      setDeadline('');
      setPriority('');
      setTags('');
      setReminder('');
    }
  };

  return (
    <div style={{ textAlign: 'center', maxWidth: '1200px', margin: 'auto', marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        <NoteAddIcon fontSize="large" />
        Make Your New Note
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          InputProps={{
            startAdornment: <EventNoteIcon />,
          }}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          InputProps={{
            startAdornment: <DescriptionIcon />,
          }}
        />
        <TextField
          label="Deadline"
          type="date"
          variant="outlined"
          fullWidth
          margin="normal"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          InputProps={{
            startAdornment: <AlarmOnIcon />,
          }}
        />
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>Priority</InputLabel>
          <Select
            label="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            startAdornment={<PriorityHighIcon />}
          >
            <MenuItem value="">
              <em>Select Priority</em>
            </MenuItem>
            <MenuItem value="high">High</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="low">Low</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Tags"
          variant="outlined"
          fullWidth
          margin="normal"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          InputProps={{
            startAdornment: <LocalOfferIcon />,
          }}
        />
        <TextField
          label="Reminder"
          type="datetime-local"
          variant="outlined"
          fullWidth
          margin="normal"
          value={reminder}
          onChange={(e) => setReminder(e.target.value)}
          InputProps={{
            startAdornment: <AlarmOnIcon />,
          }}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
          fullWidth
          style={{ marginTop: '20px' }}
          startIcon={loading ? <SyncLoader size={10} color="white" /> : <NoteAddIcon />}
        >
          Create Task
        </Button>
      </form>
    </div>
  );
};

export default TaskForm;



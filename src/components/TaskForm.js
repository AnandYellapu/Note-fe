import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
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

    // Continue with API call
    const formData = {
      title,
      description,
      deadline,
      priority,
      tags,
      reminder,
    };

    try {
      const response = await axios.post('https://note-server-gu2m.onrender.com/api/tasks/create', formData, {
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
      // Set a minimum loading duration of 5 seconds using setTimeout
      setTimeout(() => {
        setLoading(false);

        // Clear the form fields
        setTitle('');
        setDescription('');
        setDeadline('');
        setPriority('');
        setTags('');
        setReminder('');
      }, 5000); // 5000 milliseconds (5 seconds)
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
          startIcon={loading ? <CircularProgress size={24} color="inherit" /> : <NoteAddIcon />}
        >
          Create Task
        </Button>
      </form>
    </div>
  );
};

export default TaskForm;

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

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
      const response = await axios.post('https://note-server-gu2m.onrender.com//api/tasks/create', formData, {
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
    <div className="task-form-container">
      <h1 className="task-form-title">Make Your New Note</h1>
      <form onSubmit={handleSubmit} className="task-form">
        <label className="task-form-label">Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="task-form-input" />
        </label>
        <label className="task-form-label">Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="task-form-textarea" />
        </label>
        <label className="task-form-label">Deadline:
          <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} className="task-form-input" />
        </label>
        <label className="task-form-label">Priority:
          <select value={priority} onChange={(e) => setPriority(e.target.value)} className="task-form-input">
            <option value="">Select Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </label>
        <label className="task-form-label">Tags:
          <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} className="task-form-input" />
        </label>
        <label className="task-form-label">Reminder:
          <input type="datetime-local" value={reminder} onChange={(e) => setReminder(e.target.value)} className="task-form-input" />
        </label>
        <button type="submit" className="task-form-button" disabled={loading}>
          {loading ? 'Creating Task...' : 'Create Task'}
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
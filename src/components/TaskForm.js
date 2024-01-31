import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Send task data to the backend API
    axios.post('http://localhost:4444/api/tasks/create', {
      title,
      description,
      deadline,
    }, {
      headers: {
        Authorization: localStorage.getItem('token'), // Include the JWT token in the headers
      },
    })
      .then(response => {
        console.log('Task created successfully:', response.data);
        // Optionally, redirect or update the task list
        toast.success('Task created successfully');

        // Clear the form fields
        setTitle('');
        setDescription('');
        setDeadline('');
      })
      .catch(error => {
        console.error('Error creating task:', error);
        toast.error('Error creating task. Please try again.');
      });
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
        <button type="submit" className="task-form-button">Create Task</button>
      </form>
    </div>
  );
}

export default TaskForm;


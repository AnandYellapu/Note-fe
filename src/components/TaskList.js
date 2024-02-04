import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ScaleLoader } from 'react-spinners';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Typography,
  Modal,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(5);
  const [editingTask, setEditingTask] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    setLoadingTasks(true);
    axios.get('https://note-server-gu2m.onrender.com/api/tasks', {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })
      .then(response => {
        setTasks(response.data);
        setLoadingTasks(false);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
        setError('Error fetching tasks. Please try again.');
        setLoadingTasks(false);
      });
  }, []);

  const handleCompleteTask = (taskId) => {
    axios.put(`https://note-server-gu2m.onrender.com/api/tasks/${taskId}/update`, { completed: true }, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })
      .then(response => {
        setTasks(tasks.map(task => (task._id === taskId ? { ...task, completed: true, completedDate: new Date().toISOString() } : task)));
        toast.success('Task marked as complete');
      })
      .catch(error => {
        console.error('Error marking task as complete:', error);
        toast.error('Error marking task as complete. Please try again.');
      });
  };

  const handleDeleteTask = (taskId) => {
    confirmAlert({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this task?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            axios.delete(`https://note-server-gu2m.onrender.com/api/tasks/${taskId}/delete`, {
              headers: {
                Authorization: localStorage.getItem('token'),
              },
            })
              .then(response => {
                setTasks(tasks.filter(task => task._id !== taskId));
                toast.success('Task deleted successfully');
              })
              .catch(error => {
                console.error('Error deleting task:', error);
                toast.error('Error deleting task. Please try again.');
              });
          },
        },
        {
          label: 'No',
          onClick: () => console.log('Deletion canceled'),
        },
      ],
    });
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    axios.put(`https://note-server-gu2m.onrender.com/api/tasks/${editingTask._id}/update`, editingTask, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })
      .then(response => {
        setTasks(tasks.map(t => (t._id === editingTask._id ? editingTask : t)));
        setEditModalOpen(false);
        toast.success('Task updated successfully');
      })
      .catch(error => {
        console.error('Error updating task:', error);
        toast.error('Error updating task. Please try again.');
      });
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setEditingTask(null);
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.tags.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="task-list-container">
      <Typography variant="h4" className="task-list-title">Task List</Typography>
      <div className="search-container">
        <TextField
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      {loadingTasks ? (
        <div className="ClimbingBoxLoader-loader">
          <ScaleLoader color="black" loading={loadingTasks} size={20} />
          <Typography variant="p" className="loading-message">Loading...</Typography>
        </div>
      ) : error ? (
        <Typography variant="p" className="error-message">{error}</Typography>
      ) : filteredTasks.length === 0 ? (
        <Typography variant="p" className="no-tasks-message">No tasks found.</Typography>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table className="task-table">
              <TableHead>
                <TableRow>
                  <TableCell className="task-table-header">Title</TableCell>
                  <TableCell className="task-table-header">Description</TableCell>
                  <TableCell className="task-table-header">Deadline</TableCell>
                  <TableCell className="task-table-header">Priority</TableCell>
                  <TableCell className="task-table-header">Tags</TableCell>
                  <TableCell className="task-table-header">Reminder</TableCell>
                  <TableCell className="task-table-header">Completion Date</TableCell>
                  <TableCell className="task-table-header">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentTasks.map((task, index) => (
                  <TableRow key={task._id}>
                    <TableCell>{task.title}</TableCell>
                    <TableCell>
                      <ol className="task-description-list">
                        {task.description.split('\n').map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                      </ol>
                    </TableCell>
                    <TableCell>{task.deadline ? new Date(task.deadline).toLocaleDateString() : 'Not set'}</TableCell>
                    <TableCell>{task.priority || 'Not set'}</TableCell>
                    <TableCell>{task.tags || 'Not set'}</TableCell>
                    <TableCell>{task.reminder ? new Date(task.reminder).toLocaleString() : 'Not set'}</TableCell>
                    <TableCell>{task.completed ? new Date(task.completedDate).toLocaleDateString() : 'Not completed'}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleCompleteTask(task._id)} disabled={task.completed} className="complete-button">
                        {task.completed ? 'Completed' : 'Complete'}
                      </Button>
                      <IconButton onClick={() => handleDeleteTask(task._id)} className="delete-icon">
                        <DeleteIcon />
                      </IconButton>
                      <IconButton onClick={() => handleEditTask(task)} className="edit-icon">
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="pagination-container">
            {Array.from({ length: Math.ceil(filteredTasks.length / tasksPerPage) }).map((_, index) => (
              <Button key={index} onClick={() => paginate(index + 1)} className="pagination-button">
                {index + 1}
              </Button>
            ))}
          </div>
        </>
      )}
  
      {/* Edit Task Modal */}
      <Modal open={editModalOpen} onClose={handleCloseEditModal}>
  <div className="modal-container">
    <Typography variant="h5" className="modal-title">Edit Task</Typography>
    <TextField
      label="Title"
      value={editingTask?.title || ''}
      onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
      className="modal-input"
    />
    <TextField
      label="Description"
      value={editingTask?.description || ''}
      onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
      multiline
      className="modal-input"
    />
    <TextField
      label="Deadline"
      type="date"
      value={editingTask?.deadline || ''}
      onChange={(e) => setEditingTask({ ...editingTask, deadline: e.target.value })}
      className="modal-input"
    />
    <TextField
      label="Priority"
      value={editingTask?.priority || ''}
      onChange={(e) => setEditingTask({ ...editingTask, priority: e.target.value })}
      className="modal-input"
    />
    <TextField
      label="Tags"
      value={editingTask?.tags || ''}
      onChange={(e) => setEditingTask({ ...editingTask, tags: e.target.value })}
      className="modal-input"
    />
    <TextField
      label="Reminder"
      type="datetime-local"
      value={editingTask?.reminder || ''}
      onChange={(e) => setEditingTask({ ...editingTask, reminder: e.target.value })}
      className="modal-input"
    />
    <Button onClick={handleSaveEdit} className="modal-button">Save</Button>
    <Button onClick={handleCloseEditModal} className="modal-button">Cancel</Button>
  </div>
</Modal>

    </div>
  );
}

export default TaskList;
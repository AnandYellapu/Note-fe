import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, TextField, InputAdornment, IconButton, Button, Modal } from '@mui/material';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UndoIcon from '@mui/icons-material/Undo';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';
import Pagination from './Pagination';
import DeleteConfirmation from './DeleteConfirmation';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(5);
  const [editingTask, setEditingTask] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDeleteId, setTaskToDeleteId] = useState(null);
  const [deletingTask, setDeletingTask] = useState(false);
  const [deletedTasks, setDeletedTasks] = useState([]); 
  const [sortCriteria, setSortCriteria] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [undoTimeout, setUndoTimeout] = useState(null);


// get all tasks
  useEffect(() => {
    setLoadingTasks(true);
    axios.get('https://note-be-rgsa.onrender.com/api/tasks', {
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

  const handleDeleteTask = (taskId) => {
    setTaskToDeleteId(taskId);
    setDeleteDialogOpen(true);
  };

// delete tasks
  const handleConfirmDelete = () => {
    setDeletingTask(true);
    axios.delete(`https://note-be-rgsa.onrender.com/api/tasks/${taskToDeleteId}/delete`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })
    .then(response => {
      // Remove the task from the state after successful deletion on the server
      setTasks(tasks.filter(task => task._id !== taskToDeleteId));
      const deletedTask = tasks.find(task => task._id === taskToDeleteId);
      setDeletedTasks([deletedTask, ...deletedTasks]);
      toast.success('Task deleted. Undo option available.');
      // Set timeout for undo functionality
      const timeout = setTimeout(() => {
        // Undo the deletion automatically after the timeout
        handleUndoDelete();
      }, 5000); // Adjust the timeout duration as needed
      setUndoTimeout(timeout);
      setDeleteDialogOpen(false);
    })
    .catch(error => {
      console.error('Error deleting task:', error);
      toast.error('Error deleting task. Please try again.');
      setDeletingTask(false); // Reset the deletingTask state if there's an error
    });
  };
  
  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };




  //undo deleted tasks
  const handleUndoDelete = () => {
    if (deletedTasks.length > 0) {
      const [lastDeletedTask, ...restDeletedTasks] = deletedTasks;
  
      axios.post(`https://note-be-rgsa.onrender.com/api/tasks/${lastDeletedTask._id}/undo`, {}, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      .then(response => {
        // Update the state to reflect the undone deletion
        setTasks([lastDeletedTask, ...tasks]);
        setDeletedTasks(restDeletedTasks);
        clearTimeout(undoTimeout); // Clear the undo timeout
        toast.success('Task deletion undone.');
      })
      .catch(error => {
        console.error('Error undoing task deletion:', error);
        toast.error('Error undoing task deletion. Please try again.');
      });
    }
  };
 

// update the task
  const handleEditTask = (task) => {
    setEditingTask(task);
    setEditModalOpen(true);
  };


  const handleCompleteTask = (taskId) => {
    axios.put(`https://note-be-rgsa.onrender.com/api/tasks/${taskId}/update`, { completed: true }, {
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




  const handleSaveEdit = () => {
    axios.put(`https://note-be-rgsa.onrender.com/api/tasks/${editingTask._id}/update`, editingTask, {
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



  const handleSort = (criteria) => {
    // If already sorting by the same criteria, reverse the order
    if (sortCriteria === criteria) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortCriteria(criteria);
      setSortOrder('asc');
    }
  };

  const sortedTasks = tasks.slice().sort((a, b) => {
    const compareValue = (valueA, valueB) => {
      if (valueA < valueB) return -1;
      if (valueA > valueB) return 1;
      return 0;
    };

    if (sortCriteria === 'deadline') {
      return compareValue(new Date(a.deadline || 0), new Date(b.deadline || 0)) * (sortOrder === 'asc' ? 1 : -1);
    } else if (sortCriteria === 'priority') {
      return compareValue(a.priority || '', b.priority || '') * (sortOrder === 'asc' ? 1 : -1);
    } else if (sortCriteria === 'completed') {
      return compareValue(a.completed || false, b.completed || false) * (sortOrder === 'asc' ? 1 : -1);
    } else {
      // Default to sorting by createdAt
      return compareValue(new Date(a.createdAt), new Date(b.createdAt)) * (sortOrder === 'asc' ? 1 : -1);
    }
  });

  const filteredTasks = sortedTasks.filter(task =>
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
      <div className="sort-buttons">
        <Button onClick={() => handleSort('deadline')}>Sort by Deadline</Button>
        <Button onClick={() => handleSort('priority')}>Sort by Priority</Button>
        <Button onClick={() => handleSort('completed')}>Sort by Completion Status</Button>
      </div>
  
      {loadingTasks ? (
        <div className="loading-skeleton-container">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="loading-skeleton-item">
              <Skeleton height={50} width={'100%'} />
            </div>
          ))}
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
                      <IconButton onClick={() => handleEditTask(task)} disabled={task.completed} className="edit-icon">
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredTasks.length / tasksPerPage)}
            onPageChange={paginate}
          />
        </>
      )}
  
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
  
      <DeleteConfirmation
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
        loading={deletingTask}
      />
  
      {/* Undo button */}
      {deletedTasks.length > 0 && (
        <Button onClick={handleUndoDelete} startIcon={<UndoIcon />} className="undo-button">
          Undo Delete
        </Button>
      )}
  
    </div>
  );
  
}

export default TaskList;

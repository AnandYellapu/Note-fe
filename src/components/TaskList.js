import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';


const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState({
    title: '',
    description: '',
    deadline: '',
  });

  useEffect(() => {
    // Fetch tasks from the backend API
    axios.get('http://localhost:4444/api/tasks', {
      headers: {
        Authorization: localStorage.getItem('token'), // Include the JWT token in the headers
      },
    })
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  const handleCompleteTask = (taskId) => {
    // Send request to mark task as complete
    axios.put(`http://localhost:4444/api/tasks/${taskId}/update`, { completed: true }, {
      headers: {
        Authorization: localStorage.getItem('token'), // Include the JWT token in the headers
      },
    })
      .then(response => {
        console.log('Task marked as complete:', response.data);
        // Optionally, update the UI or perform other actions
        setTasks(tasks.map(task => (task._id === taskId ? { ...task, completed: true, completedDate: new Date().toISOString() } : task)));
        toast.success('Task marked as complete');
      })
      .catch(error => {
        console.error('Error marking task as complete:', error);
        toast.error('Error marking task as complete. Please try again.');
      });
  };

  const handleEditTask = (taskId) => {
    // Set the task ID to enter edit mode
    setEditTaskId(taskId);

    // Find the task with the given ID and set its details for editing
    const taskToEdit = tasks.find(task => task._id === taskId);
    if (taskToEdit) {
      setEditedTask({
        title: taskToEdit.title,
        description: taskToEdit.description,
        deadline: taskToEdit.deadline ? new Date(taskToEdit.deadline).toISOString().split('T')[0] : '', // Format date as YYYY-MM-DD
      });
    }
  };

  const handleCancelEdit = () => {
    // Cancel editing, reset edit mode and edited task details
    setEditTaskId(null);
    setEditedTask({
      title: '',
      description: '',
      deadline: '',
    });
  };

  const handleSaveEdit = (taskId) => {
    // Implement logic to send edited task details to the backend and update the task
    // Here, you can use axios.put or another method to update the task details

    // For example:
    axios.put(`http://localhost:4444/api/tasks/${taskId}/update`, editedTask, {
      headers: {
        Authorization: localStorage.getItem('token'), // Include the JWT token in the headers
      },
    })
      .then(response => {
        console.log('Task updated:', response.data);
        // Optionally, update the UI or perform other actions
        setTasks(tasks.map(task => (task._id === taskId ? { ...task, ...editedTask } : task)));
        // Exit edit mode and reset edited task details
        setEditTaskId(null);
        setEditedTask({
          title: '',
          description: '',
          deadline: '',
        });
        toast.success('Task updated successfully');
      })
      .catch(error => {
        console.error('Error updating task:', error);
        toast.error('Error updating task. Please try again.');
      });
  };

  const handleDeleteTask = (taskId) => {
    // Send request to delete task
    axios.delete(`http://localhost:4444/api/tasks/${taskId}/delete`, {
      headers: {
        Authorization: localStorage.getItem('token'), // Include the JWT token in the headers
      },
    })
      .then(response => {
        console.log('Task deleted:', response.data);
        // Optionally, update the UI or perform other actions
        setTasks(tasks.filter(task => task._id !== taskId));
        toast.success('Task deleted successfully');
      })
      .catch(error => {
        console.error('Error deleting task:', error);
        toast.error('Error deleting task. Please try again.');
      });
  };

  return (
    <div className="task-list-container">
      <h1 className="task-list-title">Task List</h1>
      {tasks.length === 0 ? (
        <p className="no-tasks-message">No tasks found. Create some notes to get started!</p>
      ) : (
        <table className="task-table">
          <thead>
            <tr>
              <th className="task-table-header">Title</th>
              <th className="task-table-header">Description</th>
              <th className="task-table-header">Deadline</th>
              <th className="task-table-header">Completion Date</th>
              <th className="task-table-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task._id} className={`task-row ${editTaskId === task._id ? 'editing' : ''}`}>
                {editTaskId === task._id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        value={editedTask.title}
                        onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                        className="edit-input"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={editedTask.description}
                        onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                        className="edit-input"
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        value={editedTask.deadline}
                        onChange={(e) => setEditedTask({ ...editedTask, deadline: e.target.value })}
                        className="edit-input"
                      />
                    </td>
                    <td>Completion Date: N/A</td>
                    <td>
                      <button onClick={() => handleSaveEdit(task._id)} className="save-button">Save</button>
                      <button onClick={handleCancelEdit} className="cancel-button">Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{task.title}</td>
                    <td>
                      <ol>
                        {task.description.split('\n').map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                      </ol>
                    </td>
                    <td>{task.deadline ? new Date(task.deadline).toLocaleDateString() : 'Not set'}</td>
                    <td>{task.completed ? new Date(task.completedDate).toLocaleDateString() : 'Not completed'}</td>
                    <td>
                      <button onClick={() => handleCompleteTask(task._id)} disabled={task.completed} className="complete-button">
                        {task.completed ? 'Completed' : 'Complete'}
                      </button>
                      <FaEdit onClick={() => handleEditTask(task._id)} className="edit-icon" />
                      <FaTrash onClick={() => handleDeleteTask(task._id)} className="delete-icon" />
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TaskList;


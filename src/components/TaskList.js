// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaEdit, FaTrash } from 'react-icons/fa';
// import { toast } from 'react-toastify';
// import { confirmAlert } from 'react-confirm-alert';
// import 'react-confirm-alert/src/react-confirm-alert.css';
// import { FaSearch } from 'react-icons/fa';

// const TaskList = () => {
//   const [tasks, setTasks] = useState([]);
//   const [editTaskId, setEditTaskId] = useState(null);
//   const [editedTask, setEditedTask] = useState({
//     title: '',
//     description: '',
//     deadline: '',
//     priority: '',
//     tags: '',
//     reminder: '',
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     axios.get('https://note-server-gu2m.onrender.com/api/tasks', {
//       headers: {
//         Authorization: localStorage.getItem('token'),
//       },
//     })
//       .then(response => {
//         setTasks(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching tasks:', error);
//         setError('Error fetching tasks. Please try again.');
//         setLoading(false);
//       });
//   }, []);

//   const handleCompleteTask = (taskId) => {
//     axios.put(`https://note-server-gu2m.onrender.com/api/tasks/${taskId}/update`, { completed: true }, {
//       headers: {
//         Authorization: localStorage.getItem('token'),
//       },
//     })
//       .then(response => {
//         setTasks(tasks.map(task => (task._id === taskId ? { ...task, completed: true, completedDate: new Date().toISOString() } : task)));
//         toast.success('Task marked as complete');
//       })
//       .catch(error => {
//         console.error('Error marking task as complete:', error);
//         toast.error('Error marking task as complete. Please try again.');
//       });
//   };

//   const handleEditTask = (taskId) => {
//     setEditTaskId(taskId);

//     const taskToEdit = tasks.find(task => task._id === taskId);
//     if (taskToEdit) {
//       setEditedTask({
//         title: taskToEdit.title,
//         description: taskToEdit.description,
//         deadline: taskToEdit.deadline ? new Date(taskToEdit.deadline).toISOString().split('T')[0] : '',
//         priority: taskToEdit.priority || '',
//         tags: taskToEdit.tags || '',
//         reminder: taskToEdit.reminder ? new Date(taskToEdit.reminder).toISOString().split('T')[0] : '',
//       });
//     }
//   };

//   const handleCancelEdit = () => {
//     setEditTaskId(null);
//     setEditedTask({
//       title: '',
//       description: '',
//       deadline: '',
//       priority: '',
//       tags: '',
//       reminder: '',
//     });
//   };

//   const handleSaveEdit = (taskId) => {
//     axios.put(`https://note-server-gu2m.onrender.com/api/tasks/${taskId}/update`, editedTask, {
//       headers: {
//         Authorization: localStorage.getItem('token'),
//       },
//     })
//       .then(response => {
//         setTasks(tasks.map(task => (task._id === taskId ? { ...task, ...editedTask } : task)));
//         setEditTaskId(null);
//         setEditedTask({
//           title: '',
//           description: '',
//           deadline: '',
//           priority: '',
//           tags: '',
//           reminder: '',
//         });
//         toast.success('Task updated successfully');
//       })
//       .catch(error => {
//         console.error('Error updating task:', error);
//         toast.error('Error updating task. Please try again.');
//       });
//   };

//   const handleDeleteTask = (taskId) => {
//     confirmAlert({
//       title: 'Confirm Deletion',
//       message: 'Are you sure you want to delete this task?',
//       buttons: [
//         {
//           label: 'Yes',
//           onClick: () => {
//             axios.delete(`https://note-server-gu2m.onrender.com/api/tasks/${taskId}/delete`, {
//               headers: {
//                 Authorization: localStorage.getItem('token'),
//               },
//             })
//               .then(response => {
//                 setTasks(tasks.filter(task => task._id !== taskId));
//                 toast.success('Task deleted successfully');
//               })
//               .catch(error => {
//                 console.error('Error deleting task:', error);
//                 toast.error('Error deleting task. Please try again.');
//               });
//           },
//         },
//         {
//           label: 'No',
//           onClick: () => console.log('Deletion canceled'),
//         },
//       ],
//     });
//   };

//   const filteredTasks = tasks.filter(task =>
//     task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     task.tags.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="task-list-container">
//       <h1 className="task-list-title">Task List</h1>
//       <div className="search-container">
//   <FaSearch className="search-icon" />
//   <input
//     type="text"
//     placeholder="Search tasks..."
//     value={searchTerm}
//     onChange={(e) => setSearchTerm(e.target.value)}
//   />
// </div>
//       {loading ? (
//         <p className="loading-message">Loading tasks...</p>
//       ) : error ? (
//         <p className="error-message">{error}</p>
//       ) : filteredTasks.length === 0 ? (
//         <p className="no-tasks-message">No matching tasks found.</p>
//       ) : (
//         <table className="task-table">
//           <thead>
//             <tr>
//               <th className="task-table-header">Title</th>
//               <th className="task-table-header">Description</th>
//               <th className="task-table-header">Deadline</th>
//               <th className="task-table-header">Priority</th>
//               <th className="task-table-header">Tags</th>
//               <th className="task-table-header">Reminder</th>
//               <th className="task-table-header">Completion Date</th>
//               <th className="task-table-header">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredTasks.map((task, index) => (
//               <tr key={task._id} className={`task-row ${editTaskId === task._id ? 'editing' : ''}`}>
//               {editTaskId === task._id ? (
//                                           <>
//                                             <td>
//                                               <input
//                                                 type="text"
//                                                 value={editedTask.title}
//                                                 onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
//                                                 className="edit-input"
//                                               />
//                                             </td>
//                                             <td>
//                                               <input
//                                                 type="text"
//                                                 value={editedTask.description}
//                                                 onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
//                                                 className="edit-input"
//                                               />
//                                             </td>
//                                             <td>
//                                               <input
//                                                 type="date"
//                                                 value={editedTask.deadline}
//                                                 onChange={(e) => setEditedTask({ ...editedTask, deadline: e.target.value })}
//                                                 className="edit-input"
//                                               />
//                                             </td>
//                                             <td>
//                                               <input
//                                                 type="text"
//                                                 value={editedTask.priority}
//                                                 onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
//                                                 className="edit-input"
//                                               />
//                                             </td>
//                                             <td>
//                                               <input
//                                                 type="text"
//                                                 value={editedTask.tags}
//                                                 onChange={(e) => setEditedTask({ ...editedTask, tags: e.target.value })}
//                                                 className="edit-input"
//                                               />
//                                             </td>
//                                             <td>
//                                               <input
//                                                 type="date"
//                                                 value={editedTask.reminder}
//                                                 onChange={(e) => setEditedTask({ ...editedTask, reminder: e.target.value })}
//                                                 className="edit-input"
//                                               />
//                                             </td>
//                                             <td>Completion Date: N/A</td>
//                                             <td>
//                                               <button onClick={() => handleSaveEdit(task._id)} className="save-button">Save</button>
//                                               <button onClick={handleCancelEdit} className="cancel-button">Cancel</button>
//                                             </td>
//                                           </>
//                                         ) : (
//                                           <>
//                                             <td>{task.title}</td>
//                                             <td>
//                                               <ol>
//                                                 {task.description.split('\n').map((line, i) => (
//                                                   <li key={i}>{line}</li>
//                                                 ))}
//                                               </ol>
//                                             </td>
//                                             <td>{task.deadline ? new Date(task.deadline).toLocaleDateString() : 'Not set'}</td>
//                                             <td>{task.priority || 'Not set'}</td>
//                                             <td>{task.tags || 'Not set'}</td>
//                                             <td>{task.reminder ? new Date(task.reminder).toLocaleDateString() : 'Not set'}</td>
//                                             <td>{task.completed ? new Date(task.completedDate).toLocaleDateString() : 'Not completed'}</td>
//                                             <td>
//                                               <button onClick={() => handleCompleteTask(task._id)} disabled={task.completed} className="complete-button">
//                                                 {task.completed ? 'Completed' : 'Complete'}
//                                               </button>
//                                               <FaEdit onClick={() => handleEditTask(task._id)} className="edit-icon" />
//                                               <FaTrash onClick={() => handleDeleteTask(task._id)} className="delete-icon" />
//                                             </td>
//                                           </>
//                                         )}
//                                       </tr>
//                                     ))}
//                                   </tbody>
//                                 </table>
//       )}
//     </div>
//   );
// };

// export default TaskList;


















import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState({
    title: '',
    description: '',
    deadline: '',
    priority: '',
    tags: '',
    reminder: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(5);

  useEffect(() => {
    axios.get('https://note-server-gu2m.onrender.com/api/tasks', {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })
      .then(response => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
        setError('Error fetching tasks. Please try again.');
        setLoading(false);
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

  const handleEditTask = (taskId) => {
    setEditTaskId(taskId);

    const taskToEdit = tasks.find(task => task._id === taskId);
    if (taskToEdit) {
      setEditedTask({
        title: taskToEdit.title,
        description: taskToEdit.description,
        deadline: taskToEdit.deadline ? new Date(taskToEdit.deadline).toISOString().split('T')[0] : '',
        priority: taskToEdit.priority || '',
        tags: taskToEdit.tags || '',
        reminder: taskToEdit.reminder ? new Date(taskToEdit.reminder).toISOString().split('T')[0] : '',
      });
    }
  };

  const handleCancelEdit = () => {
    setEditTaskId(null);
    setEditedTask({
      title: '',
      description: '',
      deadline: '',
      priority: '',
      tags: '',
      reminder: '',
    });
  };

  const handleSaveEdit = (taskId) => {
    axios.put(`https://note-server-gu2m.onrender.com/api/tasks/${taskId}/update`, editedTask, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })
      .then(response => {
        setTasks(tasks.map(task => (task._id === taskId ? { ...task, ...editedTask } : task)));
        setEditTaskId(null);
        setEditedTask({
          title: '',
          description: '',
          deadline: '',
          priority: '',
          tags: '',
          reminder: '',
        });
        toast.success('Task updated successfully');
      })
      .catch(error => {
        console.error('Error updating task:', error);
        toast.error('Error updating task. Please try again.');
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
      <h1 className="task-list-title">Task List</h1>
      <div className="search-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {loading ? (
        <p className="loading-message">Loading tasks...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : filteredTasks.length === 0 ? (
        <p className="no-tasks-message">No matching tasks found.</p>
      ) : (
        <>
          <table className="task-table">
            <thead>
              <tr>
                <th className="task-table-header">Title</th>
                <th className="task-table-header">Description</th>
                <th className="task-table-header">Deadline</th>
                <th className="task-table-header">Priority</th>
                <th className="task-table-header">Tags</th>
                <th className="task-table-header">Reminder</th>
                <th className="task-table-header">Completion Date</th>
                <th className="task-table-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentTasks.map((task, index) => (
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
                      <td>
                        <input
                          type="text"
                          value={editedTask.priority}
                          onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
                          className="edit-input"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={editedTask.tags}
                          onChange={(e) => setEditedTask({ ...editedTask, tags: e.target.value })}
                          className="edit-input"
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          value={editedTask.reminder}
                          onChange={(e) => setEditedTask({ ...editedTask, reminder: e.target.value })}
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
                      <td>{task.priority || 'Not set'}</td>
                      <td>{task.tags || 'Not set'}</td>
                      <td>{task.reminder ? new Date(task.reminder).toLocaleDateString() : 'Not set'}</td>
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
          <div className="pagination-container">
            {Array.from({ length: Math.ceil(filteredTasks.length / tasksPerPage) }).map((_, index) => (
              <button key={index} onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TaskList;






import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import LandingPage from './components/LandingPage';
import Navbar from './components/Navbar';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Login from './components/auth/Login';
import Register from './components/auth/Register';


function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/"  element={<TaskList />} />
          <Route path="/create" element={<TaskForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;







import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Navbar from './components/Navbar';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <LandingPage />
            </>
          }
        />
        <Route
          path="/tasklist"
          element={
            <>
              <Navbar />
              <TaskList />
              <Footer />
            </>
          }
        />
        <Route
          path="/create"
          element={
            <>
              <Navbar />
              <TaskForm />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;








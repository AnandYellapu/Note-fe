import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiSolidNotepad } from 'react-icons/bi';

const NavBar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    // Clear the JWT token from local storage
    localStorage.removeItem('token');

    // Optionally, redirect to the login page or any other page after logout
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <Link to="/" className="logo">
          <BiSolidNotepad /> Note Maker
        </Link>
      </div>
      <ul className="nav-list">
        <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
        <li className="nav-item"><Link to="/create" className="nav-link">New Note</Link></li>
        <li className="nav-item dropdown">
          <span className="nav-link dropdown-toggle" onClick={toggleMobileMenu}>Account</span>
          <ul className={`dropdown-menu ${isMobileMenuOpen ? 'open' : ''}`}>
            <li className="dropdown-item"><Link to="/login" className="nav-link">Login</Link></li>
            <li className="dropdown-item"><Link to="/register" className="nav-link">Register</Link></li>
            <li className="dropdown-item">
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </li>
          </ul>
        </li>
      </ul>
      <div className="hamburger-menu" onClick={toggleMobileMenu}>
        <div className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></div>
      </div>
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/create" className="nav-link">New Note</Link>
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/register" className="nav-link">Register</Link>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
}

export default NavBar;


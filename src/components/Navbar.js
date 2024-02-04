import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import { BiSolidNotepad } from 'react-icons/bi';

const NavBar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in by verifying the presence of a token
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuItems = [
    { label: 'Home', path: '/tasklist', icon: <HomeIcon /> },
    { label: 'New Note', path: '/create', visible: isLoggedIn, icon: <NoteAddIcon /> }, // Show only if logged in
    { label: 'Login', path: '/login', visible: !isLoggedIn, icon: <LoginIcon /> }, // Show only if not logged in
    { label: 'Register', path: '/register', visible: !isLoggedIn, icon: <PersonAddIcon /> }, // Show only if not logged in
  ];

  return (
    <AppBar position="static">
      <Toolbar>
        <Link to="/" className="logo" style={{ flexGrow: 1 }}>
          <BiSolidNotepad /> Note Maker
        </Link>
        <IconButton edge="end" color="inherit" onClick={toggleMobileMenu}>
          <MenuIcon />
        </IconButton>
      </Toolbar>

      <Drawer anchor="right" open={isMobileMenuOpen} onClose={toggleMobileMenu}>
        <List>
          {menuItems
            .filter((item) => item.visible !== false) // Filter out items with visible set to false
            .map((item) => (
              <ListItem
                button
                key={item.label}
                component={Link}
                to={item.path}
                onClick={toggleMobileMenu}
              >
                {item.icon && <div style={{ marginRight: '10px' }}>{item.icon}</div>}
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          {isLoggedIn && (
            <ListItem button onClick={handleLogout}>
              <LogoutIcon style={{ marginRight: '10px' }} />
              <ListItemText primary="Logout" />
            </ListItem>
          )}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default NavBar;



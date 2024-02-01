import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { BiSolidNotepad } from 'react-icons/bi';

const NavBar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'New Note', path: '/create' },
    { label: 'Login', path: '/login' },
    { label: 'Register', path: '/register' },
  ];

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="end" color="inherit" onClick={toggleMobileMenu} sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Link to="/" className="logo">
          <BiSolidNotepad /> Note Maker
        </Link>
      </Toolbar>

      <Drawer anchor="right" open={isMobileMenuOpen} onClose={toggleMobileMenu}>
        <List>
          {menuItems.map((item) => (
            <ListItem button key={item.label} component={Link} to={item.path} onClick={toggleMobileMenu}>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
          <ListItem button onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default NavBar;

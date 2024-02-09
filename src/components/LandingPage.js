import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
} from '@mui/material';
import { BiSolidNotepad } from 'react-icons/bi';
import { MdArrowForward } from 'react-icons/md';

const LandingPage = () => {
  return (
    <Container>
      <AppBar position="static" xl={{ background: '#2196F3' }}>
        <Toolbar>
          <BiSolidNotepad style={{ fontSize: '1.5rem', marginRight: '10px', color: '#fff' }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Note Maker
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ marginTop: '20px' }}>
        <Typography variant="h4" align="center" sx={{ marginBottom: '20px', marginTop: '20px' }}>
          Welcome to Note Maker
        </Typography>

        <Typography variant="body1" paragraph className="landing-page-paragraph">
          Note Maker is your go-to platform for creating and managing notes effortlessly. Whether you're organizing your thoughts, jotting down ideas, or keeping track of tasks, Note Maker has got you covered.
        </Typography>
        <Typography variant="body1" paragraph className="landing-page-paragraph">
          Create, edit, and organize your notes seamlessly. Stay productive and never miss a detail with our intuitive note-taking interface.
        </Typography>
        <Typography variant="body1" paragraph className="landing-page-paragraph">
          Ready to get started? Click the button below to begin making your notes.
        </Typography>

        <Link to="/tasklist" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            endIcon={<MdArrowForward />}
            sx={{ marginTop: '20px' }}
          >
            Get Started
          </Button>
        </Link>
      </Container>
    </Container>
  );
};

export default LandingPage;

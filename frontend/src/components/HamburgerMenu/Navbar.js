// src/Navbar.js
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [expandNavBar, setExpandNavBar] = useState(false);

  const handleMenu = () => {
    setExpandNavBar(!expandNavBar);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenu}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          My App
        </Typography>
      </Toolbar>
      {expandNavBar && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start', // Align items to the left=
            backgroundColor: 'background.paper', // Adjust as needed
          }}
        >
          <Button
            color="inherit"
            component={Link}
            to="/sip-calculator"
            sx={{ 
              color: 'black', // Make the text black
              textAlign: 'left', // Align text to the left
              justifyContent: 'flex-start' // Align button content to the start
            }}
          >
            Sip Calculator
          </Button>
        </Box>
      )}
    </AppBar>
  );
};

export default Navbar;

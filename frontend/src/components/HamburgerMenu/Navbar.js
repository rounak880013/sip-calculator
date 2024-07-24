import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Box, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [expandNavBar, setExpandNavBar] = useState(false);

  const handleMenuToggle = () => {
    setExpandNavBar(!expandNavBar);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton 
          edge="start" 
          color="inherit" 
          aria-label="menu" 
          onClick={handleMenuToggle}
        >
          <MenuIcon />
        </IconButton>
        <Typography 
          variant="h6" 
          sx={{ flexGrow: 1 }}
        >
          <Link 
            to="/" 
            style={{ 
              textDecoration: 'none', 
              color: 'inherit' 
            }}
          >
            My App
          </Link>
        </Typography>
      </Toolbar>

      <Drawer
        anchor="left"
        open={expandNavBar}
        onClose={handleMenuToggle}
      >
        <Box
          sx={{
            width: 250,
            height: '100%',
            backgroundColor: 'background.paper',
          }}
        >
          <List>
            <ListItem button component={Link} to="/sip-calculator">
              <ListItemText primary="Sip Calculator" />
            </ListItem>
            {/* Add more navigation items here */}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;

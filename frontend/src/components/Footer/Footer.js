import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      sx={{
        padding: '1rem',
        textAlign: 'center',
        backgroundColor: '#f8f9fa',
        position: 'fixed',
        bottom: 0,
        width: '100%',
        borderTop: '1px solid #dee2e6',
      }}
    >
      <Typography variant="body2" color="textSecondary">
        &copy; {currentYear} SIP Calculator. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;

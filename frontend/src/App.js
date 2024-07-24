
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@mui/material';
import Navbar from './components/HamburgerMenu/Navbar';
import SipCalculator from './components/SipCalculator/SipCalculator';

const App = () => {
  return (
    <Router>
      <div>
        <AppBar position="static">
          {/* <Toolbar> */}
            <Navbar />
          {/* </Toolbar> */}
        </AppBar>
        <Routes>
          <Route path="/sip-calculator" element={<SipCalculator />} />
        </Routes>
      </div>
    </Router>
  );
};


export default App;

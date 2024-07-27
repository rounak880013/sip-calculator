
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { AppBar, Toolbar, Typography } from '@mui/material';
import Navbar from './components/HamburgerMenu/Navbar';
// import SipCalculator from './components/SipCalculator/SipCalculator';
import Footer from './components/Footer/Footer';
import SipCalculatorWrapper from './components/SipCalculator/SipCalculatorWrapper';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <div style={{ paddingBottom: '4rem' }}> {/* Adjust padding to avoid content overlap */}
          <Routes>
            <Route path="/" element={<SipCalculatorWrapper sipType="sip-home" />} /> 
            <Route path="/sip-calculator" element={<SipCalculatorWrapper sipType="sip" />} />
            <Route path="/simple-sip-calculator" element={<SipCalculatorWrapper sipType="simple" />} />
            <Route path="/stepup-sip-calculator" element={<SipCalculatorWrapper sipType="step-up" stepUpPercentage={10} />} />
            <Route path="/incremental-sip-calculator" element={<SipCalculatorWrapper sipType="incremental" stepUpPercentage={10} />} />
            <Route path="/mutual-fund/sip-calculator" element={<SipCalculatorWrapper sipType="sip" />} />
            <Route path="/mutual-fund/simple-sip-calculator" element={<SipCalculatorWrapper sipType="simple" />} />
            <Route path="/simple-mutual-fund/simple-sip-calculator" element={<SipCalculatorWrapper sipType="simple" />} />
            <Route path="/mutual-fund/stepup-sip-calculator" element={<SipCalculatorWrapper sipType="step-up" stepUpPercentage={10} />} />
            <Route path="/mutual-fund/incremental-sip-calculator" element={<SipCalculatorWrapper sipType="incremental" stepUpPercentage={10} />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};


export default App;

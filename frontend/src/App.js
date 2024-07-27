
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// import { AppBar, Toolbar, Typography } from '@mui/material';
import Navbar from './components/HamburgerMenu/Navbar';
// import SipCalculator from './components/SipCalculator/SipCalculator';
import Footer from './components/Footer/Footer';
import SipCalculatorWrapper from './components/SipCalculator/SipCalculatorWrapper';

const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <div>
          <Navbar />
          <div style={{ paddingBottom: '4rem' }}> {/* Adjust padding to avoid content overlap */}
            <Routes>
              <Route path="/" element={<SipCalculatorWrapper sipType="sip-home" />} /> 
              <Route path="/sip-calculator" element={<SipCalculatorWrapper sipType="sip" />} />
              <Route path="/simple-sip-calculator" element={<SipCalculatorWrapper sipType="simple_sip" />} />
              <Route path="/stepup-sip-calculator" element={<SipCalculatorWrapper sipType="stepup_sip" stepUpPercentage={10} />} />
              <Route path="/step-up-sip-calculator" element={<SipCalculatorWrapper sipType="step_up_sip" stepUpPercentage={10} />} />
              <Route path="/incremental-sip-calculator" element={<SipCalculatorWrapper sipType="incremental" stepUpPercentage={10} />} />
              <Route path="/mutual-fund/sip-calculator" element={<SipCalculatorWrapper sipType="mutual_fund_sip_calculator" />} />
              <Route path="/mutual-fund/sip" element={<SipCalculatorWrapper sipType="mutual_fund_sip" />} />
              <Route path="/mutual-fund/simple-sip-calculator" element={<SipCalculatorWrapper sipType="mutual_fund_simple_sip" />} />
              <Route path="/mutual-fund/stepup-sip-calculator" element={<SipCalculatorWrapper sipType="mutual_fund_stepup" stepUpPercentage={10} />} />
              <Route path="/mutual-fund/step-up-sip-calculator" element={<SipCalculatorWrapper sipType="mutual_fund_step_up" stepUpPercentage={10} />} />
              <Route path="/mutual-fund/incremental-sip-calculator" element={<SipCalculatorWrapper sipType="mutual_fund_incremental" stepUpPercentage={10} />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
};


export default App;

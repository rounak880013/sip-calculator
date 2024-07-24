import React from 'react';
import { useNavigate } from 'react-router-dom';
import SipCalculator from './SipCalculator';

const SipCalculatorWrapper = ({ sipType, stepUpPercentage }) => {
  // Pass props to SipCalculator
  return <SipCalculator sipType={sipType} stepUpPercentage={stepUpPercentage} />;
};

export default SipCalculatorWrapper;

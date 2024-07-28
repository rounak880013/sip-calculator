// SipCalculatorWrapper.js

import React from 'react';
import SipCalculator from './SipCalculator';

export const SipCalculatorWrapper = ({ sipType, stepUpPercentage }) => {

  return (
    <div>
      <SipCalculator sipType={sipType} stepUpPercentage={stepUpPercentage} />
    </div>
  );
};

export default SipCalculatorWrapper;

// SipCalculatorWrapper.js

import React from 'react';
import { Helmet } from 'react-helmet'; // Import React Helmet
import SipCalculator from './SipCalculator'; // Import the SipCalculator component
import { data } from './data'; // Import the metadata

export const SipCalculatorWrapper = ({ sipType, stepUpPercentage }) => {
  const { title, description, keywords } = data[sipType] || data["sip"];

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={`https://stepupsipcalculator.co.in/${sipType === 'step-up' ? 'stepup-sip-calculator' : 'sip-calculator'}`} />
      </Helmet>
      <SipCalculator sipType={sipType} stepUpPercentage={stepUpPercentage} />
    </div>
  );
};

export default SipCalculatorWrapper;

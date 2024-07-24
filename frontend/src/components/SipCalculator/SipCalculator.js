import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, Select, MenuItem, FormControl, InputLabel, Box, FormControlLabel, Checkbox } from '@mui/material';
import SipResults from './SipResults';
import { Helmet } from 'react-helmet'; // Import React Helmet

const SipCalculator = ({ sipType: propSipType, stepUpPercentage: propStepUpPercentage }) => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(0);
  const [rateOfReturn, setRateOfReturn] = useState(0);
  const [investmentPeriod, setInvestmentPeriod] = useState(0);
  const [futureValue, setFutureValue] = useState(null);
  const [adjustForInflation, setAdjustForInflation] = useState(false);
  const [stepUpPercentage, setStepUpPercentage] = useState(propStepUpPercentage || 0);
  const [sipType, setSipType] = useState(propSipType); 
  const [yearlyValues, setYearlyValues] = useState([]);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    setStepUpPercentage(propStepUpPercentage || 0);
  }, [propStepUpPercentage]);

  const calculateSip = async () => {
    const n = investmentPeriod * 12; // Total number of monthly investments
    const r = rateOfReturn / 100 / 12; // Monthly rate of return
    const inflationRate = adjustForInflation ? 6 / 100 : 0; // Assume 6% inflation if checked
    console.log()
    let fv;
    let yearlyData = [];
    if (sipType === 'step-up') {
      let totalInvestment = 0;
      for (let i = 0; i < n; i++) {
        totalInvestment += monthlyInvestment * Math.pow(1 + stepUpPercentage / 100, Math.floor(i / 12));
        if ((i + 1) % 12 === 0) {
          yearlyData.push(totalInvestment * Math.pow(1 + r, i + 1));
        }
      }
      fv = totalInvestment * Math.pow(1 + r, n);
    } else {
      fv = monthlyInvestment * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
      for (let i = 1; i <= investmentPeriod; i++) {
        yearlyData.push(monthlyInvestment * ((Math.pow(1 + r, i * 12) - 1) / r) * (1 + r));
      }
    }

    if (adjustForInflation) {
      fv = fv / Math.pow(1 + inflationRate, investmentPeriod);
    }

    setFutureValue(fv.toFixed(2));
    setYearlyValues(yearlyData);

    const investmentAmount = monthlyInvestment * n;
    const profitAmount = fv - investmentAmount;

    setChartData({
      labels: ['Invested Amount', 'Profit Earned'],
      datasets: [
        {
          data: [investmentAmount, profitAmount],
          backgroundColor: ['#FFA500', '#008000'],
        },
      ],
    });

    // Prepare data to be sent to the API
    const data = {
      monthlyInvestment,
      rateOfReturn,
      investmentPeriod,
      futureValue: fv.toFixed(2),
      adjustForInflation,
      sipType: sipType,
      stepUpPercentage,
    };

    // Call the API
    try {
      const response = await fetch('http://www.stepupsipcalculator.co.in/api/admin/counter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('API response:', result);
        // Handle the API response here
      } else {
        console.error('API call failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error calling API:', error);
    }
  };

  return (
    <Container>
      <Helmet>
        <title>{propSipType === 'step-up' ? 'Step-Up SIP Calculator' : 'SIP Calculator'}</title>
        <meta name="description" content={`Calculate your ${propSipType === 'step-up' ? 'Step-Up' : 'SIP'} returns with our calculator.`} />
      </Helmet>
      <Typography variant="h1" gutterBottom>
        {propSipType === 'step-up' ? 'Step-Up SIP Calculator' : 'SIP Calculator'}
      </Typography>
      <TextField
        label="Monthly Investment"
        type="number"
        value={monthlyInvestment}
        onChange={(e) => setMonthlyInvestment(e.target.value)}
        fullWidth
        margin="normal"
        inputProps={{ min: 0 }}
      />
      <TextField
        label="Expected Annual Rate of Return (%)"
        type="number"
        value={rateOfReturn}
        onChange={(e) => setRateOfReturn(e.target.value)}
        fullWidth
        margin="normal"
        inputProps={{ min: 0 }}
      />
      <TextField
        label="Investment Period (Years)"
        type="number"
        value={investmentPeriod}
        onChange={(e) => setInvestmentPeriod(e.target.value)}
        fullWidth
        margin="normal"
        inputProps={{ min: 1 }}
      />
      <Box sx={{ marginTop: 2, marginBottom: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={adjustForInflation}
              onChange={(e) => setAdjustForInflation(e.target.checked)}
            />
          }
          label="Adjust for Inflation (Assuming average inflation at 6%)"
        />
      </Box>
      <Box sx={{ marginTop: 2, marginBottom: 2 }}>
        <FormControl fullWidth>
          <InputLabel>SIP Type</InputLabel>
          <Select
            value={sipType}
            onChange={(e) => setSipType(e.target.value)}
          >
            <MenuItem value="sip">Simple SIP</MenuItem>
            <MenuItem value="step-up">Step-Up SIP</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {sipType === 'step-up' && (
        <TextField
          label="Step-Up Percentage (%)"
          type="number"
          value={stepUpPercentage}
          onChange={(e) => setStepUpPercentage(e.target.value)}
          fullWidth
          margin="normal"
        />
      )}
      <Button variant="contained" color="primary" onClick={calculateSip} fullWidth>
        Calculate
      </Button>
      {futureValue && (
        <SipResults futureValue={futureValue} yearlyValues={yearlyValues} chartData={chartData} />
      )}
    </Container>
  );
};

export default SipCalculator;

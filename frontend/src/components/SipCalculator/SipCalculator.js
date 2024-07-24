import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Select, MenuItem, FormControl, InputLabel, Box, FormControlLabel, Checkbox } from '@mui/material';
import SipResults from './SipResults';

const SipCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(0);
  const [rateOfReturn, setRateOfReturn] = useState(0);
  const [investmentPeriod, setInvestmentPeriod] = useState(0);
  const [futureValue, setFutureValue] = useState(null);
  const [adjustForInflation, setAdjustForInflation] = useState(false);
  const [sipType, setSipType] = useState('step-up'); // Default to 'step-up'
  const [stepUpPercentage, setStepUpPercentage] = useState(0);
  const [yearlyValues, setYearlyValues] = useState([]);
  const [chartData, setChartData] = useState(null);

  const calculateSip = async () => {
    const n = investmentPeriod * 12; // Total number of monthly investments
    const r = rateOfReturn / 100 / 12; // Monthly rate of return
    const inflationRate = adjustForInflation ? 6 / 100 : 0; // Assume 6% inflation if checked

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
          backgroundColor: ['#FF6384', '#36A2EB'],
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
      sipType,
      stepUpPercentage,
    };

    // Call the API
    try {
      const response = await fetch('http://65.0.75.107/api/admin/counter', {
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
      <Typography variant="h4" gutterBottom>
        SIP Calculator
      </Typography>
      <TextField
        label="Monthly Investment"
        type="number"
        value={monthlyInvestment}
        onChange={(e) => setMonthlyInvestment(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Expected Annual Rate of Return (%)"
        type="number"
        value={rateOfReturn}
        onChange={(e) => setRateOfReturn(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Investment Period (Years)"
        type="number"
        value={investmentPeriod}
        onChange={(e) => setInvestmentPeriod(e.target.value)}
        fullWidth
        margin="normal"
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
            <MenuItem value="non-step-up">Non Step-Up SIP</MenuItem>
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

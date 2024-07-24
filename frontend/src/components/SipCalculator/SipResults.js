import React from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import ChartComponent from './ChartComponent';

const SipResults = ({ futureValue, yearlyValues, chartData }) => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Future Value: {futureValue}
      </Typography>

      <ChartComponent chartData={chartData} />

      {yearlyValues.length > 0 && (
  <TableContainer component={Paper} sx={{ marginTop: 2 }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell sx={{ border: '2px solid darkgrey', bgcolor: 'white', color: 'black', m: 2 }}>Year</TableCell>
          <TableCell align="right" sx={{ border: '2px solid darkgrey', bgcolor: 'white', color: 'black', m: 2 }}>Value</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {yearlyValues.map((row, index) => (
          <TableRow key={index}>
            <TableCell component="th" scope="row" sx={{ border: '2px solid darkgrey', bgcolor: 'white', color: 'black', m: 2 }}>
              {index + 1}
            </TableCell>
            <TableCell align="right" sx={{ border: '2px solid darkgrey', bgcolor: 'white', color: 'black', m: 2 }}>
              {row.toFixed(2)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
)}

    </div>
  );
};

export default SipResults;

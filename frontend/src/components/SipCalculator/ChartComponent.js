// src/ChartComponent.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartComponent = ({ chartData }) => {
  return (
    <div style={{ paddingLeft: '10px', height: '80vh', maxHeight: '80vh' }}>
      {chartData && (
        <Pie
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false, // Allows the chart to respect the container's height
            plugins: {
              legend: {
                display: true,
                position: 'top',
              },
            },
          }}
          style={{ height: '100%' }} // Ensures the chart takes full height of its container
        />
      )}
    </div>
  );
};

export default ChartComponent;

import React, { useRef, useEffect, useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField, Box, Typography, Button } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import './chart.css';

const ChartComponent = () => {
  const chartRef = useRef(null);
  const [manager, setManager] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [tillDate, setTillDate] = useState('');
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (!chartData) {
      setChartData({
        labels: ['Label 1', 'Label 2', 'Label 3'],
        datasets: [
          {
            data: [30, 20, 50],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          },
        ],
      });
    }

    if (chartRef.current && chartRef.current.chartInstance) {
      chartRef.current.chartInstance.destroy();
    }

    const ctx = chartRef.current?.getContext('2d');

    if (ctx) {
      const newChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            animateRotate: true,
            animateScale: true,
          },
          plugins: {
            legend: {
              labels: {
                font: {
                  size: 14,
                },
              },
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  let label = context.dataset.labels[context.dataIndex] || '';
                  if (label) {
                    label += ': ';
                  }
                  label += context.formattedValue;
                  return label;
                },
              },
            },
          },
          onHover: (event, chartElement) => {
            if (chartElement.length > 0) {
              event.native.target.style.cursor = 'pointer';
            } else {
              event.native.target.style.cursor = 'default';
            }
          },
        },
      });

      chartRef.current.chartInstance = newChartInstance;
    }

    return () => {
      if (chartRef.current && chartRef.current.chartInstance) {
        chartRef.current.chartInstance.destroy();
      }
    };
  }, [manager, fromDate, tillDate, chartData]);

  const handleChangeManager = (event) => {
    setManager(event.target.value);
  };

  const handleChangeFromDate = (event) => {
    setFromDate(event.target.value);
  };

  const handleChangeTillDate = (event) => {
    setTillDate(event.target.value);
  };

  const handleApplyFilters = () => {
    // Implement apply filters logic here
    console.log('Applying filters...');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',height:'100vh'  ,padding:'20px'}}>
      <fieldset className='field' style={{ width: '80%', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
        <Typography variant="h6" sx={{ mb: 1 }}>Processing Filter</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', marginTop:'20px', justifyContent: 'space-between', width: '100%' }}>
          <FormControl sx={{ width: '30%' }}>
            <InputLabel id="manager-label">Manager</InputLabel>
            <Select
              labelId="manager-label"
              id="manager-select"
              value={manager}
              onChange={handleChangeManager}
            >
              <MenuItem value="manager1">Manager 1</MenuItem>
              <MenuItem value="manager2">Manager 2</MenuItem>
              <MenuItem value="manager3">Manager 3</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="from-date"
            label="From Date"
            type="date"
            value={fromDate}
            onChange={handleChangeFromDate}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ width: '30%' }}
          />
          <TextField
            id="till-date"
            label="Till Date"
            type="date"
            value={tillDate}
            onChange={handleChangeTillDate}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ width: '30%' }}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <Button variant="contained" onClick={handleApplyFilters}>Apply</Button>
        </Box>
      </fieldset>
      <Box sx={{ mt: 3, width: '40%', display: 'flex', justifyContent: 'center' }}>
        {chartData && <Doughnut ref={chartRef} data={chartData} />} {/* Pass chartData to Doughnut component */}
      </Box>
      <div className='grid'>
        <table className="table tableData">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Box>
  );
};

export default ChartComponent;
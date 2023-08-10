import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title, 
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from 'moment'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  reDraw: true,
  plugins: {
    legend: {
      display: false,  
      position: 'top',
    },
    title: {
      display: false,
      text: 'Total Selling(Rs) on different dates.',
    },
  },
};

export function TotalSellingLineChart(props) {
    let data = {
        // labels: props.data.map((item) => moment(item.date).format('DD/MM/YYYY')),
        labels: [...new Set(props.data.map(item => moment(item.date).format('DD/MM/YYYY')))],
        datasets: [
          {
            label: 'Total Selling(Rs)',
            fill: true,
            data: props.data.map((item) => item.total_selling),
            borderColor: props.color,
            backgroundColor: props.backgroundColor,
            pointStyle: 'circle',
            pointRadius: 3,
            pointHoverRadius: 5,
          }
        ],
      };
  return <Line options={options} data={data} height={125} />;
}

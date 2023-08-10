import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Salesman selling and our commission',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export function SalesmanLeaderboardChart(props) {
    console.log('@@ data:', props.data)
    const data = {
        labels: props.data.map(item => item.salesman_name),
        datasets: [
          {
            label: 'Total Selling',
            data: props.data.map(item => item.all_total_selling),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Our Commission',
            data:  props.data.map(item => item.all_our_commission),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
    };

  return <Bar options={options} data={data} />;
}

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
      position: 'top',
    },
    title: {
      display: true,
      text: 'Total Selling(Rs) on different dates.',
    },
  },
};

export function SellingLineChart(props) {
    let data = {
        labels: props.data.map((item) => moment(item.date).format('DD/MM/YYYY')),
        datasets: [
          {
            label: 'Total Selling(Rs)',
            data: props.data.map((item) => item.total_selling),
            borderColor: 'rgb(7 213 87)',
            backgroundColor: 'rgb(7, 213, 87, 0.5)',
            pointStyle: 'circle',
            pointRadius: 8,
            pointHoverRadius: 15,
          },
          {
            label: 'Our Commission(Rs)',
            data: props.data.map((item) => item.our_commision),
            borderColor: 'rgb(241, 31, 100)',
            backgroundColor: 'rgb(241, 31, 100, 0.5)',
            pointStyle: 'circle',
            pointRadius: 8,
            pointHoverRadius: 15,
          },
          {
            label: 'Salesman Commission(Rs)',
            data: props.data.map((item) => { return (item.total_selling - item.our_commision)}),
            borderColor: 'rgb(124, 55, 245)',
            backgroundColor: 'rgb(124, 55, 245, 0.5)',
            pointStyle: 'circle',
            pointRadius: 8,
            pointHoverRadius: 15,
          },
        ],
      };
  return <Line options={options} data={data} />;
}

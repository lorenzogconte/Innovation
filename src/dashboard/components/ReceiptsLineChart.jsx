import { useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  registerables,
} from 'chart.js';
import { dashboardData } from '../../data/mockData';

ChartJS.register(...registerables);

/**
 * ReceiptsLineChart — Line chart showing daily digital receipts (30 days).
 * Features a smooth curve with a teal-to-transparent gradient fill beneath.
 */
export default function ReceiptsLineChart() {
  const chartRef = useRef(null);
  const { labels, values } = dashboardData.dailyReceipts;

  const data = {
    labels,
    datasets: [
      {
        label: 'Digital Receipts',
        data: values,
        fill: true,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return 'rgba(46, 196, 182, 0.1)';
          }
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, 'rgba(46, 196, 182, 0.35)');
          gradient.addColorStop(0.6, 'rgba(46, 196, 182, 0.08)');
          gradient.addColorStop(1, 'rgba(46, 196, 182, 0)');
          return gradient;
        },
        borderColor: '#2EC4B6',
        borderWidth: 2.5,
        pointBackgroundColor: '#2EC4B6',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBorderWidth: 2,
        tension: 0.4, // Smooth curve
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index',
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#0D1B2A',
        titleFont: { family: 'Inter', size: 13, weight: '600' },
        bodyFont: { family: 'Inter', size: 12 },
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          title: (items) => `Date: ${items[0].label}`,
          label: (context) => `Receipts: ${context.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          font: { family: 'Inter', size: 10 },
          color: '#9CA3AF',
          maxRotation: 45,
          // Show every 3rd label to avoid crowding
          callback: (value, index) => (index % 3 === 0 ? labels[index] : ''),
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.04)',
          drawBorder: false,
        },
        ticks: {
          font: { family: 'Inter', size: 11 },
          color: '#9CA3AF',
        },
        beginAtZero: false,
      },
    },
  };

  return (
    <div className="chart-panel">
      <h3 className="chart-panel__title">Daily Digital Receipts Saved (Last 30 Days)</h3>
      <div className="chart-panel__body chart-panel__body--line">
        <Line ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
}

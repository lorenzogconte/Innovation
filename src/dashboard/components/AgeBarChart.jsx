import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  registerables,
} from 'chart.js';
import { dashboardData } from '../../data/mockData';

// Register all Chart.js components once
ChartJS.register(...registerables);

/**
 * AgeBarChart — Bar chart visualizing user age group distribution.
 * Reads from dashboardData.ageGroups and renders teal-styled bars.
 */
export default function AgeBarChart() {
  const { labels, values } = dashboardData.ageGroups;

  const data = {
    labels,
    datasets: [
      {
        label: 'Users',
        data: values,
        backgroundColor: [
          'rgba(46, 196, 182, 0.85)',  // --primary
          'rgba(11, 122, 117, 0.85)',  // --primary-dark
          'rgba(92, 224, 210, 0.85)',  // --primary-light
          'rgba(46, 196, 182, 0.65)',
          'rgba(11, 122, 117, 0.65)',
        ],
        borderColor: [
          '#2EC4B6',
          '#0B7A75',
          '#5CE0D2',
          '#2EC4B6',
          '#0B7A75',
        ],
        borderWidth: 2,
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
        callbacks: {
          label: (context) => `${context.parsed.y.toLocaleString()} users`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          font: { family: 'Inter', size: 12, weight: '500' },
          color: '#6B7280',
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false,
        },
        ticks: {
          font: { family: 'Inter', size: 11 },
          color: '#9CA3AF',
          callback: (value) => value.toLocaleString(),
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart-panel">
      <h3 className="chart-panel__title">User Age Distribution</h3>
      <div className="chart-panel__body">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

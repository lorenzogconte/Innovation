import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  registerables,
} from 'chart.js';
import { dashboardData } from '../../data/mockData';

ChartJS.register(...registerables);

/**
 * GenderPieChart — Doughnut chart showing gender demographics breakdown.
 * Displays a custom legend with percentage values alongside the chart.
 */
export default function GenderPieChart() {
  const { labels, values } = dashboardData.genderSplit;
  const total = values.reduce((sum, v) => sum + v, 0);

  const COLORS = [
    '#2EC4B6',   // --primary (teal)
    '#0B7A75',   // --primary-dark
    '#5CE0D2',   // --primary-light
    '#6B7280',   // --text-secondary
  ];

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: COLORS,
        borderColor: '#FFFFFF',
        borderWidth: 3,
        hoverBorderWidth: 0,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '62%',
    plugins: {
      legend: {
        display: false, // We render a custom legend below
      },
      tooltip: {
        backgroundColor: '#0D1B2A',
        titleFont: { family: 'Inter', size: 13, weight: '600' },
        bodyFont: { family: 'Inter', size: 12 },
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (context) => {
            const pct = ((context.parsed / total) * 100).toFixed(1);
            return ` ${context.label}: ${pct}%`;
          },
        },
      },
    },
  };

  return (
    <div className="chart-panel">
      <h3 className="chart-panel__title">Gender Demographics</h3>
      <div className="chart-panel__body chart-panel__body--doughnut">
        <Doughnut data={data} options={options} />
      </div>
      {/* Custom legend with percentages */}
      <div className="chart-legend">
        {labels.map((label, i) => {
          const pct = ((values[i] / total) * 100).toFixed(1);
          return (
            <div className="chart-legend__item" key={label}>
              <span
                className="chart-legend__swatch"
                style={{ backgroundColor: COLORS[i] }}
              />
              <span className="chart-legend__label">{label}</span>
              <span className="chart-legend__value">{pct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

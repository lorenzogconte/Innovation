import { useState, useMemo } from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { spendingData, receipts, merchantCategories, storeToCategoryMap } from '../../data/mockData';
import ReceiptDetail from '../components/ReceiptDetail';
import './AnalyticsScreen.css';

// Register all Chart.js components once
ChartJS.register(...registerables);

/** Category colors for the doughnut chart */
const CATEGORY_COLORS = ['#2EC4B6', '#0B7A75', '#5CE0D2', '#F59E0B', '#EF4444'];
const CATEGORY_COLORS_LIGHT = [
  'rgba(46,196,182,0.2)',
  'rgba(11,122,117,0.2)',
  'rgba(92,224,210,0.2)',
  'rgba(245,158,11,0.2)',
  'rgba(239,68,68,0.2)',
];

/**
 * AnalyticsScreen — Spending analytics charts + digital receipts list.
 * Upper section: doughnut + bar charts with time filter.
 * Lower section: receipt list with inline expand detail.
 */
function AnalyticsScreen() {
  const [timeFilter, setTimeFilter] = useState('week');
  const [expandedReceipt, setExpandedReceipt] = useState(null);

  const timeFilters = [
    { key: 'week', label: 'This Week' },
    { key: 'month', label: 'This Month' },
    { key: '3months', label: 'Last 3 Months' },
  ];

  // Doughnut chart data — spending by category
  const doughnutData = useMemo(() => ({
    labels: Object.keys(spendingData.byCategory),
    datasets: [{
      data: Object.values(spendingData.byCategory),
      backgroundColor: CATEGORY_COLORS,
      borderWidth: 0,
      hoverOffset: 6,
    }],
  }), []);

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 12,
          usePointStyle: true,
          pointStyleWidth: 8,
          font: { size: 11, family: 'Inter', weight: '500' },
          color: '#6B7280',
        },
      },
    },
  };

  // Bar chart data — choose weekly or monthly based on time filter
  const barChartSource = timeFilter === 'month'
    ? spendingData.monthlySpending
    : spendingData.weeklySpending;

  const barData = useMemo(() => ({
    labels: barChartSource.map((d) => d.label),
    datasets: [{
      label: 'Spending (€)',
      data: barChartSource.map((d) => d.amount),
      backgroundColor: 'rgba(46, 196, 182, 0.6)',
      borderColor: '#2EC4B6',
      borderWidth: 1,
      borderRadius: 6,
      borderSkipped: false,
    }],
  }), [barChartSource]);

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 10, family: 'Inter' }, color: '#9CA3AF' },
      },
      y: {
        grid: { color: 'rgba(0,0,0,0.04)' },
        ticks: {
          font: { size: 10, family: 'Inter' },
          color: '#9CA3AF',
          callback: (v) => `€${v}`,
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="analytics-screen">
      {/* ======= Upper: Spending Analytics ======= */}
      <section className="analytics-screen__spending animate-slide-up">
        <h2 className="analytics-screen__title">Spending Analytics</h2>

        {/* Time filter chips */}
        <div className="analytics-screen__filters">
          {timeFilters.map((f) => (
            <button
              key={f.key}
              className={`chip ${timeFilter === f.key ? 'chip--active' : ''}`}
              onClick={() => setTimeFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Doughnut chart */}
        <div className="analytics-screen__chart-card animate-scale-in delay-1">
          <h3 className="chart-title">By Category</h3>
          <div className="chart-container chart-container--doughnut">
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </div>

        {/* Bar chart */}
        <div className="analytics-screen__chart-card animate-scale-in delay-2">
          <h3 className="chart-title">Spending Over Time</h3>
          <div className="chart-container chart-container--bar">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </section>

      {/* ======= Lower: Digital Receipts ======= */}
      <section className="analytics-screen__receipts animate-slide-up delay-3">
        <div className="analytics-screen__receipts-header">
          <h2 className="analytics-screen__title">Digital Receipts</h2>
          <span className="badge badge-primary">{receipts.length}</span>
        </div>

        <div className="receipts-list">
          {receipts.map((receipt) => {
            const category = storeToCategoryMap[receipt.store];
            const emoji = merchantCategories[category]?.icon || '🧾';
            const isExpanded = expandedReceipt === receipt.id;

            return (
              <div key={receipt.id} className="receipt-entry">
                <div
                  className="receipt-entry__row"
                  onClick={() => setExpandedReceipt(isExpanded ? null : receipt.id)}
                >
                  <span className="receipt-entry__emoji">{emoji}</span>
                  <div className="receipt-entry__info">
                    <p className="receipt-entry__store">{receipt.store}</p>
                    <p className="receipt-entry__date">{receipt.date}</p>
                  </div>
                  <span className="receipt-entry__total">€{receipt.total.toFixed(2)}</span>
                  <span className={`receipt-entry__chevron ${isExpanded ? 'receipt-entry__chevron--open' : ''}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </div>

                {/* Inline expanded receipt detail */}
                {isExpanded && (
                  <ReceiptDetail
                    receipt={receipt}
                    onClose={() => setExpandedReceipt(null)}
                  />
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default AnalyticsScreen;

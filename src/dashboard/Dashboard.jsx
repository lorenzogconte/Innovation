import { useState } from 'react';
import AgeBarChart from './components/AgeBarChart';
import GenderPieChart from './components/GenderPieChart';
import ReceiptsLineChart from './components/ReceiptsLineChart';
import { dashboardData } from '../data/mockData';
import './dashboard.css';

/* ----------------------------------------------------------------
   NAV ITEMS — single source of truth for sidebar navigation.
   ---------------------------------------------------------------- */
const NAV_ITEMS = [
  { id: 'overview',            label: 'Overview',            icon: '📊' },
  { id: 'consumer-analytics',  label: 'Consumer Analytics',  icon: '👥' },
  { id: 'receipt-analytics',   label: 'Receipt Analytics',   icon: '🧾' },
];

/* ----------------------------------------------------------------
   HEADER TITLES — maps nav id → top header title string.
   ---------------------------------------------------------------- */
const HEADER_TITLES = {
  'overview':           'Dashboard Overview',
  'consumer-analytics': 'Consumer Analytics',
  'receipt-analytics':  'Receipt Analytics',
};

/* ----------------------------------------------------------------
   STAT CARDS — summary KPI data shown on the Overview page.
   ---------------------------------------------------------------- */
const STAT_CARDS = [
  { icon: '👤', value: '15,600',  label: 'Total Users',             variant: '' },
  { icon: '🧾', value: '12,847',  label: 'Digital Receipts Saved',  variant: 'green' },
  { icon: '📏', value: '1.2 km',  label: 'Paper Saved',             variant: 'orange' },
  { icon: '🏪', value: '19',      label: 'Active Merchants',        variant: 'navy' },
];

/**
 * Dashboard — Full-width merchant-facing business dashboard.
 *
 * Layout: fixed sidebar (260px, navy) + scrollable main area.
 * Three views controlled by `activeNav`:
 *   - overview: stat cards + 2-column chart grid + full-width line chart
 *   - consumer-analytics: age bar + gender doughnut side by side
 *   - receipt-analytics: summary stats + full-width line chart
 */
export default function Dashboard() {
  const [activeNav, setActiveNav] = useState('overview');

  const handleBackToMobile = () => {
    window.location.hash = '';
  };

  return (
    <div className="dashboard">
      {/* ---------- SIDEBAR ---------- */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo__brand">PAYPERLESS</div>
          <div className="sidebar-logo__subtitle">Merchant Portal</div>
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={
                `sidebar-nav__item${activeNav === item.id ? ' sidebar-nav__item--active' : ''}`
              }
              onClick={() => setActiveNav(item.id)}
              type="button"
            >
              <span className="sidebar-nav__icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button
            className="sidebar-footer__link"
            onClick={handleBackToMobile}
            type="button"
          >
            ← Back to Mobile App
          </button>
        </div>
      </aside>

      {/* ---------- MAIN CONTENT ---------- */}
      <div className="dashboard-main">
        {/* Top header bar */}
        <header className="dashboard-header">
          <h1 className="dashboard-header__title">
            {HEADER_TITLES[activeNav]}
          </h1>

          <div className="dashboard-header__actions">
            <span className="header-bell" role="img" aria-label="Notifications">
              🔔
            </span>
            <div className="header-user">
              <div className="header-user__avatar">AU</div>
              <span className="header-user__name">Admin User</span>
            </div>
          </div>
        </header>

        {/* Routed content */}
        <main className="dashboard-content">
          {activeNav === 'overview'           && <OverviewView />}
          {activeNav === 'consumer-analytics' && <ConsumerAnalyticsView />}
          {activeNav === 'receipt-analytics'  && <ReceiptAnalyticsView />}
        </main>
      </div>
    </div>
  );
}

/* ==================================================================
   SUB-VIEWS — one per navigation tab
   ================================================================== */

/** Overview — stat cards + 2-col charts + full-width line chart. */
function OverviewView() {
  return (
    <>
      {/* KPI stat cards */}
      <div className="stat-cards">
        {STAT_CARDS.map((card) => (
          <div
            className={`stat-card${card.variant ? ` stat-card--${card.variant}` : ''}`}
            key={card.label}
          >
            <div className="stat-card__icon">{card.icon}</div>
            <div className="stat-card__info">
              <span className="stat-card__value">{card.value}</span>
              <span className="stat-card__label">{card.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts: 2 columns top, 1 full-width bottom */}
      <div className="chart-grid--overview">
        <AgeBarChart />
        <GenderPieChart />
        <div className="chart-grid__full">
          <ReceiptsLineChart />
        </div>
      </div>
    </>
  );
}

/** Consumer Analytics — age & gender charts side by side, larger. */
function ConsumerAnalyticsView() {
  return (
    <div className="chart-grid--side-by-side">
      <AgeBarChart />
      <GenderPieChart />
    </div>
  );
}

/** Receipt Analytics — summary stats above a full-width line chart. */
function ReceiptAnalyticsView() {
  const { values } = dashboardData.dailyReceipts;
  const totalReceipts = values.reduce((sum, v) => sum + v, 0);
  const avgDaily = Math.round(totalReceipts / values.length);
  const peakDay = Math.max(...values);

  return (
    <div className="chart-grid--full-width">
      {/* Summary stat cards */}
      <div className="receipt-summary">
        <div className="receipt-summary__card">
          <div className="receipt-summary__value">{totalReceipts.toLocaleString()}</div>
          <div className="receipt-summary__label">Total Receipts (30 days)</div>
        </div>
        <div className="receipt-summary__card">
          <div className="receipt-summary__value">{avgDaily.toLocaleString()}</div>
          <div className="receipt-summary__label">Average Daily</div>
        </div>
        <div className="receipt-summary__card">
          <div className="receipt-summary__value">{peakDay.toLocaleString()}</div>
          <div className="receipt-summary__label">Peak Day</div>
        </div>
      </div>

      <ReceiptsLineChart />
    </div>
  );
}

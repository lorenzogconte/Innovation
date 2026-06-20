import './BottomNav.css';

/* Inline SVG icons for each tab — lightweight, no external deps */
const TAB_ICONS = {
  home: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  cards: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  ),
  loyalty: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  discounts: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="5" x2="5" y2="19" />
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
    </svg>
  ),
  analytics: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
};

const TAB_LABELS = {
  home: 'Home',
  cards: 'Cards',
  loyalty: 'Loyalty',
  discounts: 'Discounts',
  analytics: 'Analytics',
};

const TAB_ORDER = ['home', 'cards', 'loyalty', 'discounts', 'analytics'];

/**
 * BottomNav — 5-tab navigation bar pinned to the bottom.
 * Active tab shows teal color and label; inactive tabs are gray without label.
 */
function BottomNav({ activeTab, onTabChange }) {
  return (
    <nav className="bottom-nav">
      {TAB_ORDER.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            className={`bottom-nav__tab ${isActive ? 'bottom-nav__tab--active' : ''}`}
            onClick={() => onTabChange(tab)}
            aria-label={TAB_LABELS[tab]}
            aria-current={isActive ? 'page' : undefined}
          >
            <span className="bottom-nav__icon">{TAB_ICONS[tab]}</span>
            <span className={`bottom-nav__label ${isActive ? 'bottom-nav__label--visible' : ''}`}>
              {TAB_LABELS[tab]}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

export default BottomNav;

import { useState, useEffect, useCallback } from 'react';
import { promotions, receipts, merchantCategories, storeToCategoryMap } from '../../data/mockData';
import './HomeScreen.css';

/**
 * HomeScreen — the landing dashboard view.
 * Features: auto-scrolling promo carousel, quick actions, recent activity list.
 */
function HomeScreen() {
  const [activePromo, setActivePromo] = useState(0);
  const [showScanOverlay, setShowScanOverlay] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);

  // Auto-scroll carousel every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePromo((prev) => (prev + 1) % promotions.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Mock camera scan: show overlay briefly, then success animation
  const handleScanReceipt = useCallback(() => {
    setShowScanOverlay(true);
    setScanSuccess(false);

    setTimeout(() => {
      setScanSuccess(true);
      setTimeout(() => {
        setShowScanOverlay(false);
        setScanSuccess(false);
      }, 1200);
    }, 1500);
  }, []);

  // Latest 4 receipts for quick preview
  const recentReceipts = receipts.slice(0, 4);

  return (
    <div className="home-screen">
      {/* --- Promotional Banner Carousel --- */}
      <section className="home-screen__carousel animate-slide-up">
        <div className="carousel__track" style={{ transform: `translateX(-${activePromo * 100}%)` }}>
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="carousel__slide"
              style={{ background: promo.gradient }}
            >
              <div className="carousel__slide-content">
                <h3 className="carousel__title">{promo.title}</h3>
                <p className="carousel__subtitle">{promo.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="carousel__dots">
          {promotions.map((_, i) => (
            <button
              key={i}
              className={`carousel__dot ${i === activePromo ? 'carousel__dot--active' : ''}`}
              onClick={() => setActivePromo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* --- Quick Actions --- */}
      <section className="home-screen__actions animate-slide-up delay-1">
        <div className="action-card" onClick={() => {}}>
          <div className="action-card__icon action-card__icon--pay">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
          </div>
          <span className="action-card__label">Pay</span>
        </div>

        <div className="action-card" onClick={handleScanReceipt}>
          <div className="action-card__icon action-card__icon--scan">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
          </div>
          <span className="action-card__label">Scan Receipt</span>
        </div>

        <div className="action-card" onClick={() => {}}>
          <div className="action-card__icon action-card__icon--discounts">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="5" x2="5" y2="19" />
              <circle cx="6.5" cy="6.5" r="2.5" />
              <circle cx="17.5" cy="17.5" r="2.5" />
            </svg>
          </div>
          <span className="action-card__label">View Discounts</span>
        </div>
      </section>

      {/* --- Recent Activity --- */}
      <section className="home-screen__recent animate-slide-up delay-2">
        <h3 className="section-title">Recent Activity</h3>
        <div className="recent-list">
          {recentReceipts.map((receipt, idx) => {
            const category = storeToCategoryMap[receipt.store];
            const emoji = merchantCategories[category]?.icon || '🧾';
            return (
              <div
                key={receipt.id}
                className={`recent-item animate-slide-up delay-${idx + 2}`}
              >
                <div className="recent-item__icon">{emoji}</div>
                <div className="recent-item__info">
                  <p className="recent-item__store">{receipt.store}</p>
                  <p className="recent-item__date">{receipt.date}</p>
                </div>
                <span className="recent-item__amount">€{receipt.total.toFixed(2)}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* --- Scan Receipt Overlay (fallback camera mock) --- */}
      {showScanOverlay && (
        <div className="scan-overlay animate-fade-in">
          <div className="scan-overlay__content">
            {!scanSuccess ? (
              <>
                <div className="scan-overlay__viewfinder">
                  <div className="scan-overlay__corner scan-overlay__corner--tl" />
                  <div className="scan-overlay__corner scan-overlay__corner--tr" />
                  <div className="scan-overlay__corner scan-overlay__corner--bl" />
                  <div className="scan-overlay__corner scan-overlay__corner--br" />
                  <div className="scan-overlay__line" />
                </div>
                <p className="scan-overlay__text">Scanning receipt…</p>
              </>
            ) : (
              <div className="scan-overlay__success animate-bounce-in">
                <div className="scan-overlay__check">✓</div>
                <p className="scan-overlay__text">Receipt captured!</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default HomeScreen;

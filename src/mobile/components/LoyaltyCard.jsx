import { useRef, useEffect } from 'react';
import { storeBrandColors, merchantCategories } from '../../data/mockData';
import './LoyaltyCard.css';

/**
 * LoyaltyCard — individual loyalty card tile.
 * Shows store emoji, name, and last 4 of card number.
 * When expanded, renders a barcode using JsBarcode.
 */
function LoyaltyCard({ store, cardNumber, category, isExpanded, onClick, animDelay = 0 }) {
  const barcodeRef = useRef(null);
  const brandColors = storeBrandColors[store] || { bg: '#333', text: '#fff' };
  const emoji = merchantCategories[category]?.icon || '🏷️';

  // Extract last 4 digits from card number
  const last4 = cardNumber.replace(/\s/g, '').slice(-4);

  // Render barcode when card is expanded
  useEffect(() => {
    if (!isExpanded || !barcodeRef.current) return;

    // Dynamic import to avoid SSR issues and reduce initial bundle
    import('jsbarcode').then((JsBarcode) => {
      const barcodeFn = JsBarcode.default || JsBarcode;
      try {
        barcodeFn(barcodeRef.current, cardNumber.replace(/\s/g, ''), {
          format: 'CODE128',
          width: 1.5,
          height: 50,
          displayValue: true,
          fontSize: 12,
          margin: 8,
          background: 'transparent',
        });
      } catch {
        // Silently handle barcode generation errors — non-critical UI feature
      }
    });
  }, [isExpanded, cardNumber]);

  // Determine animation delay class (capped at delay-6)
  const delayClass = animDelay < 6 ? `delay-${animDelay + 1}` : '';

  return (
    <div
      className={`loyalty-card ${isExpanded ? 'loyalty-card--expanded' : ''} animate-slide-up ${delayClass}`}
      style={{ backgroundColor: brandColors.bg, color: brandColors.text }}
      onClick={onClick}
    >
      {/* Compact view */}
      <div className="loyalty-card__compact">
        <span className="loyalty-card__emoji">{emoji}</span>
        <p className="loyalty-card__store">{store}</p>
        <p className="loyalty-card__number">•••• {last4}</p>
      </div>

      {/* Expanded view with barcode */}
      {isExpanded && (
        <div className="loyalty-card__expanded animate-fade-in">
          <div className="loyalty-card__barcode-wrapper">
            <svg ref={barcodeRef} className="loyalty-card__barcode" />
          </div>
          <p className="loyalty-card__full-number">{cardNumber}</p>
        </div>
      )}
    </div>
  );
}

export default LoyaltyCard;

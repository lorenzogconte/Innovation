import { useState } from 'react';
import { paymentCards, receipts } from '../../data/mockData';
import './CardsScreen.css';

/**
 * CardsScreen — stacked payment cards with tap-to-select interaction.
 * Shows balance and recent mini-transactions for the selected card.
 */
function CardsScreen() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedCard = paymentCards[selectedIndex];

  // Grab latest 3 receipts as "card transactions"
  const recentTransactions = receipts.slice(0, 3);

  return (
    <div className="cards-screen">
      <h2 className="cards-screen__title animate-slide-up">My Cards</h2>

      {/* --- Card Stack --- */}
      <div className="cards-screen__stack animate-scale-in">
        {paymentCards.map((card, idx) => {
          const isSelected = idx === selectedIndex;
          const offset = idx - selectedIndex;

          return (
            <div
              key={card.id}
              className={`payment-card ${isSelected ? 'payment-card--selected' : ''}`}
              style={{
                background: card.gradient,
                transform: isSelected
                  ? 'translateY(0) scale(1) rotate(0deg)'
                  : `translateY(${offset * 16}px) scale(${1 - Math.abs(offset) * 0.05}) rotate(${offset * 2}deg)`,
                zIndex: isSelected ? 10 : 5 - Math.abs(offset),
                opacity: isSelected ? 1 : 0.7,
              }}
              onClick={() => setSelectedIndex(idx)}
            >
              {/* Card type logo */}
              <div className="payment-card__header">
                <span className="payment-card__type">{card.label.toUpperCase()}</span>
                {isSelected && <span className="payment-card__badge">Default Card</span>}
              </div>

              {/* Chip */}
              <div className="payment-card__chip">
                <div className="payment-card__chip-line" />
                <div className="payment-card__chip-line" />
                <div className="payment-card__chip-line" />
              </div>

              {/* Card number */}
              <p className="payment-card__number">
                •••• &nbsp; •••• &nbsp; •••• &nbsp; {card.last4}
              </p>

              {/* Footer: holder + expiry */}
              <div className="payment-card__footer">
                <div>
                  <span className="payment-card__label-sm">Card Holder</span>
                  <p className="payment-card__holder">{card.holder}</p>
                </div>
                <div>
                  <span className="payment-card__label-sm">Expires</span>
                  <p className="payment-card__expiry">{card.expiry}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- Card Details --- */}
      <div className="cards-screen__details animate-slide-up delay-2">
        <div className="card-balance">
          <span className="card-balance__label">Available Balance</span>
          <span className="card-balance__value">{selectedCard.balance}</span>
        </div>

        <h3 className="cards-screen__section-title">Recent Transactions</h3>
        <div className="mini-transactions">
          {recentTransactions.map((receipt) => (
            <div key={receipt.id} className="mini-tx">
              <div className="mini-tx__info">
                <p className="mini-tx__store">{receipt.store}</p>
                <p className="mini-tx__date">{receipt.date}</p>
              </div>
              <span className="mini-tx__amount">-€{receipt.total.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CardsScreen;

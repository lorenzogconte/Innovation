import { useState } from 'react';
import { initialLoyaltyCards, merchantCategories, storeToCategoryMap } from '../../data/mockData';
import LoyaltyCard from '../components/LoyaltyCard';
import AddLoyaltyModal from '../components/AddLoyaltyModal';
import './LoyaltyScreen.css';

/**
 * LoyaltyScreen — 2-column grid of loyalty cards with expand/collapse
 * and an inline button/FAB to add new cards via modal.
 */
function LoyaltyScreen() {
  const [loyaltyCards, setLoyaltyCards] = useState(() => {
    const saved = localStorage.getItem('payperless_loyalty_cards');
    return saved ? JSON.parse(saved) : initialLoyaltyCards;
  });
  const [expandedCard, setExpandedCard] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleCardClick = (cardId) => {
    // Toggle: collapse if same card tapped again
    setExpandedCard((prev) => (prev === cardId ? null : cardId));
  };

  const handleAddCard = (newCard) => {
    setLoyaltyCards((prev) => {
      const next = [newCard, ...prev];
      localStorage.setItem('payperless_loyalty_cards', JSON.stringify(next));
      return next;
    });
    setShowAddModal(false);
  };

  return (
    <div className="loyalty-screen">
      <div className="loyalty-screen__header animate-slide-up">
        <h2 className="loyalty-screen__title">My Loyalty Cards</h2>
        <button
          className="loyalty-screen__add-btn"
          onClick={() => setShowAddModal(true)}
          aria-label="Add Loyalty Card"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add Card
        </button>
      </div>

      {/* 2-column grid */}
      <div className="loyalty-screen__grid">
        {loyaltyCards.map((card, idx) => {
          const category = card.category || storeToCategoryMap[card.store];
          const emoji = merchantCategories[category]?.icon || '🏷️';

          return (
            <LoyaltyCard
              key={card.id}
              store={card.store}
              cardNumber={card.cardNumber}
              category={category}
              isExpanded={expandedCard === card.id}
              onClick={() => handleCardClick(card.id)}
              animDelay={idx}
            />
          );
        })}
      </div>

      {/* Add Card Modal Sheet */}
      {showAddModal && (
        <AddLoyaltyModal
          onAddCard={handleAddCard}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
}

export default LoyaltyScreen;

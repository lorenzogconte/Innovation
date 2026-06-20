import { useState } from 'react';
import { initialLoyaltyCards, merchantCategories, storeToCategoryMap } from '../../data/mockData';
import LoyaltyCard from '../components/LoyaltyCard';
import AddLoyaltyModal from '../components/AddLoyaltyModal';
import './LoyaltyScreen.css';

/**
 * LoyaltyScreen — 2-column grid of loyalty cards with expand/collapse
 * and a FAB to add new cards via modal.
 */
function LoyaltyScreen() {
  const [loyaltyCards, setLoyaltyCards] = useState(initialLoyaltyCards);
  const [showAddModal, setShowAddModal] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);

  const handleCardClick = (cardId) => {
    // Toggle: collapse if same card tapped again
    setExpandedCard((prev) => (prev === cardId ? null : cardId));
  };

  const handleAddCard = (newCard) => {
    setLoyaltyCards((prev) => [...prev, newCard]);
    setShowAddModal(false);
  };

  return (
    <div className="loyalty-screen">
      <h2 className="loyalty-screen__title animate-slide-up">My Loyalty Cards</h2>

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

      {/* Floating action button to add new loyalty card */}
      <button
        className="loyalty-screen__fab"
        onClick={() => setShowAddModal(true)}
        aria-label="Add loyalty card"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

      {/* Add loyalty card modal */}
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

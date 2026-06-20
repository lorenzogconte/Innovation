import { useState, useMemo } from 'react';
import { discounts, merchantCategories } from '../../data/mockData';
import DiscountCard from '../components/DiscountCard';
import './DiscountsScreen.css';

/**
 * DiscountsScreen — filterable list of discounts and offers.
 * Horizontal chip row filters by category or individual store.
 */
function DiscountsScreen() {
  const [activeFilter, setActiveFilter] = useState('All');

  // Build filter chip list: 'All' + category labels + individual store names
  const filterChips = useMemo(() => {
    const chips = ['All'];
    const categoryLabels = Object.values(merchantCategories).map((c) => c.label);
    const storeNames = [...new Set(discounts.map((d) => d.store))];
    return [...chips, ...categoryLabels, ...storeNames];
  }, []);

  // Apply filter
  const filteredDiscounts = useMemo(() => {
    if (activeFilter === 'All') return discounts;

    // Check if filter matches a category label
    const categoryMatch = Object.values(merchantCategories).find(
      (c) => c.label === activeFilter
    );
    if (categoryMatch) {
      return discounts.filter((d) =>
        categoryMatch.stores.includes(d.store)
      );
    }

    // Otherwise filter by store name
    return discounts.filter((d) => d.store === activeFilter);
  }, [activeFilter]);

  return (
    <div className="discounts-screen">
      <h2 className="discounts-screen__title animate-slide-up">Discounts &amp; Offers</h2>

      {/* Horizontal filter chips */}
      <div className="discounts-screen__chips animate-slide-up delay-1">
        {filterChips.map((chip) => (
          <button
            key={chip}
            className={`chip ${activeFilter === chip ? 'chip--active' : ''}`}
            onClick={() => setActiveFilter(chip)}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Discount list */}
      <div className="discounts-screen__list">
        {filteredDiscounts.map((discount, idx) => (
          <DiscountCard
            key={discount.id}
            discount={discount}
            animDelay={idx}
          />
        ))}
        {filteredDiscounts.length === 0 && (
          <p className="discounts-screen__empty">No discounts found for this filter.</p>
        )}
      </div>
    </div>
  );
}

export default DiscountsScreen;

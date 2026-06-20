import { merchantCategories, storeBrandColors, storeToCategoryMap } from '../../data/mockData';
import './DiscountCard.css';

/**
 * DiscountCard — individual discount/offer card.
 * Shows store info, discount badge, description, validity, and a "Use Now" button.
 */

/** Maps discount type to a human-readable badge label */
function getBadgeLabel(discount) {
  switch (discount.type) {
    case 'percentage':
      return `${discount.value}% OFF`;
    case 'bogo':
      return 'BOGO';
    case 'fixed':
      return `€${discount.value} OFF`;
    case 'coupon':
      return 'COUPON';
    default:
      return 'DEAL';
  }
}

function DiscountCard({ discount, animDelay = 0 }) {
  const category = discount.category || storeToCategoryMap[discount.store];
  const emoji = merchantCategories[category]?.icon || '🏷️';
  const brandColor = storeBrandColors[discount.store]?.bg || '#333';
  const badgeLabel = getBadgeLabel(discount);

  // Cap delay class at 6
  const delayClass = animDelay < 6 ? `delay-${animDelay + 1}` : '';

  return (
    <div
      className={`discount-card animate-slide-up ${delayClass}`}
      style={{ borderLeftColor: brandColor }}
    >
      <div className="discount-card__header">
        <div className="discount-card__store-info">
          <span className="discount-card__emoji">{emoji}</span>
          <span className="discount-card__store">{discount.store}</span>
        </div>
        <span className="discount-card__badge">{badgeLabel}</span>
      </div>

      <p className="discount-card__description">{discount.description}</p>

      <div className="discount-card__footer">
        <span className="discount-card__valid">
          Valid until {discount.validUntil}
        </span>
        <button className="discount-card__use-btn">Use Now</button>
      </div>
    </div>
  );
}

export default DiscountCard;

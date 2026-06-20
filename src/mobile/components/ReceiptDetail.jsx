import { calculatePaperSaved } from '../../data/mockData';
import './ReceiptDetail.css';

/**
 * ReceiptDetail — expanded receipt view showing line items, totals,
 * and environmental impact (paper saved).
 */
function ReceiptDetail({ receipt, onClose }) {
  const paperSaved = calculatePaperSaved(receipt.items.length);

  return (
    <div className="receipt-detail animate-slide-up">
      {/* Header */}
      <div className="receipt-detail__header">
        <div>
          <h3 className="receipt-detail__store">{receipt.store}</h3>
          <p className="receipt-detail__meta">
            {receipt.date} · {receipt.time} · {receipt.receiptNumber}
          </p>
        </div>
        <button className="receipt-detail__close" onClick={onClose} aria-label="Close receipt">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Line items table */}
      <table className="receipt-detail__table">
        <thead>
          <tr>
            <th className="receipt-detail__th">Item</th>
            <th className="receipt-detail__th receipt-detail__th--right">Qty</th>
            <th className="receipt-detail__th receipt-detail__th--right">Price</th>
            <th className="receipt-detail__th receipt-detail__th--right">Total</th>
          </tr>
        </thead>
        <tbody>
          {receipt.items.map((item, idx) => (
            <tr key={idx}>
              <td className="receipt-detail__td">{item.name}</td>
              <td className="receipt-detail__td receipt-detail__td--right">{item.quantity}</td>
              <td className="receipt-detail__td receipt-detail__td--right">€{item.price.toFixed(2)}</td>
              <td className="receipt-detail__td receipt-detail__td--right">€{item.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Divider */}
      <div className="receipt-detail__divider" />

      {/* Totals */}
      <div className="receipt-detail__totals">
        <div className="receipt-detail__total-row">
          <span>Subtotal</span>
          <span>€{receipt.subtotal.toFixed(2)}</span>
        </div>
        <div className="receipt-detail__total-row">
          <span>Tax (20% VAT)</span>
          <span>€{receipt.tax.toFixed(2)}</span>
        </div>
        <div className="receipt-detail__total-row receipt-detail__total-row--grand">
          <span>TOTAL</span>
          <span>€{receipt.total.toFixed(2)}</span>
        </div>
      </div>

      {/* Environmental impact */}
      <div className="receipt-detail__eco">
        <span className="receipt-detail__eco-icon">🌳</span>
        <p className="receipt-detail__eco-text">
          You saved <strong>{paperSaved} cm</strong> of paper!
        </p>
      </div>
    </div>
  );
}

export default ReceiptDetail;

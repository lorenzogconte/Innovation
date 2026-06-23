import { useState } from 'react';
import { merchantCategories } from '../../data/mockData';
import './AddLoyaltyModal.css';

/**
 * AddLoyaltyModal — full-screen slide-up modal for adding a new loyalty card.
 * Stores are grouped by merchant category for easy browsing.
 */
function AddLoyaltyModal({ onAddCard, onClose }) {
  const [activeTab, setActiveTab] = useState('select'); // 'select' | 'scan'
  const [selectedStore, setSelectedStore] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scannedCode, setScannedCode] = useState('');

  // Generate a random card number in format "XXXX XXXX XXXX"
  const generateCardNumber = () => {
    const seg = () => String(Math.floor(1000 + Math.random() * 9000));
    return `${seg()} ${seg()} ${seg()}`;
  };

  const startSimulatedScan = () => {
    setIsScanning(true);
    setScannedCode('');
    setSelectedStore('');
    setSelectedCategory('');
    setTimeout(() => {
      setIsScanning(false);
      setScannedCode(generateCardNumber());
    }, 1800);
  };

  const handleAdd = () => {
    if (!selectedStore || !selectedCategory) return;

    const newCard = {
      id: `lc-${Date.now()}`,
      store: selectedStore,
      cardNumber: scannedCode || generateCardNumber(),
      category: selectedCategory,
    };

    onAddCard(newCard);
  };

  // Flatten all stores for the category-grouped dropdown
  const categoryEntries = Object.entries(merchantCategories);

  const handleStoreSelect = (e) => {
    const storeName = e.target.value;
    setSelectedStore(storeName);

    // Find which category this store belongs to
    const matchedCategory = categoryEntries.find(([, cat]) =>
      cat.stores.includes(storeName)
    );
    if (matchedCategory) {
      setSelectedCategory(matchedCategory[0]);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'scan') {
      startSimulatedScan();
    } else {
      setIsScanning(false);
      setScannedCode('');
      setSelectedStore('');
      setSelectedCategory('');
    }
  };

  return (
    <div className="add-modal__overlay animate-fade-in" onClick={onClose}>
      <div
        className="add-modal animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="add-modal__header">
          <h2 className="add-modal__title">Add Loyalty Card</h2>
          <button className="add-modal__close" onClick={onClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Tab switch control */}
        <div className="add-modal__tabs">
          <button
            className={`add-modal__tab ${activeTab === 'select' ? 'add-modal__tab--active' : ''}`}
            onClick={() => handleTabChange('select')}
          >
            Select Store
          </button>
          <button
            className={`add-modal__tab ${activeTab === 'scan' ? 'add-modal__tab--active' : ''}`}
            onClick={() => handleTabChange('scan')}
          >
            Scan Barcode
          </button>
        </div>

        {/* ================= SELECT TAB ================= */}
        {activeTab === 'select' && (
          <div className="add-modal__field">
            <label className="add-modal__label" htmlFor="store-select">Select Store</label>
            <select
              id="store-select"
              className="add-modal__select"
              value={selectedStore}
              onChange={handleStoreSelect}
            >
              <option value="">Choose a store…</option>
              {categoryEntries.map(([catKey, cat]) => (
                <optgroup key={catKey} label={`${cat.icon} ${cat.label}`}>
                  {cat.stores.map((store) => (
                    <option key={store} value={store}>
                      {store}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        )}

        {/* ================= SCAN TAB ================= */}
        {activeTab === 'scan' && (
          <div className="add-modal__scan-container">
            {isScanning ? (
              <div className="add-modal__scanner">
                <div className="add-modal__viewfinder">
                  <div className="add-modal__laser" />
                  <div className="add-modal__corners" />
                </div>
                <p className="add-modal__scan-tip">Align physical card barcode inside frame</p>
              </div>
            ) : (
              <div className="add-modal__scan-success animate-scale-in">
                <div className="add-modal__success-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Card Scanned Successfully!
                </div>

                <div className="add-modal__field">
                  <label className="add-modal__label">Scanned Code</label>
                  <input
                    className="add-modal__input"
                    type="text"
                    value={scannedCode}
                    readOnly
                  />
                </div>

                <div className="add-modal__field">
                  <label className="add-modal__label" htmlFor="store-select-scanned">Assign to Store</label>
                  <select
                    id="store-select-scanned"
                    className="add-modal__select"
                    value={selectedStore}
                    onChange={handleStoreSelect}
                  >
                    <option value="">Choose store...</option>
                    {categoryEntries.map(([catKey, cat]) => (
                      <optgroup key={catKey} label={`${cat.icon} ${cat.label}`}>
                        {cat.stores.map((store) => (
                          <option key={store} value={store}>
                            {store}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                <button
                  className="add-modal__scan-again"
                  onClick={startSimulatedScan}
                >
                  Rescan Card
                </button>
              </div>
            )}
          </div>
        )}

        {/* Preview of selected store */}
        {selectedStore && !isScanning && (
          <div className="add-modal__preview animate-scale-in">
            <span className="add-modal__preview-emoji">
              {merchantCategories[selectedCategory]?.icon || '🏷️'}
            </span>
            <span className="add-modal__preview-store">{selectedStore}</span>
            <span className="add-modal__preview-category">
              {merchantCategories[selectedCategory]?.label || ''}
            </span>
          </div>
        )}

        {/* Add button */}
        {!isScanning && (
          <button
            className={`add-modal__btn ${selectedStore ? '' : 'add-modal__btn--disabled'}`}
            onClick={handleAdd}
            disabled={!selectedStore}
          >
            Add Card
          </button>
        )}
      </div>
    </div>
  );
}

export default AddLoyaltyModal;

import { useState, useRef, useEffect } from 'react';
import './TopBar.css';

/**
 * TopBar — fixed header with brand logo and user profile avatar.
 * Tapping the avatar toggles a small popover with user info.
 */
function TopBar() {
  const [showPopover, setShowPopover] = useState(false);
  const popoverRef = useRef(null);

  // Close popover when clicking outside
  useEffect(() => {
    if (!showPopover) return;

    function handleClickOutside(e) {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setShowPopover(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showPopover]);

  return (
    <header className="top-bar">
      {/* Brand logo */}
      <h1 className="top-bar__logo">PAYPERLESS</h1>

      {/* Profile avatar with popover */}
      <div className="top-bar__profile" ref={popoverRef}>
        <button
          className="top-bar__avatar"
          onClick={() => setShowPopover((prev) => !prev)}
          aria-label="User profile"
        >
          AM
        </button>

        {showPopover && (
          <div className="top-bar__popover animate-scale-in">
            <div className="top-bar__popover-header">
              <div className="top-bar__popover-avatar">AM</div>
              <div>
                <p className="top-bar__popover-name">Alex Müller</p>
                <p className="top-bar__popover-email">alex.mueller@email.com</p>
              </div>
            </div>
            <div className="top-bar__popover-footer">
              <span className="top-bar__popover-since">Member since 2024</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default TopBar;

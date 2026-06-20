import { useState, useCallback } from 'react';
import './AuthScreen.css';

/**
 * AuthScreen — passcode-based lock screen.
 * Any 4-digit combination unlocks the app.
 * Features entrance animations and a numeric keypad.
 */
function AuthScreen({ onAuthenticated }) {
  const [digits, setDigits] = useState([]);
  const [unlocking, setUnlocking] = useState(false);

  const handleDigitPress = useCallback((digit) => {
    if (unlocking) return;

    setDigits((prev) => {
      if (prev.length >= 4) return prev;
      const next = [...prev, digit];

      // Any 4-digit combo is valid — trigger unlock with brief delay for animation
      if (next.length === 4) {
        setUnlocking(true);
        setTimeout(() => onAuthenticated(), 600);
      }

      return next;
    });
  }, [unlocking, onAuthenticated]);

  const handleDelete = useCallback(() => {
    if (unlocking) return;
    setDigits((prev) => prev.slice(0, -1));
  }, [unlocking]);

  // Keypad layout: 1-9, blank, 0, delete
  const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, 'del'];

  return (
    <div className={`auth-screen ${unlocking ? 'auth-screen--unlocking' : ''}`}>
      {/* Brand */}
      <div className="auth-screen__brand animate-slide-down">
        <h1 className="auth-screen__logo">PAYPERLESS</h1>
        <p className="auth-screen__subtitle">Enter your passcode</p>
      </div>

      {/* Passcode dots */}
      <div className="auth-screen__dots animate-fade-in delay-2">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`auth-screen__dot ${i < digits.length ? 'auth-screen__dot--filled' : ''} ${
              unlocking ? 'auth-screen__dot--success' : ''
            }`}
          />
        ))}
      </div>

      {/* Numeric keypad */}
      <div className="auth-screen__keypad animate-slide-up delay-3">
        {keys.map((key, index) => {
          // Blank spacer cell
          if (key === null) {
            return <div key={`spacer-${index}`} className="auth-screen__key-spacer" />;
          }

          // Delete key
          if (key === 'del') {
            return (
              <button
                key="del"
                className="auth-screen__key auth-screen__key--del"
                onClick={handleDelete}
                aria-label="Delete"
              >
                {/* Backspace icon */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
                  <line x1="18" y1="9" x2="12" y2="15" />
                  <line x1="12" y1="9" x2="18" y2="15" />
                </svg>
              </button>
            );
          }

          // Digit key
          return (
            <button
              key={`digit-${key}`}
              className="auth-screen__key"
              onClick={() => handleDigitPress(key)}
            >
              {key}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default AuthScreen;

import { useState, useEffect } from 'react';
import MobileApp from './mobile/MobileApp';
import Dashboard from './dashboard/Dashboard';

/**
 * Root component — hash-based route switch between mobile prototype and business dashboard.
 * Uses window.location.hash for navigation without a router library.
 */
function App() {
  const [route, setRoute] = useState(window.location.hash);

  // Listen for hash changes to switch between mobile and dashboard
  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Route to dashboard when hash is #/dashboard
  if (route === '#/dashboard') {
    return <Dashboard />;
  }

  // Default: mobile app prototype in phone frame
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#E8ECF0' }}>
      <div className="phone-frame">
        <div className="phone-content">
          <MobileApp />
        </div>
      </div>
    </div>
  );
}

export default App;

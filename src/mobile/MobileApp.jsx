import { useState } from 'react';
import AuthScreen from './views/AuthScreen';
import HomeScreen from './views/HomeScreen';
import CardsScreen from './views/CardsScreen';
import LoyaltyScreen from './views/LoyaltyScreen';
import DiscountsScreen from './views/DiscountsScreen';
import AnalyticsScreen from './views/AnalyticsScreen';
import TopBar from './components/TopBar';
import BottomNav from './components/BottomNav';
import './MobileApp.css';

/**
 * MobileApp — top-level mobile shell.
 * Controls authentication gate and tab-based navigation.
 */
function MobileApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  // Render auth gate when user has not entered passcode
  if (!isAuthenticated) {
    return (
      <AuthScreen onAuthenticated={() => setIsAuthenticated(true)} />
    );
  }

  // Map tab keys to view components. Pass `setActiveTab` as `navigateTo` so
  // child views can programmatically switch tabs (e.g. Home -> Discounts).
  const viewMap = {
    home: <HomeScreen navigateTo={setActiveTab} />,
    cards: <CardsScreen />,
    loyalty: <LoyaltyScreen />,
    discounts: <DiscountsScreen />,
    analytics: <AnalyticsScreen />,
  };

  return (
    <div className="mobile-app">
      <TopBar />
      <main className="mobile-app__content view-scroll">
        {viewMap[activeTab]}
      </main>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default MobileApp;

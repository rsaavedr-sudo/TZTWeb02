
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Login from './Login';
import { HubHome, ProductView, RoadmapView, SharedModules, ChangelogView } from './HubViews';
import { ProductID, User } from '../../data/hubData';

const HubDashboard: React.FC = () => {
  const [activeView, setActiveView] = useState('home');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const authData = localStorage.getItem('tzero_internal_auth');
    if (authData) {
      try {
        const user = JSON.parse(authData);
        if (user && user.username) {
          setCurrentUser(user);
          setIsAuthenticated(true);
        }
      } catch (e) {
        localStorage.removeItem('tzero_internal_auth');
      }
    }
    setIsChecking(false);
  }, []);

  const handleLogin = () => {
    const authData = localStorage.getItem('tzero_internal_auth');
    if (authData) {
      const user = JSON.parse(authData);
      setCurrentUser(user);
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('tzero_internal_auth');
    setIsAuthenticated(false);
    setCurrentUser(null);
    setActiveView('home');
  };

  if (isChecking) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeView) {
      case 'home':
        return <HubHome onNavigate={setActiveView} />;
      case 'flow360':
        return <ProductView productId="flow360" />;
      case 'indika':
        return <ProductView productId="indika" />;
      case 'roadmap':
        return <RoadmapView />;
      case 'shared':
        return <SharedModules />;
      case 'changelog':
        return <ChangelogView />;
      default:
        return <HubHome onNavigate={setActiveView} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        onLogout={handleLogout}
        currentUser={currentUser}
      />
      
      <main className="flex-grow p-8 ml-64 min-h-screen">
        <div className="max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default HubDashboard;


import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RiskInversion from './components/RiskInversion';
import DataProblem from './components/DataProblem';
import Innovation from './components/Innovation';
import TargetAudience from './components/TargetAudience';
import Solutions from './components/Solutions';
import EfficiencyCalculator from './components/EfficiencyCalculator';
import BlogPage from './components/BlogPage';
import Consulting from './components/Consulting';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'blog'>('landing');

  // Rolar para o topo ao trocar de view
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar setView={setView} currentView={view} />
      
      <main className="flex-grow">
        {view === 'landing' ? (
          <>
            <Hero />
            <RiskInversion />
            <DataProblem />
            <Innovation />
            <Solutions />
            <EfficiencyCalculator />
            <TargetAudience />
            {/* A seção Blog (preview) foi removida daqui conforme solicitado */}
            <Consulting />
            <ContactForm />
          </>
        ) : (
          <BlogPage />
        )}
      </main>
      
      <Footer setView={setView} />
    </div>
  );
};

export default App;

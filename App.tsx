
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RiskInversion from './components/RiskInversion';
import Leads360Highlight from './components/Leads360Highlight';
import Leads360Efficiency from './components/Leads360Efficiency';
import DataProblem from './components/DataProblem';
import Solutions from './components/Solutions';
import EfficiencyCalculator from './components/EfficiencyCalculator';
import BlogPage from './components/BlogPage';
import TechPage from './components/TechPage';
import ProblemPage from './components/ProblemPage';
import ZeroLossPage from './components/products/ZeroLossPage';
import SmartRoutePage from './components/products/SmartRoutePage';
import Leads360Page from './components/products/Leads360Page';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

export type AppView = 'landing' | 'blog' | 'zeroloss' | 'smartroute' | 'leads360' | 'tech' | 'problem' | 'contact';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('landing');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const renderContent = () => {
    switch (view) {
      case 'blog':
        return <BlogPage />;
      case 'tech':
        return <TechPage setView={setView} />;
      case 'problem':
        return <ProblemPage setView={setView} />;
      case 'zeroloss':
        return <ZeroLossPage setView={setView} />;
      case 'smartroute':
        return <SmartRoutePage setView={setView} />;
      case 'leads360':
        return <Leads360Page setView={setView} />;
      case 'contact':
        return <div className="pt-20"><ContactForm isPage={true} /></div>;
      default:
        return (
          <>
            <Hero />
            <RiskInversion />
            <DataProblem setView={setView} />
            <div className="h-1 bg-slate-50"></div>
            <Leads360Highlight setView={setView} />
            <Leads360Efficiency setView={setView} />
            <Solutions setView={setView} />
            <EfficiencyCalculator />
            <ContactForm />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar setView={setView} currentView={view} />
      <div className="flex flex-col">
        <main className="flex-grow">
          {renderContent()}
        </main>
      </div>
      <WhatsAppButton />
      <Footer setView={setView} />
    </div>
  );
};

export default App;

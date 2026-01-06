
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
import TechPage from './components/TechPage';
import ProblemPage from './components/ProblemPage';
import ZeroLossPage from './components/products/ZeroLossPage';
import SmartRoutePage from './components/products/SmartRoutePage';
import Leads360Page from './components/products/Leads360Page';
import Consulting from './components/Consulting';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

export type AppView = 'landing' | 'blog' | 'zeroloss' | 'smartroute' | 'leads360' | 'tech' | 'problem';

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
      default:
        return (
          <>
            <Hero />
            <RiskInversion />
            <DataProblem setView={setView} />
            <Innovation setView={setView} />
            <Solutions setView={setView} />
            <EfficiencyCalculator />
            <TargetAudience />
            <Consulting />
            <ContactForm />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar setView={setView} currentView={view} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer setView={setView} />
    </div>
  );
};

export default App;

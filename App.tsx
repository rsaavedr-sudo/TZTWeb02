
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DataProblem from './components/DataProblem';
import Innovation from './components/Innovation';
import TargetAudience from './components/TargetAudience';
import Solutions from './components/Solutions';
import EfficiencyCalculator from './components/EfficiencyCalculator';
import Consulting from './components/Consulting';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <DataProblem />
        <Innovation />
        <Solutions />
        <EfficiencyCalculator />
        <TargetAudience />
        <Consulting />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default App;

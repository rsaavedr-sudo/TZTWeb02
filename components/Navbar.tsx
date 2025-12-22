
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const LogoIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform transition-transform group-hover:rotate-12">
    <path d="M16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28" stroke="#022c5e" strokeWidth="4" strokeLinecap="round"/>
    <path d="M16 4C22.6274 4 28 9.37258 28 16" stroke="#10b981" strokeWidth="4" strokeLinecap="round"/>
    <rect x="14" y="11" width="4" height="10" rx="2" fill="#10b981" />
  </svg>
);

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Problema', href: '#problema' },
    { name: 'Tecnologia', href: '#tecnologia' },
    { name: 'Soluções', href: '#soluções' },
    { name: 'ROI', href: '#roi' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 shadow-md py-3 backdrop-blur-md' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="bg-slate-50 p-1.5 rounded-xl border border-slate-100 group-hover:border-tzero-blue/20 transition-all">
              <LogoIcon />
            </div>
            <span className="text-xl font-extrabold tracking-tighter text-[#022c5e]">
              T-ZERO<span className="text-tzero-blue font-light ml-1">TECH</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                className="font-bold text-[12px] text-slate-500 hover:text-tzero-blue transition-colors tracking-widest uppercase"
              >
                {link.name}
              </a>
            ))}
            <button className="bg-tzero-blue text-white px-7 py-3 rounded-xl text-[12px] font-bold shadow-lg shadow-blue-500/20 hover:bg-[#022c5e] transition-all transform hover:-translate-y-0.5">
              Agendar uma Demonstração
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-[#022c5e] p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t p-6 shadow-2xl animate-in fade-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-5">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-bold text-slate-700" onClick={() => setIsOpen(false)}>
                {link.name}
              </a>
            ))}
            <button className="bg-tzero-blue text-white w-full py-4 rounded-xl text-sm font-bold shadow-lg">
              Agendar uma Demonstração
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
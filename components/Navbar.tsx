
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const LogoIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform group-hover:scale-110">
    <rect x="3" y="6" width="18" height="3" rx="1.5" fill="#0B1C3F" />
    <rect x="3" y="11" width="12" height="3" rx="1.5" fill="#0061FF" />
    <rect x="3" y="16" width="16" height="3" rx="1.5" fill="#94A3B8" />
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

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 shadow-sm py-2 backdrop-blur-md' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center gap-3 group cursor-pointer">
            <div className="bg-white p-1 rounded-md shadow-sm border border-slate-100">
              <LogoIcon />
            </div>
            <span className="text-2xl font-black text-tzero-navy tracking-tighter">
              T-ZERO<span className="text-tzero-blue">TECH</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-10">
            <a href="#soluções" className="text-slate-600 hover:text-tzero-blue font-bold text-xs transition-colors uppercase tracking-widest">Produtos</a>
            <a href="#roi" className="text-tzero-blue hover:underline font-black text-xs transition-colors uppercase tracking-[0.2em]">ZeroLoss</a>
            <a href="#tecnologia" className="text-slate-600 hover:text-tzero-blue font-bold text-xs transition-colors uppercase tracking-widest">Propósito</a>
            <a href="#empresa" className="text-slate-600 hover:text-tzero-blue font-bold text-xs transition-colors uppercase tracking-widest">Consultoria</a>
            <button className="btn-tzero-primary px-8 py-3 text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-blue-900/10">
              Solicitar Demo
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-tzero-navy">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t p-6 shadow-2xl animate-in fade-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-4">
            <a href="#soluções" className="text-sm font-black text-slate-800 uppercase tracking-widest" onClick={() => setIsOpen(false)}>Produtos</a>
            <a href="#roi" className="text-sm font-black text-tzero-blue uppercase tracking-widest" onClick={() => setIsOpen(false)}>ZeroLoss</a>
            <a href="#tecnologia" className="text-sm font-black text-slate-800 uppercase tracking-widest" onClick={() => setIsOpen(false)}>Propósito</a>
            <button className="btn-tzero-primary w-full py-4 text-sm font-black uppercase tracking-widest">Demonstração</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

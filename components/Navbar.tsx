
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const LogoIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform group-hover:scale-110">
    <rect x="3" y="6" width="18" height="3" rx="1.5" fill="#022c5e" />
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
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 shadow-sm py-2 backdrop-blur-md border-b border-slate-100' : 'bg-white/80 py-4 backdrop-blur-sm'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center gap-3 group cursor-pointer">
            <div className="bg-white p-1 rounded-md shadow-sm border border-slate-100">
              <LogoIcon />
            </div>
            <span className="text-2xl font-black tracking-tighter text-[#022c5e]">
              T-ZERO<span className="text-tzero-blue">.TECH</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-10">
            <a href="#hero" className="font-bold text-xs uppercase tracking-widest text-slate-600 hover:text-tzero-blue transition-colors">Problema</a>
            <a href="#tecnologia" className="font-bold text-xs uppercase tracking-widest text-slate-600 hover:text-tzero-blue transition-colors">Inovação</a>
            <a href="#soluções" className="font-bold text-xs uppercase tracking-widest text-slate-600 hover:text-tzero-blue transition-colors">Soluções</a>
            <a href="#roi" className="font-black text-xs uppercase tracking-[0.2em] text-tzero-blue underline decoration-2 underline-offset-4">Calculadora</a>
            <button className="bg-tzero-blue text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-900/20 hover:bg-blue-600 transition-all transform hover:-translate-y-0.5">
              Falar com Especialista
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-[#022c5e]">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t p-6 shadow-2xl animate-in fade-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-4">
            <a href="#tecnologia" className="text-sm font-black text-slate-800 uppercase tracking-widest" onClick={() => setIsOpen(false)}>Inovação</a>
            <a href="#soluções" className="text-sm font-black text-slate-800 uppercase tracking-widest" onClick={() => setIsOpen(false)}>Soluções</a>
            <button className="btn-tzero-primary w-full py-4 text-sm font-black uppercase tracking-widest">Falar com Especialista</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

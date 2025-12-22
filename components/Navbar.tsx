
import React, { useState, useEffect } from 'react';
import { Menu, X, Zap, ChevronDown } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 py-4'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="bg-tzero-navy p-1.5 rounded-lg">
              <Zap className="text-white w-5 h-5" fill="currentColor" />
            </div>
            <span className="text-2xl font-extrabold text-tzero-navy tracking-tight">
              T-ZERO<span className="text-tzero-blue">TECH</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-10">
            <a href="#soluções" className="text-slate-700 hover:text-tzero-blue font-bold text-sm transition-colors uppercase tracking-tight">Produtos</a>
            <a href="#roi" className="text-tzero-blue hover:underline font-black text-sm transition-colors uppercase tracking-widest">ZeroLoss</a>
            <a href="#tecnologia" className="text-slate-700 hover:text-tzero-blue font-bold text-sm transition-colors uppercase tracking-tight">Propósito</a>
            <a href="#empresa" className="text-slate-700 hover:text-tzero-blue font-bold text-sm transition-colors uppercase tracking-tight">Consultoria</a>
            <button className="btn-tzero-primary px-7 py-3 text-[11px] uppercase tracking-widest shadow-lg">
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
            <a href="#soluções" className="text-lg font-bold text-slate-800" onClick={() => setIsOpen(false)}>Produtos</a>
            <a href="#roi" className="text-lg font-black text-tzero-blue" onClick={() => setIsOpen(false)}>ZeroLoss</a>
            <a href="#tecnologia" className="text-lg font-bold text-slate-800" onClick={() => setIsOpen(false)}>Propósito</a>
            <button className="btn-tzero-primary w-full py-4 text-lg">Demonstração</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

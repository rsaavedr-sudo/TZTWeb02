
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Zap, Activity, MessageSquareText } from 'lucide-react';
import { AppView } from '../App';

const LogoIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform transition-transform group-hover:rotate-12">
    <path d="M16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28" stroke="#022c5e" strokeWidth="4" strokeLinecap="round"/>
    <path d="M16 4C22.6274 4 28 9.37258 28 16" stroke="#10b981" strokeWidth="4" strokeLinecap="round"/>
    <rect x="14" y="11" width="4" height="10" rx="2" fill="#10b981" />
  </svg>
);

interface NavbarProps {
  setView: (view: AppView) => void;
  currentView: string;
}

const Navbar: React.FC<NavbarProps> = ({ setView, currentView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: AppView, e: React.MouseEvent) => {
    if (view === 'landing') {
      if (currentView !== 'landing') {
        setView('landing');
      }
    } else {
      e.preventDefault();
      setView(view);
    }
    setIsOpen(false);
    setIsDropdownOpen(false);
  };

  const productLinks = [
    { id: 'zeroloss', name: 'ZeroLoss CPC', desc: 'Tarifação por contato humano', icon: <Zap size={16} /> },
    { id: 'smartroute', name: 'Smart Route', desc: 'Infraestrutura de alta escala', icon: <Activity size={16} /> },
    { id: 'leads360', name: 'Leads360', desc: 'Inteligência de base de dados', icon: <MessageSquareText size={16} /> },
  ];

  const navLinks = [
    { name: 'Problema', href: '#problema', view: 'problem' },
    { name: 'Soluções', href: '#soluções', view: 'landing', hasDropdown: true },
    { name: 'Blog', href: '#blog', view: 'blog' },
    { name: 'Contato', href: '#contato', view: 'landing' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled || currentView !== 'landing' ? 'bg-white shadow-md py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setView('landing')}>
            <div className="bg-slate-50 p-1.5 rounded-xl border border-slate-100 group-hover:border-tzero-blue/20 transition-all">
              <LogoIcon />
            </div>
            <span className="text-xl font-extrabold tracking-tighter text-[#022c5e]">
              T-ZERO<span className="text-tzero-blue font-light ml-1">TECH</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative group py-2"
                onMouseEnter={() => link.hasDropdown && setIsDropdownOpen(true)}
                onMouseLeave={() => link.hasDropdown && setIsDropdownOpen(false)}
              >
                <a 
                  href={link.href} 
                  onClick={(e) => handleNavClick(link.view as AppView, e)}
                  className={`flex items-center gap-1 font-bold text-[12px] tracking-widest uppercase transition-colors ${
                    (currentView === link.view && link.view !== 'landing') 
                    ? 'text-tzero-blue' 
                    : 'text-slate-500 hover:text-tzero-blue'
                  }`}
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown size={14} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />}
                </a>

                {/* Desktop Dropdown */}
                {link.hasDropdown && (
                  <div className={`absolute left-1/2 -translate-x-1/2 top-full pt-4 transition-all duration-300 ${isDropdownOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                    <div className="bg-white border border-slate-100 rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(2,44,94,0.15)] p-6 min-w-[280px]">
                      <div className="space-y-2">
                        {productLinks.map((prod) => (
                          <button
                            key={prod.id}
                            onClick={(e) => handleNavClick(prod.id as AppView, e)}
                            className="w-full flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-all group/item text-left"
                          >
                            <div className="bg-tzero-soft p-2.5 rounded-xl text-tzero-blue group-hover/item:bg-tzero-blue group-hover/item:text-white transition-colors">
                              {prod.icon}
                            </div>
                            <div>
                              <p className="text-sm font-black text-tzero-navy group-hover/item:text-tzero-blue transition-colors leading-none mb-1">
                                {prod.name}
                              </p>
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                                {prod.desc}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
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

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t p-6 shadow-2xl animate-in fade-in slide-in-from-top duration-300 overflow-y-auto max-h-[90vh]">
          <div className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <div key={link.name} className="space-y-4">
                <a 
                  href={link.href} 
                  className={`text-sm font-black uppercase tracking-widest ${link.hasDropdown ? 'text-tzero-blue' : 'text-slate-700'}`} 
                  onClick={(e) => !link.hasDropdown && handleNavClick(link.view as AppView, e)}
                >
                  {link.name}
                </a>
                {link.hasDropdown && (
                  <div className="pl-4 space-y-4 border-l-2 border-slate-50">
                    {productLinks.map((prod) => (
                      <button
                        key={prod.id}
                        onClick={(e) => handleNavClick(prod.id as AppView, e)}
                        className="flex items-center gap-3 w-full text-left"
                      >
                        <span className="text-tzero-blue">{prod.icon}</span>
                        <div>
                          <p className="text-xs font-bold text-slate-800">{prod.name}</p>
                          <p className="text-[10px] text-slate-400 font-medium">{prod.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
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

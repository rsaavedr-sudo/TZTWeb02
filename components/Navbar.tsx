
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Zap, Activity, MessageSquareText } from 'lucide-react';
import { AppView } from '../App';

const LogoIcon = () => (
  <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Bullseye Rings */}
    <circle cx="50" cy="50" r="38" stroke="#DBEAFE" strokeWidth="6" />
    <circle cx="50" cy="50" r="28" stroke="#93C5FD" strokeWidth="6" />
    <circle cx="50" cy="50" r="18" stroke="#3B82F6" strokeWidth="6" />
    <circle cx="50" cy="50" r="8" fill="#0B2455" />
    
    {/* Dart hitting the center */}
    <g transform="translate(50, 50) rotate(-45)">
      {/* Shaft */}
      <rect x="-2.5" y="-55" width="5" height="55" rx="1" fill="#0B2455" />
      {/* Fletching / Feathers at the top of the shaft */}
      <path d="M-12 -62 L0 -42 L12 -62" fill="#0B2455" />
      <path d="M-10 -52 L0 -35 L10 -52" fill="#0B2455" />
    </g>
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
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setView('landing')}>
            <div className="flex-shrink-0">
              <LogoIcon />
            </div>
            <div className="flex flex-col justify-center -mt-1">
              <span className="text-3xl font-black tracking-tight leading-none text-[#0B2455]">
                ZERO2<span className="text-[#3B82F6]">ONE</span>
              </span>
              <span className="text-[10px] font-medium text-slate-400 uppercase tracking-[0.1em] mt-1">
                powered by <span className="font-bold">T-ZERO TECH</span>
              </span>
            </div>
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
            <button className="bg-tzero-blue text-white px-7 py-3 rounded-xl text-[12px] font-bold shadow-lg shadow-blue-500/20 hover:bg-[#0B2455] transition-all transform hover:-translate-y-0.5">
              Agendar uma Demonstração
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-[#0B2455] p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

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

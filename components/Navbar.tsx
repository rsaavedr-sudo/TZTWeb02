
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Zap, Activity, MessageSquareText, User } from 'lucide-react';
import { AppView } from '../App';

const LogoIcon = () => (
  <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Target Rings */}
    <circle cx="50" cy="50" r="38" stroke="#DBEAFE" strokeWidth="6" />
    <circle cx="50" cy="50" r="28" stroke="#93C5FD" strokeWidth="6" />
    <circle cx="50" cy="50" r="18" stroke="#3B82F6" strokeWidth="6" />
    
    {/* Background Bullseye Dot */}
    <circle cx="50" cy="50" r="8" fill="#0B2455" />
    
    {/* Abstract Precision Path */}
    <g transform="translate(50, 50) rotate(-45)">
      <rect x="-1.5" y="-48" width="3" height="48" rx="1.5" fill="#0B2455" opacity="0.6" />
      <circle cx="0" cy="-25" r="2.5" fill="#0B2455" />
      <circle cx="0" cy="0" r="5" fill="#3B82F6" />
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
    e.preventDefault();
    setView(view);
    setIsOpen(false);
    setIsDropdownOpen(false);
  };

  const productLinks = [
    { id: 'zeroloss', name: 'ZeroLoss CPC', desc: 'Tarifação por contato humano', icon: <Zap size={16} /> },
    { id: 'smartroute', name: 'Smart Route', desc: 'Infraestrutura de alta escala', icon: <Activity size={16} /> },
    { id: 'leads360', name: 'Leads360', desc: 'Inteligência de base de dados', icon: <MessageSquareText size={16} /> },
  ];

  const navLinks = [
    { name: 'Início', href: '#', view: 'landing' },
    { name: 'Problema', href: '#problema', view: 'problem' },
    { name: 'Soluções', href: '#soluções', view: 'solutions_parent', hasDropdown: true },
    { name: 'Blog', href: '#blog', view: 'blog' },
    { name: 'Contato', href: '#contato', view: 'contact' },
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
            {navLinks.map((link) => {
              const isLandingActive = link.view === 'landing' && currentView === 'landing';
              const isViewActive = link.view !== 'solutions_parent' && currentView === link.view;
              const isSolutionActive = link.view === 'solutions_parent' && ['zeroloss', 'smartroute', 'leads360'].includes(currentView);
              const isActive = isLandingActive || isViewActive || isSolutionActive;

              return (
                <div 
                  key={link.name} 
                  className="relative group py-2"
                  onMouseEnter={() => link.hasDropdown && setIsDropdownOpen(true)}
                  onMouseLeave={() => link.hasDropdown && setIsDropdownOpen(false)}
                >
                  <a 
                    href={link.href} 
                    onClick={(e) => handleNavClick((link.view === 'solutions_parent' ? 'landing' : link.view) as AppView, e)}
                    className={`relative flex items-center gap-1 font-bold text-[12px] tracking-widest uppercase pb-2 transition-all duration-300 ${
                      isActive 
                      ? 'text-tzero-blue' 
                      : 'text-slate-500 group-hover:text-tzero-blue'
                    }`}
                  >
                    {link.name}
                    
                    {/* Underline Animation */}
                    <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-tzero-blue transition-transform duration-300 origin-center ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                    
                    {link.hasDropdown && (
                      <ChevronDown 
                        size={14} 
                        className={`transition-all duration-300 ${isDropdownOpen || isSolutionActive ? 'rotate-180 text-tzero-blue' : 'text-current group-hover:text-tzero-blue'}`} 
                      />
                    )}
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
              );
            })}
            <button 
              className="flex items-center gap-2.5 text-[#0B2455] px-6 py-3 rounded-xl text-[13px] font-extrabold hover:text-tzero-blue hover:bg-slate-50 transition-all group/client"
            >
              <User size={18} className="text-tzero-blue group-hover/client:scale-110 transition-transform" />
              Área do cliente
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
            {navLinks.map((link) => {
              const isLandingActive = link.view === 'landing' && currentView === 'landing';
              const isViewActive = link.view !== 'solutions_parent' && currentView === link.view;
              const isSolutionActive = link.view === 'solutions_parent' && ['zeroloss', 'smartroute', 'leads360'].includes(currentView);
              const isActive = isLandingActive || isViewActive || isSolutionActive;

              return (
                <div key={link.name} className="space-y-4">
                  <a 
                    href={link.href} 
                    className={`text-sm font-black uppercase tracking-widest transition-all duration-300 ${isActive ? 'text-tzero-blue' : 'text-slate-500 hover:text-tzero-blue'}`} 
                    onClick={(e) => handleNavClick((link.view === 'solutions_parent' ? 'landing' : link.view) as AppView, e)}
                  >
                    {link.name}
                  </a>
                </div>
              );
            })}
            <button className="flex items-center justify-center gap-2.5 text-[#0B2455] w-full py-4 rounded-xl text-sm font-extrabold border border-slate-100 hover:bg-slate-50">
              <User size={20} className="text-tzero-blue" />
              Área do cliente
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

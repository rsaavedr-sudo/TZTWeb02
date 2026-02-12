
import React from 'react';
import { Linkedin, Twitter, Globe, Mail, MapPin } from 'lucide-react';
import { AppView } from '../App';

const FooterIcon = () => (
  <svg width="45" height="45" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Target Rings */}
    <circle cx="50" cy="50" r="38" stroke="#DBEAFE" strokeWidth="6" />
    <circle cx="50" cy="50" r="28" stroke="#93C5FD" strokeWidth="6" />
    <circle cx="50" cy="50" r="18" stroke="#3B82F6" strokeWidth="6" />
    
    {/* Bullseye Background */}
    <circle cx="50" cy="50" r="8" fill="#0B2455" />
    
    {/* Abstract Path */}
    <g transform="translate(50, 50) rotate(-45)">
      {/* Line reaching the center point */}
      <rect x="-1.5" y="-48" width="3" height="48" rx="1.5" fill="#0B2455" opacity="0.6" />
      <circle cx="0" cy="-25" r="2.5" fill="#0B2455" />
      
      {/* CENTRAL POINT */}
      <circle cx="0" cy="0" r="5" fill="#3B82F6" />
    </g>
  </svg>
);

interface FooterProps {
  setView: (view: AppView) => void;
}

const Footer: React.FC<FooterProps> = ({ setView }) => {
  // Fix: Explicitly type footerSections to include optional properties (highlight, disabled) used in the render logic
  const footerSections: {
    title: string;
    links: {
      label: string;
      view: AppView;
      highlight?: boolean;
      disabled?: boolean;
    }[];
  }[] = [
    {
      title: "Links Úteis",
      links: [
        { label: "Home", view: 'landing' as AppView },
        { label: "Sobre Nós", view: 'tech' as AppView },
        { label: "Diferencial", view: 'problem' as AppView },
        { label: "Nossos Números", view: 'landing' as AppView },
        { label: "Notícias", view: 'blog' as AppView },
        { label: "Contate-nos", view: 'contact' as AppView }
      ]
    },
    {
      title: "Serviços",
      links: [
        { label: "ZeroLoss CPC", view: 'zeroloss' as AppView },
        { label: "Smart Route", view: 'smartroute' as AppView },
        { label: "Leads360", view: 'leads360' as AppView },
        { label: "UMD", view: 'umd' as AppView },
        { label: "AGENDE UMA DEMONSTRAÇÃO", view: 'contact' as AppView, highlight: true }
      ]
    }
  ];

  return (
    <footer className="bg-white pt-24 pb-12 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-8 cursor-pointer group" onClick={() => setView('landing')}>
              <div className="flex-shrink-0">
                <FooterIcon />
              </div>
              <div className="flex flex-col justify-center -mt-1">
                <span className="text-2xl font-black tracking-tight leading-none text-[#0B2455]">
                  ZERO2<span className="text-[#3B82F6]">ONE</span>
                </span>
                <span className="text-[8px] font-medium text-slate-400 uppercase tracking-[0.1em] mt-1">
                  powered by <span className="font-bold">T-ZERO TECH</span>
                </span>
              </div>
            </div>
            <p className="text-slate-500 font-medium leading-relaxed max-w-sm mb-10 text-sm">
              Líderes em tecnologia de tarifação inteligente e eficiência em telecomunicações para operações de alta escala.
            </p>
            <div className="flex gap-4">
              {[Linkedin, Twitter, Globe, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-tzero-blue hover:border-tzero-blue transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {footerSections.map((col, i) => (
            <div key={i}>
              <h4 className="font-extrabold text-[#022c5e] mb-8 text-[12px] uppercase tracking-widest">{col.title}</h4>
              <ul className="space-y-4">
                {col.links.map(link => (
                  <li key={link.label}>
                    <button 
                      onClick={() => !link.disabled && setView(link.view)}
                      className={`font-semibold transition-colors text-sm text-left ${
                        link.disabled 
                        ? 'text-slate-300 cursor-default' 
                        : link.highlight 
                        ? 'text-tzero-blue font-black mt-4' 
                        : 'text-slate-400 hover:text-tzero-blue'
                      }`}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
            <MapPin size={14} className="text-tzero-blue" /> Trusted by 500+ Enterprises Globally
          </div>
          <p className="text-slate-300 font-bold text-[10px] uppercase tracking-widest">
            &copy; {new Date().getFullYear()} ZERO2ONE. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

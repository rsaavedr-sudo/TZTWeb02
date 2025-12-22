
import React from 'react';
import { Linkedin, Instagram, Globe, Mail } from 'lucide-react';

const LogoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="6" width="18" height="3" rx="1.5" fill="#0B1C3F" />
    <rect x="3" y="11" width="12" height="3" rx="1.5" fill="#0061FF" />
    <rect x="3" y="16" width="16" height="3" rx="1.5" fill="#94A3B8" />
  </svg>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-white pt-24 pb-12 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-16 mb-20">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-tzero-soft p-1.5 rounded-lg border border-slate-100 shadow-sm">
                <LogoIcon />
              </div>
              <span className="text-2xl font-black text-tzero-navy tracking-tighter">T-ZERO<span className="text-tzero-blue">TECH</span></span>
            </div>
            <p className="text-slate-500 font-medium leading-relaxed max-w-sm mb-10 text-sm">
              Especialistas em contato massivo eficiente. Tecnologia proprietária para transformar a comunicação em larga escala em rentabilidade real.
            </p>
            <div className="flex gap-4">
              {[Linkedin, Instagram, Globe, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-xl bg-tzero-soft border border-slate-100 flex items-center justify-center text-slate-400 hover:text-tzero-blue hover:border-tzero-blue transition-all shadow-sm">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {[
            { title: "Soluções", links: ["ZeroLoss CPC", "Smart Route", "Leads360", "Analytics"] },
            { title: "Empresa", links: ["Propósito", "Tecnologia", "ROI", "Consultoria"] },
            { title: "Global", links: ["São Paulo", "Madri", "Austin", "Lisboa"] }
          ].map((col, i) => (
            <div key={i}>
              <h4 className="font-black text-tzero-navy mb-8 uppercase tracking-[0.2em] text-[10px] opacity-60">{col.title}</h4>
              <ul className="space-y-4">
                {col.links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-slate-500 font-bold hover:text-tzero-blue transition-colors text-xs tracking-tight">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.25em]">
            &copy; {new Date().getFullYear()} T-ZERO TECH. TODOS OS DIREITOS RESERVADOS.
          </p>
          <div className="flex items-center gap-8 text-slate-400 font-bold text-[10px] uppercase tracking-[0.1em]">
            <a href="#" className="hover:text-tzero-blue transition-colors">Privacidade</a>
            <a href="#" className="hover:text-tzero-blue transition-colors">Termos</a>
            <a href="#" className="hover:text-tzero-blue transition-colors">Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

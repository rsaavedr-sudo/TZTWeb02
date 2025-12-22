
import React from 'react';
import { Linkedin, Twitter, Globe, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white pt-24 pb-12 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-24">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-8">
               <span className="text-2xl font-extrabold text-[#022c5e] tracking-tight">
                  T-ZERO<span className="text-tzero-blue font-light">TECH</span>
               </span>
            </div>
            <p className="text-slate-500 font-medium leading-relaxed max-w-sm mb-10 text-sm">
              Líderes globais em tecnologia de tarifação inteligente e eficiência de telecomunicações para operações de alta escala.
            </p>
            <div className="flex gap-4">
              {[Linkedin, Twitter, Globe, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-tzero-blue hover:border-tzero-blue transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {[
            { title: "Plataforma", links: ["ZeroLoss CPC", "Smart Route", "Leads360", "Global Voice"] },
            { title: "Recursos", links: ["Documentação", "Segurança", "Casos de Sucesso", "Compliance"] },
            { title: "Global Presence", links: ["Austin, TX", "Madrid, ES", "São Paulo, BR", "Lisboa, PT"] }
          ].map((col, i) => (
            <div key={i}>
              <h4 className="font-extrabold text-[#022c5e] mb-8 text-[12px] uppercase tracking-widest">{col.title}</h4>
              <ul className="space-y-4">
                {col.links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-slate-400 font-semibold hover:text-tzero-blue transition-colors text-sm">{link}</a>
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
            &copy; {new Date().getFullYear()} T-ZERO TECH. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

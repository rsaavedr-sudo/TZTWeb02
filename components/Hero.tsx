
import React from 'react';
import { ArrowRight, ShieldCheck, Activity, BarChart3 } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-white overflow-hidden" id="hero">
      {/* Background accents - subtle glacial blue */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-tzero-glacial/30 -skew-x-12 translate-x-1/4 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-tzero-blue px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8 border border-blue-100 shadow-sm">
              <BarChart3 size={14} /> Contato Massivo Eficiente
            </div>
            <h1 className="text-5xl lg:text-7.5xl font-black text-tzero-navy leading-[0.98] mb-10 tracking-tighter">
              Contactar mejor, <br />
              <span className="text-tzero-blue underline decoration-tzero-soft underline-offset-8">no apenas más.</span>
            </h1>
            <p className="text-xl text-slate-500 mb-12 leading-relaxed font-medium max-w-lg">
              Resolvemos a ineficiência técnica de alto fluxo. Conheça o <span className="text-tzero-navy font-bold">ZeroLoss</span>: o único ecossistema brasileiro focado em contato humano efetivo a escala.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 mb-16">
              <button className="btn-tzero-primary px-12 py-5 text-lg flex items-center justify-center gap-3 shadow-2xl shadow-blue-900/20">
                Ativar ZeroLoss <ArrowRight size={22} />
              </button>
              <button className="btn-tzero-outline px-12 py-5 text-lg border-tzero-blue/30 text-tzero-navy">
                Soluções 360
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 pt-10 border-t border-slate-100">
              <div className="flex items-center gap-3 text-tzero-navy font-black text-[10px] uppercase tracking-widest">
                <ShieldCheck className="text-tzero-blue" size={18} /> Compliance
              </div>
              <div className="flex items-center gap-3 text-tzero-navy font-black text-[10px] uppercase tracking-widest">
                <Activity className="text-tzero-blue" size={18} /> Escala Real
              </div>
              <div className="flex items-center gap-3 text-tzero-navy font-black text-[10px] uppercase tracking-widest">
                <BarChart3 className="text-tzero-blue" size={18} /> ROI Medível
              </div>
            </div>
          </div>
          
          <div className="relative lg:block hidden">
            <div className="absolute inset-0 bg-tzero-blue/5 rounded-full blur-[120px] scale-125"></div>
            <div className="relative bg-white rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(11,28,63,0.15)] border-8 border-tzero-soft p-4">
               <img 
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1374&auto=format&fit=crop" 
                alt="Operação T-Zero" 
                className="rounded-[3.2rem] w-full h-[580px] object-cover filter saturate-[0.8] brightness-[0.95]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-tzero-navy/60 via-transparent to-transparent rounded-[3.2rem]"></div>
              
              <div className="absolute -bottom-10 -left-10 bg-white p-10 rounded-3xl shadow-2xl border border-slate-50 max-w-[280px]">
                <div className="flex items-center gap-2 mb-2">
                   <div className="w-2 h-2 rounded-full bg-tzero-blue animate-pulse"></div>
                   <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Real-time Analysis</p>
                </div>
                <p className="text-tzero-navy font-black text-2xl mb-1 tracking-tighter">Zero Desperdício</p>
                <p className="text-[11px] text-slate-500 font-medium leading-tight">Sua fatura reflete apenas interações humanas reais.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

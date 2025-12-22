
import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Activity } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-white overflow-hidden" id="hero">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-tzero-glacial/50 -skew-x-12 translate-x-1/4 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block bg-blue-50 text-tzero-blue px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-blue-100 shadow-sm">
              Especialistas em Contato Massivo
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-tzero-navy leading-[1.05] mb-8 tracking-tighter">
              Contactar melhor, <br />
              <span className="text-tzero-blue">não apenas mais.</span>
            </h1>
            <p className="text-xl text-slate-500 mb-10 leading-relaxed font-medium max-w-lg">
              Resolvemos a ineficiência das operações de alto fluxo. Elimine o desperdício com o <span className="text-tzero-navy font-bold">ZeroLoss</span>: o único modelo focado 100% em contato humano efetivo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="btn-tzero-primary px-10 py-5 text-lg flex items-center justify-center gap-2 shadow-xl shadow-blue-900/10">
                Ativar ZeroLoss <ArrowRight size={20} />
              </button>
              <button className="btn-tzero-outline px-10 py-5 text-lg">
                Ver Ecossistema
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8 border-t border-slate-100">
              <div className="flex items-center gap-2 text-tzero-navy font-bold text-xs uppercase tracking-tight">
                <ShieldCheck className="text-tzero-blue" size={18} /> Compliance Total
              </div>
              <div className="flex items-center gap-2 text-tzero-navy font-bold text-xs uppercase tracking-tight">
                <Zap className="text-tzero-blue" size={18} /> Escala Real
              </div>
              <div className="flex items-center gap-2 text-tzero-navy font-bold text-xs uppercase tracking-tight">
                <Activity className="text-tzero-blue" size={18} /> Transparência
              </div>
            </div>
          </div>
          
          <div className="relative lg:block hidden">
            <div className="absolute inset-0 bg-tzero-blue/5 rounded-full blur-[100px] scale-110"></div>
            <div className="relative bg-white rounded-[3rem] shadow-2xl border border-slate-50 p-3">
               <img 
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1374&auto=format&fit=crop" 
                alt="Inteligência de Operação" 
                className="rounded-[2.5rem] w-full h-[540px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-tzero-navy/40 to-transparent rounded-[2.5rem]"></div>
              
              <div className="absolute -bottom-6 -left-6 bg-white p-7 rounded-2xl shadow-2xl border border-slate-50 max-w-[240px]">
                <p className="text-tzero-navy font-black text-xl mb-1">99.9%</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-tight">Precisão na filtragem de áudio humano</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

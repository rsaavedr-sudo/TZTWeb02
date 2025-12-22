
import React from 'react';
import { Zap, ShieldCheck, Cpu, Activity, TrendingUp, Play } from 'lucide-react';

const BillingCard = () => (
  <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-[0_32px_64px_-16px_rgba(11,28,63,0.1)] relative overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-tzero-blue/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
    <div className="mb-10 relative z-10">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Motor de Tarifação Real-Time</p>
      <div className="text-xs text-blue-600 font-bold flex items-center gap-2 bg-blue-50 w-fit px-3 py-1 rounded-full border border-blue-100">
        <div className="w-1.5 h-1.5 rounded-full bg-tzero-blue animate-pulse"></div>
        Filtragem Neural Ativa
      </div>
    </div>
    
    <div className="space-y-4 relative z-10">
      <div className="bg-slate-50/50 border border-slate-100 p-6 rounded-2xl flex justify-between items-center group hover:bg-white hover:border-slate-200 transition-all">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
            <Cpu className="text-slate-400" size={18} />
          </div>
          <span className="text-slate-600 text-sm font-bold tracking-tight">Caixa Postal / Robô</span>
        </div>
        <span className="text-slate-400 font-black text-sm tracking-widest">R$ 0,00</span>
      </div>

      <div className="bg-slate-50/50 border border-slate-100 p-6 rounded-2xl flex justify-between items-center group hover:bg-white hover:border-slate-200 transition-all">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
            <Activity className="text-slate-400" size={18} />
          </div>
          <span className="text-slate-600 text-sm font-bold tracking-tight">Número Inválido</span>
        </div>
        <span className="text-slate-400 font-black text-sm tracking-widest">R$ 0,00</span>
      </div>

      <div className="bg-tzero-navy border border-tzero-navy p-6 rounded-2xl flex justify-between items-center shadow-lg shadow-blue-900/20">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
            <TrendingUp className="text-tzero-blue" size={18} />
          </div>
          <span className="text-white text-sm font-black tracking-tight">Humano Transferido</span>
        </div>
        <div className="text-right">
          <span className="text-tzero-blue font-black text-xs block tracking-tighter uppercase">Tarifado CPC</span>
        </div>
      </div>
    </div>

    <div className="mt-10 bg-tzero-soft border border-slate-100 py-4 rounded-2xl text-center">
      <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.25em]">Apenas voz humana gera custo</p>
    </div>
  </div>
);

const Hero: React.FC = () => {
  return (
    <div className="relative bg-white pt-32 pb-24 lg:pt-56 lg:pb-48 overflow-hidden" id="hero">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-tzero-soft to-transparent opacity-50 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-tzero-soft text-tzero-navy px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-10 border border-slate-200">
              <div className="w-1.5 h-1.5 rounded-full bg-tzero-blue animate-pulse"></div>
              Telefonia de Alta Performance
            </div>
            
            <h1 className="text-5xl lg:text-[5.5rem] font-black text-tzero-navy leading-[0.95] mb-10 tracking-tighter">
              Pague solo por <br />
              <span className="text-tzero-blue italic">Contato Humano Real.</span>
            </h1>
            
            <p className="text-xl text-slate-500 mb-14 leading-relaxed font-medium max-w-lg">
              Elimine o desperdício em suas campanhas de telemercadeo. Filtramos máquinas de responder e erros de rede em tempo real.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 mb-16">
              <button className="bg-tzero-blue text-white px-12 py-5 rounded-2xl text-lg font-black flex items-center justify-center gap-3 shadow-2xl shadow-blue-500/20 transition-all hover:brightness-110 transform hover:-translate-y-1">
                Começar Agora <Zap size={22} fill="currentColor" />
              </button>
              <button className="bg-white border-2 border-slate-200 text-tzero-navy px-10 py-5 rounded-2xl text-lg font-black transition-all hover:bg-slate-50 flex items-center justify-center gap-3">
                Ver Vídeo <Play size={20} fill="currentColor" />
              </button>
            </div>
            
            <div className="flex flex-wrap items-center gap-10">
              <div className="flex items-center gap-3 text-slate-400 font-black text-[10px] uppercase tracking-widest">
                <ShieldCheck size={18} className="text-blue-500" /> +500M Minutos Processados
              </div>
            </div>
          </div>
          
          <div className="relative lg:block hidden">
             <div className="absolute inset-0 bg-tzero-blue/5 rounded-full blur-[120px] scale-150 pointer-events-none"></div>
            <BillingCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
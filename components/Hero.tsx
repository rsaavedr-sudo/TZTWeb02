
import React from 'react';
import { Zap, ShieldCheck, MousePointer2, Cpu, Activity, TrendingUp } from 'lucide-react';

const BillingCard = () => (
  <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-[0_32px_64px_-16px_rgba(11,28,63,0.1)] relative overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-tzero-blue/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
    <div className="mb-10 relative z-10">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Billing Logic Engine</p>
      <p className="text-xs text-green-600 font-bold flex items-center gap-2 bg-green-50 w-fit px-3 py-1 rounded-full border border-green-100">
        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
        Filtering Machine Learning active
      </p>
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

      <div className="bg-tzero-blue border border-tzero-blue p-6 rounded-2xl flex justify-between items-center shadow-lg shadow-blue-500/20">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <TrendingUp className="text-white" size={18} />
          </div>
          <span className="text-white text-sm font-black tracking-tight">Humano Transferido</span>
        </div>
        <div className="text-right">
          <span className="text-white font-black text-xs block">R$ CPC FIXO</span>
        </div>
      </div>
    </div>

    <div className="mt-10 bg-green-50 border border-green-100 py-4 rounded-2xl text-center">
      <p className="text-green-700 text-[10px] font-black uppercase tracking-[0.25em]">Somente humanos geram custos</p>
    </div>
  </div>
);

const Hero: React.FC = () => {
  return (
    <div className="relative bg-white pt-32 pb-24 lg:pt-56 lg:pb-48 overflow-hidden" id="hero">
      {/* Subtle light background accents */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-tzero-soft to-transparent opacity-50 pointer-events-none"></div>
      <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-tzero-blue/5 rounded-full blur-[100px]"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-tzero-soft text-tzero-blue px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-10 border border-tzero-blue/10">
              <div className="w-1.5 h-1.5 rounded-full bg-tzero-blue animate-pulse"></div>
              Outbound de Alta Performance
            </div>
            
            <h1 className="text-5xl lg:text-[5.5rem] font-black text-[#022c5e] leading-[0.95] mb-10 tracking-tighter">
              Eficiência Total: <br />
              Só pague pelo <br />
              <span className="text-tzero-blue italic">"Alô" humano.</span>
            </h1>
            
            <p className="text-xl text-slate-500 mb-14 leading-relaxed font-medium max-w-lg">
              Na T-Zero, máquinas, caixas postais e números inválidos têm <span className="text-tzero-blue font-bold">custo zero</span>. Sua fatura é composta exclusivamente por humanos transferidos.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 mb-16">
              <button className="bg-tzero-blue text-white px-12 py-5 rounded-2xl text-lg font-black flex items-center justify-center gap-3 shadow-2xl shadow-blue-500/20 transition-all hover:bg-[#022c5e] transform hover:-translate-y-1">
                Ativar Operação CPC <Zap size={22} fill="currentColor" />
              </button>
              <button className="bg-white border border-slate-200 text-[#022c5e] px-10 py-5 rounded-2xl text-lg font-black transition-all hover:bg-slate-50 shadow-sm">
                Agendar Prova de Conceito
              </button>
            </div>
            
            <div className="flex flex-wrap items-center gap-10">
              <div className="flex items-center gap-3 text-slate-400 font-black text-[10px] uppercase tracking-widest">
                <ShieldCheck size={18} className="text-green-500" /> Custo Zero p/ Máquinas
              </div>
              <div className="flex items-center gap-3 text-slate-400 font-black text-[10px] uppercase tracking-widest">
                <MousePointer2 size={18} className="text-tzero-blue" /> Pagamento por Resultado
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

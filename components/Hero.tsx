
import React from 'react';
import { Zap, ShieldCheck, Cpu, Activity, TrendingUp, Play, CheckCircle2 } from 'lucide-react';

const BillingCard = () => (
  <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-[0_20px_50px_rgba(2,44,94,0.06)] relative overflow-hidden">
    <div className="absolute top-0 right-0 w-40 h-40 bg-tzero-blue/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
    <div className="mb-8 flex justify-between items-center">
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Billing Engine v3.0</p>
        <h4 className="text-lg font-extrabold text-[#022c5e]">Real-Time Audit</h4>
      </div>
      <div className="bg-blue-50 text-tzero-blue p-2.5 rounded-xl border border-blue-100/50">
        <Activity size={18} />
      </div>
    </div>
    
    <div className="space-y-3">
      <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Cpu className="text-slate-300" size={16} />
          <span className="text-slate-500 text-xs font-semibold">Answering Machine</span>
        </div>
        <span className="text-slate-400 font-bold text-xs">R$ 0,00</span>
      </div>

      <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Activity className="text-slate-300" size={16} />
          <span className="text-slate-500 text-xs font-semibold">Network Error</span>
        </div>
        <span className="text-slate-400 font-bold text-xs">R$ 0,00</span>
      </div>

      <div className="p-5 bg-[#022c5e] rounded-2xl flex justify-between items-center shadow-lg shadow-blue-900/10 transform scale-[1.02]">
        <div className="flex items-center gap-3">
          <TrendingUp className="text-tzero-blue" size={18} />
          <span className="text-white text-sm font-bold">Human Verified</span>
        </div>
        <span className="text-tzero-blue font-black text-[10px] uppercase tracking-tighter bg-white/5 px-2 py-1 rounded">CPC Charged</span>
      </div>
    </div>

    <div className="mt-8 pt-6 border-t border-slate-50 text-center">
      <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2">
        <CheckCircle2 size={12} className="text-tzero-blue" /> Guaranteed Efficiency
      </p>
    </div>
  </div>
);

const Hero: React.FC = () => {
  return (
    <div className="relative blue-gradient-soft pt-32 pb-20 lg:pt-52 lg:pb-32 overflow-hidden" id="hero">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-tzero-blue/5 text-tzero-blue px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider mb-8 border border-tzero-blue/10">
              <Zap size={14} className="fill-tzero-blue" /> Telecommunications Revolution
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-[#022c5e] leading-[1.1] mb-8 tracking-tight">
              Pague apenas por <br />
              <span className="text-tzero-blue underline decoration-slate-200">Alô Humano Efetivo.</span>
            </h1>
            
            <p className="text-lg text-slate-500 mb-12 leading-relaxed font-medium max-w-lg">
              Reduza em até 80% o desperdício de sua operação. Filtramos caixas postais e erros de rede antes que cheguem ao faturamento.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-14">
              <button className="bg-tzero-blue text-white px-10 py-4.5 rounded-xl text-sm font-bold shadow-xl shadow-blue-500/20 hover:bg-blue-600 transition-all flex items-center justify-center gap-2">
                Começar Agora
              </button>
              <button className="bg-white border border-slate-200 text-[#022c5e] px-10 py-4.5 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                <Play size={16} fill="currentColor" /> Ver Demonstração
              </button>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-400">BPO</div>
                ))}
              </div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">+500M Minutos/Ano</p>
            </div>
          </div>
          
          <div className="relative lg:block hidden">
            <div className="absolute -inset-10 bg-gradient-to-tr from-tzero-blue/10 to-transparent blur-3xl rounded-full"></div>
            <BillingCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

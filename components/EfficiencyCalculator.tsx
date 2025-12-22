
import React, { useState } from 'react';
import { TrendingUp, Calculator, ArrowRight, ShieldCheck } from 'lucide-react';

const EfficiencyCalculator: React.FC = () => {
  const [vol, setVol] = useState(1000000);
  const [waste, setWaste] = useState(45);
  const [cost, setCost] = useState(0.08);

  const annualSave = (vol * (waste / 100) * cost) * 12;

  return (
    <div className="py-24 bg-[#022c5e] relative overflow-hidden" id="roi">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 100 L100 0 L100 100 Z" fill="#0061FF" />
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 text-tzero-blue px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-8 border border-white/10 backdrop-blur-sm">
              <Calculator size={14} /> Financial Modeler
            </div>
            <h2 className="text-4xl lg:text-6xl font-extrabold text-white mb-8 tracking-tight leading-[1.1]">
              Simule seu <br /><span className="text-tzero-blue italic">Retorno Real.</span>
            </h2>
            <p className="text-blue-100/60 text-lg mb-12 font-medium leading-relaxed max-w-lg">
              Visualize quanto a sua operação está perdendo no modelo de minutos e quanto o <span className="text-white font-bold">CPC ZeroLoss</span> pode recuperar anualmente.
            </p>
            
            <div className="space-y-12 pr-10">
              <Slider label="Volume Mensal de Chamadas" val={vol.toLocaleString()} min={100000} max={10000000} step={100000} current={vol} set={setVol} />
              <Slider label="Taxa de Ineficiência (Ruído/Maquinas %)" val={`${waste}%`} min={10} max={90} step={5} current={waste} set={setWaste} />
            </div>
          </div>
          
          <div className="bg-white rounded-3xl p-12 lg:p-16 text-center shadow-2xl relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-tzero-blue p-6 rounded-2xl shadow-xl">
               <TrendingUp size={32} className="text-white" />
            </div>
            
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[11px] mb-8">Economia Estimada Anual</p>
            
            <div className="flex items-center justify-center gap-2 mb-12">
              <span className="text-3xl font-bold text-tzero-blue">R$</span>
              <span className="text-6xl lg:text-7xl font-extrabold text-[#022c5e] tracking-tighter">
                {annualSave.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>
            
            <button className="bg-tzero-blue text-white w-full py-5 rounded-xl text-sm font-bold shadow-xl shadow-blue-500/20 hover:bg-[#022c5e] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3">
              Solicitar Auditoria Técnica <ArrowRight size={18} />
            </button>
            
            <div className="mt-10 flex items-center justify-center gap-4 text-slate-300">
               <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase">
                  <ShieldCheck size={14} className="text-tzero-blue" /> Data Privacy Guaranteed
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Slider = ({ label, val, min, max, step, current, set }: any) => (
  <div className="space-y-5">
    <div className="flex justify-between font-bold text-xs uppercase tracking-wider text-blue-100/80">
      <span>{label}</span>
      <span className="text-white">{val}</span>
    </div>
    <div className="relative group">
      <input 
        type="range" min={min} max={max} step={step} value={current} 
        onChange={(e) => set(Number(e.target.value))}
        className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer outline-none accent-tzero-blue"
      />
    </div>
  </div>
);

export default EfficiencyCalculator;

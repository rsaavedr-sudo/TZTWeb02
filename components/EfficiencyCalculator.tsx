
import React, { useState } from 'react';
import { TrendingUp, DollarSign, Calculator } from 'lucide-react';

const EfficiencyCalculator: React.FC = () => {
  const [vol, setVol] = useState(500000);
  const [waste, setWaste] = useState(45);
  const [cost, setCost] = useState(0.08);

  const annualSave = (vol * (waste / 100) * cost) * 12;

  return (
    <div className="py-32 bg-white relative overflow-hidden" id="roi">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-tzero-soft to-white opacity-50 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white text-tzero-blue px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.25em] mb-8 border border-slate-200 shadow-sm">
              <Calculator size={14} /> Simulador ZeroLoss
            </div>
            <h2 className="text-4xl lg:text-7xl font-black text-[#022c5e] mb-8 tracking-tighter leading-[0.95]">Previsibilidade <br /> financeira <span className="text-tzero-blue">total.</span></h2>
            <p className="text-slate-500 text-lg mb-12 font-medium leading-relaxed max-w-lg">
              Pare de pagar por tentativas falhas. O modelo <span className="text-[#022c5e] font-bold">ZeroLoss (CPC)</span> garante que seu orçamento se converta em contatos efetivos.
            </p>
            <div className="space-y-12">
              <Slider label="Volume Mensal (CPM)" val={vol.toLocaleString()} min={100000} max={10000000} step={100000} current={vol} set={setVol} />
              <Slider label="Ineficiência Atual (Ruído %)" val={`${waste}%`} min={10} max={90} step={5} current={waste} set={setWaste} />
            </div>
          </div>
          
          <div className="bg-white rounded-[3.5rem] p-12 lg:p-20 text-center shadow-[0_50px_100px_-20px_rgba(11,28,63,0.12)] relative border border-slate-100">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#022c5e] p-7 rounded-[2rem] shadow-2xl shadow-blue-900/30">
               <TrendingUp size={42} className="text-white" />
            </div>
            <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px] mt-4 mb-8 opacity-70">Capital Recuperado Anualmente</p>
            <div className="text-6xl lg:text-8xl font-black text-[#022c5e] mb-12 tracking-tighter">
              <span className="text-tzero-blue text-3xl lg:text-4xl align-top mr-1 font-bold">R$</span>
              {annualSave.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
            <button className="bg-tzero-blue text-white w-full py-8 rounded-[2rem] text-xl font-black uppercase tracking-[0.2em] shadow-2xl shadow-blue-500/20 hover:bg-[#022c5e] transition-all transform hover:-translate-y-1">
              Ativar ZeroLoss Agora
            </button>
            <p className="mt-10 text-slate-400 text-[11px] font-bold uppercase tracking-[0.15em] border-t border-slate-50 pt-8">
              *Baseado na substituição do modelo de minutos por CPC.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Slider = ({ label, val, min, max, step, current, set }: any) => (
  <div className="space-y-6">
    <div className="flex justify-between font-black text-xs uppercase tracking-[0.25em]">
      <span className="text-slate-400">{label}</span>
      <span className="text-tzero-blue font-bold">{val}</span>
    </div>
    <div className="relative group">
      <input 
        type="range" min={min} max={max} step={step} value={current} 
        onChange={(e) => set(Number(e.target.value))}
        className="w-full h-2 bg-slate-100 border border-slate-50 rounded-full appearance-none cursor-pointer outline-none transition-all accent-tzero-blue"
      />
    </div>
  </div>
);

export default EfficiencyCalculator;

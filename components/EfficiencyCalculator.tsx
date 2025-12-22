
import React, { useState } from 'react';
import { TrendingUp, DollarSign, Calculator } from 'lucide-react';

const EfficiencyCalculator: React.FC = () => {
  const [vol, setVol] = useState(500000);
  const [waste, setWaste] = useState(45);
  const [cost, setCost] = useState(0.08);

  const annualSave = (vol * (waste / 100) * cost) * 12;

  return (
    <div className="py-24 bg-tzero-navy text-white relative overflow-hidden" id="roi">
      {/* Abstract blue background patterns */}
      <div className="absolute top-0 right-0 w-1/4 h-full bg-tzero-blue/10 skew-x-12 transform origin-right"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-tzero-blue/5 -skew-x-12 transform origin-left"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-tzero-blue/20 text-blue-200 px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.25em] mb-8 border border-white/10 shadow-lg">
              <Calculator size={14} /> Simulador ZeroLoss
            </div>
            <h2 className="text-4xl lg:text-6xl font-black mb-8 tracking-tighter leading-[0.95]">Previsibilidad <br /> financiera <span className="text-tzero-blue">total.</span></h2>
            <p className="text-blue-100/60 text-lg mb-12 font-medium leading-relaxed max-w-lg">
              Deje de pagar por intentos fallidos. El modelo ZeroLoss (CPC) garantiza que su presupuesto se convierta en contactos efectivos.
            </p>
            <div className="space-y-12">
              <Slider label="Volumen Mensual (CPM)" val={vol.toLocaleString()} min={100000} max={10000000} step={100000} current={vol} set={setVol} />
              <Slider label="Ineficiencia Actual (Ruido %)" val={`${waste}%`} min={10} max={90} step={5} current={waste} set={setWaste} />
            </div>
          </div>
          
          <div className="bg-white rounded-[3rem] p-12 lg:p-16 text-center shadow-2xl relative border-[12px] border-tzero-blue/10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-tzero-blue p-6 rounded-3xl shadow-xl">
               <TrendingUp size={36} className="text-white" />
            </div>
            <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px] mt-4 mb-8 opacity-70">Capital Recuperado Anualmente</p>
            <div className="text-5xl lg:text-8xl font-black text-tzero-navy mb-12 tracking-tighter">
              <span className="text-tzero-blue text-3xl lg:text-4xl align-top mr-1">R$</span>
              {annualSave.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
            <button className="btn-tzero-primary w-full py-7 text-xl font-black uppercase tracking-[0.2em] shadow-2xl shadow-blue-900/20">
              Activar ZeroLoss Ahora
            </button>
            <p className="mt-10 text-slate-400 text-[10px] font-bold uppercase tracking-[0.15em] border-t border-slate-50 pt-8">
              *Basado en la sustitución del modelo de minutos por CPC.
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
      <span className="text-blue-200/50">{label}</span>
      <span className="text-tzero-blue">{val}</span>
    </div>
    <div className="relative group">
      <input 
        type="range" min={min} max={max} step={step} value={current} 
        onChange={(e) => set(Number(e.target.value))}
        className="w-full h-2 bg-white/10 border border-white/5 rounded-full appearance-none cursor-pointer outline-none transition-all accent-tzero-blue"
      />
    </div>
  </div>
);

export default EfficiencyCalculator;

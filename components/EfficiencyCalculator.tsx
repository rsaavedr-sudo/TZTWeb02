
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
            <div className="inline-flex items-center gap-2 bg-tzero-blue/20 text-tzero-blue px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest mb-8 border border-tzero-blue/30 shadow-lg">
              <Calculator size={14} /> Simulador ZeroLoss
            </div>
            <h2 className="text-4xl lg:text-6xl font-black mb-8 tracking-tighter leading-tight">Previsibilidad <br /> financiera <span className="text-tzero-blue">real.</span></h2>
            <p className="text-blue-100/60 text-lg mb-12 font-medium leading-relaxed max-w-lg">
              Deje de pagar por intentos fallidos o máquinas de contestar. El modelo ZeroLoss (CPC) garantiza que su presupuesto se convierta en contactos efectivos.
            </p>
            <div className="space-y-12">
              <Slider label="Volumen Mensual (CPM)" val={vol.toLocaleString()} min={100000} max={10000000} step={100000} current={vol} set={setVol} />
              <Slider label="Ineficiencia Actual (Ruido %)" val={`${waste}%`} min={10} max={90} step={5} current={waste} set={setWaste} />
            </div>
          </div>
          
          <div className="bg-white rounded-[2.5rem] p-12 text-center shadow-2xl relative border-8 border-tzero-blue/5">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-tzero-blue p-5 rounded-2xl shadow-xl">
               <TrendingUp size={32} className="text-white" />
            </div>
            <p className="text-slate-400 font-black uppercase tracking-[0.25em] text-[10px] mt-4 mb-6">Capital Recuperado Anualmente</p>
            <div className="text-5xl lg:text-7xl font-black text-tzero-navy mb-10 tracking-tighter">
              <span className="text-tzero-blue text-3xl align-top mr-1">R$</span>
              {annualSave.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
            <button className="btn-tzero-primary w-full py-6 text-lg uppercase tracking-[0.15em] shadow-xl shadow-blue-900/10">
              Activar ZeroLoss Ahora
            </button>
            <p className="mt-8 text-slate-400 text-[10px] font-bold uppercase tracking-widest border-t border-slate-50 pt-6">
              *Basado en la sustitución del modelo de minutos por CPC.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Slider = ({ label, val, min, max, step, current, set }: any) => (
  <div className="space-y-5">
    <div className="flex justify-between font-black text-xs uppercase tracking-[0.2em]">
      <span className="text-blue-200/80">{label}</span>
      <span className="text-tzero-blue">{val}</span>
    </div>
    <div className="relative group">
      <input 
        type="range" min={min} max={max} step={step} value={current} 
        onChange={(e) => set(Number(e.target.value))}
        className="w-full h-2 bg-tzero-navy/50 border border-white/10 rounded-full appearance-none cursor-pointer outline-none transition-all"
      />
    </div>
  </div>
);

export default EfficiencyCalculator;

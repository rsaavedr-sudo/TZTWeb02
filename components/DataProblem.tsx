
import React from 'react';
import { Target, Users, LayoutGrid, CheckCircle, Search } from 'lucide-react';

const DataProblem: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24" id="tecnologia">
      <div className="bg-tzero-navy rounded-[3.5rem] overflow-hidden shadow-2xl grid lg:grid-cols-12 items-stretch">
        <div className="lg:col-span-5 p-12 lg:p-20 bg-tzero-blue text-white flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5 scale-150">
            <Search size={200} />
          </div>
          <span className="text-blue-100 font-black text-xs uppercase tracking-[0.3em] mb-6 block relative z-10">Nuestra Visión</span>
          <h2 className="text-4xl lg:text-5xl font-black mb-8 leading-tight tracking-tight relative z-10">
            ¿Qué es <br /> <span className="text-tzero-navy">Contacto Masivo?</span>
          </h2>
          <p className="text-blue-50 text-lg font-medium leading-relaxed mb-10 opacity-90 relative z-10">
            Significa contactar a muchas personas al mismo tiempo, filtrando el ruido y entregando leads con valor real, manteniendo el control técnico y legal.
          </p>
          <div className="space-y-5 relative z-10">
            <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
              <CheckCircle size={20} className="text-white" />
              <span className="font-bold text-sm tracking-tight">Eficiencia sobre Volumen</span>
            </div>
            <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
              <CheckCircle size={20} className="text-white" />
              <span className="font-bold text-sm tracking-tight">Infraestructura de Alto Flujo</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 p-12 lg:p-20 bg-white grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="w-14 h-14 bg-tzero-soft rounded-2xl flex items-center justify-center text-tzero-blue">
              <Target size={28} />
            </div>
            <h4 className="text-2xl font-black text-tzero-navy tracking-tight">Enfoque Real</h4>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              No es solo llamar mucho. Es contactar mejor. Eliminamos leads sin tratar y contactos improductivos en tiempo real.
            </p>
          </div>
          <div className="space-y-6">
            <div className="w-14 h-14 bg-tzero-soft rounded-2xl flex items-center justify-center text-tzero-blue">
              <LayoutGrid size={28} />
            </div>
            <h4 className="text-2xl font-black text-tzero-navy tracking-tight">Transparente</h4>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              Sistemas inteligentes alineados a su negocio, con trazabilidad total y previsibilidad comercial.
            </p>
          </div>
          <div className="md:col-span-2 pt-10 border-t border-slate-100 mt-4 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-md">
              <h5 className="text-tzero-navy font-black text-sm uppercase tracking-widest mb-2">Propósito T-Zero</h5>
              <p className="text-slate-400 text-xs font-bold leading-relaxed">
                Resolver los problemas de altos costos, ineficiencia técnica y riesgos regulatorios en operaciones masivas.
              </p>
            </div>
            <button className="btn-tzero-primary px-10 py-4 text-sm uppercase tracking-widest">
              Ver Propósito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataProblem;

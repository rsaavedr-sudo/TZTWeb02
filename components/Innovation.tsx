
import React from 'react';
import { Cpu, Zap, Mic2, ShieldCheck, CheckCircle } from 'lucide-react';

const Innovation: React.FC = () => {
  return (
    <div className="py-32 bg-white overflow-hidden relative" id="tecnologia">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <div className="inline-block bg-tzero-soft text-tzero-blue border border-tzero-blue/20 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 shadow-sm">
              Core Tech Infrastructure
            </div>
            <h2 className="text-4xl lg:text-6xl font-black mb-8 leading-tight tracking-tighter text-tzero-navy">
              Elimine el Desperdicio <br />
              <span className="text-tzero-blue">Opere a Escala.</span>
            </h2>
            <p className="text-slate-500 text-lg mb-12 leading-relaxed max-w-xl font-medium">
              Utilizamos IA Neural e processamento em tempo real para filtrar ruidos de red e máquinas de contestar em menos de 100ms.
            </p>

            <div className="grid sm:grid-cols-2 gap-8">
              <div className="flex flex-col gap-5 p-8 rounded-[2rem] bg-tzero-soft border border-tzero-blue/5 hover:border-tzero-blue/20 transition-all group">
                <div className="w-12 h-12 bg-tzero-blue rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                  <Cpu size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl text-tzero-navy mb-2 tracking-tight">IA Neural</h4>
                  <p className="text-slate-500 text-sm font-medium">Clasificación instantánea entre humanos y máquinas.</p>
                </div>
              </div>
              <div className="flex flex-col gap-5 p-8 rounded-[2rem] bg-tzero-soft border border-tzero-blue/5 hover:border-tzero-blue/20 transition-all group">
                <div className="w-12 h-12 bg-tzero-navy rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                  <Mic2 size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl text-tzero-navy mb-2 tracking-tight">Audio HD</h4>
                  <p className="text-slate-500 text-sm font-medium">Máxima fidelidad para una experiencia de venta premium.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
             <div className="absolute inset-0 bg-tzero-blue/10 blur-[100px] rounded-full"></div>
            <div className="relative bg-tzero-navy rounded-[3rem] p-12 shadow-[0_40px_80px_-15px_rgba(11,28,63,0.3)] text-white">
              <h4 className="text-2xl font-black mb-10 tracking-tight">Comparativa Técnica</h4>
              <div className="space-y-8">
                <div className="bg-white/5 p-8 rounded-2xl border-l-4 border-tzero-blue backdrop-blur-md">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black uppercase text-tzero-blue tracking-widest">ECOSISTEMA T-ZERO</span>
                    <CheckCircle className="text-tzero-blue" size={20} />
                  </div>
                  <h5 className="text-xl font-bold mb-3">Tarifación CPC Real</h5>
                  <ul className="text-slate-400 text-xs space-y-2 font-medium">
                    <li className="flex items-center gap-2">• Solo contactos humanos validados.</li>
                    <li className="flex items-center gap-2">• Trazabilidade técnica e econômica total.</li>
                    <li className="flex items-center gap-2">• Alineado a normas ANATEL y LGPD.</li>
                  </ul>
                </div>

                <div className="bg-black/10 p-8 rounded-2xl opacity-60 border border-white/5">
                  <span className="text-xs font-black uppercase text-slate-500 tracking-widest mb-4 block">MODELO TRADICIONAL</span>
                  <h5 className="text-xl font-bold mb-3 text-slate-300">Cobro por Minutos</h5>
                  <p className="text-slate-500 text-xs leading-relaxed font-medium">Usted paga por silencios, errores de red y grabaciones. Sin control real de ROI.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Innovation;

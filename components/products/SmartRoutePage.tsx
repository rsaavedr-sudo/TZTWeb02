
import React from 'react';
import { ArrowLeft, Activity, Globe, ShieldCheck, Cpu, Zap } from 'lucide-react';
import { AppView } from '../../App';

interface ProductPageProps {
  setView: (view: AppView) => void;
}

const SmartRoutePage: React.FC<ProductPageProps> = ({ setView }) => {
  return (
    <div className="pt-32 pb-24 bg-white animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <button 
          onClick={() => setView('landing')}
          className="flex items-center gap-2 text-slate-400 hover:text-tzero-blue font-bold text-xs uppercase tracking-widest mb-12 transition-all"
        >
          <ArrowLeft size={16} /> Voltar para Soluções
        </button>

        <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="absolute inset-0 bg-tzero-blue/10 blur-[120px] rounded-full"></div>
              <div className="relative bg-tzero-navy rounded-[3rem] p-10 text-white shadow-2xl">
                <div className="flex items-center gap-4 mb-10 pb-6 border-b border-white/10">
                  <Globe className="text-tzero-blue" size={24} />
                  <span className="text-xs font-black uppercase tracking-widest">Global Carrier Mesh</span>
                </div>
                <div className="space-y-8">
                  <div className="flex justify-between items-center bg-white/5 p-5 rounded-2xl">
                    <span className="text-sm font-bold">Latência Média</span>
                    <span className="text-tzero-green font-black tracking-tighter">&lt; 12ms</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/5 p-5 rounded-2xl">
                    <span className="text-sm font-bold">Uptime Garantido</span>
                    <span className="text-tzero-blue font-black tracking-tighter">99.99%</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/5 p-5 rounded-2xl">
                    <span className="text-sm font-bold">CODEC Adaptativo</span>
                    <span className="text-xs font-black bg-white/10 px-3 py-1 rounded">OPUS / G.711</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="bg-[#022c5e]/10 text-[#022c5e] w-16 h-16 rounded-2xl flex items-center justify-center mb-8">
              <Activity size={32} />
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-tzero-navy mb-8 tracking-tighter leading-tight">
              Smart <span className="text-tzero-blue">Route.</span>
            </h1>
            <p className="text-slate-500 text-lg font-medium leading-relaxed mb-10">
              Infraestrutura de voz para operações de altíssimo volume. Decisões de roteamento em milissegundos baseadas em qualidade, custo e taxa de atendimento.
            </p>
            <div className="space-y-4">
               {[
                 "Roteamento dinâmico LCR+Q",
                 "Proteção contra ataques de inundação SIP",
                 "Integração via Trunking Elástico",
                 "Suporte premium 24/7"
               ].map((text, i) => (
                 <div key={i} className="flex items-center gap-3 text-slate-700 font-bold text-sm">
                   <div className="w-1.5 h-1.5 rounded-full bg-tzero-blue"></div> {text}
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartRoutePage;

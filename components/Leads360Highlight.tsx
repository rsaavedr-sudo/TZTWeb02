
import React from 'react';
import { Target, Bot, Share2, Zap, ArrowRight, CheckCircle2, Repeat, MousePointer2, UserCheck, Layers } from 'lucide-react';
import { AppView } from '../App';

interface Leads360HighlightProps {
  setView: (view: AppView) => void;
}

const Leads360Highlight: React.FC<Leads360HighlightProps> = ({ setView }) => {
  const whatsappUrl = "https://wa.me/5521984520042?text=Olá! Gostaria de uma demonstração do funil inteligente Leads 360.";

  const FunnelFlowCard = () => (
    <div className="bg-white border border-slate-100 rounded-[3rem] p-10 shadow-[0_20px_50px_rgba(2,44,94,0.06)] relative overflow-hidden h-full">
      <div className="absolute top-0 right-0 w-40 h-40 bg-tzero-blue/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
      
      <div className="flex justify-between items-center mb-10">
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Leads360 Pipeline v4.2</p>
          <h4 className="text-xl font-black text-[#022c5e]">Funil Inteligente</h4>
        </div>
        <div className="bg-blue-50 text-tzero-blue p-3 rounded-2xl border border-blue-100/50">
          <Layers size={20} />
        </div>
      </div>

      <div className="space-y-4">
        {[
          { label: "Lead bruto", status: "Input Massivo", opacity: "opacity-40" },
          { label: "Lead validado", status: "Auditado Técnico", opacity: "opacity-60" },
          { label: "Lead qualificado (SDR IA)", status: "Intenção Detectada", opacity: "opacity-80" },
          { label: "Transferência humana", status: "Hot Lead Transfer", opacity: "opacity-100" },
        ].map((step, idx) => (
          <div key={idx} className={`p-4 bg-slate-50/80 rounded-2xl border border-slate-100 flex justify-between items-center transition-all ${step.opacity}`}>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-tzero-blue"></div>
              <span className="text-tzero-navy text-[12px] font-bold tracking-tight">{step.label}</span>
            </div>
            <span className="text-slate-400 font-black text-[9px] uppercase tracking-tighter bg-white px-2 py-1 rounded border border-slate-100">
              {step.status}
            </span>
          </div>
        ))}
        
        {/* Conversão em Destaque */}
        <div className="p-5 bg-tzero-navy rounded-2xl flex justify-between items-center shadow-lg shadow-blue-900/10 mt-6 border border-white/5">
          <div className="flex items-center gap-3">
            <UserCheck className="text-tzero-blue" size={20} />
            <span className="text-white text-sm font-black italic">Conversão automática ou assistida</span>
          </div>
          <span className="text-tzero-blue font-black text-[9px] uppercase tracking-tighter bg-white/5 px-2 py-1 rounded">End of Funnel</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white py-24 border-t border-slate-50 overflow-hidden" id="leads360-extension">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-tzero-blue/5 text-tzero-blue px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8 border border-tzero-blue/10">
              <Zap size={14} className="fill-tzero-blue" /> Camada de Aquisição & Qualificação
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-black text-[#022c5e] tracking-tighter leading-[0.95] mb-8">
              Captação inteligente de leads. <br />
              <span className="text-tzero-blue">Escala, qualidade e automação.</span>
            </h2>
            
            <p className="text-slate-500 text-lg font-medium leading-relaxed mb-10 max-w-xl">
              Leads 360 combina três motores de aquisição para alimentar seu funil com leads qualificados, depurados automaticamente por agentes de IA.
            </p>

            <div className="grid sm:grid-cols-1 gap-y-4 mb-12">
              {[
                "IVR Reverso para ativação massiva e imediata",
                "Tráfego pago integrado ao funil inteligente",
                "Viralização horizontal com afiliados e comunidades",
                "SDR automatizado com classificação em tempo real",
                "Encaminhamento ao vendedor só quando o lead está pronto",
                "Venda 100% automatizada quando aplicável"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 group">
                  <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-tzero-blue transition-colors">
                    <CheckCircle2 size={14} className="text-tzero-blue group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-sm font-bold text-slate-600 tracking-tight">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => setView('leads360')}
                className="bg-[#022c5e] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-tzero-blue transition-all shadow-xl shadow-blue-900/10 flex items-center justify-center gap-2"
              >
                Entenda o Leads 360
              </button>
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-slate-200 text-[#022c5e] px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
              >
                Ver como funciona o funil inteligente <ArrowRight size={16} />
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 bg-tzero-blue/5 blur-[100px] rounded-full"></div>
            <div className="relative transform rotate-1">
              <FunnelFlowCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leads360Highlight;

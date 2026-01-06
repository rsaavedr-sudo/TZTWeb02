
import React from 'react';
import { ArrowRight, Activity, Zap, MessageSquareText, Check, Layers } from 'lucide-react';
import { AppView } from '../App';

interface SolutionsProps {
  setView: (view: AppView) => void;
}

const products = [
  {
    id: "zeroloss",
    title: "ZeroLoss",
    highlight: true,
    tag: "Modelo de Tarifação",
    desc: "Introduz um novo modelo de campanhas massivas baseado em CPC – Custo por Contato Humano Efetivo. Substitui a lógica tradicional de cobrança por minutos.",
    features: ["Substituição de Minutos por CPC", "Foco em Alô Humano Efetivo", "Alinhamento Custo-Resultado"],
    icon: <Zap className="text-white" size={24} />,
    color: "bg-tzero-blue"
  },
  {
    id: "smartroute",
    title: "Smart Route",
    tag: "Infraestrutura Inteligente",
    desc: "Oferece uma infraestrutura de telefonia inteligente para alto volume, com decisões técnicas em tempo real e maior estabilidade.",
    features: ["Decisões em Tempo Real", "Estabilidade Operacional", "Redução de Tráfego Improdutivo"],
    icon: <Activity className="text-white" size={24} />,
    color: "bg-[#022c5e]"
  },
  {
    id: "leads360",
    title: "Leads360",
    tag: "Tratamento de Leads",
    desc: "Permite a captação, tratamento e classificação inteligente de leads antes do contato humano, integrando múltiplos canais.",
    features: ["Classificação Inteligente", "Integração Multicanal", "Tratamento Pré-Contato"],
    icon: <MessageSquareText className="text-white" size={24} />,
    color: "bg-slate-800"
  }
];

const Solutions: React.FC<SolutionsProps> = ({ setView }) => {
  return (
    <div className="py-24 bg-white" id="soluções">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-tzero-blue/5 text-tzero-blue px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider mb-6 border border-tzero-blue/10">
              <Layers size={14} className="fill-tzero-blue" /> Nosso Ecossistema
            </div>
            <h2 className="text-4xl lg:text-6xl font-extrabold text-[#022c5e] mb-8 tracking-tight leading-[1.05]">
              Nossas <span className="text-tzero-blue font-light">Soluções</span>
            </h2>
            <p className="text-slate-500 font-medium text-lg leading-relaxed">
              As soluções da T-Zero Tech são desenvolvidas a partir das necessidades reais de operações de campanhas massivas.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {products.map((p) => (
            <div key={p.id} className={`flex flex-col p-10 rounded-3xl border transition-all duration-500 group ${p.highlight ? 'border-tzero-blue/20 bg-tzero-soft/50 shadow-2xl relative' : 'border-slate-100 hover:border-slate-200'}`}>
              <div className={`${p.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-10 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {p.icon}
              </div>
              
              <div className="mb-6">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">{p.tag}</span>
                <h3 className="text-2xl font-extrabold text-[#022c5e]">{p.title}</h3>
              </div>

              <p className="text-slate-500 text-sm leading-relaxed mb-10 font-medium min-h-[80px]">
                {p.desc}
              </p>

              <div className="space-y-4 mb-12 flex-grow">
                {p.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs font-bold text-slate-600">
                    <Check size={14} className="text-tzero-blue shrink-0" /> {f}
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setView(p.id as AppView)}
                className={`w-full py-4 rounded-xl font-bold text-[12px] uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${p.highlight ? 'bg-tzero-blue text-white hover:bg-[#022c5e]' : 'bg-slate-50 text-[#022c5e] hover:bg-slate-100'}`}
              >
                Ver Detalhes Técnicos <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Solutions;

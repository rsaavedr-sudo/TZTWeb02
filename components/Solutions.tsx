
import React from 'react';
import { ArrowRight, Activity, Zap, MessageSquareText, Check, Layers, Search } from 'lucide-react';
import { AppView } from '../App';

interface SolutionsProps {
  setView: (view: AppView) => void;
}

const products = [
  {
    id: "zeroloss",
    title: "ZeroLoss",
    category: "MODELO DE TARIFAÇÃO",
    desc: "Introduz um novo modelo de campanhas massivas baseado em CPC – Custo por Contato Humano Efetivo. Substitui a lógica tradicional de cobrança por minutos.",
    features: ["Substituição de Minutos por CPC", "Foco em Alô Humano Efetivo", "Alinhamento Custo-Resultado"],
    icon: Zap
  },
  {
    id: "smartroute",
    title: "Smart Route",
    category: "INFRAESTRUTURA INTELIGENTE",
    desc: "Oferece uma infraestrutura de telefonia inteligente para alto volume, com decisões técnicas em tempo real e maior estabilidade.",
    features: ["Decisões em Tempo Real", "Estabilidade Operacional", "Redução de Tráfego Improdutivo"],
    icon: Activity
  },
  {
    id: "leads360",
    title: "Leads360",
    category: "TRATAMENTO DE LEADS",
    desc: "Permite a captação, tratamento e classificação inteligente de leads antes do contato humano, integrando múltiplos canais.",
    features: ["Classificação Inteligente", "Integração Multicanal", "Tratamento Pré-Contato"],
    icon: MessageSquareText
  },
  {
    id: "umd",
    title: "UMD",
    category: "CLASSIFICADOR SAAS AVANÇADO",
    desc: "Solução avançada para contact centers ativos que elimina automaticamente ligações improdutivas antes do faturamento operacional.",
    features: ["Eliminação de Máquinas e IAs", "Compatível com SIP/ISDN/GSM", "Custo Zero para Inválidas"],
    icon: Search
  }
];

const Solutions: React.FC<SolutionsProps> = ({ setView }) => {
  return (
    <div className="py-24 bg-[#F8FAFF]" id="soluções">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-tzero-blue/5 text-tzero-blue px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider mb-6 border border-tzero-blue/10">
              <Layers size={14} className="fill-tzero-blue" /> Nosso Ecossistema
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#022c5e] mb-6 tracking-tight leading-tight">
              Nossas <span className="text-tzero-blue font-light">Soluções</span>
            </h2>
            <p className="text-slate-500 font-medium text-lg leading-relaxed">
              As soluções da ZERO2ONE são desenvolvidas a partir das necessidades reais de operações de campanhas massivas.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {products.map((p) => {
            const Icon = p.icon;
            return (
              <div 
                key={p.id} 
                className="flex flex-col p-8 rounded-[2rem] border bg-white border-slate-100 transition-all duration-500 group cursor-pointer hover:scale-105 hover:-translate-y-2 hover:shadow-[0_40px_80px_-15px_rgba(2,44,94,0.12)]"
                onClick={() => setView(p.id as AppView)}
              >
                {/* Icon Section - Grey initially, blue on hover */}
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-sm bg-slate-100 text-slate-400 group-hover:bg-[#0061FF] group-hover:text-white group-hover:shadow-blue-500/20 group-hover:scale-110 transition-all duration-300">
                  <Icon size={20} />
                </div>
                
                {/* Header Section */}
                <div className="mb-4">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-1 block">{p.category}</span>
                  <h3 className="text-2xl font-extrabold text-[#022c5e] group-hover:text-tzero-blue transition-colors tracking-tight">{p.title}</h3>
                </div>

                {/* Description */}
                <p className="text-slate-500 text-[13px] leading-relaxed mb-8 font-medium min-h-[60px]">
                  {p.desc}
                </p>

                {/* Features Checklist */}
                <div className="space-y-3 mb-8 flex-grow">
                  {p.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-bold text-[#022c5e]">
                      <Check size={14} className="text-[#0061FF] shrink-0" /> {f}
                    </div>
                  ))}
                </div>

                {/* Action Button - Grey initially, Blue on hover */}
                <button 
                  className="w-full py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.1em] transition-all duration-300 flex items-center justify-center gap-2 bg-slate-50 text-[#022c5e] group-hover:bg-[#0061FF] group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-500/20"
                >
                  VER DETALHES <ArrowRight size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Solutions;

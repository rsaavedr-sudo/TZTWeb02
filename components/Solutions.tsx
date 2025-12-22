
import React from 'react';
import { ArrowRight, Activity, Zap, MessageSquareText, Check } from 'lucide-react';

const products = [
  {
    id: "zeroloss",
    title: "ZeroLoss",
    highlight: true,
    tag: "Core Model",
    desc: "A revolução na tarifação. Pague apenas quando um contato humano efetivo é transferido para o seu agente.",
    features: ["Custo por Contato (CPC)", "Auditoria Real-Time", "Eliminação de Bipes"],
    icon: <Zap className="text-white" size={24} />,
    color: "bg-tzero-blue"
  },
  {
    id: "smartroute",
    title: "Smart Route",
    tag: "Connectivity",
    desc: "Infraestrutura de alta disponibilidade desenhada para operadoras e grandes BPOs com classificação neural de tráfego.",
    features: ["Fidelidade de Áudio HD", "Estabilidade de Rede", "Uptime de 99.9%"],
    icon: <Activity className="text-white" size={24} />,
    color: "bg-[#022c5e]"
  },
  {
    id: "leads360",
    title: "Leads360",
    tag: "Lead Intelligence",
    desc: "Captação híbrida e tratamento inteligente. Classifica leads MQL/SQL antes de entregá-los à força de vendas.",
    features: ["Híbrido Multifonte", "Integração ManyChat/Umber", "Leads Classificados"],
    icon: <MessageSquareText className="text-white" size={24} />,
    color: "bg-slate-800"
  }
];

const Solutions: React.FC = () => {
  return (
    <div className="py-24 bg-white" id="soluções">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-tzero-blue font-bold text-xs uppercase tracking-widest mb-4 block">Portfólio de Produtos</span>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#022c5e] mb-6 tracking-tight">
            Soluções de <span className="text-tzero-blue font-light">Classe Mundial</span>
          </h2>
          <p className="text-slate-500 font-medium text-lg leading-relaxed">
            Tecnologia integrada para escalar operações de contato massivo com transparência absoluta.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {products.map((p) => (
            <div key={p.id} className={`flex flex-col p-10 rounded-3xl border transition-all duration-300 group ${p.highlight ? 'border-tzero-blue/20 bg-tzero-soft/50 shadow-2xl' : 'border-slate-100 hover:border-slate-200'}`}>
              <div className={`${p.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-10 shadow-lg group-hover:scale-110 transition-transform`}>
                {p.icon}
              </div>
              
              <div className="mb-6">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">{p.tag}</span>
                <h3 className="text-2xl font-extrabold text-[#022c5e]">{p.title}</h3>
              </div>

              <p className="text-slate-500 text-sm leading-relaxed mb-10 font-medium">
                {p.desc}
              </p>

              <div className="space-y-4 mb-12 flex-grow">
                {p.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs font-bold text-slate-600">
                    <Check size={14} className="text-tzero-blue" /> {f}
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 rounded-xl font-bold text-[12px] uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${p.highlight ? 'bg-tzero-blue text-white hover:bg-[#022c5e]' : 'bg-slate-50 text-[#022c5e] hover:bg-slate-100'}`}>
                Explorar Solução <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Solutions;

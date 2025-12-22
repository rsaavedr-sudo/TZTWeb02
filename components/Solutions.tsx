
import React from 'react';
import { ShieldCheck, Zap, Users, ArrowRight, Activity, Database, Sparkles, MessageSquareText } from 'lucide-react';

const products = [
  {
    id: "zeroloss",
    title: "ZeroLoss",
    highlight: true,
    tag: "Foco Principal",
    desc: "Substitui a cobrança por minutos. Você paga exclusivamente quando um contato humano efetivo é transferido para sua operação.",
    benefits: ["Custo por Contato (CPC)", "Previsibilidade Financeira", "Eliminação de desperdício"],
    icon: <Users className="text-white" size={32} />,
    color: "bg-tzero-blue"
  },
  {
    id: "smartroute",
    title: "Smart Route",
    tag: "Infraestrutura",
    desc: "Rota inteligente desenhada para alto fluxo. Classificação avançada e decisões técnicas em tempo real para máxima estabilidade.",
    benefits: ["Otimização de grandes volumes", "Estabilidade operacional", "Decisões em real-time"],
    icon: <Zap className="text-white" size={32} />,
    color: "bg-tzero-navy"
  },
  {
    id: "leads360",
    title: "Leads360",
    tag: "Inteligência de Leads",
    desc: "Modelo de captación híbrida y tratamiento inteligente. Opera campañas multifuente, reduce la dependencia del tráfico pago y clasifica leads antes de llegar al humano.",
    benefits: ["Preclasificación MQL/SQL", "Integración Chat (ManyChat/Umber)", "Tratamiento Multifuente"],
    icon: <MessageSquareText className="text-white" size={32} />,
    color: "bg-[#1E293B]"
  }
];

const Solutions: React.FC = () => {
  return (
    <div className="py-24 bg-tzero-soft" id="soluções">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-tzero-blue font-black text-xs uppercase tracking-[0.3em] mb-4 block">Nosso Portfólio</span>
          <h2 className="text-4xl lg:text-5xl font-black text-tzero-navy mb-6 tracking-tight leading-none">
            O Ecossistema <span className="text-tzero-blue">T-Zero</span>
          </h2>
          <p className="text-slate-500 text-lg font-medium leading-relaxed">
            Três soluções integradas para transformar sua comunicação massiva em um sistema inteligente, transparente e escalável.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {products.map((p) => (
            <div key={p.id} className={`relative flex flex-col bg-white rounded-[2rem] p-10 border transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${p.highlight ? 'border-tzero-blue shadow-xl ring-4 ring-tzero-blue/5 z-10' : 'border-slate-100'}`}>
              {p.highlight && (
                <div className="absolute -top-4 left-10 bg-tzero-blue text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center gap-2">
                  <Sparkles size={12} fill="white" /> Recomendado
                </div>
              )}
              
              <div className={`${p.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-inner`}>
                {p.icon}
              </div>
              
              <div className="mb-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{p.tag}</span>
                <h3 className="text-3xl font-black text-tzero-navy mt-1 mb-6">{p.title}</h3>
              </div>

              <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
                {p.desc}
              </p>

              <div className="space-y-4 mb-10 flex-grow">
                {p.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs font-bold text-tzero-navy uppercase tracking-tight">
                    <Activity size={14} className="text-tzero-blue" /> {benefit}
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${p.highlight ? 'bg-tzero-blue text-white hover:bg-tzero-navy' : 'bg-slate-100 text-tzero-navy hover:bg-slate-200'}`}>
                Saiba Mais <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Solutions;

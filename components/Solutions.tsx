
import React from 'react';
import { ShieldCheck, Zap, Users, ArrowRight, Activity, Database, Sparkles } from 'lucide-react';

const products = [
  {
    id: "zeroloss",
    title: "ZeroLoss",
    highlight: true,
    tag: "Foco Principal",
    desc: "Reemplaza el cobro por minutos. Usted paga exclusivamente cuando un contacto humano efectivo es transferido a su operación.",
    benefits: ["Custo por Contato (CPC)", "Previsibilidad Financiera", "Eliminación de desperdicio"],
    icon: <Users className="text-white" size={32} />,
    color: "bg-tzero-blue"
  },
  {
    id: "smartroute",
    title: "Smart Route",
    tag: "Infraestructura",
    desc: "Ruta inteligente diseñada para alto flujo. Clasificación avanzada y decisiones técnicas en tiempo real para máxima estabilidad.",
    benefits: ["Optimización de grandes volúmenes", "Estabilidad operativa", "Decisiones en real-time"],
    icon: <Zap className="text-white" size={32} />,
    color: "bg-tzero-navy"
  },
  {
    id: "leads360",
    title: "Leads360",
    tag: "Inteligencia de Leads",
    desc: "Tratamiento y clasificación inteligente (MQL/SQL). No entregamos listas; entregamos leads tratados y listos para la venta.",
    benefits: ["Captación híbrida", "Integración con CRMs/Chats", "Clasificación automática"],
    icon: <Database className="text-white" size={32} />,
    color: "bg-slate-700"
  }
];

const Solutions: React.FC = () => {
  return (
    <div className="py-24 bg-tzero-soft" id="soluções">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-tzero-blue font-black text-xs uppercase tracking-[0.3em] mb-4 block">Nuestro Portafolio</span>
          <h2 className="text-4xl lg:text-5xl font-black text-tzero-navy mb-6 tracking-tight leading-none">
            El Ecosistema <span className="text-tzero-blue">T-Zero</span>
          </h2>
          <p className="text-slate-500 text-lg font-medium leading-relaxed">
            Tres soluciones integradas para transformar su comunicación masiva en un sistema inteligente, transparente y escalable.
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

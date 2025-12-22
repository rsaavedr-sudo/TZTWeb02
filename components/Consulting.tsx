
import React from 'react';
import { ArrowRight, BarChart, ShieldAlert, LineChart, CheckCircle2 } from 'lucide-react';

const consultingData = [
  {
    title: "Inteligencia de Negocio",
    desc: "Resolvemos la baja previsibilidad financiera y la ineficiencia comercial con consultoría en KPIs y ROI real.",
    image: "https://images.unsplash.com/photo-1551288049-bbda4833effb?q=80&w=1470&auto=format&fit=crop",
    icon: <BarChart className="text-white" size={22} />,
    color: "bg-tzero-blue"
  },
  {
    title: "Riesgo & Regulación",
    desc: "Cumplimiento total con ANATEL y LGPD. Eliminamos el riesgo técnico y jurídico de su operación masiva.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1470&auto=format&fit=crop",
    icon: <ShieldAlert className="text-white" size={22} />,
    color: "bg-tzero-navy"
  },
  {
    title: "Auditoría Operacional",
    desc: "Tratamiento y clasificación de leads (MQL/SQL) para que su equipo humano solo hable con quien importa.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1426&auto=format&fit=crop",
    icon: <LineChart className="text-white" size={22} />,
    color: "bg-slate-600"
  }
];

const Consulting: React.FC = () => {
  return (
    <div className="py-24 bg-white" id="empresa">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-20">
          <div className="max-w-2xl">
            <span className="text-tzero-blue font-black text-xs uppercase tracking-[0.4em] mb-4 block">Propósito Estratégico</span>
            <h2 className="text-4xl lg:text-6xl font-black text-tzero-navy tracking-tight leading-[0.95]">
              Resolvemos los <br /> <span className="text-tzero-blue">Gargalos</span> Operativos.
            </h2>
          </div>
          <p className="text-slate-500 text-lg font-medium max-w-sm leading-relaxed border-l-4 border-tzero-blue pl-8">
            Alineamos tecnología, negocio y cumplimiento normativo en un sistema inteligente y transparente.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {consultingData.map((item, idx) => (
            <div key={idx} className="bg-tzero-soft rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-slate-100 group flex flex-col">
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className={`absolute top-8 left-8 ${item.color} p-5 rounded-2xl shadow-2xl`}>
                  {item.icon}
                </div>
              </div>
              <div className="p-12 flex flex-col flex-grow">
                <h3 className="text-2xl font-black text-tzero-navy mb-5 tracking-tight leading-tight">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-10 font-medium">
                  {item.desc}
                </p>
                <div className="mt-auto">
                  <button className="flex items-center gap-3 text-tzero-blue font-black text-[11px] uppercase tracking-widest hover:text-tzero-navy transition-colors">
                    Ver Detalles <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Consulting;

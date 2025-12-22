
import React from 'react';
import { ArrowRight, BarChart, ShieldAlert, LineChart } from 'lucide-react';

const consultingData = [
  {
    title: "Inteligencia de Negocio",
    desc: "Análisis profundo de KPIs para maximizar la rentabilidad de su operación masiva con dashboards en tiempo real.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e5381bb03?q=80&w=1470&auto=format&fit=crop",
    icon: <BarChart className="text-white" size={22} />,
    color: "bg-tzero-blue"
  },
  {
    title: "Riesgo & Regulación",
    desc: "Consultoría experta para garantizar que su escala masiva cumpla con todas las normativas internacionales de privacidad.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1374&auto=format&fit=crop",
    icon: <ShieldAlert className="text-white" size={22} />,
    color: "bg-tzero-navy"
  },
  {
    title: "Auditoría Operacional",
    desc: "Equipos de alto rendimiento revisando procesos para garantizar que cada contacto transferido sea una oportunidad real.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1470&auto=format&fit=crop",
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
              Eficiencia que genera <br /> <span className="text-tzero-blue">Optimismo.</span>
            </h2>
          </div>
          <p className="text-slate-500 text-lg font-medium max-w-sm leading-relaxed border-l-4 border-tzero-blue pl-8">
            Nuestra consultoría une tecnología y capital humano para crear operaciones de contacto masivo sin precedentes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {consultingData.map((item, idx) => (
            <div key={idx} className="bg-tzero-soft rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-slate-100 group flex flex-col">
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 grayscale-[0.2] group-hover:grayscale-0"
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

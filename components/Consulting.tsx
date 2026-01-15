
import React from 'react';
import { ArrowRight, BarChart, ShieldAlert, LineChart } from 'lucide-react';

const consultingData = [
  {
    title: "IA Integrada a Processos de Call Center",
    desc: "Aplicamos modelos de inteligência artificial diretamente nos fluxos operacionais de call centers e operations de vendas ativas, atuando em classificação de chamadas, roteamento inteligente, análise de voz e otimização de resultados em tempo real.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1632&auto=format&fit=crop",
    icon: <BarChart className="text-white" size={22} />,
    color: "bg-tzero-blue"
  },
  {
    title: "Risco & Regulação",
    desc: "Orientamos campanhas ativas de telefonia para que operem dentro das exigências regulatórias brasileiras, reduzindo risco jurídico e garantindo a continuidade da operação em escala.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1471&auto=format&fit=crop",
    icon: <ShieldAlert className="text-white" size={22} />,
    color: "bg-tzero-navy"
  },
  {
    title: "Auditoria Operacional",
    desc: "Nossa tecnologia realiza auditorias ativas e em tempo real sobre as operações de call center, tornando visíveis ligações improdutivas e eventos operacionais que normalmente passam despercebidos. Esse modelo avançado de auditoria permite identificar desperdícios, corrigir rotas e garantir que cada contato transferido represente uma oportunidade real.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1470&auto=format&fit=crop",
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
            <span className="text-tzero-blue font-black text-xs uppercase tracking-[0.4em] mb-4 block">Consultoria Estratégica</span>
            <h2 className="text-4xl lg:text-6xl font-black text-tzero-navy tracking-tight leading-[0.95]">
              Eficiência que gera <br /> <span className="text-tzero-blue">Resultado.</span>
            </h2>
          </div>
          <p className="text-slate-500 text-lg font-medium max-w-sm leading-relaxed border-l-4 border-tzero-blue pl-8">
            Nossa consultoria integra tecnologia e capital humano para estruturar operações de call center de alta performance, orientadas a eficiência, escala e resultado.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {consultingData.map((item, idx) => (
            <div key={idx} className="bg-tzero-soft rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-slate-100 group flex flex-col">
              <div className="relative h-72 overflow-hidden bg-slate-200">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 group-hover:brightness-110"
                  loading="lazy"
                />
                <div className={`absolute top-8 left-8 ${item.color} p-5 rounded-2xl shadow-2xl z-10`}>
                  {item.icon}
                </div>
                {/* Overlay sutil para melhorar contraste do ícone se necessário */}
                <div className="absolute inset-0 bg-gradient-to-t from-tzero-navy/20 to-transparent opacity-40 group-hover:opacity-20 transition-opacity"></div>
              </div>
              <div className="p-12 flex flex-col flex-grow">
                <h3 className="text-2xl font-black text-tzero-navy mb-5 tracking-tight leading-tight">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-10 font-medium">
                  {item.desc}
                </p>
                <div className="mt-auto">
                  <button className="flex items-center gap-3 text-tzero-blue font-black text-[11px] uppercase tracking-widest hover:text-tzero-navy transition-colors">
                    Ver Detalhes <ArrowRight size={16} />
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

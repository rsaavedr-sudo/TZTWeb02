
import React from 'react';
import { ShieldCheck, TrendingDown, Users, CheckCircle2 } from 'lucide-react';

const RiskInversion: React.FC = () => {
  const whatsappUrl = "https://wa.me/5521984520042?text=Olá! Gostaria de solicitar um diagnóstico de risco e agendar uma demonstração.";

  const riskCards = [
    {
      title: "Previsibilidade Comercial",
      desc: "Saiba exatamente quanto custará cada contato antes mesmo de iniciar a campanha. Sem surpresas com operadoras.",
      icon: <TrendingDown size={28} />
    },
    {
      title: "Foco no Core Business",
      desc: "Seus gestores param auditar contas e começam a analisar performance de conversão dos agentes.",
      icon: <Users size={28} />
    },
    {
      title: "Zero custo para chamadas improdutivas",
      desc: "ZeroLoss absorve os custos invisíveis das campanhas. Você paga apenas pelo que realmente importa: o contato humano real.",
      icon: <ShieldCheck size={28} />
    }
  ];

  return (
    <div className="bg-white py-32 border-t border-slate-100" id="processo">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-24">
          <span className="text-tzero-blue font-black text-xs uppercase tracking-[0.4em] mb-4 block">Zero custo em ligações improdutivas</span>
          <h2 className="text-5xl lg:text-7xl font-black text-[#022c5e] italic tracking-tighter mb-8">
            Inversão de Risco Operacional
          </h2>
          <p className="text-slate-500 text-xl font-medium max-w-3xl mx-auto leading-relaxed">
            Transferimos o risco técnico do seu BPO para a nossa tecnologia. <span className="text-[#022c5e] font-bold">Se não houver contato humano efetivo, não há cobrança.</span>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {riskCards.map((item, i) => (
            <div 
              key={i} 
              className="bg-white border border-slate-100 p-12 rounded-[2.5rem] transition-all duration-500 group cursor-pointer hover:scale-105 hover:-translate-y-2 hover:shadow-[0_40px_80px_-15px_rgba(2,44,94,0.12)]"
            >
              {/* Icon Container - Starts Grey, turns Blue on Hover */}
              <div className="mb-10 w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center shadow-sm group-hover:bg-[#0061FF] group-hover:text-white group-hover:shadow-blue-500/20 group-hover:scale-110 transition-all duration-300">
                {item.icon}
              </div>
              
              {/* Title changes color on hover */}
              <h3 className="text-2xl font-black text-[#022c5e] mb-4 tracking-tight group-hover:text-tzero-blue transition-colors">
                {item.title}
              </h3>
              
              <p className="text-slate-500 font-medium leading-relaxed mb-8">
                {item.desc}
              </p>
              
              <div className="mt-auto pt-8 border-t border-slate-50">
                <div className="flex items-center gap-2 text-[10px] font-black text-tzero-blue uppercase tracking-widest transition-all group-hover:gap-3">
                  <CheckCircle2 size={14} /> Garantia ZeroLoss
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-24 bg-tzero-soft/50 p-12 rounded-[3.5rem] border border-tzero-blue/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-tzero-blue/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
             <div>
                <h4 className="text-3xl font-black text-[#022c5e] mb-4">Pronto para inverter seu risco?</h4>
                <p className="text-slate-500 font-medium">Nossa arquitetura foi desenhada para BPOs que buscam rentabilidade absoluta através da inteligência técnica.</p>
             </div>
             <div className="flex justify-end">
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#022c5e] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-tzero-blue transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center"
                >
                  Agendar uma Demonstração
                </a>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskInversion;

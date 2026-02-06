
import React from 'react';
import { Target, Bot, Share2, Zap, ArrowRight } from 'lucide-react';
import { AppView } from '../App';

interface Leads360HighlightProps {
  setView: (view: AppView) => void;
}

const Leads360Highlight: React.FC<Leads360HighlightProps> = ({ setView }) => {
  const whatsappUrl = "https://wa.me/5521984520042?text=Olá! Gostaria de uma demonstração da máquina de aquisição Leads360.";

  const features = [
    {
      title: "Captação Multicanal",
      desc: "Integramos Tráfego Pago, URA Reversa e Viralização para inundar sua operação com volume real de interessados.",
      icon: <Target size={28} />
    },
    {
      title: "Qualificação SDR-AI",
      desc: "Nossa IA atua 24/7 filtrando a intenção de cada lead antes mesmo do primeiro contato humano da sua equipe.",
      icon: <Bot size={28} />
    },
    {
      title: "Viralização Horizontal",
      desc: "Transformamos usuários em multiplicadores da sua mensagem, gerando alcance orgânico e prova social massiva.",
      icon: <Share2 size={28} />
    }
  ];

  return (
    <div className="bg-slate-50/50 py-32 border-t border-slate-100" id="leads360-highlight">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-24">
          <span className="text-tzero-blue font-black text-xs uppercase tracking-[0.4em] mb-4 block">Máquina de Atenção Qualificada</span>
          <h2 className="text-5xl lg:text-7xl font-black text-[#022c5e] italic tracking-tighter mb-8">
            Aquisição Inteligente Leads360
          </h2>
          <p className="text-slate-500 text-xl font-medium max-w-3xl mx-auto leading-relaxed">
            Não entregamos apenas dados, entregamos <span className="text-tzero-blue font-bold">intenção qualificada</span>. Transforme volume bruto em oportunidades reais de fechamento.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {features.map((item, i) => (
            <div 
              key={i} 
              className="bg-white border border-slate-100 p-12 rounded-[2.5rem] transition-all duration-500 group cursor-pointer hover:scale-105 hover:-translate-y-2 hover:shadow-[0_40px_80px_-15px_rgba(2,44,94,0.12)] flex flex-col h-full"
              onClick={() => setView('leads360')}
            >
              <div className="mb-10 w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center shadow-sm group-hover:bg-[#0061FF] group-hover:text-white group-hover:shadow-blue-500/20 group-hover:scale-110 transition-all duration-300">
                {item.icon}
              </div>
              
              <h3 className="text-2xl font-black text-[#022c5e] mb-4 tracking-tight group-hover:text-tzero-blue transition-colors">
                {item.title}
              </h3>
              
              <p className="text-slate-500 font-medium leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-24 bg-[#022c5e] p-12 rounded-[3.5rem] border border-white/5 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-tzero-blue/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10 text-white">
             <div>
                <h4 className="text-3xl font-black mb-4">Escala máxima com inteligência?</h4>
                <p className="text-blue-100/60 font-medium">O Leads360 é o motor de crescimento para BPOs que não aceitam depender apenas de bases de dados frias.</p>
             </div>
             <div className="flex justify-end gap-4">
                <button 
                  onClick={() => setView('leads360')}
                  className="bg-white/10 text-white px-8 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white/20 transition-all border border-white/10"
                >
                  Ver Detalhes
                </button>
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-tzero-blue text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white hover:text-[#022c5e] transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2"
                >
                  Demonstração <Zap size={16} fill="currentColor" />
                </a>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leads360Highlight;

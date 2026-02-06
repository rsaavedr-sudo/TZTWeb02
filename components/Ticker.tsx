
import React from 'react';
import { Zap } from 'lucide-react';

const Ticker: React.FC = () => {
  const phrases = [
    "1. ZeroLoss: Call center ativo com cobrança por CPC (contato humano efetivo).",
    "2. Adeus minutos: você paga só quando há transferência real ao agente.",
    "3. Leads 360: captação massiva com qualificação automática por IA.",
    "4. Vendas mais eficientes: só chegam ao time leads prontos (ou venda 100% IA)."
  ];

  const content = phrases.join(" • ") + " • ";

  return (
    <div className="w-full bg-[#022c5e] py-5 flex items-center overflow-hidden border-y border-white/10 shadow-lg relative z-20">
      <div className="animate-marquee">
        {/* Render multiple times for seamless loop */}
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center">
            {phrases.map((phrase, idx) => (
              <span key={idx} className="flex items-center text-white font-black text-[13px] uppercase tracking-[0.15em]">
                <span className="px-8">{phrase}</span>
                <Zap size={14} className="text-tzero-blue fill-tzero-blue mx-2" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ticker;

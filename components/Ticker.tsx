
import React from 'react';

const Ticker: React.FC = () => {
  const message = "Com Leads 360, gere leads em tempo real por meio de campanhas multicanal ativas, transfira os interessados para nossas ferramentas automatizadas e qualifique-os antes de encaminhá-los para o atendimento humano* Pague apenas por Alô Humano Efetivo — ";

  return (
    <div className="w-full bg-transparent py-4 flex items-center overflow-hidden">
      <div className="animate-marquee">
        <span className="text-tzero-blue font-black text-[12px] uppercase tracking-[0.2em] px-4">
          {message}
        </span>
        <span className="text-tzero-blue font-black text-[12px] uppercase tracking-[0.2em] px-4">
          {message}
        </span>
        <span className="text-tzero-blue font-black text-[12px] uppercase tracking-[0.2em] px-4">
          {message}
        </span>
        <span className="text-tzero-blue font-black text-[12px] uppercase tracking-[0.2em] px-4">
          {message}
        </span>
      </div>
    </div>
  );
};

export default Ticker;


import React from 'react';
import { Target, UserCheck, Search, CheckCircle2 } from 'lucide-react';

const targets = [
  {
    title: "Vendas Ativas",
    desc: "Aumente o tempo de conversa real. Elimine a fadiga de ouvir toques e bipes de operadora.",
    icon: <Target className="text-telgoo-blue" />
  },
  {
    title: "Cobrança (Collections)",
    desc: "Fale diretamente com o cliente. Evite secretárias que derrubam a efetividade da cobrança.",
    icon: <UserCheck className="text-telgoo-blue" />
  },
  {
    title: "Prospecção B2B",
    desc: "Qualifique leads massivamente filtrando sinais de rede defeituosos ou números inexistentes.",
    icon: <Search className="text-telgoo-blue" />
  }
];

const TargetAudience: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24" id="público">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <span className="text-telgoo-blue font-black text-xs uppercase tracking-[0.3em] mb-4 block">Foco em Performance</span>
          <h2 className="text-4xl lg:text-5xl font-black text-telgoo-navy mb-10 leading-tight">
            Escala Real para <br /> sua Operação.
          </h2>
          <div className="space-y-8">
            {targets.map((t, idx) => (
              <div key={idx} className="flex gap-6 group">
                <div className="flex-shrink-0 bg-slate-50 w-14 h-14 rounded-lg flex items-center justify-center border border-slate-100 group-hover:bg-telgoo-blue group-hover:text-white transition-all">
                  {React.cloneElement(t.icon as React.ReactElement, { size: 28, className: 'group-hover:text-white transition-colors' })}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-telgoo-navy mb-1 tracking-tight">{t.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-telgoo-navy rounded-3xl p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute -top-10 -right-10 p-12 opacity-5">
            <CheckCircle2 size={150} />
          </div>
          <h3 className="text-2xl font-black mb-10 tracking-tight">Performance em Números</h3>
          <div className="space-y-10">
            <div className="border-b border-white/10 pb-6">
              <span className="text-4xl font-black text-telgoo-orange block tracking-tighter">500M+</span>
              <p className="text-slate-400 text-xs font-bold uppercase mt-1">Minutos/Ano Processados</p>
            </div>
            <div className="border-b border-white/10 pb-6">
              <span className="text-4xl font-black text-telgoo-orange block tracking-tighter">40%</span>
              <p className="text-slate-400 text-xs font-bold uppercase mt-1">Aumento em Conversão</p>
            </div>
            <div>
              <span className="text-4xl font-black text-telgoo-orange block tracking-tighter">-15%</span>
              <p className="text-slate-400 text-xs font-bold uppercase mt-1">Redução de Custos Diretos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TargetAudience;

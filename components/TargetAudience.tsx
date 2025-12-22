
import React from 'react';
import { Target, UserCheck, Search, CheckCircle2 } from 'lucide-react';

const targets = [
  {
    title: "Vendas Ativas",
    desc: "Potencialize sua força de vendas focando apenas no áudio humano real.",
    icon: <Target className="text-tzero-blue" />
  },
  {
    title: "Cobrança (Collections)",
    desc: "Melhore a recuperação de ativos com contatos assertivos e sem desperdício de tempo.",
    icon: <UserCheck className="text-tzero-blue" />
  },
  {
    title: "Prospecção Digital",
    desc: "Escalabilidade técnica para classificar leads massivamente com precisão neural.",
    icon: <Search className="text-tzero-blue" />
  }
];

const TargetAudience: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24" id="público">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <span className="text-tzero-blue font-black text-xs uppercase tracking-[0.3em] mb-4 block">Foco em Performance</span>
          <h2 className="text-4xl lg:text-5xl font-black text-tzero-navy mb-10 leading-tight tracking-tighter">
            Escala Real para <br /> sua Operação.
          </h2>
          <div className="space-y-8">
            {targets.map((t, idx) => (
              <div key={idx} className="flex gap-6 group">
                <div className="flex-shrink-0 bg-tzero-soft w-14 h-14 rounded-2xl flex items-center justify-center border border-slate-100 group-hover:bg-tzero-blue group-hover:text-white transition-all shadow-sm">
                  {React.cloneElement(t.icon as React.ReactElement, { size: 28, className: 'group-hover:text-white transition-colors' })}
                </div>
                <div>
                  <h4 className="text-xl font-black text-tzero-navy mb-1 tracking-tight">{t.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-tzero-navy rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl border border-white/5 h-[600px] flex flex-col justify-center">
          <div className="absolute inset-0 opacity-20">
             <img 
               src="https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=1471&auto=format&fit=crop" 
               className="w-full h-full object-cover"
               alt="Callcenter formal e moderno"
             />
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl font-black mb-10 tracking-tight">Impacto Operacional</h3>
            <div className="space-y-10">
              <div className="border-b border-white/10 pb-6">
                <span className="text-5xl font-black text-tzero-blue block tracking-tighter">500M+</span>
                <p className="text-blue-100/50 text-[10px] font-black uppercase tracking-widest mt-2">Minutos/Ano Processados</p>
              </div>
              <div className="border-b border-white/10 pb-6">
                <span className="text-5xl font-black text-tzero-blue block tracking-tighter">40%</span>
                <p className="text-blue-100/50 text-[10px] font-black uppercase tracking-widest mt-2">Aumento em Conversão Média</p>
              </div>
              <div>
                <span className="text-5xl font-black text-tzero-blue block tracking-tighter">-15%</span>
                <p className="text-blue-100/50 text-[10px] font-black uppercase tracking-widest mt-2">Redução de Custos Diretos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TargetAudience;

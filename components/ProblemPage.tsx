
import React from 'react';
import { ArrowLeft, AlertTriangle, TrendingDown, PhoneOff, Ghost, Clock, BarChart2, ShieldAlert } from 'lucide-react';
import { AppView } from '../App';

interface ProblemPageProps {
  setView: (view: AppView) => void;
}

const ProblemPage: React.FC<ProblemPageProps> = ({ setView }) => {
  const leaks = [
    {
      title: "O Fantasma do Voicemail",
      icon: <Ghost className="text-tzero-blue" size={24} />,
      desc: "Até 65% das chamadas em operações ativas terminam em caixa postal. No modelo legado, você paga pelo tempo de gravação e sinalização dessas chamadas.",
      impact: "Custo fantasma de ~35% do orçamento mensal."
    },
    {
      title: "Erros de Rede (Sinalização)",
      icon: <AlertTriangle className="text-amber-500" size={24} />,
      desc: "Falhas 503, congestionamentos de rota e erros ISUP que duram menos de 3 segundos mas são tarifados como o primeiro minuto completo.",
      impact: "Perda direta em infraestrutura improdutiva."
    },
    {
      title: "Dead Air (Silêncio Inicial)",
      icon: <Clock className="text-slate-400" size={24} />,
      desc: "O tempo entre o 'Alô' e a transferência para o agente. Segundos preciosos de silêncio que, multiplicados por milhões, drenam o ROI.",
      impact: "Ineficiência de ocupação de canal."
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-white animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <button 
          onClick={() => setView('landing')}
          className="flex items-center gap-2 text-slate-400 hover:text-tzero-blue font-bold text-xs uppercase tracking-widest mb-12 transition-all group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Voltar ao Início
        </button>

        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
          <div>
            <div className="flex items-center gap-2 text-red-500 font-black text-[10px] uppercase tracking-[0.3em] mb-6">
              <ShieldAlert size={14} /> Revenue Leak Analysis
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-tzero-navy mb-8 tracking-tighter leading-[0.9]">
              O custo invisível do <br />
              <span className="text-tzero-blue">modelo legado.</span>
            </h1>
            <p className="text-slate-500 text-lg font-medium leading-relaxed mb-10">
              Operações de Call Center tradicionais estão perdendo milhões anualmente por não enxergarem a ineficiência intrínseca da tarifação por minutos. Nós decompomos esse problema para você.
            </p>
            <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
               <div className="flex items-center gap-4 mb-4">
                 <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                 <span className="text-xs font-black uppercase tracking-widest text-slate-400">Status do Mercado: Crítico</span>
               </div>
               <p className="text-tzero-navy font-bold text-xl leading-snug">
                 "Para cada R$ 1,00 investido em telecom hoje, apenas R$ 0,22 geram uma conversa humana real."
               </p>
            </div>
          </div>

          <div className="relative">
             <div className="bg-tzero-navy rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-tzero-blue/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <h3 className="text-2xl font-black mb-10 tracking-tight">Anatomia de 1 Milhão de Chamadas</h3>
                <div className="space-y-6">
                   {[
                     { label: "Caixas Postais", val: "58%", color: "bg-blue-400" },
                     { label: "Erros de Rede / Ocupado", val: "15%", color: "bg-blue-600" },
                     { label: "URA de Operadora", val: "12%", color: "bg-blue-800" },
                     { label: "Contatos Humanos (ROI)", val: "15%", color: "bg-tzero-blue" },
                   ].map((item, i) => (
                     <div key={i}>
                       <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2 text-blue-100/60">
                         <span>{item.label}</span>
                         <span className="text-white">{item.val}</span>
                       </div>
                       <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                         <div className={`${item.color} h-full transition-all duration-1000`} style={{ width: item.val }}></div>
                       </div>
                     </div>
                   ))}
                </div>
                <div className="mt-12 pt-8 border-t border-white/10 text-center">
                   <p className="text-blue-100/40 text-[10px] font-black uppercase tracking-[0.2em]">Fonte: Auditoria Anual ZERO2ONE 2023</p>
                </div>
             </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {leaks.map((leak, i) => (
            <div key={i} className="p-12 bg-white border border-slate-100 rounded-[3rem] hover:border-tzero-blue/20 hover:shadow-2xl transition-all group">
               <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-tzero-blue group-hover:text-white transition-all">
                  {leak.icon}
               </div>
               <h4 className="text-2xl font-black text-tzero-navy mb-6 tracking-tight leading-none">{leak.title}</h4>
               <p className="text-slate-500 text-sm font-medium leading-relaxed mb-10">
                 {leak.desc}
               </p>
               <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                  <span className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-2 block">Impacto Financeiro</span>
                  <p className="text-red-900 font-bold text-xs">{leak.impact}</p>
               </div>
            </div>
          ))}
        </div>

        <div className="mt-32 text-center max-w-3xl mx-auto">
          <h3 className="text-3xl font-black text-tzero-navy mb-8 tracking-tight">O fim do desperdício começa aqui.</h3>
          <p className="text-slate-500 text-lg font-medium mb-12">
            Entender o problema é o primeiro passo. O segundo é adotar o modelo CPC ZeroLoss e parar de pagar pela ineficiência dos outros.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <button className="bg-tzero-blue text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-tzero-navy transition-all shadow-xl shadow-blue-500/20">
               Solicitar Diagnóstico de Perda
             </button>
             <button 
              onClick={() => setView('zeroloss')}
              className="bg-white border border-slate-200 text-tzero-navy px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-50 transition-all"
             >
               Ver Solução ZeroLoss
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;

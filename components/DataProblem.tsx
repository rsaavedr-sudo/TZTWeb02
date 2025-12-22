
import React from 'react';
import { AlertCircle, XCircle, MicOff, Smartphone, Bot, TrendingDown, ShieldCheck, CheckCircle2, Zap, SignalLow, UserX } from 'lucide-react';

const unproductiveEvents = [
  { icon: <MicOff size={18} />, text: "Caixas postais pós-atendimento" },
  { icon: <SignalLow size={18} />, text: "Chamadas em silêncio (falhas técnicas)" },
  { icon: <XCircle size={18} />, text: "Falsas terminações e Bad Numbers" },
  { icon: <Smartphone size={18} />, text: "Caixas postais nativas (iOS/iPhone)" },
  { icon: <Bot size={18} />, text: "Agentes de IA de smartphones" },
  { icon: <UserX size={18} />, text: "Degradação de áudio" },
];

const DataProblem: React.FC = () => {
  return (
    <div className="bg-white py-32 relative overflow-hidden" id="problema">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* PARTE 1: O PROBLEMA NOS CALL CENTERS ATIVOS */}
        <div className="grid lg:grid-cols-2 gap-20 items-start mb-32">
          <div>
            <div className="inline-flex items-center gap-2 bg-tzero-soft text-tzero-blue px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8 border border-tzero-blue/10">
              <AlertCircle size={14} /> Diagnóstico do Mercado
            </div>
            <h2 className="text-4xl lg:text-6xl font-black text-[#022c5e] mb-8 leading-[0.95] tracking-tighter">
              O Problema nos <br />
              <span className="text-tzero-blue underline decoration-slate-200 underline-offset-8">Call Centers Ativos.</span>
            </h2>
            <p className="text-slate-500 text-lg font-medium leading-relaxed mb-8">
              A taxa de contato humano efetivo é extremamente baixa, frequentemente <span className="text-[#022c5e] font-bold italic text-xl">inferior a 6%</span> das chamadas que são atendidas e cobradas pelas operadoras.
            </p>
            <p className="text-slate-400 text-sm font-medium mb-10 leading-relaxed">
              Isso gera problemas estruturais que impactam diretamente o custo e a previsibilidade. Uma parcela significativa do tráfego é consumida por eventos improdutivos que, mesmo sem contato real, são faturados.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-3 mb-12">
              {unproductiveEvents.map((e, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 group hover:border-tzero-blue/30 transition-all">
                  <div className="text-tzero-blue opacity-60 group-hover:opacity-100 transition-opacity">{e.icon}</div>
                  <span className="text-[11px] font-bold text-slate-600 uppercase tracking-tight leading-tight">{e.text}</span>
                </div>
              ))}
            </div>

            <div className="p-8 bg-tzero-soft rounded-3xl border border-tzero-blue/5">
              <p className="text-[#022c5e] text-sm font-semibold italic leading-relaxed">
                "Empresas e agências enfrentam o aumento contínuo do tráfego pago e queda nas conversões, exigindo modelos orientados a resultados mensuráveis."
              </p>
            </div>
          </div>

          <div className="lg:sticky lg:top-32">
            <div className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-[0_32px_64px_-16px_rgba(11,28,63,0.08)] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <TrendingDown size={180} />
              </div>
              <h4 className="text-2xl font-black text-[#022c5e] mb-10 tracking-tight border-b border-slate-50 pb-6">Drenagem de Capital</h4>
              <div className="space-y-10">
                <div className="flex justify-between items-center group">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Desperdício Operacional</span>
                  <span className="text-2xl font-black text-[#022c5e] group-hover:text-tzero-blue transition-colors tracking-tighter">Massivo</span>
                </div>
                <div className="flex justify-between items-center group">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Custo por Minuto/Lead</span>
                  <span className="text-2xl font-black text-[#022c5e] group-hover:text-tzero-blue transition-colors tracking-tighter">Crescente</span>
                </div>
                <div className="flex justify-between items-center group">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Previsibilidade Financeira</span>
                  <span className="text-2xl font-black text-[#022c5e] group-hover:text-tzero-blue transition-colors tracking-tighter">Baixa</span>
                </div>
              </div>
              <div className="mt-12 pt-8 border-t border-slate-50 text-center">
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Cenário de Operadora Tradicional</p>
              </div>
            </div>
          </div>
        </div>

        {/* PARTE 2: COMO A T-ZERO TECH RESOLVE ESSE PROBLEMA */}
        <div className="bg-white rounded-[4rem] p-12 lg:p-24 border border-slate-100 shadow-[0_40px_100px_-20px_rgba(11,28,63,0.05)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-tzero-blue/5 rounded-full blur-[100px] -mr-48 -mt-48"></div>
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-tzero-soft text-tzero-blue px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.3em] mb-10 border border-tzero-blue/10 shadow-sm">
              <Zap size={16} fill="currentColor" /> Eficiência Real
            </div>
            <h3 className="text-4xl lg:text-[4.5rem] font-black text-[#022c5e] mb-10 tracking-tighter leading-[0.95]">
              Como a T-Zero <br /> <span className="text-tzero-blue">resolve esse problema.</span>
            </h3>
            <p className="text-slate-500 text-xl font-medium mb-16 leading-relaxed">
              Em vez de cobrar por minutos ou tentativas, nossas soluções são orientadas a <span className="text-tzero-blue font-bold">contato humano efetivo</span>, eliminando o desperdício operacional.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="bg-slate-50/50 border border-slate-100 p-10 rounded-[2.5rem] transition-all hover:bg-white hover:shadow-xl hover:shadow-blue-900/5 group">
                <div className="w-12 h-12 bg-tzero-blue rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                  <ShieldCheck size={24} className="text-white" />
                </div>
                <h5 className="text-xl font-black text-[#022c5e] mb-4 tracking-tight">ZeroLoss (CPC)</h5>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">A responsabilidade técnica por filtrar chamadas improdutivas passa a ser nossa — não sua.</p>
              </div>
              
              <div className="bg-slate-50/50 border border-slate-100 p-10 rounded-[2.5rem] transition-all hover:bg-white hover:shadow-xl hover:shadow-blue-900/5 group">
                <div className="w-12 h-12 bg-[#022c5e] rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <CheckCircle2 size={24} className="text-white" />
                </div>
                <h5 className="text-xl font-black text-[#022c5e] mb-4 tracking-tight">Tratamento Avançado</h5>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">Rotas inteligentes e mecanismos de classificação que garantem que apenas voz humana chegue ao seu agente.</p>
              </div>
              
              <div className="bg-slate-50/50 border border-slate-100 p-10 rounded-[2.5rem] transition-all hover:bg-white hover:shadow-xl hover:shadow-blue-900/5 group">
                <div className="w-12 h-12 bg-tzero-blue rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                  <TrendingDown size={24} className="text-white" />
                </div>
                <h5 className="text-xl font-black text-[#022c5e] mb-4 tracking-tight">Previsibilidade</h5>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">Controle técnico e regulatório total, com custos fixos por contato real e ROI previsível.</p>
              </div>
            </div>

            <button className="mt-20 bg-tzero-blue text-white px-12 py-5 rounded-2xl text-sm font-black uppercase tracking-[0.2em] shadow-2xl shadow-blue-500/20 hover:bg-[#022c5e] transition-all transform hover:-translate-y-1">
              Ativar Operação CPC
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataProblem;

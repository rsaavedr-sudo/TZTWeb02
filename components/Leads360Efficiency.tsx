
import React, { useState, useEffect } from 'react';
import { Bot, BarChart3, Users, Target, ArrowRight, Zap, CheckCircle2, Search } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { AppView } from '../App';

const data = [
  { 
    name: 'Modelo Tradicional', 
    produtivo: 10, 
    improdutivo: 90 
  },
  { 
    name: 'LEADS 360', 
    produtivo: 90, 
    improdutivo: 10 
  },
];

interface Leads360EfficiencyProps {
  setView?: (view: AppView) => void;
}

const Leads360Efficiency: React.FC<Leads360EfficiencyProps> = ({ setView }) => {
  const [mounted, setMounted] = useState(false);
  const whatsappUrl = "https://wa.me/5521984520042?text=Olá! Gostaria de aumentar minha conversão e reduzir custo por lead com o Leads 360.";

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="bg-white py-32 relative overflow-hidden" id="leads360-eficiencia">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
          <div>
            <div className="inline-flex items-center gap-2 bg-tzero-soft text-tzero-navy px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8 border border-slate-200">
              <Zap size={14} className="text-tzero-blue" /> Eficiência de Captação
            </div>
            <h2 className="text-4xl lg:text-6xl font-black text-tzero-navy mb-8 leading-[0.95] tracking-tighter">
              Para onde vão <br />
              <span className="text-tzero-blue">seus leads?</span>
            </h2>
            <p className="text-slate-500 text-lg font-medium leading-relaxed mb-10">
              No modelo tradicional, a captação depende de um único canal, gera leads frios e desperdiça oportunidades fora do horário comercial. 
              O <span className="text-[#022c5e] font-bold">Leads 360</span> integra múltiplos motores de captação com agentes de IA que operam o funil de vendas de ponta a ponta, 24/7, sem intervenção humana.
            </p>
            
            <div className="space-y-6 mb-12">
              {/* Card 1 - Modelo Tradicional */}
              <div className="flex gap-5 items-start p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="bg-white p-3 rounded-xl shadow-sm text-tzero-risk"><Users size={24} /></div>
                <div>
                  <h4 className="font-bold text-tzero-navy text-lg mb-1 tracking-tight">Modelo Tradicional de Captação</h4>
                  <p className="text-slate-500 text-sm font-medium">Captação isolada, cara e pouco eficiente. Alto volume, baixa conversão.</p>
                </div>
              </div>

              {/* Card 2 - Modelo Leads 360 */}
              <div className="flex gap-5 items-start p-6 bg-tzero-navy rounded-2xl border border-tzero-navy text-white shadow-xl shadow-blue-900/20">
                <div className="bg-white/10 p-3 rounded-xl text-tzero-blue"><Bot size={24} /></div>
                <div>
                  <h4 className="font-bold text-white text-lg mb-1 tracking-tight">Modelo LEADS 360</h4>
                  <p className="text-blue-100/60 text-sm font-medium">Captação inteligente, contínua e multicanal. Leads certos no momento certo.</p>
                </div>
              </div>
            </div>

            {setView && (
              <button 
                onClick={() => setView('leads360')}
                className="flex items-center gap-3 text-tzero-blue font-black text-xs uppercase tracking-widest hover:gap-5 transition-all group"
              >
                Ver fluxo do funil inteligente <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>

          <div className="bg-white rounded-[3rem] p-8 lg:p-12 border border-slate-100 shadow-[0_32px_64px_-16px_rgba(11,28,63,0.08)]">
            <h4 className="text-xl font-black text-tzero-navy mb-8 tracking-tight flex items-center gap-3">
              <BarChart3 size={20} className="text-tzero-blue" /> Distribuição da Captação (%)
            </h4>
            
            <div className="h-[400px] w-full">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }}
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#64748b', fontSize: 11, fontWeight: 700 }}
                      domain={[0, 100]}
                    />
                    <Tooltip 
                      cursor={{ fill: '#f8fafc' }}
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontWeight: 'bold' }}
                    />
                    <Legend 
                      verticalAlign="bottom" 
                      align="center"
                      iconType="rect" 
                      wrapperStyle={{ paddingTop: '40px', fontWeight: '700', fontSize: '11px' }} 
                    />
                    <Bar dataKey="produtivo" stackId="a" fill="#0061FF" radius={[0, 0, 0, 0]} name="Captação produtiva (Leads qualificados)" />
                    <Bar dataKey="improdutivo" stackId="a" fill="#E11D48" radius={[6, 6, 0, 0]} name="Captação improdutiva (Curiosos / Leads frios)" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-slate-50 rounded-2xl">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Aproveitamento Médio</p>
                <p className="text-2xl font-black text-tzero-risk opacity-60">≈ 10%</p>
              </div>
              <div className="text-center p-4 bg-tzero-navy rounded-2xl">
                <p className="text-[10px] font-black text-blue-200/40 uppercase tracking-widest mb-1">Aproveitamento LEADS 360</p>
                <p className="text-2xl font-black text-tzero-blue">90%+</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bloco de Reforço Conceitual */}
        <div className="bg-white border border-slate-100 p-12 lg:p-16 rounded-[4rem] shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-tzero-blue/5 rounded-full blur-[100px] -mr-48 -mt-48"></div>
          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <h3 className="text-3xl font-black text-tzero-navy mb-4 tracking-tight">Mais do que leads. <br />Um funil operado por IA.</h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                O Leads 360 não apenas gera leads. Ele opera o funil de vendas automaticamente, combinando captação multicanal, SDR com agentes de IA e atendimento contínuo. 
                <span className="text-tzero-navy font-bold block mt-4">O vendedor humano entra apenas quando há real intenção de conversão.</span>
              </p>
            </div>
            <div className="flex justify-end">
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-tzero-blue text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest shadow-2xl shadow-blue-500/30 hover:bg-[#022c5e] transition-all transform hover:-translate-y-1 text-center"
              >
                Descubra como aumentar conversão e reduzir custo por lead
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leads360Efficiency;

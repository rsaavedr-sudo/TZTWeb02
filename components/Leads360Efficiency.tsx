
import React, { useState, useEffect } from 'react';
import { Bot, BarChart3, Users, Target, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { AppView } from '../App';

const data = [
  { 
    name: 'Modelo Tradicional', 
    qualificado: 10, 
    frio: 90 
  },
  { 
    name: 'LEADS 360', 
    qualificado: 90, 
    frio: 10 
  },
];

interface Leads360EfficiencyProps {
  setView?: (view: AppView) => void;
}

const Leads360Efficiency: React.FC<Leads360EfficiencyProps> = ({ setView }) => {
  const [mounted, setMounted] = useState(false);
  const whatsappUrl = "https://wa.me/5521984520042?text=Olá! Gostaria de entender como o Leads 360 pode aumentar a eficiência da minha captação.";

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="bg-slate-50/30 py-32 relative overflow-hidden border-t border-slate-100" id="leads360-eficiencia">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
          <div>
            <div className="inline-flex items-center gap-2 bg-tzero-blue/5 text-tzero-blue px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8 border border-tzero-blue/10">
              <Zap size={14} className="fill-tzero-blue" /> Eficiência de Captação
            </div>
            <h2 className="text-4xl lg:text-6xl font-black text-tzero-navy mb-8 leading-[0.95] tracking-tighter">
              Para onde vão <br />
              <span className="text-tzero-blue">seus leads?</span>
            </h2>
            <p className="text-slate-500 text-lg font-medium leading-relaxed mb-10">
              No modelo tradicional, a captação depende de um único canal, gera leads frios e desperdiça oportunidades fora do horário comercial. 
              O <span className="text-[#022c5e] font-bold">Leads 360</span> integra múltiplos motores com agentes de IA que operam o funil 24/7.
            </p>
            
            <div className="space-y-6 mb-12">
              {/* Card 1 - Modelo Tradicional */}
              <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-black text-tzero-navy text-lg tracking-tight">Modelo Tradicional</h4>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">Captação isolada e cara</p>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg text-slate-300">
                    <Users size={20} />
                  </div>
                </div>
                <ul className="grid grid-cols-2 gap-y-3 gap-x-4">
                  {["Dependência de tráfego pago", "Leads frios/não qualificados", "SDR humano sobrecarregado", "Operação 8h às 18h"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-[11px] font-bold text-slate-500">
                      <div className="w-1 h-1 rounded-full bg-slate-200"></div> {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-[10px] font-black uppercase text-tzero-risk tracking-tighter bg-tzero-risk/5 inline-block px-2 py-1 rounded">Alto volume, baixa conversão</p>
              </div>

              {/* Card 2 - Modelo Leads 360 */}
              <div className="p-8 bg-tzero-navy rounded-3xl border border-tzero-navy text-white shadow-2xl shadow-blue-900/20 transform scale-[1.02]">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-black text-white text-lg tracking-tight">Modelo LEADS 360</h4>
                    <p className="text-blue-100/40 text-[10px] font-bold uppercase tracking-widest mt-1">Captação inteligente e contínua</p>
                  </div>
                  <div className="bg-tzero-blue p-2 rounded-lg text-white">
                    <Bot size={20} />
                  </div>
                </div>
                <ul className="grid grid-cols-2 gap-y-3 gap-x-4">
                  {["URA Reversa (Intenção)", "Tráfego pago gerenciado", "Viralização INDIKA", "SDR por Agentes de IA"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-[11px] font-bold text-blue-100/60">
                      <CheckCircle2 size={12} className="text-tzero-blue" /> {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-[10px] font-black uppercase text-tzero-blue tracking-tighter bg-white/5 inline-block px-2 py-1 rounded">Leads certos, no momento certo</p>
              </div>
            </div>

            {setView && (
              <button 
                onClick={() => setView('leads360')}
                className="flex items-center gap-3 text-tzero-blue font-black text-xs uppercase tracking-widest hover:gap-5 transition-all group"
              >
                Ver como o funil opera por IA <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
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
                    <Bar dataKey="qualificado" stackId="a" fill="#0061FF" radius={[0, 0, 0, 0]} name="Captação produtiva (Leads qualificados)" />
                    <Bar dataKey="frio" stackId="a" fill="#E11D48" radius={[6, 6, 0, 0]} name="Captação improdutiva (Ruído/Frios)" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="text-center p-6 bg-slate-50 rounded-2xl">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Modelo Tradicional</p>
                <p className="text-2xl font-black text-tzero-risk opacity-60">≈ 10%</p>
              </div>
              <div className="text-center p-6 bg-tzero-navy rounded-2xl">
                <p className="text-[10px] font-black text-blue-200/40 uppercase tracking-widest mb-1">Aproveitamento LEADS 360</p>
                <p className="text-2xl font-black text-tzero-blue">90%+</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bloco de Reforço Conceitual */}
        <div className="bg-white border border-slate-100 p-12 lg:p-16 rounded-[4rem] shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-tzero-blue/5 rounded-full blur-[100px] -mr-48 -mt-48 transition-all group-hover:bg-tzero-blue/10"></div>
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
                Descubra como aumentar conversão
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leads360Efficiency;

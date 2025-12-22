
import React, { useState, useEffect } from 'react';
import { AlertCircle, BarChart3, PhoneOff, UserCheck } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Contestadoras', Legado: 45, TZero: 0 },
  { name: 'Erros de Rede', Legado: 35, TZero: 0 },
  { name: 'Tempo de Agente', Legado: 20, TZero: 100 },
];

const DataProblem: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="bg-white py-32 relative overflow-hidden" id="problema">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
          <div>
            <div className="inline-flex items-center gap-2 bg-tzero-soft text-tzero-navy px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8 border border-slate-200">
              <AlertCircle size={14} className="text-tzero-blue" /> Eficiência Operacional
            </div>
            <h2 className="text-4xl lg:text-6xl font-black text-tzero-navy mb-8 leading-[0.95] tracking-tighter">
              Onde seu orçamento <br />
              <span className="text-tzero-blue">está sendo drenado?</span>
            </h2>
            <p className="text-slate-500 text-lg font-medium leading-relaxed mb-10">
              No modelo tradicional por minutos, você paga por cada segundo de silêncio, erro de sinalização e máquinas de responder. Isso representa até <span className="text-tzero-navy font-black underline decoration-tzero-blue">80% de desperdício</span>.
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-5 items-start p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="bg-white p-3 rounded-xl shadow-sm text-slate-400"><PhoneOff size={24} /></div>
                <div>
                  <h4 className="font-bold text-tzero-navy text-lg mb-1 tracking-tight">Modelo Legado (Minutos)</h4>
                  <p className="text-slate-500 text-sm font-medium">Faturamento indiscriminado de tentativas falhas e ruído.</p>
                </div>
              </div>
              <div className="flex gap-5 items-start p-6 bg-tzero-navy rounded-2xl border border-tzero-navy text-white shadow-xl shadow-blue-900/20">
                <div className="bg-white/10 p-3 rounded-xl text-tzero-blue"><UserCheck size={24} /></div>
                <div>
                  <h4 className="font-bold text-white text-lg mb-1 tracking-tight">Modelo T-Zero (CPC)</h4>
                  <p className="text-blue-100/60 text-sm font-medium">Custo zero para ineficiência. Foco 100% em conversão humana.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[3rem] p-8 lg:p-12 border border-slate-100 shadow-[0_32px_64px_-16px_rgba(11,28,63,0.08)]">
            <h4 className="text-xl font-black text-tzero-navy mb-8 tracking-tight flex items-center gap-3">
              <BarChart3 size={20} className="text-tzero-blue" /> Comparativo de Utilização (%)
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
                      tick={{ fill: '#64748b', fontSize: 11, fontWeight: 700 }}
                      dy={10}
                    />
                    <YAxis hide />
                    <Tooltip 
                      cursor={{ fill: '#f8fafc' }}
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontWeight: 'bold' }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ paddingTop: '30px', fontWeight: 'bold', fontSize: '11px', textTransform: 'uppercase' }} />
                    <Bar dataKey="Legado" fill="#cbd5e1" radius={[6, 6, 0, 0]} name="Modelo Legado" />
                    <Bar dataKey="TZero" fill="#0061FF" radius={[6, 6, 0, 0]} name="T-Zero Tech" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-slate-50 rounded-2xl">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">ROI Legado</p>
                <p className="text-2xl font-black text-slate-400">~22%</p>
              </div>
              <div className="text-center p-4 bg-tzero-navy rounded-2xl">
                <p className="text-[10px] font-black text-blue-200/40 uppercase tracking-widest mb-1">ROI T-Zero</p>
                <p className="text-2xl font-black text-tzero-blue">99.9%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataProblem;

import React from 'react';
import { ArrowLeft, Zap, ShieldCheck, Cpu, CheckCircle, BarChart3 } from 'lucide-react';
import { AppView } from '../../App';

interface ProductPageProps {
  setView: (view: AppView) => void;
}

const ZeroLossPage: React.FC<ProductPageProps> = ({ setView }) => {
  const whatsappUrl = "https://wa.me/5521984520042?text=Olá! Gostaria de agendar uma demonstração do ZeroLoss CPC.";

  return (
    <div className="pt-32 pb-24 bg-white animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <button 
          onClick={() => setView('landing')}
          className="flex items-center gap-2 text-slate-400 hover:text-tzero-blue font-bold text-xs uppercase tracking-widest mb-12 transition-all"
        >
          <ArrowLeft size={16} /> Voltar para Soluções
        </button>

        <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
          <div>
            <div className="bg-tzero-blue/10 text-tzero-blue w-16 h-16 rounded-2xl flex items-center justify-center mb-8">
              <Zap size={32} />
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-tzero-navy mb-8 tracking-tighter leading-tight">
              ZeroLoss <br /><span className="text-tzero-blue underline decoration-slate-200">CPC Billing.</span>
            </h1>
            <p className="text-slate-500 text-lg font-medium leading-relaxed mb-10">
              A revolução na forma como BPOs e Call Centers faturam campanhas. O ZeroLoss elimina o risco financeiro de chamadas improdutivas através do modelo Custo por Contato Humano.
            </p>
            <div className="flex gap-4">
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-tzero-blue text-white px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:bg-tzero-navy transition-all"
              >
                Agendar uma Demonstração
              </a>
            </div>
          </div>
          <div className="bg-slate-50 rounded-[3rem] p-12 border border-slate-100 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-tzero-blue/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
             <h3 className="text-xl font-black text-tzero-navy mb-8 flex items-center gap-3">
               <Cpu size={20} className="text-tzero-blue" /> Camada de Auditoria IA
             </h3>
             <ul className="space-y-6">
                {[
                  "Classificação de áudio em < 100ms",
                  "Detecção de Voicemail e URA de operadora",
                  "Filtragem de erros de sinalização ISUP/SIP",
                  "Faturamento auditável por ID de chamada"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-slate-600 font-bold text-sm">
                    <CheckCircle size={18} className="text-tzero-green" /> {item}
                  </li>
                ))}
             </ul>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Transparência Total",
              desc: "Relatórios em tempo real de cada contato validado como humano.",
              icon: <BarChart3 />
            },
            {
              title: "Risco Zero",
              desc: "Se a tecnologia falhar na detecção, o custo é por nossa conta.",
              icon: <ShieldCheck />
            },
            {
              title: "IA Proprietária",
              desc: "Algoritmos treinados com mais de 500 milhões de minutos anuais.",
              icon: <Cpu />
            }
          ].map((card, i) => (
            <div key={i} className="p-10 bg-white border border-slate-100 rounded-[2.5rem] hover:shadow-xl transition-all">
               <div className="text-tzero-blue mb-6">
                 {/* Fix: Cast icon to React.ReactElement<any> to resolve type mismatch on 'size' prop */}
                 {React.cloneElement(card.icon as React.ReactElement<any>, { size: 28 })}
               </div>
               <h4 className="text-xl font-black text-tzero-navy mb-4">{card.title}</h4>
               <p className="text-slate-500 text-sm font-medium leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ZeroLossPage;

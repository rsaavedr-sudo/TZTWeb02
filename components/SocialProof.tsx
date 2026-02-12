
import React from 'react';
import { Quote, Briefcase, Lock, CheckCircle2 } from 'lucide-react';

const SocialProof: React.FC = () => {
  const testimonials = [
    {
      name: "Ricardo Almeida",
      role: "Diretor de Operações na Global BPO",
      text: "O modelo ZeroLoss mudou completamente nossa previsibilidade financeira. Paramos de pagar por silêncio e agora focamos 100% no resultado real de conversão. Essencial para escala.",
      product: "ZeroLoss CPC",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&auto=format&fit=crop"
    },
    {
      name: "Mariana Costa",
      role: "Head de Growth na FinTech X",
      text: "A escala que atingimos com o Leads360 foi absurda. Temos leads qualificados chegando 24/7 e nosso time de vendas só atende quem realmente tem intenção de compra validada pela IA.",
      product: "Leads360 Platform",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&h=256&auto=format&fit=crop"
    },
    {
      name: "Marcos Vinícius",
      role: "CTO da Connect Telecom",
      text: "A filtragem técnica do UMD limpou nosso tráfego de forma impressionante. Nosso ASR útil subiu 40% na primeira semana, eliminando custos invisíveis de máquinas e falsas terminações.",
      product: "UMD Classifier",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=256&h=256&auto=format&fit=crop"
    }
  ];

  return (
    <section className="bg-white py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Seção de Casos de Uso (Placeholder) */}
        <div className="mb-40">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-20">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-[#022c5e]/5 text-[#022c5e] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-slate-200">
                <Briefcase size={14} className="text-tzero-blue" /> Estudo de Eficiência
              </div>
              <h2 className="text-4xl lg:text-6xl font-black text-tzero-navy tracking-tight leading-[0.95]">
                Casos de <span className="text-tzero-blue">Uso.</span>
              </h2>
            </div>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mb-4">
              Conteúdo em processo de auditoria
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group relative h-80 bg-slate-50 border border-slate-100 rounded-[3rem] overflow-hidden flex flex-col items-center justify-center p-12 text-center transition-all">
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-200 mb-6 shadow-sm">
                  <Lock size={24} />
                </div>
                <h4 className="text-slate-300 font-black text-xs uppercase tracking-[0.2em] mb-2">Caso de Sucesso {i}</h4>
                <p className="text-slate-300 text-[10px] font-bold uppercase tracking-widest">Aguardando aprovação de compliance</p>
                
                {/* Skeleton decorativo */}
                <div className="mt-8 w-full space-y-2 opacity-10">
                  <div className="h-2 bg-slate-400 rounded-full w-3/4 mx-auto"></div>
                  <div className="h-2 bg-slate-400 rounded-full w-1/2 mx-auto"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Seção de Depoimentos Reais */}
        <div>
          <div className="text-center mb-24">
            <h2 className="text-4xl lg:text-6xl font-black text-[#022c5e] tracking-tighter mb-8">
              O que nossos clientes dizem
            </h2>
            <div className="w-24 h-1 bg-tzero-blue mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {testimonials.map((t, i) => (
              <div 
                key={i} 
                className="bg-white border border-slate-100 p-12 rounded-[3.5rem] shadow-[0_30px_60px_-15px_rgba(2,44,94,0.05)] flex flex-col hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group"
              >
                <div className="text-tzero-blue/10 mb-10 group-hover:text-tzero-blue transition-colors duration-500">
                  <Quote size={48} fill="currentColor" />
                </div>
                
                <p className="text-slate-600 font-medium leading-relaxed mb-12 flex-grow italic text-lg">
                  "{t.text}"
                </p>
                
                <div className="flex items-center gap-5 pt-8 border-t border-slate-50">
                  <div className="relative">
                    <img 
                      src={t.image} 
                      alt={t.name} 
                      className="w-16 h-16 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all duration-700 shadow-lg" 
                    />
                    <div className="absolute -bottom-2 -right-2 bg-white rounded-lg p-1 shadow-md">
                       <CheckCircle2 size={16} className="text-tzero-green" />
                    </div>
                  </div>
                  <div>
                    <h5 className="text-base font-black text-tzero-navy">{t.name}</h5>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mb-2">{t.role}</p>
                    <span className="inline-block text-[9px] font-black text-tzero-blue bg-tzero-blue/5 px-3 py-1 rounded-full uppercase border border-tzero-blue/10">
                      {t.product}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default SocialProof;


import React from 'react';
import { ArrowLeft, MessageSquareText, Search, Users, Database, Zap, Share2 } from 'lucide-react';
import { AppView } from '../../App';

interface ProductPageProps {
  setView: (view: AppView) => void;
}

const Leads360Page: React.FC<ProductPageProps> = ({ setView }) => {
  const whatsappUrl = "https://wa.me/5521984520042?text=Olá! Gostaria de agendar uma demonstração do Leads360 Intelligence.";

  return (
    <div className="pt-32 pb-24 bg-white animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <button 
          onClick={() => setView('landing')}
          className="flex items-center gap-2 text-slate-400 hover:text-tzero-blue font-bold text-xs uppercase tracking-widest mb-12 transition-all"
        >
          <ArrowLeft size={16} /> Voltar para Soluções
        </button>

        <div className="max-w-4xl mx-auto text-center mb-24">
          <div className="bg-slate-800 text-white w-16 h-16 rounded-2xl flex items-center justify-center mb-8 mx-auto shadow-xl">
            <MessageSquareText size={32} />
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-tzero-navy mb-8 tracking-tighter leading-tight">
            Leads<span className="text-tzero-blue">360</span> Intelligence.
          </h1>
          <p className="text-slate-500 text-xl font-medium leading-relaxed">
            Transforme dados brutos em contatos valiosos. O Leads360 classifica, higieniza e enriquece seus leads antes mesmo de entrarem no seu discador.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {[
            { title: "Higienização", icon: <Search />, desc: "Remoção de números inválidos e duplicados." },
            { title: "Enriquecimento", icon: <Database />, desc: "Busca de dados adicionais em bureaus parceiros." },
            { title: "Scoring", icon: <Zap />, desc: "Pontuação de propensão ao contato humano." },
            { title: "Sync CRM", icon: <Share2 />, desc: "Integração nativa com Salesforce, HubSpot e mais." }
          ].map((item, i) => (
            <div key={i} className="p-8 bg-slate-50 rounded-3xl border border-slate-100 text-center group hover:bg-white hover:shadow-2xl transition-all">
              <div className="text-slate-400 group-hover:text-tzero-blue mb-6 flex justify-center transition-colors">
                {/* Fix: Cast icon to React.ReactElement<any> to resolve type mismatch on 'size' prop */}
                {React.cloneElement(item.icon as React.ReactElement<any>, { size: 32 })}
              </div>
              <h4 className="text-lg font-black text-tzero-navy mb-2">{item.title}</h4>
              <p className="text-slate-500 text-xs font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-tzero-navy rounded-[3.5rem] p-12 lg:p-20 text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-96 h-96 bg-tzero-blue/10 rounded-full blur-[100px]"></div>
           <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
              <div>
                 <h3 className="text-3xl font-black mb-6 tracking-tight">Otimize o tempo do seu agente.</h3>
                 <p className="text-blue-100/60 text-lg font-medium leading-relaxed mb-10">
                    Ao enviar apenas leads com alta probabilidade de contato humano efetivo para a operação, você aumenta a produtividade da sua equipe em até 45%.
                 </p>
                 <a 
                   href={whatsappUrl}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="bg-white text-tzero-navy px-10 py-5 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-tzero-blue hover:text-white transition-all shadow-xl inline-block"
                 >
                   Agendar uma Demonstração
                 </a>
              </div>
              <div className="hidden lg:block">
                 <img 
                   src="https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=1470&auto=format&fit=crop" 
                   className="rounded-[2.5rem] shadow-2xl opacity-80"
                   alt="Analytics Interface"
                 />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Leads360Page;


import React from 'react';
import { 
  ArrowLeft, 
  MessageSquareText, 
  Search, 
  Zap, 
  Share2, 
  Bot, 
  TrendingUp, 
  Globe, 
  Users, 
  Cpu, 
  Target, 
  Clock,
  ShieldCheck,
  Repeat
} from 'lucide-react';
import { AppView } from '../../App';

interface ProductPageProps {
  setView: (view: AppView) => void;
}

const Leads360Page: React.FC<ProductPageProps> = ({ setView }) => {
  const whatsappUrl = "https://wa.me/5521984520042?text=Olá! Gostaria de agendar uma demonstração do Leads360 Intelligence.";

  return (
    <div className="pt-32 pb-24 bg-white animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Navigation */}
        <button 
          onClick={() => setView('landing')}
          className="flex items-center gap-2 text-slate-400 hover:text-tzero-blue font-bold text-xs uppercase tracking-widest mb-12 transition-all group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Voltar para Soluções
        </button>

        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-32">
          <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-xl">
            <Zap size={14} className="text-tzero-blue fill-tzero-blue" /> Leads360 Platform
          </div>
          <h1 className="text-6xl lg:text-8xl font-black text-tzero-navy mb-10 tracking-tighter leading-[0.9]">
            Captação e <br />
            <span className="text-tzero-blue">Qualificação Massiva.</span>
          </h1>
          <p className="text-slate-500 text-xl lg:text-2xl font-medium leading-relaxed max-w-3xl mx-auto">
            Volume real de interessados, classificados automaticamente para extrair valor sem depender de intervenção humana constante.
          </p>
        </div>

        {/* Os Três Motores */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-tzero-navy tracking-tight mb-4">Os 3 Motores de Aquisição</h2>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Poder isolado ou integração total</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                title: "Tráfego Pago Gerenciado",
                icon: <Target />,
                desc: "Anúncios diretos e otimizados para captura de alta intenção nos principais canais digitais.",
                tags: ["Performance", "ROI", "Escala"]
              },
              {
                title: "URA Reversa (IVR Ativo)",
                icon: <Repeat />,
                desc: "Interação ativa inteligente que qualifica o lead por voz antes da transferência.",
                tags: ["Automação", "Voz", "Filtro"]
              },
              {
                title: "Viralização Horizontal",
                icon: <Share2 />,
                desc: "Rede de afiliados Zero2One atuando como multiplicadores naturais da sua mensagem.",
                tags: ["Orgânico", "Comunidade", "Alcance"]
              }
            ].map((motor, i) => (
              <div key={i} className="bg-slate-50 border border-slate-100 p-12 rounded-[3rem] hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all group">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-tzero-blue group-hover:text-white mb-10 shadow-sm transition-all">
                  {React.cloneElement(motor.icon as React.ReactElement<any>, { size: 28 })}
                </div>
                <h3 className="text-2xl font-black text-tzero-navy mb-4 tracking-tight">{motor.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-10 font-medium">
                  {motor.desc}
                </p>
                <div className="flex gap-2">
                  {motor.tags.map(tag => (
                    <span key={tag} className="text-[9px] font-black uppercase tracking-widest bg-white px-3 py-1 rounded-md border border-slate-100 text-slate-400">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inteligência Comercial / SDR */}
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32 bg-tzero-soft rounded-[4rem] p-12 lg:p-24 border border-blue-50">
          <div>
            <div className="flex items-center gap-2 text-tzero-blue font-black text-[10px] uppercase tracking-widest mb-6">
              <Bot size={18} /> Camada de Inteligência SDR
            </div>
            <h2 className="text-4xl lg:text-6xl font-black text-tzero-navy mb-8 tracking-tighter leading-tight">
              Captação que vira <br />
              <span className="text-tzero-blue italic">Inteligência.</span>
            </h2>
            <p className="text-slate-500 text-lg font-medium leading-relaxed mb-10">
              Diferente dos modelos tradicionais, o Leads360 direciona todo o fluxo para um sistema avançado de SDR automatizado por agentes de IA.
            </p>
            
            <div className="space-y-6">
              {[
                { label: "Interpretar a intenção do lead", icon: <Search size={18} /> },
                { label: "Classificar o nível de interesse", icon: <TrendingUp size={18} /> },
                { label: "Eliminar ruído e leads irrelevantes", icon: <ShieldCheck size={18} /> },
                { label: "Identificar oportunidades reais de conversão", icon: <Zap size={18} /> }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-tzero-navy font-bold">
                  <div className="text-tzero-blue">{item.icon}</div>
                  {item.label}
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
             <div className="absolute inset-0 bg-tzero-blue/10 blur-[100px] rounded-full"></div>
             <div className="relative bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-100">
                <div className="flex justify-between items-center mb-10">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Processamento SDR-AI</span>
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-tzero-green animate-pulse"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-tzero-green animate-pulse delay-75"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-tzero-green animate-pulse delay-150"></div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="p-5 bg-slate-50 rounded-2xl border-l-4 border-tzero-blue">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Lead Analysis</p>
                    <p className="text-xs font-bold text-tzero-navy italic">"Intenção detectada: Aquisição de infraestrutura para 500 agentes."</p>
                  </div>
                  <div className="p-5 bg-slate-50 rounded-2xl border-l-4 border-tzero-green">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Status</p>
                    <p className="text-xs font-black text-tzero-green uppercase tracking-widest">Altamente Qualificado</p>
                  </div>
                  <div className="pt-4">
                    <button className="w-full py-4 bg-tzero-navy text-white rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg">Transferir para Humano</button>
                  </div>
                </div>
             </div>
          </div>
        </div>

        {/* Posicionamento e Engajamento */}
        <div className="mb-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="bg-slate-900 rounded-[3.5rem] p-12 lg:p-20 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-tzero-blue/20 rounded-full blur-[100px]"></div>
               <div className="relative z-10">
                 <h3 className="text-3xl font-black mb-8 tracking-tight">Muito além de Vendas.</h3>
                 <p className="text-blue-100/60 mb-12 font-medium leading-relaxed">
                   O Leads360 também foi desenhado para projetos que buscam posicionar marcas, divulgar ideias e ativar comunidades em escala orgânica.
                 </p>
                 <ul className="space-y-4">
                   {["Posicionar marcas", "Ativar comunidades", "Potencializar campanhas", "Engajamento contínuo"].map(text => (
                     <li key={text} className="flex items-center gap-3 text-sm font-bold">
                       <Share2 size={16} className="text-tzero-blue" /> {text}
                     </li>
                   ))}
                 </ul>
               </div>
            </div>
            
            <div className="space-y-8">
              <h3 className="text-3xl font-black text-tzero-navy tracking-tight leading-tight">Percepção de Marca <br /><span className="text-tzero-blue">em Movimento.</span></h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                Por meio do motor de viralização horizontal, milhares de usuários atuam como multiplicadores naturais da mensagem, gerando circulação orgânica e conversa real dentro de um ecossistema mensurável.
              </p>
              <div className="p-8 border border-slate-100 rounded-[2.5rem] bg-slate-50">
                <div className="flex items-center gap-4 mb-4">
                  <Globe className="text-tzero-blue" size={24} />
                  <span className="text-xs font-black text-tzero-navy uppercase tracking-widest">Viralização Horizontal</span>
                </div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Resultados em Redes Sociais e WhatsApp</p>
              </div>
            </div>
          </div>
        </div>

        {/* Automação 24/7 */}
        <div className="bg-tzero-navy rounded-[4rem] p-12 lg:p-24 text-white relative overflow-hidden text-center mb-24">
          <div className="absolute inset-0 bg-gradient-to-b from-tzero-blue/10 to-transparent"></div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-10 border border-white/10">
              <Clock size={14} /> Always-On Operation
            </div>
            <h2 className="text-4xl lg:text-6xl font-black mb-8 tracking-tight leading-tight">
              Automação total, quando o cliente está <span className="text-tzero-blue">pronto.</span>
            </h2>
            <p className="text-blue-100/60 text-lg font-medium leading-relaxed mb-12">
              O sistema responde, classifica e orienta automaticamente 24/7. A intervenção humana acontece somente quando faz sentido — no fechamento ou relacionamento estratégico.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-tzero-blue text-white px-12 py-5 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/30 hover:bg-white hover:text-tzero-navy transition-all"
              >
                Agendar Demonstração
              </a>
              <button className="bg-white/5 border border-white/10 text-white px-12 py-5 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                Ver Flow de IA
              </button>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="text-center max-w-2xl mx-auto">
          <h3 className="text-2xl font-black text-tzero-navy mb-4 tracking-tight">Em Resumo</h3>
          <p className="text-slate-500 font-medium leading-relaxed">
            O Leads360 não é apenas um modelo de captação. É uma máquina de atenção qualificada, criada para transformar volume em inteligência, interesse em oportunidade e engajamento em resultado real.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Leads360Page;

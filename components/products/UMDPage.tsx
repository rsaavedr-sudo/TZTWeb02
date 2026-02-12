
import React from 'react';
import { 
  ArrowLeft, 
  Search, 
  ShieldCheck, 
  Cpu, 
  Zap, 
  Ghost, 
  XCircle, 
  Smartphone, 
  Bot, 
  Radio, 
  BarChart3, 
  FileCheck, 
  History, 
  Cloud, 
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Database,
  ShieldAlert,
  TrendingUp,
  Quote,
  Briefcase
} from 'lucide-react';
import { AppView } from '../../App';

interface ProductPageProps {
  setView: (view: AppView) => void;
}

const UMDPage: React.FC<ProductPageProps> = ({ setView }) => {
  const whatsappUrl = "https://wa.me/5521984520042?text=Olá! Gostaria de agendar uma demonstração do UMD - Classificador SaaS Avançado e conversar sobre uma PoC.";

  const testimonials = [
    {
      name: "Paloma Branquinho",
      role: "Head de Operações na Facilitta Saúde",
      text: "Antes do ZeroLoss, uma parte enorme do nosso orçamento era consumida por chamadas improdutivas. Pagávamos por tentativas, não por resultados. Com o ZeroLoss, passamos a pagar apenas pelas chamadas efetivamente transferidas para nossos atendentes. O impacto foi imediato: redução de custos, mais previsibilidade financeira e uma operação muito mais eficiente. O modelo simplesmente funciona.",
      product: "ZeroLoss CPC",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=256&h=256&auto=format&fit=crop"
    },
    {
      name: "Rodrigo Miliante",
      role: "Gerente de Operações Rede Saúde Total",
      text: "Utilizei a tecnologia Leads 360 em três projetos profissionais desde 2020. Em uma empresa da área de saúde, a solução de captação direta e pré-qualificação contribuiu para a geração de mais de 60 mil novos clientes em quatro anos, mesmo com uma equipe comercial reduzida. Trata-se de uma ferramenta estratégica, com impacto real em performance, escala e eficiência operacional.",
      product: "Leads360 Platform",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&h=256&auto=format&fit=crop"
    },
    {
      name: "Marcos Vinícius",
      role: "CTO da Connect Telecom",
      text: "A filtragem técnica do UMD limpou nosso tráfego de forma impressionante. Nosso ASR útil subiu 40% na primeira semana de PoC, eliminando custos invisíveis.",
      product: "UMD Classifier",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=256&h=256&auto=format&fit=crop"
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-white animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Breadcrumbs / Back Navigation */}
        <button 
          onClick={() => setView('landing')}
          className="flex items-center gap-2 text-slate-400 hover:text-tzero-blue font-bold text-xs uppercase tracking-widest mb-12 transition-all group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Voltar para Soluções
        </button>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#022c5e]/5 text-[#022c5e] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8 border border-slate-200">
              <Search size={14} className="text-tzero-blue" /> Universal Machine Detection
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-tzero-navy mb-8 tracking-tighter leading-[0.9]">
              UMD: Classificador <br /><span className="text-tzero-blue italic">SaaS Avançado.</span>
            </h1>
            <p className="text-slate-500 text-lg font-medium leading-relaxed mb-10">
              Desenvolvido para contact centers ativos que operam campanhas massivas onde eficiência, custo por contato e controle operacional são críticos. Identifica e elimina ligações improdutivas <span className="text-tzero-navy font-black underline decoration-tzero-blue">antes do atendimento humano e da cobrança</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-tzero-blue text-white px-10 py-5 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:bg-tzero-navy transition-all flex items-center justify-center gap-2"
              >
                Solicitar PoC Operacional <ArrowRight size={16} />
              </a>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-tzero-blue/5 blur-[120px] rounded-full"></div>
            <div className="relative bg-tzero-navy rounded-[3.5rem] p-12 text-white shadow-2xl border border-white/5 overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-tzero-blue/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
               <div className="flex justify-between items-center mb-10">
                 <h3 className="text-2xl font-black tracking-tight">Status do Tráfego</h3>
                 <div className="flex gap-2">
                    <span className="w-2 h-2 rounded-full bg-tzero-green animate-pulse"></span>
                    <span className="text-[10px] font-bold uppercase text-blue-200/40">Real-time Classification</span>
                 </div>
               </div>
               
               <div className="space-y-4">
                  {[
                    { label: "Caixa Postal", action: "BLOQUEADO", icon: <Ghost size={18} /> },
                    { label: "Agentes de IA", action: "BLOQUEADO", icon: <Bot size={18} /> },
                    { label: "Voice Mail iPhone", action: "BLOQUEADO", icon: <Smartphone size={18} /> },
                    { label: "False Termination", action: "FILTRADO", icon: <XCircle size={18} /> },
                    { label: "Bad Numbers", action: "FILTRADO", icon: <AlertTriangle size={18} /> }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between bg-white/5 border border-white/5 p-4 rounded-xl hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="text-tzero-blue">{item.icon}</div>
                        <span className="text-sm font-bold">{item.label}</span>
                      </div>
                      <span className={`text-[9px] font-black px-2 py-1 rounded ${item.action === 'BLOQUEADO' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'}`}>
                        {item.action}
                      </span>
                    </div>
                  ))}
               </div>
               
               <div className="mt-10 p-5 bg-white/5 rounded-2xl border border-white/10 text-center">
                  <p className="text-xs font-bold text-blue-100/60 leading-relaxed uppercase tracking-widest">
                    Custo zero para chamadas inválidas
                  </p>
               </div>
            </div>
          </div>
        </div>

        {/* The Problem Section */}
        <div className="py-24 bg-slate-50/50 rounded-[4rem] px-12 lg:px-24 mb-32">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-3xl lg:text-5xl font-black text-tzero-navy mb-8 tracking-tighter">O Problema nos <br /><span className="text-tzero-risk">Contact Centers Ativos.</span></h2>
              <p className="text-slate-500 font-medium leading-relaxed mb-10">
                Em campanhas massivas, o desperdício técnico e financeiro é silencioso. Uma parte significativa do tráfego é composta por chamadas improdutivas que geram custos diretos e desgastam suas equipes.
              </p>
              <div className="space-y-6">
                {[
                  { title: "Custos Diretos", desc: "Pagamento por minutos, canais e rotas que não geram contato." },
                  { title: "ASR Distorcido", desc: "Redução do Answer Success Rate real por conta de máquinas." },
                  { title: "Desgaste de Equipe", desc: "Agentes perdendo tempo com silêncio ou gravações." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 shrink-0 text-tzero-risk"><AlertTriangle size={20} /></div>
                    <div>
                      <h4 className="font-bold text-tzero-navy text-sm">{item.title}</h4>
                      <p className="text-xs text-slate-400 font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Overbilling</p>
                <p className="text-2xl font-black text-tzero-navy">Identificado</p>
              </div>
              <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Falhas de Rota</p>
                <p className="text-2xl font-black text-tzero-navy">Mitigado</p>
              </div>
              <div className="col-span-2 p-8 bg-white rounded-3xl border border-slate-100 shadow-sm flex items-center gap-6">
                <div className="w-16 h-16 bg-red-50 text-tzero-risk rounded-2xl flex items-center justify-center shrink-0">
                  <ShieldAlert size={32} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Impacto Financeiro</p>
                  <p className="text-lg font-black text-tzero-navy">Eliminação de cobranças indevidas de operadoras.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="mb-32">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-black text-tzero-navy tracking-tight mb-4">Benefícios Diretos e Mensuráveis</h2>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Ganhos claros para campanhas massivas</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Redução de Custo", desc: "Redução imediata do custo por contato efetivo através do descarte técnico.", icon: <Zap /> },
              { title: "Aumento de ASR Útil", desc: "Aumente o percentual de chamadas humanas entregues aos seus agentes.", icon: <TrendingUp size={24} /> },
              { title: "Eficiência de Canal", desc: "Menor consumo de canais e rotas, permitindo maior escala com a mesma infra.", icon: <Database /> },
              { title: "Previsibilidade", desc: "Maior previsibilidade financeira e eliminação de desperdício invisível.", icon: <BarChart3 /> },
              { title: "Auditoria Ativa", desc: "Detecte anomalias e cobranças indevidas de operadoras em tempo real.", icon: <ShieldCheck /> },
              { title: "Proteção Financeira", desc: "Transforme desperdício técnico em vantagem competitiva real.", icon: <FileCheck /> }
            ].map((benefit, i) => (
              <div key={i} className="p-10 bg-white border border-slate-100 rounded-[2.5rem] hover:shadow-xl hover:border-tzero-blue/20 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-tzero-blue group-hover:text-white flex items-center justify-center mb-6 transition-all">
                  {benefit.icon}
                </div>
                <h4 className="text-xl font-black text-tzero-navy mb-3">{benefit.title}</h4>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Use Cases Section - Empty for now */}
        <div className="mb-32 py-24 bg-slate-900 rounded-[4rem] px-12 lg:px-24 text-white">
           <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-20">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 bg-white/10 text-tzero-blue px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-white/5">
                  <Briefcase size={14} /> Aplicações Práticas
                </div>
                <h2 className="text-4xl lg:text-6xl font-black tracking-tight leading-tight">Casos de Uso</h2>
              </div>
              <p className="text-blue-100/40 text-sm font-bold uppercase tracking-[0.2em] mb-4">Vazio por enquanto</p>
           </div>
           
           <div className="grid md:grid-cols-2 gap-8 opacity-20 grayscale pointer-events-none">
              <div className="h-64 bg-white/5 border border-white/10 rounded-[2.5rem] flex items-center justify-center italic text-xs font-bold tracking-widest uppercase">
                Case em breve...
              </div>
              <div className="h-64 bg-white/5 border border-white/10 rounded-[2.5rem] flex items-center justify-center italic text-xs font-bold tracking-widest uppercase">
                Case em breve...
              </div>
           </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-32">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-black text-tzero-navy tracking-tight mb-4">Depoimentos de Impacto</h2>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">O que nossos parceiros dizem sobre o ecossistema</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white border border-slate-100 p-10 rounded-[3rem] shadow-sm flex flex-col hover:shadow-xl transition-all group">
                <div className="text-tzero-blue/20 mb-6 group-hover:text-tzero-blue transition-colors">
                  <Quote size={40} fill="currentColor" />
                </div>
                <p className="text-slate-600 font-medium leading-relaxed mb-10 flex-grow italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-4 border-t border-slate-50 pt-8">
                  <img src={t.image} alt={t.name} className="w-14 h-14 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all shadow-md" />
                  <div>
                    <h5 className="text-sm font-black text-tzero-navy">{t.name}</h5>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{t.role}</p>
                    <span className="inline-block mt-1 text-[9px] font-black text-tzero-blue bg-tzero-blue/5 px-2 py-0.5 rounded uppercase">{t.product}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compatibility & Platform */}
        <div className="grid lg:grid-cols-2 gap-12 mb-32">
          <div className="bg-tzero-navy rounded-[3rem] p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-tzero-blue/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <Radio className="text-tzero-blue" />
                <h3 className="text-2xl font-black tracking-tight">Compatibilidade Total</h3>
              </div>
              <p className="text-blue-100/60 font-medium mb-10 leading-relaxed">
                Plug-and-play em qualquer infraestrutura de telecomunicações sem necessidade de ajustes manuais ou mudanças na arquitetura existente.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-10">
                {['SIP', 'ISDN', 'GSM'].map(tech => (
                  <div key={tech} className="bg-white/10 border border-white/10 p-4 rounded-xl text-center font-black text-lg">
                    {tech}
                  </div>
                ))}
              </div>
              <ul className="space-y-4">
                {["Implementado em qualquer rota", "Funciona com qualquer operadora", "Sem mudanças na arquitetura", "Impacto operacional zero"].map((text, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs font-bold text-blue-100/80">
                    <CheckCircle size={14} className="text-tzero-blue" /> {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-slate-50 rounded-[3rem] p-12 border border-slate-100 relative overflow-hidden flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-8">
              <Cloud className="text-tzero-blue" />
              <h3 className="text-2xl font-black text-tzero-navy tracking-tight">Plataforma SaaS & Análise</h3>
            </div>
            <p className="text-slate-500 font-medium mb-10 leading-relaxed">
              Gestão centralizada, acessível e auditável por meio de uma plataforma web robusta.
            </p>
            <div className="space-y-6">
              {[
                { title: "Gravação & Análise", desc: "Gravação de chamadas classificadas para auditoria técnica.", icon: <History size={20} /> },
                { title: "Relatórios Estratégicos", desc: "Visualização clara dos dados de desempenho e economia.", icon: <BarChart3 size={20} /> },
                { title: "Audit Log Imutável", desc: "Transparência total sobre o tráfego processado.", icon: <FileCheck size={20} /> }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1 shrink-0 text-tzero-blue">{item.icon}</div>
                  <div>
                    <h4 className="font-bold text-tzero-navy text-sm">{item.title}</h4>
                    <p className="text-xs text-slate-400 font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PoC Section */}
        <div className="bg-white border-2 border-tzero-blue border-dashed rounded-[4rem] p-12 lg:p-24 text-center relative overflow-hidden mb-24">
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-black text-tzero-navy mb-8 tracking-tight leading-tight">
              Resultados Imediatos: <br /><span className="text-tzero-blue">Prova de Conceito.</span>
            </h2>
            <p className="text-slate-500 text-lg font-medium leading-relaxed mb-12">
              O UMD gera resultados desde o primeiro dia. Realize uma PoC operacional para mensurar o percentual de chamadas eliminadas e a economia real para sua campanha.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-tzero-navy text-white px-12 py-5 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-blue-900/30 hover:bg-tzero-blue transition-all"
              >
                Agendar Demonstração Técnica
              </a>
              <button className="bg-white border border-slate-200 text-tzero-navy px-12 py-5 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
                Baixar Whitepaper UMD
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UMDPage;

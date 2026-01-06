
import React from 'react';
import { ArrowLeft, Cpu, ShieldCheck, Zap, Server, Code, Radio, BarChart } from 'lucide-react';
import { AppView } from '../App';

interface TechPageProps {
  setView: (view: AppView) => void;
}

const TechPage: React.FC<TechPageProps> = ({ setView }) => {
  const techCards = [
    {
      title: "IA Neural Sensation",
      icon: <Cpu size={32} />,
      desc: "Nossa rede neural proprietária analisa o espectro de áudio em tempo real para distinguir com 99.8% de precisão o padrão de 'Alô' humano versus bipes de operadora e URAs.",
      specs: ["Latência: < 100ms", "Accuracy: 99.8%", "Engine: Custom Tensor-Flow optimized"]
    },
    {
      title: "SIP Mesh Infrastructure",
      icon: <Server size={32} />,
      desc: "Uma malha de servidores distribuídos globalmente com rotas redundantes. O Smart Route decide o melhor caminho SIP em menos de 12ms baseado em telemetria de rede.",
      specs: ["Protocolo: SIP 2.0 / WebRTC", "Throughput: 100k CPS", "Redundância: N+2 Active-Active"]
    },
    {
      title: "Data Integrity Protocol",
      icon: <ShieldCheck size={32} />,
      desc: "Criptografia de ponta a ponta e anonimização de dados sensíveis conforme LGPD. Auditoria completa de cada evento de sinalização para faturamento transparente.",
      specs: ["TLS 1.3 / SRTP", "LGPD Compliant", "Audit Logs: Real-time Immutable"]
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

        <div className="mb-24">
          <div className="flex items-center gap-2 text-tzero-blue font-black text-[10px] uppercase tracking-[0.3em] mb-6">
            <Code size={14} /> Technical Documentation
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-tzero-navy mb-8 tracking-tighter leading-[0.9]">
            The Stack behind <br />
            <span className="text-tzero-blue">Performance.</span>
          </h1>
          <p className="text-slate-500 text-lg font-medium max-w-2xl leading-relaxed">
            Nós não apenas usamos tecnologia; nós a criamos. Conheça os pilares da infraestrutura que sustenta as maiores operações de telecom do país.
          </p>
        </div>

        {/* Hero Tech Visual */}
        <div className="relative mb-32 group">
          <div className="absolute inset-0 bg-tzero-blue/5 blur-[120px] rounded-full group-hover:bg-tzero-blue/10 transition-all duration-700"></div>
          <div className="relative bg-tzero-navy rounded-[4rem] p-12 lg:p-20 overflow-hidden text-white shadow-2xl border border-white/5">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-3xl font-black mb-8 tracking-tight">Arquitetura de Baixa Latência</h3>
                <p className="text-blue-100/60 text-lg mb-10 leading-relaxed font-medium">
                  Processamos milhões de chamadas simultâneas com impacto zero na qualidade da voz. Nosso cluster é auto-escalável e distribuído em data centers Tier IV.
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <div className="border-l-2 border-tzero-blue pl-6">
                    <span className="text-3xl font-black text-tzero-blue block tracking-tighter">12ms</span>
                    <p className="text-blue-100/40 text-[9px] font-black uppercase tracking-widest mt-2">Route Logic Speed</p>
                  </div>
                  <div className="border-l-2 border-tzero-blue pl-6">
                    <span className="text-3xl font-black text-tzero-blue block tracking-tighter">100k+</span>
                    <p className="text-blue-100/40 text-[9px] font-black uppercase tracking-widest mt-2">Concurrent Calls</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 rounded-[2.5rem] p-8 border border-white/10 backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-8">
                  <Radio className="text-tzero-blue animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-widest">Live Network Status</span>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Core Node - SP", status: "Active", latency: "4ms" },
                    { label: "Edge Node - RJ", status: "Active", latency: "8ms" },
                    { label: "IA Filter Cluster", status: "Optimized", latency: "95ms" }
                  ].map((node, i) => (
                    <div key={i} className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5">
                      <span className="text-xs font-bold text-slate-300 font-mono">{node.label}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black text-tzero-green uppercase tracking-tighter">{node.status}</span>
                        <span className="text-[10px] font-black text-blue-100/40">{node.latency}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Cards */}
        <div className="grid lg:grid-cols-3 gap-10">
          {techCards.map((card, i) => (
            <div key={i} className="flex flex-col p-12 bg-white border border-slate-100 rounded-[3rem] hover:shadow-2xl transition-all duration-500 group">
              <div className="text-tzero-blue mb-8 group-hover:scale-110 transition-transform duration-500">
                {card.icon}
              </div>
              <h4 className="text-2xl font-black text-tzero-navy mb-6 tracking-tight leading-none">{card.title}</h4>
              <p className="text-slate-500 text-sm font-medium leading-relaxed mb-10 flex-grow">
                {card.desc}
              </p>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Benchmarks</h5>
                <ul className="space-y-2">
                  {card.specs.map((spec, j) => (
                    <li key={j} className="text-[11px] font-bold text-tzero-navy flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-tzero-blue"></div> {spec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechPage;

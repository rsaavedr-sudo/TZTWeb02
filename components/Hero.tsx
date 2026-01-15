
import React from 'react';
import { Zap, ShieldCheck, Cpu, Activity, TrendingUp, Play, CheckCircle2, PhoneOff, Smartphone, Bot, XCircle, MicOff } from 'lucide-react';

const BillingCard = () => (
  <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-[0_20px_50px_rgba(2,44,94,0.06)] relative overflow-hidden">
    <div className="absolute top-0 right-0 w-40 h-40 bg-tzero-blue/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
    <div className="mb-6 flex justify-between items-center">
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Billing Engine v3.0</p>
        <h4 className="text-lg font-extrabold text-[#022c5e]">Real-Time Audit</h4>
      </div>
      <div className="bg-blue-50 text-tzero-blue p-2.5 rounded-xl border border-blue-100/50">
        <Activity size={18} />
      </div>
    </div>
    
    <div className="space-y-2 max-h-[420px] overflow-y-auto pr-2 custom-scrollbar">
      {[
        { icon: <Cpu size={14} />, label: "Answering Machine", cost: "R$ 0,00" },
        { icon: <Activity size={14} />, label: "Network Error", cost: "R$ 0,00" },
        { icon: <PhoneOff size={14} />, label: "Bad Number", cost: "R$ 0,00" },
        { icon: <Smartphone size={14} />, label: "Voice Mail iPhone", cost: "R$ 0,00" },
        { icon: <Bot size={14} />, label: "Agente IA", cost: "R$ 0,00" },
        { icon: <XCircle size={14} />, label: "False Termination", cost: "R$ 0,00" },
        { icon: <MicOff size={14} />, label: "Atendidas sem áudio", cost: "R$ 0,00" },
      ].map((item, idx) => (
        <div key={idx} className="p-3 bg-slate-50/50 rounded-xl border border-slate-100 flex justify-between items-center transition-all hover:bg-slate-100/50">
          <div className="flex items-center gap-3">
            <div className="text-slate-400">{item.icon}</div>
            <span className="text-slate-500 text-[11px] font-bold tracking-tight">{item.label}</span>
          </div>
          <span className="text-slate-400 font-black text-[10px] bg-white px-2 py-0.5 rounded-md border border-slate-100">{item.cost}</span>
        </div>
      ))}

      <div className="p-5 bg-[#022c5e] rounded-2xl flex justify-between items-center shadow-lg shadow-blue-900/10 transform scale-[1.02] mt-4 sticky bottom-0">
        <div className="flex items-center gap-3">
          <TrendingUp className="text-tzero-blue" size={18} />
          <span className="text-white text-sm font-bold">Human Verified</span>
        </div>
        <span className="text-tzero-blue font-black text-[10px] uppercase tracking-tighter bg-white/5 px-2 py-1 rounded">CPC Charged</span>
      </div>
    </div>

    <div className="mt-6 pt-4 border-t border-slate-50 text-center">
      <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2">
        <CheckCircle2 size={12} className="text-tzero-blue" /> Guaranteed Efficiency
      </p>
    </div>
  </div>
);

const Hero: React.FC = () => {
  const whatsappUrl = "https://wa.me/5521984520042?text=Olá! Gostaria de agendar uma demonstração das soluções da ZERO2ONE.";

  return (
    <div className="relative blue-gradient-soft pt-32 pb-20 lg:pt-52 lg:pb-32 overflow-hidden" id="hero">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-tzero-blue/5 text-tzero-blue px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider mb-8 border border-tzero-blue/10">
              <Zap size={14} className="fill-tzero-blue" /> Telecommunications Revolution
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-[#022c5e] leading-[1.1] mb-8 tracking-tight">
              Pague apenas por <br />
              <span className="text-tzero-blue underline decoration-slate-200">Alô Humano Efetivo.</span>
            </h1>

            <div className="space-y-6 mb-12 max-w-2xl">
              <p className="text-sm lg:text-base text-slate-500 leading-relaxed font-medium">
                Campanhas telefônicas ativas desperdiçam recursos valiosos. Em modelos tradicionais, apenas cerca de 4% das ligações resultam em contato humano efetivo com um atendente. Os outros 96% geram custos sem retorno — chamadas não atendidas, caixas postais, números inválidos ou atendimentos automáticos.
              </p>
              <p className="text-sm lg:text-base text-slate-500 leading-relaxed font-medium">
                Esse desperdício impacta diretamente a eficiência operacional, aumenta o custo por contato e compromete a previsibilidade financeira das campanhas. A ZeroLoss elimina esse problema pela raiz, oferecendo um modelo no qual o call center paga apenas pelos contatos humanos efetivos que o nosso sistema transfere para o agente.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-tzero-blue text-white px-10 py-4.5 rounded-xl text-sm font-bold shadow-xl shadow-blue-500/20 hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
              >
                Agendar uma Demonstração
              </a>
              <button className="bg-white border border-slate-200 text-[#022c5e] px-10 py-4.5 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                <Play size={16} fill="currentColor" /> Ver Demonstração
              </button>
            </div>
          </div>
          
          <div className="relative lg:block hidden">
            <div className="absolute -inset-10 bg-gradient-to-tr from-tzero-blue/10 to-transparent blur-3xl rounded-full"></div>
            <BillingCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

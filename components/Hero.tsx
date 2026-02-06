
import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Activity, 
  TrendingUp, 
  Play, 
  PhoneOff, 
  Smartphone, 
  Bot, 
  XCircle, 
  MicOff, 
  Target, 
  Share2, 
  Repeat, 
  ArrowRight,
  Cpu,
  Layers,
  ChevronRight
} from 'lucide-react';

const BillingCard = () => (
  <div className="bg-white border border-slate-100 rounded-[3rem] p-8 shadow-[0_20px_50px_rgba(2,44,94,0.06)] relative overflow-hidden h-full flex flex-col">
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
    
    <div className="space-y-2 flex-grow overflow-y-auto pr-2 custom-scrollbar">
      {[
        { icon: <Cpu size={14} />, label: "Answering Machine", cost: "R$ 0,00" },
        { icon: <Activity size={14} />, label: "Network Error", cost: "R$ 0,00" },
        { icon: <PhoneOff size={14} />, label: "Bad Number", cost: "R$ 0,00" },
        { icon: <Smartphone size={14} />, label: "Voice Mail iPhone", cost: "R$ 0,00" },
        { icon: <Bot size={14} />, label: "Agente IA", cost: "R$ 0,00" },
        { icon: <XCircle size={14} />, label: "False Termination", cost: "R$ 0,00" },
        { icon: <MicOff size={14} />, label: "Atendidas sem áudio", cost: "R$ 0,00" },
      ].map((item, idx) => (
        <div key={idx} className="p-3 bg-slate-50/50 rounded-xl border border-slate-100 flex justify-between items-center transition-all">
          <div className="flex items-center gap-3">
            <div className="text-slate-300">{item.icon}</div>
            <span className="text-slate-500 text-[11px] font-bold tracking-tight">{item.label}</span>
          </div>
          <span className="text-slate-400 font-black text-[10px] bg-white px-2 py-0.5 rounded-md border border-slate-100">{item.cost}</span>
        </div>
      ))}
    </div>

    <div className="p-5 bg-[#022c5e] rounded-2xl flex justify-between items-center shadow-lg shadow-blue-900/10 transform scale-[1.02] mt-4">
      <div className="flex items-center gap-3">
        <TrendingUp className="text-tzero-blue" size={18} />
        <span className="text-white text-sm font-bold">Human Verified</span>
      </div>
      <span className="text-tzero-blue font-black text-[10px] uppercase tracking-tighter bg-white/5 px-2 py-1 rounded">CPC Charged</span>
    </div>
  </div>
);

const ThreeMotorsCard = () => (
  <div className="bg-[#022c5e] border border-white/5 rounded-[3rem] p-8 shadow-2xl relative overflow-hidden h-full text-white flex flex-col">
    <div className="absolute top-0 right-0 w-64 h-64 bg-tzero-blue/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
    <div className="mb-8 flex justify-between items-center relative z-10">
      <div>
        <p className="text-[10px] font-bold text-blue-200/40 uppercase tracking-widest">Leads360 Architecture</p>
        <h4 className="text-xl font-black">Os 3 Motores</h4>
      </div>
      <div className="bg-tzero-blue/20 text-tzero-blue p-2.5 rounded-2xl border border-white/5">
        <Layers size={22} />
      </div>
    </div>

    <div className="grid grid-cols-1 gap-4 relative z-10">
      {[
        { 
          label: "Tráfego Pago", 
          icon: <Target size={18} />, 
          status: "Alta Precisão", 
          progress: "w-4/5",
          color: "bg-tzero-blue"
        },
        { 
          label: "URA Reversa", 
          icon: <Repeat size={18} />, 
          status: "Escala Ativa", 
          progress: "w-2/3",
          color: "bg-tzero-blue/60"
        },
        { 
          label: "Viralização", 
          icon: <Share2 size={18} />, 
          status: "Orgânico", 
          progress: "w-5/6",
          color: "bg-tzero-blue/40"
        }
      ].map((motor, idx) => (
        <div key={idx} className="bg-white/5 border border-white/5 p-5 rounded-2xl hover:bg-white/10 transition-all group">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-3">
              <div className="text-tzero-blue group-hover:scale-110 transition-transform">{motor.icon}</div>
              <span className="text-sm font-black tracking-tight">{motor.label}</span>
            </div>
            <span className="text-[9px] font-black uppercase text-blue-200/40">{motor.status}</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div className={`${motor.color} h-full ${motor.progress} animate-pulse`}></div>
          </div>
        </div>
      ))}
    </div>

    <div className="mt-8 pt-6 border-t border-white/5 relative z-10">
      <div className="flex items-center gap-4 bg-white rounded-2xl p-5 shadow-xl">
        <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-tzero-blue">
          <Bot size={20} />
        </div>
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">SDR-AI Qualification</p>
          <p className="text-xs font-bold text-slate-900 leading-tight">Filtrando ruído e extraindo valor real de cada motor.</p>
        </div>
      </div>
    </div>
  </div>
);

const Hero: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const whatsappUrl = "https://wa.me/5521984520042?text=Olá! Gostaria de agendar uma demonstração das soluções da ZERO2ONE.";

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev === 0 ? 1 : 0));
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const slides = [
    {
      badge: "Inversão de Risco Operacional",
      title: <>Pague apenas por <br /><span className="text-tzero-blue underline decoration-slate-100">Alô Humano Efetivo.</span></>,
      desc: "O modelo ZeroLoss transfere o risco técnico da operadora para nós. Se não houver contato humano validado pela nossa IA, o custo é zero para sua empresa.",
      cta: "Entenda o Modelo CPC",
      visual: <BillingCard />,
      id: "zeroloss"
    },
    {
      badge: "3 Motores de Aquisição",
      title: <>Captação Massiva e <br /><span className="text-tzero-blue italic">Atenção Qualificada.</span></>,
      desc: "Tráfego Pago, URA Reversa e Viralização Horizontal. Três motores independentes integrados a um SDR automatizado por IA para volume real e intenção clara.",
      cta: "Conhecer os 3 Motores",
      visual: <ThreeMotorsCard />,
      id: "leads360"
    }
  ];

  return (
    <div className="relative blue-gradient-soft pt-12 pb-20 lg:pt-24 lg:pb-32 overflow-hidden min-h-[820px] flex items-center" id="hero">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[550px]">
          
          <div className="relative">
            {slides.map((slide, index) => (
              <div 
                key={slide.id}
                className={`transition-all duration-1000 absolute top-0 left-0 w-full ${activeSlide === index ? 'opacity-100 translate-x-0 relative pointer-events-auto' : 'opacity-0 -translate-x-12 pointer-events-none'}`}
              >
                <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-10 shadow-xl border border-white/5">
                  <Zap size={14} className="text-tzero-blue fill-tzero-blue" /> {slide.badge}
                </div>
                
                <h1 className="text-5xl lg:text-[5.5rem] font-black text-tzero-navy leading-[0.95] mb-10 tracking-tighter">
                  {slide.title}
                </h1>

                <div className="mb-12 max-w-2xl">
                  <p className="text-lg lg:text-xl text-slate-500 leading-relaxed font-medium">
                    {slide.desc}
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-5">
                  <a 
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-tzero-blue text-white px-12 py-5 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-2xl shadow-blue-500/30 hover:bg-slate-900 transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1"
                  >
                    Agendar Demonstração <ArrowRight size={16} />
                  </a>
                  <button className="bg-white border border-slate-200 text-tzero-navy px-12 py-5 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
                    <Play size={16} className="fill-current" /> {slide.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="relative lg:block hidden">
            <div className="absolute -inset-20 bg-gradient-to-tr from-tzero-blue/10 to-transparent blur-[120px] rounded-full"></div>
            <div className="h-[600px] w-full max-w-[500px] mx-auto perspective-1000">
              {slides.map((slide, index) => (
                <div 
                  key={`visual-${slide.id}`}
                  className={`transition-all duration-1000 absolute inset-0 transform ${activeSlide === index ? 'opacity-100 scale-100 translate-y-0 rotate-0' : 'opacity-0 scale-90 translate-y-10 rotate-3 pointer-events-none'}`}
                >
                  {slide.visual}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Pagination Indicators */}
        <div className="mt-24 flex gap-6">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className="group flex flex-col items-start gap-3"
            >
              <div className={`h-1 rounded-full transition-all duration-500 overflow-hidden bg-slate-100 ${activeSlide === index ? 'w-32' : 'w-12 hover:w-20 hover:bg-slate-200'}`}>
                {activeSlide === index && (
                  <div className="h-full bg-tzero-blue animate-[progress_10s_linear_forwards]"></div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${activeSlide === index ? 'text-tzero-navy' : 'text-slate-300'}`}>
                  {index === 0 ? 'ZeroLoss CPC' : 'Leads360 Platform'}
                </span>
                {activeSlide === index && <ChevronRight size={14} className="text-tzero-blue animate-pulse" />}
              </div>
            </button>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default Hero;

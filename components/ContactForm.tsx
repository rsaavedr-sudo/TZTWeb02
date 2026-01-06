
import React from 'react';
import { Send, Mail, Building, Users, CheckCircle2 } from 'lucide-react';

const ContactForm: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-32 bg-white" id="contato">
      <div className="bg-white rounded-[4rem] shadow-[0_60px_120px_-30px_rgba(11,28,63,0.15)] overflow-hidden border border-slate-100 grid lg:grid-cols-12">
        <div className="lg:col-span-5 p-12 lg:p-20 bg-[#022c5e] text-white relative">
          <div className="relative z-10">
            <h2 className="text-4xl lg:text-6xl font-black mb-10 leading-[0.95] tracking-tight">Pronto para <br />a eficiência.</h2>
            <p className="text-blue-100/60 text-lg font-medium mb-16 max-w-md leading-relaxed">
              Fale com nossos especialistas e descubra como o modelo <span className="text-white font-bold">ZeroLoss</span> pode transformar sua rentabilidade.
            </p>
            
            <div className="space-y-12">
              <ContactItem icon={<Mail />} title="E-mail Corporativo" val="brasil@tzerotech.com" />
              <ContactItem icon={<Building />} title="Sede Central" val="São Paulo, SP - Brasil" />
              <ContactItem icon={<Users />} title="Atendimento" val="0800 591 0000" />
            </div>
          </div>
          <div className="absolute bottom-0 right-0 p-12 opacity-5">
             <CheckCircle2 size={240} />
          </div>
        </div>

        <div className="lg:col-span-7 p-12 lg:p-20 bg-white">
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-8">
              <Input label="Nome Completo" placeholder="Seu nome" />
              <Input label="E-mail" placeholder="nome@empresa.com" type="email" />
            </div>
            <Input label="Empresa / Operação" placeholder="Nome da sua empresa" />
            <div className="space-y-3">
              <label className="block text-[#022c5e] font-black text-[11px] uppercase tracking-widest opacity-60">Volume Mensual Estimado</label>
              <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-8 py-5 focus:ring-4 focus:ring-tzero-blue/10 focus:border-tzero-blue outline-none transition-all text-sm font-bold text-[#022c5e] appearance-none cursor-pointer">
                <option>Até 500k Chamadas</option>
                <option>500k - 2M Chamadas</option>
                <option>Mais de 2M Chamadas</option>
              </select>
            </div>
            <button className="bg-tzero-blue text-white w-full py-7 rounded-2xl text-sm font-black uppercase tracking-[0.2em] shadow-2xl shadow-blue-500/20 flex items-center justify-center gap-3 hover:bg-[#022c5e] transition-all transform hover:-translate-y-1 mt-10">
              Solicitar Diagnóstico <Send size={18} />
            </button>
            <p className="text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-6">Garantimos confidencialidade total dos seus dados.</p>
          </form>
        </div>
      </div>
    </div>
  );
};

const ContactItem = ({ icon, title, val }: any) => (
  <div className="flex items-center gap-6">
    <div className="bg-white/10 p-5 rounded-2xl text-tzero-blue border border-white/5 shadow-xl">
      {React.cloneElement(icon, { size: 28 })}
    </div>
    <div>
      <p className="text-blue-200/40 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{title}</p>
      <p className="text-2xl font-bold tracking-tight">{val}</p>
    </div>
  </div>
);

const Input = ({ label, placeholder, type = "text" }: any) => (
  <div className="space-y-3">
    <label className="block text-[#022c5e] font-black text-[11px] uppercase tracking-widest opacity-60">{label}</label>
    <input 
      type={type} placeholder={placeholder} 
      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-8 py-5 focus:ring-4 focus:ring-tzero-blue/10 focus:border-tzero-blue outline-none transition-all text-sm font-bold text-[#022c5e] placeholder:text-slate-300"
    />
  </div>
);

export default ContactForm;

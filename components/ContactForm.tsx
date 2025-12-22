
import React from 'react';
import { Send, Mail, Building, Users, CheckCircle2 } from 'lucide-react';

const ContactForm: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24" id="empresa">
      <div className="bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(11,28,63,0.12)] overflow-hidden border border-slate-50 grid lg:grid-cols-2">
        <div className="p-12 lg:p-20 bg-tzero-navy text-white relative">
          <div className="relative z-10">
            <h2 className="text-4xl lg:text-6xl font-black mb-10 leading-[0.95] tracking-tight">Pronto para <br />la eficiencia.</h2>
            <p className="text-blue-100/60 text-lg font-medium mb-12 max-w-md">
              Hable con nuestros expertos y descubra cómo el modelo ZeroLoss puede transformar su rentabilidad.
            </p>
            
            <div className="space-y-10">
              <ContactItem icon={<Mail />} title="E-mail Corporativo" val="brasil@tzerotech.com" />
              <ContactItem icon={<Building />} title="Sede Central" val="São Paulo, SP - Brasil" />
              <ContactItem icon={<Users />} title="Atención" val="0800 591 0000" />
            </div>
          </div>
          <div className="absolute bottom-0 right-0 p-12 opacity-5">
             <CheckCircle2 size={160} />
          </div>
        </div>

        <div className="p-12 lg:p-20 bg-white">
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-8">
              <Input label="Nombre Completo" placeholder="Su nombre" />
              <Input label="E-mail" placeholder="nombre@empresa.com" type="email" />
            </div>
            <Input label="Empresa / Operación" placeholder="Nombre de su empresa" />
            <div className="space-y-3">
              <label className="block text-tzero-navy font-black text-[11px] uppercase tracking-widest opacity-60">Volumen Mensual Estimado</label>
              <select className="w-full bg-tzero-soft border border-slate-100 rounded-xl px-6 py-5 focus:ring-4 focus:ring-tzero-blue/10 focus:border-tzero-blue outline-none transition-all text-sm font-bold text-tzero-navy">
                <option>Hasta 500k Llamadas</option>
                <option>500k - 2M Llamadas</option>
                <option>Más de 2M Llamadas</option>
              </select>
            </div>
            <button className="btn-tzero-primary w-full py-6 text-sm font-black uppercase tracking-[0.2em] shadow-2xl shadow-blue-900/10 flex items-center justify-center gap-3">
              Solicitar Diagnóstico <Send size={18} />
            </button>
            <p className="text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest">Garantizamos confidencialidad total de sus datos.</p>
          </form>
        </div>
      </div>
    </div>
  );
};

const ContactItem = ({ icon, title, val }: any) => (
  <div className="flex items-center gap-5">
    <div className="bg-tzero-blue/10 p-4 rounded-2xl text-tzero-blue border border-white/5">
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <div>
      <p className="text-blue-200/40 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{title}</p>
      <p className="text-xl font-bold tracking-tight">{val}</p>
    </div>
  </div>
);

const Input = ({ label, placeholder, type = "text" }: any) => (
  <div className="space-y-3">
    <label className="block text-tzero-navy font-black text-[11px] uppercase tracking-widest opacity-60">{label}</label>
    <input 
      type={type} placeholder={placeholder} 
      className="w-full bg-tzero-soft border border-slate-100 rounded-xl px-6 py-5 focus:ring-4 focus:ring-tzero-blue/10 focus:border-tzero-blue outline-none transition-all text-sm font-bold text-tzero-navy placeholder:text-slate-300"
    />
  </div>
);

export default ContactForm;

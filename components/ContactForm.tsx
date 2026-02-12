
import React, { useState } from 'react';
import { Send, Mail, Building, Users, CheckCircle2, MapPin, Phone, MessageSquare } from 'lucide-react';

interface ContactFormProps {
  isPage?: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ isPage = false }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Simulação de envio
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className={`max-w-7xl mx-auto px-6 lg:px-8 ${isPage ? 'py-12' : 'py-32'} bg-white animate-in fade-in duration-700`} id="contato">
      <div className="bg-white rounded-[4rem] shadow-[0_60px_120px_-30px_rgba(11,28,63,0.15)] overflow-hidden border border-slate-100 grid lg:grid-cols-12">
        
        {/* Coluna Esquerda - Informações */}
        <div className="lg:col-span-5 p-12 lg:p-20 bg-[#022c5e] text-white relative flex flex-col justify-between overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-10 backdrop-blur-md">
              <Mail size={12} /> Canal Direto
            </div>
            <h2 className="text-4xl lg:text-6xl font-black mb-10 leading-[0.95] tracking-tight">
              Vamos levar <br /> sua operação <br /> <span className="text-tzero-blue">ao próximo nível.</span>
            </h2>
            <p className="text-blue-100/60 text-lg font-medium mb-16 max-w-md leading-relaxed">
              Preencha o formulário ou fale conosco agora mesmo pelo WhatsApp para um atendimento imediato.
            </p>
            
            <div className="space-y-8">
              <ContactItem icon={<Mail />} title="E-mail Corporativo" val="contato@tzerotech.com" />
              <a href="https://wa.me/5521984520042" target="_blank" rel="noopener noreferrer" className="block hover:translate-x-2 transition-transform">
                <ContactItem 
                  icon={
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.653a11.77 11.77 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  } 
                  title="WhatsApp" 
                  val="+55 21 98452-0042" 
                />
              </a>
              <ContactItem icon={<Phone />} title="Central de Vendas" val="0800 591 0000" />
            </div>
          </div>
          
          {/* Grafismo de fundo */}
          <div className="absolute -bottom-20 -right-20 opacity-5 pointer-events-none transform rotate-12">
             <CheckCircle2 size={400} />
          </div>
        </div>

        {/* Coluna Direita - Formulário */}
        <div className="lg:col-span-7 p-12 lg:p-20 bg-white">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-20 animate-in zoom-in duration-500">
               <div className="w-24 h-24 bg-tzero-green/10 text-tzero-green rounded-full flex items-center justify-center mb-8">
                  <CheckCircle2 size={48} />
               </div>
               <h3 className="text-3xl font-black text-tzero-navy mb-4">Mensagem Recebida!</h3>
               <p className="text-slate-500 font-medium max-w-xs">Agradecemos o interesse. Nossos consultores já foram notificados.</p>
            </div>
          ) : (
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-8">
                <Input 
                  label="Nome da Empresa" 
                  placeholder="Nome Fantasia ou Razão Social" 
                  icon={<Building size={18} />}
                  required
                />
                <Input 
                  label="Telefone com DDD" 
                  placeholder="(00) 00000-0000" 
                  type="tel" 
                  icon={<Phone size={18} />}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="block text-[#022c5e] font-black text-[11px] uppercase tracking-widest opacity-60">Número de Funcionários</label>
                  <div className="relative group">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-tzero-blue opacity-50 group-focus-within:opacity-100 transition-opacity">
                      <Users size={18} />
                    </div>
                    <select 
                      required
                      defaultValue=""
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-16 pr-10 py-5 focus:ring-4 focus:ring-tzero-blue/10 focus:border-tzero-blue outline-none transition-all text-sm font-bold text-[#022c5e] appearance-none cursor-pointer hover:bg-slate-100/50"
                    >
                      <option value="" disabled>Selecione o porte da empresa</option>
                      <option value="1-50">1 a 50 funcionários</option>
                      <option value="51-200">51 a 200 funcionários</option>
                      <option value="201-500">201 a 500 funcionários</option>
                      <option value="500+">Mais de 500 funcionários</option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-30">
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <Input 
                  label="E-mail Corporativo" 
                  placeholder="nome@empresa.com" 
                  type="email" 
                  icon={<Mail size={18} />}
                  required
                />
              </div>

              <Input 
                label="Endereço da Empresa" 
                placeholder="Rua, Número, Complemento, Bairro, Cidade - UF" 
                icon={<MapPin size={18} />}
                required
              />

              <div className="space-y-3">
                <label className="block text-[#022c5e] font-black text-[11px] uppercase tracking-widest opacity-60">Mensagem Adicional (Opcional)</label>
                <div className="relative group">
                  <div className="absolute left-6 top-6 text-tzero-blue opacity-50 group-focus-within:opacity-100 transition-opacity">
                    <MessageSquare size={18} />
                  </div>
                  <textarea 
                    placeholder="Conte-nos brevemente sobre sua operação atual..." 
                    rows={4}
                    className="w-full bg-slate-50 border border-slate-100 rounded-3xl pl-16 pr-8 py-6 focus:ring-4 focus:ring-tzero-blue/10 focus:border-tzero-blue outline-none transition-all text-sm font-bold text-[#022c5e] placeholder:text-slate-300 resize-none"
                  ></textarea>
                </div>
              </div>

              <div className="pt-6">
                <button 
                  type="submit"
                  className="bg-tzero-blue text-white w-full py-7 rounded-2xl text-sm font-black uppercase tracking-[0.2em] shadow-2xl shadow-blue-500/30 flex items-center justify-center gap-3 hover:bg-[#022c5e] transition-all transform hover:-translate-y-1 active:scale-[0.98]"
                >
                  SOLICITAR DIAGNÓSTICO <Send size={18} />
                </button>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10">
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-tzero-green" /> LGPD Compliant
                </p>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-tzero-green" /> 100% Secure Data
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const ContactItem = ({ icon, title, val }: { icon: React.ReactNode, title: string, val: string }) => (
  <div className="flex items-center gap-6 group">
    <div className="bg-white/10 p-4 rounded-xl text-tzero-blue border border-white/5 shadow-xl group-hover:bg-tzero-blue group-hover:text-white transition-all duration-300">
      {/* Fixed type error by casting to React.ReactElement<any> to allow additional props like size */}
      {React.cloneElement(icon as React.ReactElement<any>, { size: 24 })}
    </div>
    <div>
      <p className="text-blue-200/40 text-[9px] font-black uppercase tracking-[0.2em] mb-1">{title}</p>
      <p className="text-lg lg:text-xl font-bold tracking-tight group-hover:text-tzero-blue transition-colors duration-300">{val}</p>
    </div>
  </div>
);

const Input = ({ label, placeholder, type = "text", icon, required = false }: any) => (
  <div className="space-y-3">
    <label className="block text-[#022c5e] font-black text-[11px] uppercase tracking-widest opacity-60">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    <div className="relative group">
      {icon && (
        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-tzero-blue opacity-50 group-focus-within:opacity-100 transition-opacity">
          {icon}
        </div>
      )}
      <input 
        required={required}
        type={type} 
        placeholder={placeholder} 
        className={`w-full bg-slate-50 border border-slate-100 rounded-2xl ${icon ? 'pl-16' : 'px-8'} py-5 focus:ring-4 focus:ring-tzero-blue/10 focus:border-tzero-blue outline-none transition-all text-sm font-bold text-[#022c5e] placeholder:text-slate-300 hover:bg-slate-100/50`}
      />
    </div>
  </div>
);

export default ContactForm;

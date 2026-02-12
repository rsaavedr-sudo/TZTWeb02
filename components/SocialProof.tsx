
import React from 'react';
import { Quote, Briefcase, CheckCircle2, TrendingUp, BarChart3, ShieldCheck, Target, Layers } from 'lucide-react';

const SocialProof: React.FC = () => {
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
      text: "A filtragem técnica do UMD limpou nosso tráfego de forma impressionante. Nosso ASR útil subiu 40% na primeira semana, eliminando custos invisíveis de máquinas e falsas terminações.",
      product: "UMD Classifier",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=256&h=256&auto=format&fit=crop"
    }
  ];

  const caseStudies = [
    {
      title: "Empresa de Cobrança",
      icon: <Target className="text-tzero-blue" size={24} />,
      challenge: "Alto volume de chamadas improdutivas gerando desperdício de orçamento.",
      solution: "Implementação do modelo ZeroLoss (pagamento apenas por chamadas efetivamente transferidas).",
      results: [
        "Redução de **38%** nos custos operacionais",
        "Aumento de **22%** nos contatos válidos",
        "Maior previsibilidade financeira"
      ],
      impact: "“Paramos de pagar por tentativas. Agora investimos apenas em contatos reais.”"
    },
    {
      title: "Call Center de Vendas",
      icon: <TrendingUp className="text-tzero-blue" size={24} />,
      challenge: "Escalar campanhas sem inflar custos com tráfego telefônico inútil.",
      solution: "Migração para cobrança baseada exclusivamente em chamadas efetivas transferidas ao atendente.",
      results: [
        "Crescimento de **45%** nas abordagens humanas",
        "Eliminação de custos com chamadas não conectadas",
        "ROI mais estável"
      ],
      impact: "“Conseguimos crescer mantendo controle total sobre os custos.”"
    },
    {
      title: "Operação Multicliente",
      icon: <ShieldCheck className="text-tzero-blue" size={24} />,
      challenge: "Questionamentos frequentes sobre cobranças por minutos e tentativas.",
      solution: "Adoção do modelo ZeroLoss com métrica objetiva: pagamento por transferência efetiva.",
      results: [
        "Redução de conflitos comerciais",
        "Relatórios mais transparentes",
        "Maior confiança dos clientes"
      ],
      impact: "“Agora a cobrança é simples, clara e auditável.”"
    }
  ];

  return (
    <section className="bg-white py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Seção de Casos de Uso */}
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
              Performance validada em operações reais
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {caseStudies.map((study, idx) => (
              <div key={idx} className="group relative bg-slate-50/50 border border-slate-100 rounded-[3rem] p-10 transition-all duration-500 hover:bg-white hover:shadow-[0_40px_80px_-15px_rgba(2,44,94,0.1)] hover:-translate-y-2 flex flex-col">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                    {study.icon}
                  </div>
                  <h4 className="text-tzero-navy font-black text-lg tracking-tight">{study.title}</h4>
                </div>

                <div className="space-y-6 flex-grow">
                  <div>
                    <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Desafio</h5>
                    <p className="text-slate-600 text-sm font-medium leading-relaxed">{study.challenge}</p>
                  </div>
                  
                  <div>
                    <h5 className="text-[10px] font-black text-tzero-blue uppercase tracking-widest mb-2">Solução</h5>
                    <p className="text-tzero-navy text-sm font-bold leading-relaxed">{study.solution}</p>
                  </div>

                  <div>
                    <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Resultados</h5>
                    <ul className="space-y-2">
                      {study.results.map((res, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-600 font-medium">
                          <CheckCircle2 size={14} className="text-tzero-blue mt-0.5 shrink-0" />
                          <span dangerouslySetInnerHTML={{ __html: res.replace(/\*\*(.*?)\*\*/g, '<span class="text-tzero-navy font-black">$1</span>') }} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-slate-100 italic">
                  <p className="text-tzero-navy font-bold text-sm leading-snug">
                    {study.impact}
                  </p>
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

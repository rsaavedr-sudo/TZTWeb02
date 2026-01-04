
import React from 'react';
import { ArrowRight, Calendar, User, BookOpen } from 'lucide-react';

const blogPosts = [
  {
    title: "O Fim da Tarifação por Minutos: Por que o CPC é o Futuro",
    excerpt: "Descubra como a mudança para o Custo por Contato está transformando a lucratividade dos maiores BPOs do Brasil.",
    category: "Estratégia",
    author: "Ricardo Menezes",
    date: "12 Mai, 2024",
    image: "https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=1470&auto=format&fit=crop"
  },
  {
    title: "IA Neural em Telecom: Detectando Humanos em Milissegundos",
    excerpt: "Como nossa infraestrutura processa milhões de chamadas para garantir que apenas áudio humano chegue ao seu agente.",
    category: "Tecnologia",
    author: "Ana Clara Silva",
    date: "08 Mai, 2024",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1470&auto=format&fit=crop"
  },
  {
    title: "Compliance e LGPD em Operações de Contato Massivo",
    excerpt: "As melhores práticas para manter sua operação segura e dentro das normas da ANATEL e regulamentações de privacidade.",
    category: "Segurança",
    author: "Dr. Roberto Costa",
    date: "02 Mai, 2024",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1470&auto=format&fit=crop"
  }
];

interface BlogProps {
  setView: (view: 'landing' | 'blog') => void;
}

const Blog: React.FC<BlogProps> = ({ setView }) => {
  return (
    <section className="py-24 bg-slate-50/50" id="blog">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-16">
          <div className="max-w-2xl">
            <span className="text-tzero-blue font-black text-xs uppercase tracking-[0.4em] mb-4 block">Central de Conhecimento</span>
            <h2 className="text-4xl lg:text-6xl font-black text-tzero-navy tracking-tight leading-[0.95]">
              Insights <br /> <span className="text-tzero-blue">& Tech.</span>
            </h2>
          </div>
          <button 
            onClick={() => setView('blog')}
            className="flex items-center gap-2 bg-white border border-slate-200 text-[#022c5e] px-8 py-4 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all shadow-sm"
          >
            <BookOpen size={16} /> Ver todos os artigos
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article 
              key={index} 
              onClick={() => setView('blog')}
              className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col h-full cursor-pointer"
            >
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6 bg-tzero-blue text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                  {post.category}
                </div>
              </div>
              
              <div className="p-10 flex flex-col flex-grow">
                <div className="flex items-center gap-4 mb-6 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><Calendar size={12} /> {post.date}</span>
                  <span className="flex items-center gap-1.5"><User size={12} /> {post.author}</span>
                </div>
                
                <h3 className="text-xl font-black text-tzero-navy mb-4 tracking-tight leading-tight group-hover:text-tzero-blue transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-slate-500 text-sm leading-relaxed mb-10 font-medium line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="mt-auto">
                  <div className="flex items-center gap-3 text-tzero-blue font-black text-[11px] uppercase tracking-widest group-hover:gap-5 transition-all">
                    Ler Artigo Completo <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;

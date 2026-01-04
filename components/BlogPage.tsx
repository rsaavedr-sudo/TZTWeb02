
import React, { useState } from 'react';
import { Search, ChevronRight, ArrowLeft, Bookmark, Share2, BookOpen } from 'lucide-react';

const allPosts = [
  {
    id: 1,
    title: "O Fim da Tarifação por Minutos: Por que o CPC é o Futuro",
    excerpt: "Descubra como a mudança para o Custo por Contato está transformando a lucratividade dos maiores BPOs do Brasil.",
    category: "Estratégia",
    author: "Ricardo Menezes",
    date: "12 Mai, 2024",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "IA Neural em Telecom: Detectando Humanos em Milissegundos",
    excerpt: "Como nossa infraestrutura processa milhões de chamadas para garantir que apenas áudio humano chegue ao seu agente.",
    category: "Tecnologia",
    author: "Ana Clara Silva",
    date: "08 Mai, 2024",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Compliance e LGPD em Operações de Contato Massivo",
    excerpt: "As melhores práticas para manter sua operação segura e dentro das normas da ANATEL e regulamentações de privacidade.",
    category: "Segurança",
    author: "Dr. Roberto Costa",
    date: "02 Mai, 2024",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Redução de Churn em Operações de Atendimento Ativo",
    excerpt: "Estratégias para manter seus clientes engajados usando dados de comportamento de chamadas.",
    category: "Customer Success",
    author: "Julia Santos",
    date: "28 Abr, 2024",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1470&auto=format&fit=crop"
  }
];

const BlogPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Estratégia', 'Tecnologia', 'Segurança', 'Customer Success'];

  const filteredPosts = allPosts.filter(post => 
    (selectedCategory === 'All' || post.category === selectedCategory) &&
    (post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="pt-32 pb-24 bg-white animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Cabeçalho da Página de Blog */}
        <div className="mb-20">
          <div className="flex items-center gap-2 text-tzero-blue font-black text-[10px] uppercase tracking-[0.3em] mb-6">
            <BookOpen size={14} /> Portal de Conhecimento
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-tzero-navy mb-6 tracking-tight leading-tight">
            T-Zero <span className="text-tzero-blue">Insights</span>
          </h1>
          <p className="text-slate-500 text-lg font-medium max-w-2xl leading-relaxed">
            Explorando as fronteiras da tecnologia de voz, eficiência operacional e o futuro das telecomunicações corporativas em um só lugar.
          </p>
        </div>

        {/* Toolbar de Busca e Filtros */}
        <div className="flex flex-col md:flex-row gap-8 justify-between items-center mb-16 pb-12 border-b border-slate-100">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all ${
                  selectedCategory === cat 
                  ? 'bg-tzero-blue text-white shadow-lg shadow-blue-500/20' 
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="Buscar artigos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-tzero-blue/10 focus:border-tzero-blue outline-none transition-all"
            />
          </div>
        </div>

        {/* Listagem de Posts */}
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-12 lg:col-span-8 space-y-12">
            {filteredPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-16">
                {filteredPosts.map(post => (
                  <article key={post.id} className="group cursor-pointer">
                    <div className="relative h-72 rounded-[2.5rem] overflow-hidden mb-8 shadow-sm group-hover:shadow-2xl transition-all duration-500">
                      <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={post.title} />
                      <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md text-tzero-blue px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm">
                        {post.category}
                      </div>
                    </div>
                    <div className="px-2">
                      <div className="flex items-center gap-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                        <span>{post.date}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                        <span>{post.readTime} leitura</span>
                      </div>
                      <h3 className="text-2xl font-black text-tzero-navy mb-4 leading-tight group-hover:text-tzero-blue transition-colors tracking-tight">
                        {post.title}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 font-medium">
                        {post.excerpt}
                      </p>
                      <button className="mt-8 flex items-center gap-2 text-tzero-blue font-black text-[11px] uppercase tracking-widest group-hover:gap-4 transition-all">
                        Continuar Lendo <ChevronRight size={16} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="py-24 text-center bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
                <p className="text-slate-400 font-bold italic">Nenhum artigo encontrado para sua busca.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="md:col-span-12 lg:col-span-4 space-y-12">
            <div className="bg-tzero-navy p-10 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-tzero-blue/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
               <h4 className="text-xl font-black mb-6 relative z-10">Newsletter Exclusiva</h4>
               <p className="text-blue-100/60 text-sm mb-8 font-medium leading-relaxed relative z-10">
                 Insights semanais sobre como escalar sua operação sem desperdício de telecom.
               </p>
               <input 
                 type="email" 
                 placeholder="seu@email.com"
                 className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-sm mb-4 outline-none focus:bg-white/10 transition-all font-medium"
               />
               <button className="w-full py-4 bg-tzero-blue text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-tzero-navy transition-all">
                 Inscrever-se
               </button>
            </div>

            <div className="p-10 border border-slate-100 rounded-[2.5rem] bg-slate-50/50">
              <h4 className="text-lg font-black text-tzero-navy mb-8 tracking-tight uppercase text-[12px] tracking-widest">Tags Populares</h4>
              <div className="flex flex-wrap gap-2">
                {['#CPC', '#TelecomAI', '#BPOEfficiency', '#ZeroLoss', '#Saas', '#VoiceTech'].map(tag => (
                  <span key={tag} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-500 hover:border-tzero-blue hover:text-tzero-blue cursor-pointer transition-all">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;


import React from 'react';
import { 
  TrendingUp, 
  MessageSquare, 
  Trophy, 
  History, 
  ChevronRight,
  Plus,
  Filter,
  CheckCircle2,
  Calendar,
  Layers
} from 'lucide-react';
import { 
  features, 
  changelog, 
  sharedModules, 
  ProductID, 
  Feature, 
  Status 
} from '../../data/hubData';
import { StatusBadge, PriorityBadge } from './Sidebar';

// --- HOME VIEW ---
export const HubHome: React.FC<{ onNavigate: (view: string) => void }> = ({ onNavigate }) => {
  const currentFocus = features.filter(f => f.status === 'in-progress').slice(0, 3);
  const latestUpdates = changelog[0];

  return (
    <div className="space-y-8 pb-12">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">T-Zero Product Hub</h1>
        <p className="text-slate-500 mt-2 max-w-2xl">
          Central intelligence for T-Zero's evolving ecosystem. Synchronizing telecommunications infrastructure with advanced engagement logic.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Product Cards */}
        <div 
          onClick={() => onNavigate('flow360')}
          className="group p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer"
        >
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <MessageSquare size={24} />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Flow360</h2>
          <p className="text-sm text-slate-500 mt-2 line-clamp-2">
            Operations, Voice, and AI orchestration. The engine of modern communication.
          </p>
          <div className="mt-6 flex items-center text-blue-600 text-sm font-bold">
            Explore Dashboard <ChevronRight size={16} />
          </div>
        </div>

        <div 
          onClick={() => onNavigate('INDIKA')}
          className="group p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer"
        >
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-amber-600 group-hover:text-white transition-colors">
            <Trophy size={24} />
          </div>
          <h2 className="text-xl font-bold text-slate-900">INDIKA</h2>
          <p className="text-sm text-slate-500 mt-2 line-clamp-2">
            Gamification & Incentives logic. Driving engagement through behavioral intelligence.
          </p>
          <div className="mt-6 flex items-center text-amber-600 text-sm font-bold">
            Explore Dashboard <ChevronRight size={16} />
          </div>
        </div>

        {/* Stats Column */}
        <div className="p-6 bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-400 uppercase text-xs tracking-widest">Global Progress</h3>
            <TrendingUp size={16} className="text-emerald-400" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Infrastructure</span>
                <span className="font-mono">82%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="w-[82%] h-full bg-blue-500" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>AI Modules</span>
                <span className="font-mono">45%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="w-[45%] h-full bg-purple-500" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Mobile Native</span>
                <span className="font-mono">15%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="w-[15%] h-full bg-amber-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Current Focus */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Current Focus</h3>
            <button 
              onClick={() => onNavigate('roadmap')}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              View Full Roadmap
            </button>
          </div>
          <div className="space-y-3">
            {currentFocus.map(f => (
              <div key={f.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-4">
                <div className="mt-1">
                  <div className="w-2 h-2 bg-amber-500 rounded-full" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">{f.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{f.description}</p>
                  <div className="mt-2 flex gap-2">
                    <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded uppercase font-bold text-slate-600">
                      {f.product}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Latest Updates */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Latest Updates</h3>
            <button 
              onClick={() => onNavigate('changelog')}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              Full Change History
            </button>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold mb-4 uppercase">
              <Calendar size={14} /> {latestUpdates.date}
            </div>
            <div className="space-y-3">
              {latestUpdates.items.map((item, idx) => (
                <div key={idx} className="flex gap-3 text-sm">
                  <div className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                  <p className="text-slate-600">
                    <span className="font-bold text-slate-900 uppercase text-[10px] mr-1.5">
                      {item.product}:
                    </span>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

// --- PRODUCT DETAIL VIEW ---
export const ProductView: React.FC<{ productId: ProductID }> = ({ productId }) => {
  const [filterStatus, setFilterStatus] = React.useState<Status | 'all'>('all');
  const productFeatures = features.filter(f => f.product === productId);
  const filtered = filterStatus === 'all' ? productFeatures : productFeatures.filter(f => f.status === filterStatus);
  
  const stats = {
    total: productFeatures.length,
    done: productFeatures.filter(f => f.status === 'done').length,
    inProgress: productFeatures.filter(f => f.status === 'in-progress').length,
  };

  const productMeta = productId === 'flow360' 
    ? { title: 'Flow360', desc: 'Communication, AI orchestration & Operational workflow engine.', icon: MessageSquare, color: 'text-blue-600', bg: 'bg-blue-100' }
    : { title: 'INDIKA', desc: 'Behavioral incentivization, gamification and user engagement logic.', icon: Trophy, color: 'text-amber-600', bg: 'bg-amber-100' };

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 ${productMeta.bg} ${productMeta.color} rounded-2xl flex items-center justify-center shrink-0`}>
            <productMeta.icon size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{productMeta.title}</h1>
            <p className="text-slate-500">{productMeta.desc}</p>
          </div>
        </div>
        
        <div className="flex gap-4">
           <div className="bg-white border p-3 rounded-xl shadow-sm flex gap-6">
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Completion</p>
                <p className="text-lg font-bold text-slate-900">{Math.round((stats.done / stats.total) * 100)}%</p>
              </div>
              <div className="w-px bg-slate-100" />
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Total Features</p>
                <p className="text-lg font-bold text-slate-900">{stats.total}</p>
              </div>
           </div>
        </div>
      </header>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <h3 className="font-bold text-slate-700">Feature Catalog</h3>
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-slate-400" />
            <select 
              className="text-xs border-none bg-transparent font-bold text-slate-600 focus:ring-0 cursor-pointer"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
            >
              <option value="all">All Status</option>
              <option value="done">Done</option>
              <option value="in-progress">In Progress</option>
              <option value="planned">Planned</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {filtered.map(feature => (
            <div key={feature.id} className="p-6 hover:bg-slate-50/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-900">{feature.title}</h4>
                  <PriorityBadge priority={feature.priority} />
                </div>
                <p className="text-sm text-slate-500 max-w-xl">{feature.description}</p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <StatusBadge status={feature.status} />
                <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all text-slate-400 hover:text-slate-600">
                  <Plus size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- ROADMAP VIEW (KANBAN) ---
export const RoadmapView: React.FC = () => {
  const columns: Status[] = ['planned', 'in-progress', 'done'];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Roadmap Strategy</h1>
        <p className="text-slate-500">Global development timeline and production velocity tracking.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden">
        {columns.map(status => (
          <div key={status} className="flex flex-col h-full bg-slate-100 rounded-2xl p-4 min-h-[600px]">
            <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="text-xs uppercase font-bold text-slate-500 tracking-widest flex items-center gap-2">
                {status === 'done' && <CheckCircle2 size={14} className="text-emerald-500" />}
                {status === 'in-progress' && <Clock size={14} className="text-amber-500" />}
                {status === 'planned' && <Calendar size={14} className="text-slate-400" />}
                {status.replace('-', ' ')}
              </h3>
              <span className="bg-white px-2 py-0.5 rounded-md text-[10px] font-bold text-slate-600 shadow-sm">
                {features.filter(f => f.status === status).length}
              </span>
            </div>

            <div className="space-y-3">
              {features.filter(f => f.status === status).map(feature => (
                <div key={feature.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:border-blue-400 transition-colors cursor-grab active:cursor-grabbing">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${feature.product === 'flow360' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'}`}>
                      {feature.product}
                    </span>
                    <PriorityBadge priority={feature.priority} />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">{feature.title}</h4>
                  <p className="text-[10px] text-slate-500 mt-2 line-clamp-2 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- SHARED MODULES ---
export const SharedModules: React.FC = () => {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Shared Infrastructure</h1>
        <p className="text-slate-500">Cross-product technology stack and unified engines.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sharedModules.map(module => (
          <div key={module.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 bg-slate-900 text-white rounded-lg flex items-center justify-center">
                <Layers size={20} />
              </div>
              <StatusBadge status={module.status} />
            </div>
            
            <h3 className="text-xl font-bold text-slate-900">{module.name}</h3>
            <p className="text-sm text-slate-500 mt-2 mb-6 flex-grow">{module.description}</p>
            
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex -space-x-2">
                {module.products.map(p => (
                  <div 
                    key={p} 
                    title={p}
                    className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white uppercase ${p === 'flow360' ? 'bg-blue-600' : 'bg-amber-600'}`}
                  >
                    {p[0]}
                  </div>
                ))}
              </div>
              <span className="text-xs font-bold text-slate-400">Used by {module.products.length} products</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- CHANGELOG VIEW ---
export const ChangelogView: React.FC = () => {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Global Changelog</h1>
        <p className="text-slate-500">Historical timeline of deployments and system updates.</p>
      </header>

      <div className="space-y-12 pl-4 border-l-2 border-slate-100 ml-4 py-4">
        {changelog.map((entry, idx) => (
          <div key={idx} className="relative">
            <div className="absolute -left-[26px] top-1.5 w-4 h-4 bg-white border-2 border-slate-200 rounded-full" />
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 text-blue-600 font-bold text-sm mb-4">
                <Calendar size={16} />
                {entry.date}
              </div>
              
              <div className="space-y-4">
                {entry.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex flex-col">
                    <span className={`text-[10px] font-bold uppercase mb-1 ${
                      item.product === 'flow360' ? 'text-blue-600' : 
                      item.product === 'INDIKA' ? 'text-amber-600' : 'text-slate-500'
                    }`}>
                      {item.product}
                    </span>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

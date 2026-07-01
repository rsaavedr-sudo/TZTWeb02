
import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  ExternalLink,
  ClipboardList,
  Wrench,
  Building2,
  AlertCircle,
  Bookmark,
  Filter,
  Calendar,
  MessageSquare,
  Trophy,
  Globe,
} from 'lucide-react';
import { playbooks, PlaybookEntry, ProductID } from '../../data/hubData';

// -----------------------------------------------------------------------------
// Category & product metadata
// -----------------------------------------------------------------------------

type Category = PlaybookEntry['category'];

const CATEGORY_META: Record<
  Category,
  { label: string; description: string; icon: React.ComponentType<{ size?: number; className?: string }>; color: string }
> = {
  onboarding: {
    label: 'Onboarding',
    description: 'Guías para arrancar un canal, cliente o feature nuevo',
    icon: ClipboardList,
    color: 'blue',
  },
  ops: {
    label: 'Operaciones',
    description: 'Runbooks: deploys, backups, restarts, incident response',
    icon: Wrench,
    color: 'emerald',
  },
  architecture: {
    label: 'Arquitectura',
    description: 'Decisiones técnicas y diagramas de subsistemas',
    icon: Building2,
    color: 'violet',
  },
  'post-mortem': {
    label: 'Post-mortem',
    description: 'Análisis de incidentes con lecciones aprendidas',
    icon: AlertCircle,
    color: 'rose',
  },
  reference: {
    label: 'Referencia',
    description: 'Cheatsheets y glosarios consultados con frecuencia',
    icon: Bookmark,
    color: 'amber',
  },
};

const PRODUCT_META: Record<
  ProductID | 'global',
  { label: string; icon: React.ComponentType<{ size?: number; className?: string }> }
> = {
  flow360: { label: 'Flow360', icon: MessageSquare },
  INDIKA: { label: 'INDIKA', icon: Trophy },
  global: { label: 'Global', icon: Globe },
};

// -----------------------------------------------------------------------------
// Small badges
// -----------------------------------------------------------------------------

const CategoryBadge: React.FC<{ category: Category }> = ({ category }) => {
  const meta = CATEGORY_META[category];
  const Icon = meta.icon;
  const colorClass = {
    blue: 'bg-blue-100 text-blue-700 border-blue-200',
    emerald: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    violet: 'bg-violet-100 text-violet-700 border-violet-200',
    rose: 'bg-rose-100 text-rose-700 border-rose-200',
    amber: 'bg-amber-100 text-amber-700 border-amber-200',
  }[meta.color];

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${colorClass}`}
    >
      <Icon size={10} />
      {meta.label}
    </span>
  );
};

const StatusPill: React.FC<{ status: PlaybookEntry['status'] }> = ({ status }) => {
  const styles = {
    stable: 'bg-emerald-50 text-emerald-700',
    draft: 'bg-amber-50 text-amber-700',
    deprecated: 'bg-slate-100 text-slate-500 line-through',
  } as const;
  return (
    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${styles[status]}`}>
      {status}
    </span>
  );
};

const ProductChip: React.FC<{ product: PlaybookEntry['product'] }> = ({ product }) => {
  const meta = PRODUCT_META[product];
  const Icon = meta.icon;
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
      <Icon size={10} />
      {meta.label}
    </span>
  );
};

// -----------------------------------------------------------------------------
// Playbook card
// -----------------------------------------------------------------------------

const PlaybookCard: React.FC<{ playbook: PlaybookEntry }> = ({ playbook }) => {
  const [showTakeaways, setShowTakeaways] = useState(false);

  return (
    <article className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex flex-wrap items-center gap-2">
          <CategoryBadge category={playbook.category} />
          <ProductChip product={playbook.product} />
        </div>
        <StatusPill status={playbook.status} />
      </div>

      <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">{playbook.title}</h3>

      <p className="text-sm text-slate-600 flex-grow leading-relaxed">{playbook.description}</p>

      {playbook.keyTakeaways && playbook.keyTakeaways.length > 0 && (
        <div className="mt-4">
          <button
            onClick={() => setShowTakeaways((v) => !v)}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
          >
            {showTakeaways ? '↑ Ocultar puntos clave' : `↓ Ver ${playbook.keyTakeaways.length} puntos clave`}
          </button>
          {showTakeaways && (
            <ul className="mt-3 space-y-2 pl-4 border-l-2 border-blue-200">
              {playbook.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="text-xs text-slate-700 leading-relaxed">
                  {takeaway}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <footer className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
          <Calendar size={11} />
          <span>Actualizado {playbook.lastUpdated}</span>
        </div>
        <a
          href={playbook.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
        >
          Abrir doc
          <ExternalLink size={12} />
        </a>
      </footer>

      <div className="mt-3 text-[10px] text-slate-400 font-mono truncate" title={playbook.filename}>
        docs/{playbook.filename}
      </div>
    </article>
  );
};

// -----------------------------------------------------------------------------
// Main view
// -----------------------------------------------------------------------------

export const PlaybooksView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [selectedProduct, setSelectedProduct] = useState<PlaybookEntry['product'] | 'all'>('all');

  // Category counts derived from the live catalog. `all` counts everything.
  const categoryCounts = useMemo(() => {
    const counts: Record<Category | 'all', number> = {
      all: playbooks.length,
      onboarding: 0,
      ops: 0,
      architecture: 0,
      'post-mortem': 0,
      reference: 0,
    };
    playbooks.forEach((p) => {
      counts[p.category] += 1;
    });
    return counts;
  }, []);

  const productCounts = useMemo(() => {
    const counts: Record<PlaybookEntry['product'] | 'all', number> = {
      all: playbooks.length,
      flow360: 0,
      INDIKA: 0,
      global: 0,
    };
    playbooks.forEach((p) => {
      counts[p.product] += 1;
    });
    return counts;
  }, []);

  const filtered = useMemo(() => {
    return playbooks.filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (selectedProduct !== 'all' && p.product !== selectedProduct) return false;
      return true;
    });
  }, [selectedCategory, selectedProduct]);

  return (
    <div className="space-y-8 pb-12">
      <header>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
            <BookOpen size={24} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Playbooks</h1>
        </div>
        <p className="text-slate-500 max-w-3xl">
          Reference técnica del ecosistema T-Zero. Guías de onboarding, runbooks operativos,
          decisiones arquitectónicas y post-mortems. Cada doc vive en el repo — el Hub es solo
          el índice. Click "Abrir doc" para ver el markdown renderizado en GitHub.
        </p>
      </header>

      {/* Filter: category */}
      <section>
        <div className="flex items-center gap-2 mb-3 text-xs font-bold text-slate-600 uppercase tracking-wider">
          <Filter size={12} />
          Categoría
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
            }`}
          >
            Todas · {categoryCounts.all}
          </button>
          {(Object.keys(CATEGORY_META) as Category[]).map((cat) => {
            const meta = CATEGORY_META[cat];
            const Icon = meta.icon;
            const count = categoryCounts[cat];
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                disabled={count === 0}
                title={meta.description}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900'
                    : count === 0
                    ? 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                }`}
              >
                <Icon size={12} />
                {meta.label} · {count}
              </button>
            );
          })}
        </div>
      </section>

      {/* Filter: product */}
      <section>
        <div className="flex items-center gap-2 mb-3 text-xs font-bold text-slate-600 uppercase tracking-wider">
          <Filter size={12} />
          Producto
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedProduct('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
              selectedProduct === 'all'
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
            }`}
          >
            Todos · {productCounts.all}
          </button>
          {(Object.keys(PRODUCT_META) as (PlaybookEntry['product'])[]).map((prod) => {
            const meta = PRODUCT_META[prod];
            const Icon = meta.icon;
            const count = productCounts[prod];
            const isActive = selectedProduct === prod;
            return (
              <button
                key={prod}
                onClick={() => setSelectedProduct(prod)}
                disabled={count === 0}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900'
                    : count === 0
                    ? 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                }`}
              >
                <Icon size={12} />
                {meta.label} · {count}
              </button>
            );
          })}
        </div>
      </section>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="p-12 bg-white rounded-2xl border border-slate-200 text-center">
          <BookOpen size={40} className="mx-auto text-slate-300 mb-3" />
          <p className="text-slate-500">Sin docs con los filtros actuales.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filtered.map((p) => (
            <PlaybookCard key={p.id} playbook={p} />
          ))}
        </div>
      )}

      {/* Convention footer */}
      <section className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-200">
        <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">
          Convención para nuevos docs
        </h3>
        <ol className="space-y-2 text-xs text-slate-600 leading-relaxed list-decimal list-inside">
          <li>
            Crear <code className="px-1 py-0.5 bg-white rounded text-slate-800 font-mono">NN-CATEGORIA-TITULO.md</code> en{' '}
            <code className="px-1 py-0.5 bg-white rounded text-slate-800 font-mono">rapidpro8/docs/</code>.
          </li>
          <li>
            Incluir header estándar: título, última actualización, autor, estado (draft / stable / deprecated), categoría.
          </li>
          <li>
            Agregar entrada en <code className="px-1 py-0.5 bg-white rounded text-slate-800 font-mono">hubData.ts → playbooks[]</code>{' '}
            con filename + githubUrl matching.
          </li>
          <li>
            <strong>Regla de oro:</strong> si te encontraste haciendo o explicando algo por segunda vez, tocaba doc.
          </li>
        </ol>
      </section>
    </div>
  );
};

export default PlaybooksView;

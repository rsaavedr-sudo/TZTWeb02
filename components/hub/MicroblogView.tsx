import React, { useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Notebook,
  Calendar,
  MessageSquare,
  Trophy,
  Plus,
  Pencil,
  Trash2,
  Download,
  X,
} from 'lucide-react';
import { microblogPosts, type MicroblogPost } from '../../data/microblogPosts';
import {
  readLocalPosts,
  upsertLocalPost,
  deleteLocalPost,
  generatePostId,
  exportLocalPosts,
  type LocalMicroblogPost,
} from '../../data/localMicroblog';
import type { ProductID } from '../../data/hubData';

// =============================================================================
//  Sub-components
// =============================================================================

const ProductBadge: React.FC<{ product: ProductID }> = ({ product }) => {
  const config: Record<ProductID, { label: string; classes: string; Icon: typeof MessageSquare }> = {
    flow360: {
      label: 'Flow360',
      classes: 'bg-blue-100 text-blue-700 border-blue-200',
      Icon: MessageSquare,
    },
    INDIKA: {
      label: 'INDIKA',
      classes: 'bg-amber-100 text-amber-700 border-amber-200',
      Icon: Trophy,
    },
  };
  const { label, classes, Icon } = config[product];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${classes}`}
    >
      <Icon size={10} />
      {label}
    </span>
  );
};

const formatDate = (raw: string): string => {
  const d = new Date(raw);
  if (isNaN(d.getTime())) return raw;
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// =============================================================================
//  Markdown body — extracted so PostCard and the editor preview can share it
// =============================================================================

const MARKDOWN_COMPONENTS = {
  h1: ({ node, ...props }: any) => (
    <h3 className="text-lg font-bold text-slate-900 mt-6 mb-2" {...props} />
  ),
  h2: ({ node, ...props }: any) => (
    <h4 className="text-base font-bold text-slate-900 mt-5 mb-2" {...props} />
  ),
  h3: ({ node, ...props }: any) => (
    <h5 className="text-sm font-bold text-slate-900 mt-4 mb-2" {...props} />
  ),
  p: ({ node, ...props }: any) => <p className="my-3" {...props} />,
  ul: ({ node, ...props }: any) => (
    <ul className="list-disc pl-5 my-3 space-y-1" {...props} />
  ),
  ol: ({ node, ...props }: any) => (
    <ol className="list-decimal pl-5 my-3 space-y-1" {...props} />
  ),
  li: ({ node, ...props }: any) => <li className="text-slate-700" {...props} />,
  a: ({ node, ...props }: any) => (
    <a
      className="text-blue-600 hover:text-blue-700 underline underline-offset-2"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  code: ({ node, className, ...props }: any) =>
    className?.includes('language-') ? (
      <pre className="bg-slate-900 text-slate-100 rounded-lg p-4 my-4 overflow-x-auto text-xs">
        <code {...props} />
      </pre>
    ) : (
      <code
        className="bg-slate-100 text-slate-800 rounded px-1 py-0.5 text-[0.85em] font-mono"
        {...props}
      />
    ),
  blockquote: ({ node, ...props }: any) => (
    <blockquote
      className="border-l-4 border-blue-300 pl-4 my-4 text-slate-600 italic"
      {...props}
    />
  ),
  hr: () => <hr className="my-6 border-slate-200" />,
  strong: ({ node, ...props }: any) => (
    <strong className="font-bold text-slate-900" {...props} />
  ),
  em: ({ node, ...props }: any) => <em className="italic" {...props} />,
};

// =============================================================================
//  Card
// =============================================================================

const PostCard: React.FC<{
  post: MicroblogPost | LocalMicroblogPost;
  isLocal: boolean;
  onEdit: () => void;
  onDelete: () => void;
}> = ({ post, isLocal, onEdit, onDelete }) => (
  <article className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-8">
    <header className="flex items-start justify-between gap-4 mb-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 flex-wrap mb-2">
          <span className="inline-flex items-center gap-1 text-xs text-slate-500">
            <Calendar size={12} />
            {formatDate(post.date)}
          </span>
          {post.product && <ProductBadge product={post.product} />}
          {isLocal && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border bg-slate-100 text-slate-600 border-slate-200">
              Local
            </span>
          )}
        </div>
        <h2 className="text-xl font-bold text-slate-900 leading-tight">
          {post.title}
        </h2>
      </div>
      {isLocal && (
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={onEdit}
            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Editar"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            title="Borrar"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}
    </header>
    <div className="microblog-body text-slate-700 leading-relaxed">
      <ReactMarkdown components={MARKDOWN_COMPONENTS}>{post.body}</ReactMarkdown>
    </div>
  </article>
);

// =============================================================================
//  Editor modal
// =============================================================================

interface EditorState {
  id: string | null; // null = new post, string = editing existing
  date: string;
  title: string;
  product: '' | ProductID;
  body: string;
}

const today = () => new Date().toISOString().slice(0, 10);

const PostEditor: React.FC<{
  initial: EditorState | null; // null = closed
  onCancel: () => void;
  onSave: (state: EditorState) => void;
}> = ({ initial, onCancel, onSave }) => {
  const [state, setState] = useState<EditorState>(
    initial ?? { id: null, date: today(), title: '', product: '', body: '' }
  );
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (initial) setState(initial);
  }, [initial]);

  if (!initial) return null;

  const wordCount = state.body.trim().split(/\s+/).filter(Boolean).length;
  const overLimit = wordCount > 1000;
  const canSave = state.title.trim().length > 0 && state.body.trim().length > 0;

  return (
    <div
      className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">
            {state.id ? 'Editar entrada' : 'Nueva entrada'}
          </h2>
          <button
            onClick={onCancel}
            className="p-1 text-slate-400 hover:text-slate-700 transition-colors"
            title="Cerrar"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                Fecha
              </label>
              <input
                type="date"
                value={state.date}
                onChange={(e) => setState({ ...state, date: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                Producto (opcional)
              </label>
              <select
                value={state.product}
                onChange={(e) =>
                  setState({ ...state, product: e.target.value as EditorState['product'] })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">— sin producto —</option>
                <option value="flow360">Flow360</option>
                <option value="INDIKA">INDIKA</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
              Título
            </label>
            <input
              type="text"
              value={state.title}
              onChange={(e) => setState({ ...state, title: e.target.value })}
              placeholder="Una línea descriptiva"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Cuerpo (markdown)
              </label>
              <div className="flex items-center gap-3 text-xs">
                <span className={overLimit ? 'text-rose-600 font-bold' : 'text-slate-500'}>
                  {wordCount} / 1000 palabras
                </span>
                <button
                  type="button"
                  onClick={() => setShowPreview((v) => !v)}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  {showPreview ? 'Editar' : 'Vista previa'}
                </button>
              </div>
            </div>
            {showPreview ? (
              <div className="border border-slate-300 rounded-lg p-4 min-h-[300px] bg-slate-50">
                {state.body.trim() ? (
                  <div className="microblog-body text-slate-700 leading-relaxed">
                    <ReactMarkdown components={MARKDOWN_COMPONENTS}>
                      {state.body}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-slate-400 italic">Nada para previsualizar todavía.</p>
                )}
              </div>
            ) : (
              <textarea
                value={state.body}
                onChange={(e) => setState({ ...state, body: e.target.value })}
                placeholder={
                  'Escribí en **markdown**.\n\n- Listas\n- Links: [texto](https://...)\n- `código inline`\n\n```\nbloque de código\n```'
                }
                rows={14}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              />
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-200 bg-slate-50 rounded-b-2xl">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => onSave(state)}
            disabled={!canSave}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {state.id ? 'Guardar cambios' : 'Publicar'}
          </button>
        </div>
      </div>
    </div>
  );
};

// =============================================================================
//  Main view
// =============================================================================

export const MicroblogView: React.FC = () => {
  const [localPosts, setLocalPosts] = useState<LocalMicroblogPost[]>([]);
  const [editor, setEditor] = useState<EditorState | null>(null);

  // Hydrate localStorage on mount.
  useEffect(() => {
    setLocalPosts(readLocalPosts());
  }, []);

  // Merge committed + local. Newest by date desc.
  const allPosts = useMemo(() => {
    const merged: Array<MicroblogPost & { isLocal?: boolean }> = [
      ...localPosts,
      ...microblogPosts,
    ];
    return merged.sort((a, b) => b.date.localeCompare(a.date));
  }, [localPosts]);

  const handleNew = () => {
    setEditor({ id: null, date: today(), title: '', product: '', body: '' });
  };

  const handleEdit = (post: LocalMicroblogPost) => {
    setEditor({
      id: post.id,
      date: post.date,
      title: post.title,
      product: post.product ?? '',
      body: post.body,
    });
  };

  const handleSave = (state: EditorState) => {
    const id =
      state.id ?? generatePostId(state.date, state.title);
    const post: LocalMicroblogPost = {
      id,
      date: state.date,
      title: state.title.trim(),
      body: state.body,
      product: (state.product || undefined) as ProductID | undefined,
      isLocal: true,
    };
    const updated = upsertLocalPost(post);
    setLocalPosts(updated);
    setEditor(null);
  };

  const handleDelete = (id: string) => {
    if (!window.confirm('¿Borrar esta entrada? No se puede deshacer.')) return;
    const updated = deleteLocalPost(id);
    setLocalPosts(updated);
  };

  const handleExport = () => {
    if (localPosts.length === 0) {
      window.alert('No hay entradas locales para exportar.');
      return;
    }
    exportLocalPosts();
  };

  return (
    <div className="space-y-8 pb-12 max-w-3xl">
      <header className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
            <Notebook size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Bitácora</h1>
            <p className="text-slate-500 mt-1">
              Notas internas sobre lo que va pasando en los proyectos.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            title="Descargar entradas locales como JSON"
          >
            <Download size={16} />
            Exportar
          </button>
          <button
            onClick={handleNew}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors"
          >
            <Plus size={16} />
            Nueva entrada
          </button>
        </div>
      </header>

      {/* Storage notice — sets expectations honestly. */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-xs text-amber-800">
        <strong>Nota:</strong> las entradas que creés acá se guardan solo en
        este navegador (<code className="bg-amber-100 px-1 rounded">localStorage</code>).
        Si cambiás de device o limpiás el cache, no estarán. Usá <em>Exportar</em>{' '}
        para bajar un JSON con tus entradas.
      </div>

      {allPosts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
          Aún no hay entradas. Tocá <strong>Nueva entrada</strong> para empezar.
        </div>
      ) : (
        <div className="space-y-6">
          {allPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              isLocal={!!(post as any).isLocal}
              onEdit={() => handleEdit(post as LocalMicroblogPost)}
              onDelete={() => handleDelete(post.id)}
            />
          ))}
        </div>
      )}

      <PostEditor
        initial={editor}
        onCancel={() => setEditor(null)}
        onSave={handleSave}
      />
    </div>
  );
};

export default MicroblogView;

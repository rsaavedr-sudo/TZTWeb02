import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Notebook, Calendar, MessageSquare, Trophy } from 'lucide-react';
import { microblogPosts, type MicroblogPost } from '../../data/microblogPosts';
import type { ProductID } from '../../data/hubData';

// Product badge — small chip next to the post title. Same color
// convention as the rest of the hub (Flow360 blue, INDIKA amber).
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

// Pretty date in the user's locale, falls back to the raw string if
// the date isn't parseable.
const formatDate = (raw: string): string => {
  const d = new Date(raw);
  if (isNaN(d.getTime())) return raw;
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const PostCard: React.FC<{ post: MicroblogPost }> = ({ post }) => (
  <article className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-8">
    <header className="flex items-start justify-between gap-4 mb-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 flex-wrap mb-2">
          <span className="inline-flex items-center gap-1 text-xs text-slate-500">
            <Calendar size={12} />
            {formatDate(post.date)}
          </span>
          {post.product && <ProductBadge product={post.product} />}
        </div>
        <h2 className="text-xl font-bold text-slate-900 leading-tight">
          {post.title}
        </h2>
      </div>
    </header>

    {/* Markdown body — prose-ish typography styled to match the hub theme. */}
    <div className="microblog-body text-slate-700 leading-relaxed">
      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => (
            <h3 className="text-lg font-bold text-slate-900 mt-6 mb-2" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h4 className="text-base font-bold text-slate-900 mt-5 mb-2" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h5 className="text-sm font-bold text-slate-900 mt-4 mb-2" {...props} />
          ),
          p: ({ node, ...props }) => <p className="my-3" {...props} />,
          ul: ({ node, ...props }) => (
            <ul className="list-disc pl-5 my-3 space-y-1" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal pl-5 my-3 space-y-1" {...props} />
          ),
          li: ({ node, ...props }) => <li className="text-slate-700" {...props} />,
          a: ({ node, ...props }) => (
            <a
              className="text-blue-600 hover:text-blue-700 underline underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          code: ({ node, className, ...props }) =>
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
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 border-blue-300 pl-4 my-4 text-slate-600 italic"
              {...props}
            />
          ),
          hr: () => <hr className="my-6 border-slate-200" />,
          strong: ({ node, ...props }) => (
            <strong className="font-bold text-slate-900" {...props} />
          ),
          em: ({ node, ...props }) => <em className="italic" {...props} />,
        }}
      >
        {post.body}
      </ReactMarkdown>
    </div>
  </article>
);

export const MicroblogView: React.FC = () => {
  // Sort by date descending so newest is on top regardless of how the
  // source array was ordered. Also collapses the "remembered to add at
  // the top" discipline — even if a contributor adds a new post at the
  // wrong end, the UI stays correct.
  const sorted = [...microblogPosts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="space-y-8 pb-12 max-w-3xl">
      <header className="flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
          <Notebook size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Bitácora</h1>
          <p className="text-slate-500 mt-1">
            Notas internas sobre lo que va pasando en los proyectos.
          </p>
        </div>
      </header>

      {sorted.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
          Aún no hay entradas. Arrancá editando{' '}
          <code className="bg-slate-100 px-1 rounded text-xs">
            data/microblogPosts.ts
          </code>
          .
        </div>
      ) : (
        <div className="space-y-6">
          {sorted.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MicroblogView;

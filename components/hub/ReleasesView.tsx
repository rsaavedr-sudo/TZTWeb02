
import React, { useState, useMemo } from 'react';
import { Rocket, Calendar, Tag, Filter, CheckCircle2 } from 'lucide-react';
import { releases, ProductID, ReleaseKind } from '../../data/hubData';

/**
 * Vista de Releases — qué versión está corriendo en producción.
 *
 * Deliberadamente separada del Changelog. El Changelog registra actividad
 * ("¿qué se trabajó?"), esta responde "¿qué llegó al cliente y desde qué
 * versión?". Cuando ambas cosas viven en el mismo lugar, el equipo no puede
 * distinguir lo que ya está disponible en producción de lo que sigue en QA.
 */

const KIND_STYLE: Record<ReleaseKind, { label: string; badge: string; dot: string }> = {
  major: {
    label: 'Versión mayor',
    badge: 'bg-purple-50 text-purple-700 border-purple-200',
    dot: 'bg-purple-500',
  },
  minor: {
    label: 'Funcionalidad',
    badge: 'bg-blue-50 text-blue-700 border-blue-200',
    dot: 'bg-blue-500',
  },
  patch: {
    label: 'Corrección',
    badge: 'bg-slate-100 text-slate-600 border-slate-200',
    dot: 'bg-slate-400',
  },
};

export const ReleasesView: React.FC = () => {
  const [kindFilter, setKindFilter] = useState<ReleaseKind | 'all'>('all');
  const [productFilter, setProductFilter] = useState<ProductID | 'all'>('all');

  const filtered = useMemo(
    () =>
      releases.filter(
        (r) =>
          (kindFilter === 'all' || r.kind === kindFilter) &&
          (productFilter === 'all' || r.product === productFilter),
      ),
    [kindFilter, productFilter],
  );

  // La versión de arriba del array es la que está corriendo hoy.
  const current = releases[0];

  return (
    <div className="space-y-6">
      <header className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Releases</h1>
          <p className="text-slate-500">
            Versiones desplegadas a producción. Qué cambió, cuándo y en qué versión.
          </p>
        </div>

        {current && (
          <div className="bg-white border border-slate-200 rounded-2xl px-5 py-3 shadow-sm">
            <div className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
              En producción
            </div>
            <div className="flex items-center gap-2 mt-1">
              <CheckCircle2 size={18} className="text-emerald-500" />
              <span className="text-xl font-bold text-slate-900">{current.version}</span>
            </div>
            <div className="text-xs text-slate-500 mt-0.5">{current.date}</div>
          </div>
        )}
      </header>

      {/* Filtros */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 text-slate-400 text-sm">
          <Filter size={14} />
          Filtrar
        </div>

        {(['all', 'major', 'minor', 'patch'] as const).map((k) => (
          <button
            key={k}
            onClick={() => setKindFilter(k)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
              kindFilter === k
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
            }`}
          >
            {k === 'all' ? 'Todas' : KIND_STYLE[k].label}
          </button>
        ))}

        <div className="w-px h-5 bg-slate-200" />

        {(['all', 'flow360', 'INDIKA'] as const).map((p) => (
          <button
            key={p}
            onClick={() => setProductFilter(p)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
              productFilter === p
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
            }`}
          >
            {p === 'all' ? 'Todos los productos' : p}
          </button>
        ))}
      </div>

      {/* Timeline */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center text-slate-500">
          No hay releases que coincidan con el filtro.
        </div>
      ) : (
        <div className="space-y-10 pl-4 border-l-2 border-slate-100 ml-4 py-4">
          {filtered.map((release) => {
            const style = KIND_STYLE[release.kind];
            return (
              <div key={release.version} className="relative">
                <div
                  className={`absolute -left-[26px] top-2 w-4 h-4 rounded-full border-2 border-white ${style.dot}`}
                />
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-3 flex-wrap mb-1">
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
                      <Tag size={16} className="text-slate-400" />
                      {release.version}
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${style.badge}`}
                    >
                      {style.label}
                    </span>
                    <span className="text-[10px] font-bold uppercase text-blue-600">
                      {release.product}
                    </span>
                    <div className="flex items-center gap-1 text-slate-400 text-xs ml-auto">
                      <Calendar size={13} />
                      {release.date}
                    </div>
                  </div>

                  {release.headline && (
                    <p className="text-slate-700 font-medium mb-4 flex items-center gap-2">
                      <Rocket size={15} className="text-purple-500 shrink-0" />
                      {release.headline}
                    </p>
                  )}

                  <div className="space-y-5 mt-4">
                    {release.sections.map((section, i) => (
                      <div key={i}>
                        <h4 className="text-[11px] font-bold uppercase tracking-wide text-slate-400 mb-2">
                          {section.label}
                        </h4>
                        <ul className="space-y-2">
                          {section.items.map((item, j) => (
                            <li
                              key={j}
                              className="text-slate-600 text-sm leading-relaxed flex gap-2"
                            >
                              <span className="text-slate-300 shrink-0 mt-1.5">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="text-xs text-slate-400 border-t border-slate-100 pt-4">
        Fuente de verdad del contenido:{' '}
        <code className="bg-slate-100 px-1.5 py-0.5 rounded">docs/RELEASE-NOTES.md</code> en el
        repo de Flow360. Al desplegar una versión nueva se agrega ahí y se refleja acá.
      </div>
    </div>
  );
};

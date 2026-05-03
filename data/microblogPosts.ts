// =============================================================================
//  Microblog / Bitácora
// =============================================================================
//
// Internal-only project journal. Each post is a short markdown entry —
// thoughts, decisions, week-in-review, blockers, anything worth keeping
// outside the changelog. Visible only inside the hub (logged-in view).
//
// To add a post: prepend a new entry to the array below (newest first),
// then commit + push. Same git-based workflow as `features` and
// `changelog`.
//
// Length cap: ~1000 words. The renderer doesn't enforce it but the
// purpose of a bitácora is short, frequent entries — not essays.
// =============================================================================

import type { ProductID } from './hubData';

export interface MicroblogPost {
  /** Slug-style stable id, used as React key. Convention: YYYY-MM-DD-short-title. */
  id: string;
  /** ISO date or 'YYYY-MM-DD HH:mm' string. Used both for display and sort. */
  date: string;
  /** One-line headline. Plain text, no markdown. */
  title: string;
  /**
   * Body content. Markdown is supported: bold (`**`), italic (`_`), links
   * (`[text](url)`), inline code, fenced code blocks, headings, lists,
   * blockquotes. Keep under ~1000 words.
   */
  body: string;
  /**
   * Optional product tag. Renders as a colored badge next to the title.
   * Leave undefined for cross-cutting / meta posts.
   */
  product?: ProductID;
}

// =============================================================================
// Posts — newest FIRST. Add new entries at the top.
// =============================================================================
export const microblogPosts: MicroblogPost[] = [
  {
    id: '2026-05-04-bitacora-arrancada',
    date: '2026-05-04',
    title: 'Arrancando la bitácora',
    product: 'flow360',
    body: `Quería un lugar más respirable que el changelog para anotar lo que va pasando con los proyectos — decisiones que tomé y por qué, dudas que quedaron abiertas, cosas que probé y descarté, links a commits que importan, y reflexiones de "esto está saliendo bien / mal".

El changelog es para hechos cerrados. La bitácora es para el **proceso**.

**Reglas que me pongo a mí mismo:**

- Posts cortos (<1000 palabras). Si necesito más, parto en dos.
- Frecuencia > perfección. Mejor 3 entradas regulares que 1 ensayo.
- Markdown porque me deja:
    - Listas como esta
    - **Énfasis cuando hace falta**
    - [Links](https://github.com) a commits, docs, screenshots
    - \`código inline\` para nombres de funciones, etc.
- Tag de producto opcional — algunas reflexiones son cross-cutting.

**Qué viene en los próximos posts:**

1. Por qué pivoté de \`emoji-mart\` a \`emoji-picker-element\` (5 intentos antes de aterrizar) — la lección sobre evaluar bundler-compat antes de elegir librería.
2. La decisión arquitectónica de usar \`TicketRead\` per-user para el estado leído/no-leído del inbox.
3. Estado real del proyecto Flow360 vs lo que cree el cliente.

Que arranque la bitácora.`,
  },
];

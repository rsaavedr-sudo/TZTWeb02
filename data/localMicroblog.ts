// =============================================================================
//  Local microblog — browser-only post storage
// =============================================================================
//
// Posts written from the in-app form persist in `localStorage` under the
// key below. They live alongside the committed seed posts in
// `microblogPosts.ts` — the view merges both lists in chronological
// order. Local posts get edit/delete affordances; committed ones are
// read-only.
//
// Trade-off: posts only exist in THIS browser. If you clear cache or
// open the hub from another device, they're gone. To make a local
// post permanent, use the Export button (downloads a JSON), then paste
// the entry into `microblogPosts.ts` and commit. We'll likely move to
// Vercel KV in a follow-up phase to fix the cross-device gap.
// =============================================================================

import type { MicroblogPost } from './microblogPosts';

const STORAGE_KEY = 'tzero_microblog_posts_v1';

export interface LocalMicroblogPost extends MicroblogPost {
  /** Marker so the view knows this came from localStorage and can show
   *  edit/delete affordances (committed seed posts don't get those). */
  isLocal: true;
}

/** Read all local posts. Returns [] on quota errors / invalid JSON / SSR. */
export function readLocalPosts(): LocalMicroblogPost[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((p) => ({ ...p, isLocal: true as const }));
  } catch {
    return [];
  }
}

/** Replace the entire stored array. Used by save / delete / reorder. */
export function writeLocalPosts(posts: LocalMicroblogPost[]): void {
  if (typeof window === 'undefined') return;
  // Strip the isLocal marker before serialising — it gets re-added on
  // read. Keeps the stored shape identical to MicroblogPost.
  const clean = posts.map(({ isLocal, ...rest }) => rest);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(clean));
}

/** Insert or update a post by id. Returns the new full list. */
export function upsertLocalPost(post: LocalMicroblogPost): LocalMicroblogPost[] {
  const all = readLocalPosts();
  const idx = all.findIndex((p) => p.id === post.id);
  if (idx >= 0) {
    all[idx] = post;
  } else {
    all.unshift(post); // newest first
  }
  writeLocalPosts(all);
  return all;
}

/** Remove a post by id. Returns the new full list. */
export function deleteLocalPost(id: string): LocalMicroblogPost[] {
  const all = readLocalPosts().filter((p) => p.id !== id);
  writeLocalPosts(all);
  return all;
}

/** Build a stable id like '2026-05-04-mi-titulo' from date + title. */
export function generatePostId(date: string, title: string): string {
  const slug = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // strip accents
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 40) || 'sin-titulo';
  // Take just the date portion (YYYY-MM-DD) for the prefix.
  const datePrefix = (date || new Date().toISOString().slice(0, 10)).slice(0, 10);
  return `${datePrefix}-${slug}-${Date.now().toString(36).slice(-4)}`;
}

/** Trigger a JSON download of all local posts so the user can archive
 *  or paste into microblogPosts.ts. */
export function exportLocalPosts(): void {
  const posts = readLocalPosts().map(({ isLocal, ...rest }) => rest);
  const blob = new Blob([JSON.stringify(posts, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `microblog-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

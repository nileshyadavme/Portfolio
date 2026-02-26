/// <reference types="vite/client" />
// Lazy glob — the markdown files are NOT bundled upfront.
// Each file is fetched as a separate network request only when needed.
const mdLoaders = import.meta.glob('./journals/*.md', { query: '?raw' }) as Record<string, () => Promise<{ default: string }>>;

// Eager glob for metadata only (small strings) — used by the list/folder views.
// We read all files at build time just to parse frontmatter (no body).
const mdsEager = import.meta.glob('./journals/*.md', { query: '?raw', eager: true, import: 'default' });

export type JournalPost = {
  id: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  content: string;
  readTime: number;
};

// Extremely lightweight frontmatter parser that avoids new npm dependencies
function parseFrontmatter(markdown: string) {
  if (!markdown.startsWith('---')) return { content: markdown, metadata: {} };

  const endMatch = markdown.indexOf('\n---', 3);
  if (endMatch === -1) return { content: markdown, metadata: {} };

  const frontmatter = markdown.slice(3, endMatch).trim();
  const rawContent = markdown.slice(endMatch + 4).trim();

  const metadata: Record<string, any> = {};

  frontmatter.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();

      // Remove wrapping quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }

      // Parse arrays like ["mindset", "craft"]
      if (value.startsWith('[') && value.endsWith(']')) {
        const items = value.slice(1, -1).split(',').map(s => {
          let clean = s.trim();
          if ((clean.startsWith('"') && clean.endsWith('"')) || (clean.startsWith("'") && clean.endsWith("'"))) {
            clean = clean.slice(1, -1);
          }
          return clean;
        }).filter(Boolean);
        metadata[key] = items;
      } else if (!isNaN(Number(value))) {
        metadata[key] = Number(value);
      } else {
        metadata[key] = value;
      }
    }
  });

  return { metadata, content: rawContent };
}

// Map the raw files into our expected object format (metadata only — content is loaded lazily)
export const journalPosts: JournalPost[] = Object.entries(mdsEager).map(([path, content]) => {
  // Extract id from filename, e.g., './journals/slow-coding.md' -> 'slow-coding'
  const id = path.split('/').pop()?.replace('.md', '') || 'unknown';
  const { metadata, content: bodyContent } = parseFrontmatter(content as string);

  return {
    id,
    title: metadata.title || 'Untitled',
    date: metadata.date || '',
    category: metadata.category || 'Uncategorized',
    tags: metadata.tags || [],
    excerpt: metadata.excerpt || '',
    readTime: metadata.readTime || 5,
    content: bodyContent,
  };
}).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

/**
 * Lazily load the full Markdown body for a specific post by its id.
 * Called only when the user opens a JournalPost page — not on the list view.
 * Falls back to the already-parsed content if the dynamic import fails.
 */
export async function loadJournalContent(id: string): Promise<string> {
  const key = `./journals/${id}.md`;
  const loader = mdLoaders[key];
  if (!loader) {
    // Fall back to the eagerly-parsed content we already have
    const post = journalPosts.find(p => p.id === id);
    return post?.content ?? '';
  }
  try {
    const mod = await loader();
    const raw = mod.default;
    const { content } = parseFrontmatter(raw);
    return content;
  } catch {
    const post = journalPosts.find(p => p.id === id);
    return post?.content ?? '';
  }
}


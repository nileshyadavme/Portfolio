/// <reference types="vite/client" />
// Automatically discover all markdown files in the journals directory
const mds = import.meta.glob('./journals/*.md', { query: '?raw', eager: true, import: 'default' });

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

// Map the raw files into our expected object format
export const journalPosts: JournalPost[] = Object.entries(mds).map(([path, content]) => {
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

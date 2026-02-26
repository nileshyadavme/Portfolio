import { motion } from "motion/react";
import { useState } from "react";
import { useData } from "../context/DataContext";
import { Squiggle } from "../components/Squiggle";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

export function Journal() {
  const { journalPosts } = useData();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags
  const allTags = Array.from(
    new Set(journalPosts.flatMap((post) => post.tags))
  ).sort();

  const filteredPosts = journalPosts.filter((post) => {
    const matchesSearch = searchQuery === "" || (
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const matchesTag = selectedTag === null || post.tags.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  return (
    <div className="space-y-16">
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl"
        >
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">
            Journal
          </h1>
          <p className="font-handwriting text-3xl text-[var(--color-secondary)] mb-8">
            Thoughts, essays, and notes
          </p>
          <p className="font-body text-xl text-[var(--color-text)]/80 dark:text-[var(--color-dark-text)]/80 leading-relaxed">
            A space for long-form writing about software, making, and the
            creative process.
          </p>
        </motion.div>
      </section>

      <Squiggle className="text-[var(--color-gold)]" />

      <section>
        {/* Search Bar */}
        <div className="relative mb-12 max-w-xl">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-[var(--color-text)]/40 dark:text-[var(--color-dark-text)]/40" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search posts or tags..."
            className="w-full bg-[var(--color-bg)] dark:bg-[#2A1F18] border border-[var(--color-gold)]/30 rounded-full py-3.5 pl-12 pr-6 placeholder:text-[var(--color-text)]/40 dark:placeholder:text-[var(--color-dark-text)]/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 focus:border-[var(--color-accent)] transition-all font-body text-lg shadow-sm"
          />
        </div>

        {/* Tags Filter */}
        <div className="flex flex-wrap gap-2 mb-12">
          <button
            onClick={() => setSelectedTag(null)}
            className={`font-code text-xs px-3 py-1.5 rounded-full transition-colors ${selectedTag === null
              ? "bg-[var(--color-accent)] text-white dark:text-[#2A1F18]"
              : "bg-[var(--color-gold)]/10 text-[var(--color-text)]/60 dark:text-[var(--color-dark-text)]/60 hover:bg-[var(--color-gold)]/20 hover:text-[var(--color-text)] dark:hover:text-[var(--color-dark-text)]"
              }`}
          >
            All Entries
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={`font-code text-xs px-3 py-1.5 rounded-full transition-colors ${selectedTag === tag
                ? "bg-[var(--color-accent)] text-white dark:text-[#2A1F18]"
                : "bg-[var(--color-gold)]/10 text-[var(--color-text)]/60 dark:text-[var(--color-dark-text)]/60 hover:bg-[var(--color-gold)]/20 hover:text-[var(--color-text)] dark:hover:text-[var(--color-dark-text)]"
                }`}
            >
              #{tag}
            </button>
          ))}
        </div>

        <div className="space-y-16">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative pl-8 border-l-2 border-[var(--color-gold)]/30 hover:border-[var(--color-accent)] transition-colors"
              >
                <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-[var(--color-bg)] dark:bg-[var(--color-dark-bg)] border-2 border-[var(--color-gold)] group-hover:border-[var(--color-accent)] transition-colors" />

                <div className="flex flex-wrap items-center gap-4 text-sm font-code text-[var(--color-text)]/50 dark:text-[var(--color-dark-text)]/50 mb-4">
                  <time>{post.date}</time>
                  <span>•</span>
                  <span>{post.readTime} min read</span>
                  <span>•</span>
                  <span className="text-[var(--color-accent)]">
                    {post.category}
                  </span>
                </div>

                <Link to={`/journal/${post.id}`} className="block">
                  <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 group-hover:text-[var(--color-accent)] transition-colors">
                    {post.title}
                  </h2>
                  <p className="font-body text-lg text-[var(--color-text)]/80 dark:text-[var(--color-dark-text)]/80 leading-relaxed max-w-3xl mb-6">
                    {post.excerpt}
                  </p>
                </Link>

                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-code text-xs px-2 py-1 bg-[var(--color-gold)]/10 text-[var(--color-text)]/60 dark:text-[var(--color-dark-text)]/60 rounded-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-12 text-center"
            >
              <p className="font-handwriting text-2xl text-[var(--color-text)]/50 dark:text-[var(--color-dark-text)]/50">
                No journal entries found matching {searchQuery ? `"${searchQuery}"` : "your filters"}
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTag(null);
                }}
                className="mt-6 font-display text-lg text-[var(--color-accent)] hover:underline decoration-wavy underline-offset-4"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}

import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { useData } from "../context/DataContext";
import { Squiggle } from "../components/Squiggle";
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import "katex/dist/katex.min.css";
import "highlight.js/styles/github-dark.css";

export function JournalPost() {
  const { journalPosts } = useData();
  const { id } = useParams();
  const post = journalPosts.find((p: any) => p.id === id);

  if (!post) {
    return (
      <div className="text-center py-24">
        <h1 className="font-handwriting text-5xl text-[var(--color-accent)] mb-6">
          Hmm, nothing here yet...
        </h1>
        <Link
          to="/journal"
          className="font-display text-xl hover:underline decoration-wavy underline-offset-4"
        >
          <ArrowLeft className="inline w-5 h-5 mr-2" /> Back to Journal
        </Link>
      </div>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto"
    >
      <Link
        to="/journal"
        className="inline-flex items-center gap-2 font-display text-lg text-[var(--color-text)]/60 dark:text-[var(--color-dark-text)]/60 hover:text-[var(--color-accent)] transition-colors mb-12"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Journal
      </Link>

      <header className="mb-12">
        <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-8">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 font-code text-sm text-[var(--color-text)]/60 dark:text-[var(--color-dark-text)]/60 pb-8 border-b border-[var(--color-gold)]/30">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <time>{post.date}</time>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{post.readTime} min read</span>
          </div>
          <div className="flex items-center gap-2 text-[var(--color-accent)]">
            <Tag className="w-4 h-4" />
            <span>{post.category}</span>
          </div>
        </div>
      </header>

      <div className="prose prose-lg dark:prose-invert font-body text-[var(--color-text)]/90 dark:text-[var(--color-dark-text)]/90 leading-loose max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex, rehypeHighlight]}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      <Squiggle className="text-[var(--color-gold)] my-16" />

      <footer className="flex flex-wrap gap-3">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="font-code text-sm px-3 py-1 bg-[var(--color-gold)]/10 text-[var(--color-text)]/70 dark:text-[var(--color-dark-text)]/70 rounded-sm"
          >
            #{tag}
          </span>
        ))}
      </footer>
    </motion.article>
  );
}

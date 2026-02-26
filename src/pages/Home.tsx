import { motion } from "motion/react";
import { useState } from "react";
import { config } from "../data/config";
import { projects } from "../data/projects";
import { journalPosts } from "../data/journal";
import { Link } from "react-router-dom";
import { ArrowRight, FileText } from "lucide-react";
import { Squiggle } from "../components/Squiggle";
import { Polaroid } from "../components/Polaroid";
import { ResumeModal } from "../components/ResumeModal";
import { CodingStats } from "../components/CodingStats";

export function Home() {
  const recentProjects = projects.slice(0, 2);
  const recentPosts = journalPosts.slice(0, 2);
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative pt-0 md:pt-24">
        <div className="flex flex-col-reverse md:flex-row md:items-center gap-12 md:gap-16">

          {/* Left — Text */}
          <div className="flex-1 min-w-0">
            {/* Open to Work indicator */}
            {config.availability && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="inline-flex items-center gap-2.5 mb-6 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10 dark:bg-green-500/10"
              >
                <span className="relative flex h-2.5 w-2.5" style={{ contain: "strict" }}>
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                </span>
                <span className="font-code text-sm text-green-700 dark:text-green-400 tracking-wide">
                  {config.availability}
                </span>
              </motion.div>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6"
            >
              Hi, I'm {config.name.split(" ")[0]}.<br />
              <span className="text-[var(--color-accent)] text-5xl italic font-light">
                {config.role}
              </span>
            </motion.h1>

            {/* Mobile Photo — between title and description */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex md:hidden justify-center my-8 relative"
            >
              <Polaroid
                src={config.heroImage}
                caption={`${config.name.split(" ")[0]} ✦`}
                rotation={-2}
                className="w-64 sm:w-72"
                priority
              />
              {/* Responsive "Currently building" indicator for mobile */}
              {/* <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-max bg-[var(--color-cream)] dark:bg-[#2A1F18] border border-[var(--color-gold)]/30 shadow-lg p-3 rounded-xl flex items-center gap-3 z-10">
                <div className="relative flex h-2.5 w-2.5 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-code text-[var(--color-text)]/50 dark:text-[var(--color-dark-text)]/50 uppercase tracking-widest mb-0.5">Currently Building</span>
                  <span className="font-display font-semibold text-sm leading-tight text-[var(--color-text)] dark:text-[var(--color-dark-text)] max-w-[200px] truncate">{config.currently.building.name}</span>
                </div>
              </div> */}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-[var(--color-text)]/80 dark:text-[var(--color-dark-text)]/80 font-body leading-relaxed mb-4"
            >
              {config.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => setResumeOpen(true)}
                className="inline-flex items-center gap-2.5 px-8 py-3 bg-[var(--color-text)] dark:bg-[var(--color-cream)] text-[var(--color-cream)] dark:text-[var(--color-text)] font-display text-lg hover:bg-[var(--color-accent)] dark:hover:bg-[var(--color-accent)] dark:hover:text-white transition-colors shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
              >
                <FileText className="w-5 h-5" />
                Resume
              </button>
              <Link
                to="/contact"
                className="px-8 py-3 border border-[var(--color-text)]/20 dark:border-[var(--color-cream)]/20 font-display text-lg hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
              >
                Say Hello
              </Link>
            </motion.div>
          </div>

          {/* Right — Photo (Desktop only) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative hidden md:flex flex-shrink-0 justify-end"
          >
            {/* Polaroid frame */}
            <Polaroid
              src={config.heroImage}
              caption={`${config.name.split(" ")[0]} ✦`}
              rotation={-2}
              className="w-80"
              priority
            />

            {/* Responsive "Currently building" indicator */}
            {/* <div className="absolute bottom-6 -left-8 lg:-left-12 bg-[var(--color-cream)] dark:bg-[#2A1F18] border border-[var(--color-gold)]/30 shadow-xl p-3 lg:p-4 rounded-xl flex items-center gap-3 z-10 transition-transform hover:-translate-y-1">
              <div className="relative flex h-3 w-3 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] lg:text-xs font-code text-[var(--color-text)]/50 dark:text-[var(--color-dark-text)]/50 uppercase tracking-widest mb-0.5">Currently Building</span>
                <span className="font-display font-semibold text-sm lg:text-base leading-tight text-[var(--color-text)] dark:text-[var(--color-dark-text)] max-w-[200px] lg:max-w-[280px] break-words">{config.currently.building.name}</span>
              </div>
            </div> */}
          </motion.div>

        </div>
      </section>

      <Squiggle className="text-[var(--color-gold)]" />

      {/* Selected Work */}
      <section>
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="font-display text-4xl font-bold mb-2">
              Selected Work
            </h2>
            <p className="font-handwriting text-2xl text-[var(--color-secondary)]">
              Things I've built with my own hands
            </p>
          </div>
          <Link
            to="/projects"
            className="hidden md:flex items-center gap-2 font-display text-lg text-[var(--color-accent)] hover:underline decoration-wavy underline-offset-4"
          >
            See all projects <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {recentProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] mb-6 overflow-hidden bg-[var(--color-cream)] dark:bg-[#2A1F18] border border-[var(--color-gold)]/20 p-2 shadow-sm group-hover:shadow-xl transition-all duration-500 transform group-hover:-translate-y-1 group-hover:rotate-1">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-[var(--color-text)]/0 group-hover:bg-[var(--color-text)]/10 transition-colors duration-500" />
              </div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-display text-2xl font-bold group-hover:text-[var(--color-accent)] transition-colors">
                  {project.title}
                </h3>
                <span className="px-2 py-1 text-xs font-code bg-[var(--color-gold)]/20 text-[var(--color-text)]/70 dark:text-[var(--color-dark-text)]/70 rounded-sm">
                  {project.category}
                </span>
              </div>
              <p className="text-[var(--color-text)]/70 dark:text-[var(--color-dark-text)]/70 leading-relaxed">
                {project.shortDescription}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <Link
            to="/projects"
            className="flex items-center justify-center gap-2 font-display text-lg text-[var(--color-accent)] hover:underline decoration-wavy underline-offset-4"
          >
            See all projects <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Squiggle className="text-[var(--color-secondary)]" />

      {/* Coding Stats Section */}
      <CodingStats />

      <Squiggle className="text-[var(--color-secondary)]" />

      {/* Recent Thoughts */}
      <section>
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="font-display text-4xl font-bold mb-2">
              Recent Thoughts
            </h2>
            <p className="font-handwriting text-2xl text-[var(--color-secondary)]">
              Notes from the workshop
            </p>
          </div>
          <Link
            to="/journal"
            className="hidden md:flex items-center gap-2 font-display text-lg text-[var(--color-accent)] hover:underline decoration-wavy underline-offset-4"
          >
            Read the journal <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="space-y-8">
          {recentPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative pl-8 border-l border-[var(--color-gold)]/30 hover:border-[var(--color-accent)] transition-colors"
            >
              <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-[var(--color-gold)] group-hover:bg-[var(--color-accent)] transition-colors" />
              <div className="flex flex-wrap items-center gap-4 text-sm font-code text-[var(--color-text)]/50 dark:text-[var(--color-dark-text)]/50 mb-3">
                <time>{post.date}</time>
                <span>•</span>
                <span>{post.readTime} min read</span>
                <span>•</span>
                <span className="text-[var(--color-accent)]">
                  {post.category}
                </span>
              </div>
              <Link to={`/journal/${post.id}`} className="block">
                <h3 className="font-display text-2xl md:text-3xl font-bold mb-3 group-hover:text-[var(--color-accent)] transition-colors">
                  {post.title}
                </h3>
                <p className="text-[var(--color-text)]/80 dark:text-[var(--color-dark-text)]/80 leading-relaxed max-w-2xl">
                  {post.excerpt}
                </p>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  );
}

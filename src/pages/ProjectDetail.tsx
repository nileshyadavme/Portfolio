import { motion } from "motion/react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { projects } from "../data/projects";
import { ArrowLeft, ExternalLink, Github, Lightbulb, Wrench, TrendingUp } from "lucide-react";
import { Squiggle } from "../components/Squiggle";
import { useState } from "react";
import { ProjectGallery } from "../components/ProjectGallery";

export function ProjectDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const project = projects.find(p => p.id === id);
    const [galleryOpen, setGalleryOpen] = useState(false);

    if (!project) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-6 text-center">
                <p className="font-handwriting text-3xl text-[var(--color-secondary)]">
                    Project not found
                </p>
                <Link to="/projects" className="font-code text-sm text-[var(--color-accent)] hover:underline">
                    ← Back to projects
                </Link>
            </div>
        );
    }

    const currentIndex = projects.findIndex(p => p.id === id);
    const prev = projects[currentIndex - 1];
    const next = projects[currentIndex + 1];

    return (
        <div className="space-y-16 max-w-4xl mx-auto">
            {/* Back */}
            <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}>
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 font-code text-sm text-[var(--color-text)]/50 dark:text-[var(--color-dark-text)]/50 hover:text-[var(--color-accent)] transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </button>
            </motion.div>

            {/* Hero image */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative aspect-[16/7] overflow-hidden rounded-2xl border border-[var(--color-gold)]/20 cursor-pointer group"
                onClick={() => setGalleryOpen(true)}
            >
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between">
                    <div>
                        <span className="font-code text-xs text-white/60 tracking-widest uppercase">{project.category}</span>
                        <h1 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight">
                            {project.title}
                        </h1>
                    </div>
                    <span className={`font-code text-xs px-3 py-1.5 rounded-full border flex-shrink-0 ${project.status === "Completed"
                            ? "border-green-400/40 bg-green-400/20 text-green-300"
                            : "border-amber-400/40 bg-amber-400/20 text-amber-300"
                        }`}>
                        {project.status}
                    </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-code text-sm px-4 py-2 rounded-full">
                        View Gallery
                    </span>
                </div>
            </motion.div>

            {/* Tech stack */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-wrap gap-2"
            >
                {project.techStack.map(tech => (
                    <span
                        key={tech}
                        className="font-code text-sm px-3 py-1 border border-[var(--color-gold)]/30 rounded-full text-[var(--color-text)]/70 dark:text-[var(--color-dark-text)]/70 bg-[var(--color-gold)]/5"
                    >
                        {tech}
                    </span>
                ))}
            </motion.div>

            <Squiggle className="text-[var(--color-gold)]" />

            {/* Case study sections */}
            <div className="grid md:grid-cols-3 gap-10">
                {/* Problem */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0 }}
                    className="space-y-4"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-red-500/10 flex items-center justify-center flex-shrink-0">
                            <Lightbulb className="w-4 h-4 text-red-400" />
                        </div>
                        <h2 className="font-display text-xl font-bold">Problem</h2>
                    </div>
                    <p className="font-body text-[var(--color-text)]/70 dark:text-[var(--color-dark-text)]/70 leading-relaxed">
                        {project.problem ?? project.shortDescription}
                    </p>
                </motion.div>

                {/* Solution */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="space-y-4"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                            <Wrench className="w-4 h-4 text-blue-400" />
                        </div>
                        <h2 className="font-display text-xl font-bold">Solution</h2>
                    </div>
                    <p className="font-body text-[var(--color-text)]/70 dark:text-[var(--color-dark-text)]/70 leading-relaxed">
                        {project.solution ?? project.longDescription}
                    </p>
                </motion.div>

                {/* Impact */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="space-y-4"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                            <TrendingUp className="w-4 h-4 text-green-400" />
                        </div>
                        <h2 className="font-display text-xl font-bold">Impact</h2>
                    </div>
                    <p className="font-body text-[var(--color-text)]/70 dark:text-[var(--color-dark-text)]/70 leading-relaxed">
                        {project.impact ?? project.learnings}
                    </p>
                </motion.div>
            </div>

            {/* Challenges & Learnings */}
            {(project.challenges || project.learnings) && (
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 gap-8"
                >
                    {project.challenges && (
                        <div className="bg-[var(--color-cream)] dark:bg-[#2C241B] border border-[var(--color-gold)]/20 rounded-2xl p-6 space-y-3">
                            <h3 className="font-display font-bold text-lg">⚡ Challenges</h3>
                            <p className="font-body text-[var(--color-text)]/70 dark:text-[var(--color-dark-text)]/70 leading-relaxed">
                                {project.challenges}
                            </p>
                        </div>
                    )}
                    {project.learnings && (
                        <div className="bg-[var(--color-cream)] dark:bg-[#2C241B] border border-[var(--color-gold)]/20 rounded-2xl p-6 space-y-3">
                            <h3 className="font-display font-bold text-lg">💡 Learnings</h3>
                            <p className="font-body text-[var(--color-text)]/70 dark:text-[var(--color-dark-text)]/70 leading-relaxed">
                                {project.learnings}
                            </p>
                        </div>
                    )}
                </motion.div>
            )}

            {/* Links */}
            <div className="flex flex-wrap gap-4 pt-2">
                {project.github && (
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 px-6 py-3 bg-[var(--color-text)] dark:bg-[var(--color-cream)] text-[var(--color-cream)] dark:text-[var(--color-text)] font-display text-base hover:bg-[var(--color-accent)] dark:hover:bg-[var(--color-accent)] dark:hover:text-white transition-colors"
                    >
                        <Github className="w-4 h-4" /> Source Code
                    </a>
                )}
                {project.demo && (
                    <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 px-6 py-3 border border-[var(--color-text)]/20 dark:border-[var(--color-cream)]/20 font-display text-base hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
                    >
                        <ExternalLink className="w-4 h-4" /> Live Demo
                    </a>
                )}
            </div>

            <Squiggle className="text-[var(--color-secondary)]" />

            {/* Prev / Next navigation */}
            <div className="flex justify-between gap-4">
                {prev ? (
                    <Link
                        to={`/projects/${prev.id}`}
                        className="group flex flex-col gap-1 flex-1 max-w-xs"
                    >
                        <span className="font-code text-xs text-[var(--color-text)]/40 dark:text-[var(--color-dark-text)]/40">← Previous</span>
                        <span className="font-display font-semibold group-hover:text-[var(--color-accent)] transition-colors">{prev.title}</span>
                    </Link>
                ) : <div />}
                {next && (
                    <Link
                        to={`/projects/${next.id}`}
                        className="group flex flex-col gap-1 items-end flex-1 max-w-xs"
                    >
                        <span className="font-code text-xs text-[var(--color-text)]/40 dark:text-[var(--color-dark-text)]/40">Next →</span>
                        <span className="font-display font-semibold group-hover:text-[var(--color-accent)] transition-colors">{next.title}</span>
                    </Link>
                )}
            </div>

            {/* Gallery modal */}
            <ProjectGallery
                isOpen={galleryOpen}
                title={project.title}
                images={project.gallery ?? [project.image]}
                onClose={() => setGalleryOpen(false)}
            />
        </div>
    );
}

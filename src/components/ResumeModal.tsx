import { motion, AnimatePresence } from "motion/react";
import { X, Download, MapPin, Mail, Globe, Briefcase, GraduationCap, Cpu } from "lucide-react";
import { resume } from "../data/resume";
import { config } from "../data/config";

interface ResumeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/70 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.97 }}
                        transition={{ type: "spring", bounce: 0.15, duration: 0.45 }}
                        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[var(--color-bg)] dark:bg-[var(--color-dark-bg)] shadow-2xl border border-[var(--color-gold)]/30"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Toolbar */}
                        <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-4 border-b border-[var(--color-gold)]/30 bg-[var(--color-bg)]/95 dark:bg-[var(--color-dark-bg)]/95 backdrop-blur-sm">
                            <span className="font-code text-xs text-[var(--color-text)]/40 dark:text-[var(--color-dark-text)]/40 tracking-widest uppercase">
                                résumé
                            </span>
                            <div className="flex items-center gap-3">
                                {config.resumeUrl && (
                                    <a
                                        href={config.resumeUrl}
                                        download
                                        className="inline-flex items-center gap-2 px-4 py-1.5 font-code text-xs border border-[var(--color-gold)]/40 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
                                    >
                                        <Download className="w-3.5 h-3.5" />
                                        Download PDF
                                    </a>
                                )}
                                <button
                                    onClick={onClose}
                                    className="p-1.5 text-[var(--color-text)]/40 dark:text-[var(--color-dark-text)]/40 hover:text-[var(--color-text)] dark:hover:text-[var(--color-dark-text)] transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Resume body */}
                        <div className="px-8 md:px-14 py-10 space-y-10">

                            {/* Header */}
                            <div className="border-b border-[var(--color-gold)]/30 pb-8">
                                <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-1">
                                    {resume.name}
                                </h1>
                                <p className="font-handwriting text-2xl text-[var(--color-accent)] mb-5">
                                    {resume.title}
                                </p>
                                <div className="flex flex-wrap gap-x-6 gap-y-2 font-code text-xs text-[var(--color-text)]/60 dark:text-[var(--color-dark-text)]/60">
                                    <span className="flex items-center gap-1.5">
                                        <Mail className="w-3.5 h-3.5" /> {resume.email}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <MapPin className="w-3.5 h-3.5" /> {resume.location}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Globe className="w-3.5 h-3.5" /> {resume.website}
                                    </span>
                                </div>
                            </div>

                            {/* Summary */}
                            <p className="font-body text-base text-[var(--color-text)]/80 dark:text-[var(--color-dark-text)]/80 leading-relaxed italic border-l-2 border-[var(--color-accent)] pl-5">
                                {resume.summary}
                            </p>

                            {/* Experience */}
                            <section>
                                <SectionHeading icon={<Briefcase className="w-4 h-4" />} label="Experience" />
                                <div className="space-y-8 mt-6">
                                    {resume.experience.map((job, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.06 }}
                                        >
                                            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-3">
                                                <div>
                                                    <span className="font-display font-bold text-lg">{job.role}</span>
                                                    <span className="text-[var(--color-accent)] font-medium"> · {job.company}</span>
                                                </div>
                                                <div className="font-code text-xs text-[var(--color-text)]/50 dark:text-[var(--color-dark-text)]/50 whitespace-nowrap">
                                                    {job.period} · {job.location}
                                                </div>
                                            </div>
                                            <ul className="space-y-1.5">
                                                {job.points.map((pt, j) => (
                                                    <li key={j} className="flex gap-3 text-sm text-[var(--color-text)]/75 dark:text-[var(--color-dark-text)]/75 leading-relaxed">
                                                        <span className="mt-2 flex-shrink-0 w-1 h-1 rounded-full bg-[var(--color-gold)]" />
                                                        {pt}
                                                    </li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    ))}
                                </div>
                            </section>

                            {/* Education */}
                            <section>
                                <SectionHeading icon={<GraduationCap className="w-4 h-4" />} label="Education" />
                                <div className="space-y-4 mt-6">
                                    {resume.education.map((edu, i) => (
                                        <div key={i} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                                            <div>
                                                <span className="font-display font-bold">{edu.degree}</span>
                                                <span className="text-[var(--color-accent)] font-medium"> · {edu.institution}</span>
                                                {edu.note && (
                                                    <span className="font-code text-xs text-[var(--color-text)]/50 dark:text-[var(--color-dark-text)]/50 ml-2">({edu.note})</span>
                                                )}
                                            </div>
                                            <span className="font-code text-xs text-[var(--color-text)]/50 dark:text-[var(--color-dark-text)]/50 whitespace-nowrap">
                                                {edu.period}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Skills */}
                            <section>
                                <SectionHeading icon={<Cpu className="w-4 h-4" />} label="Skills & Interests" />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
                                    {Object.entries(resume.skills).map(([category, items]) => (
                                        <div key={category}>
                                            <p className="font-code text-xs text-[var(--color-text)]/40 dark:text-[var(--color-dark-text)]/40 mb-2">
                                                {category}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {items.map((skill) => (
                                                    <span
                                                        key={skill}
                                                        className="px-3 py-1 text-xs font-code bg-[var(--color-gold)]/20 dark:bg-[var(--color-gold)]/10 text-[var(--color-text)]/80 dark:text-[var(--color-dark-text)]/80 border border-[var(--color-gold)]/30"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function SectionHeading({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <div className="flex items-center gap-3">
            <span className="text-[var(--color-accent)]">{icon}</span>
            <h2 className="font-display text-xl font-bold tracking-tight">{label}</h2>
            <div className="flex-1 h-px bg-[var(--color-gold)]/30" />
        </div>
    );
}

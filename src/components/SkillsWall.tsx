import { motion } from "motion/react";
import { skillCategories, type SkillLevel } from "../data/skills";

function ProficiencyDots({ level }: { level: SkillLevel }) {
    return (
        <div className="flex gap-0.5 ml-auto flex-shrink-0">
            {Array.from({ length: 5 }).map((_, i) => (
                <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${i < level
                            ? "bg-[var(--color-accent)]"
                            : "bg-[var(--color-text)]/10 dark:bg-[var(--color-dark-text)]/10"
                        }`}
                />
            ))}
        </div>
    );
}

export function SkillsWall() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="font-display text-2xl font-bold mb-1">Skills</h2>
                <p className="font-handwriting text-xl text-[var(--color-secondary)]">
                    Tools of the trade
                </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
                {skillCategories.map((cat, ci) => (
                    <motion.div
                        key={cat.label}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: ci * 0.08 }}
                        className="bg-[var(--color-cream)] dark:bg-[#2C241B] border border-[var(--color-gold)]/20 rounded-xl p-5 space-y-3"
                    >
                        {/* Category header */}
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${cat.color}`} />
                            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-[var(--color-text)]/50 dark:text-[var(--color-dark-text)]/50">
                                {cat.label}
                            </h3>
                        </div>

                        {/* Skills list */}
                        <ul className="space-y-2">
                            {cat.skills.map((skill, si) => (
                                <motion.li
                                    key={skill.name}
                                    initial={{ opacity: 0, x: -8 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: ci * 0.08 + si * 0.04 }}
                                    className="flex items-center gap-2"
                                >
                                    <span className="font-code text-sm flex-1 min-w-0 truncate">
                                        {skill.name}
                                    </span>
                                    <ProficiencyDots level={skill.level} />
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>

            <p className="font-code text-[10px] text-[var(--color-text)]/25 dark:text-[var(--color-dark-text)]/25">
                ● = proficiency level (1–5 dots)
            </p>
        </div>
    );
}

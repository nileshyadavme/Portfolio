"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ACHIEVEMENTS } from "@/lib/data";
import * as Icons from "lucide-react";
import { Trophy } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen py-24 md:py-32">
            <div className="container mx-auto max-w-screen-xl px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid gap-12 md:grid-cols-2 md:items-center"
                >
                    {/* Image Section */}
                    <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted/30 border border-border/50 md:order-last">
                        {/* Placeholder for user image */}
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted/50 to-muted-foreground/10 text-muted-foreground/40 font-mono text-sm">
                            [Add Your Image Here]
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute -bottom-12 -left-12 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
                        <div className="absolute -top-12 -right-12 h-64 w-64 rounded-full bg-indigo-500/5 blur-3xl" />
                    </div>

                    {/* Text Content */}
                    <div className="space-y-6">
                        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                            About Me
                        </h1>
                        <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                            <p>
                                Hello! I'm a software engineer with a deep passion for building elegant, efficient, and scalable digital solutions. My journey in tech is driven by a curiosity to understand how things work under the hood and a desire to create software that makes a real difference.
                            </p>
                            <p>
                                I specialize in full-stack development, with a strong focus on modern frontend technologies like React and Next.js, backed by robust backend systems in Go and Node.js. I believe that good code is not just about functionality; it's about readability, maintainability, and the artistry of logic.
                            </p>
                            <p>
                                When I'm not coding, you can find me exploring new hiking trails, capturing moments through photography, or volunteering to teach the next generation of developers.
                            </p>
                        </div>

                        <div className="pt-4">
                            <h3 className="text-xl font-semibold mb-3 text-foreground">Tech Stack</h3>
                            <div className="flex flex-wrap gap-2">
                                {["React", "Next.js", "TypeScript", "Tailwind CSS", "Go", "Node.js", "PostgreSQL", "Docker"].map(tech => (
                                    <span key={tech} className="px-3 py-1 bg-secondary/50 text-secondary-foreground rounded-full text-sm font-medium">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Achievements Section */}
                <motion.div
                    id="achievements"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-24"
                >
                    <div className="mb-12 text-center">
                        <div className="inline-flex items-center gap-2 mb-4">
                            <Trophy className="h-6 w-6 text-primary" />
                            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Achievements</h2>
                        </div>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                            Key milestones and accomplishments throughout my career
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {ACHIEVEMENTS.map((achievement, index) => {
                            const IconComponent = (Icons as any)[achievement.icon] || Trophy;

                            return (
                                <motion.div
                                    key={achievement.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:shadow-lg dark:hover:shadow-primary/5"
                                >
                                    <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary">
                                        <IconComponent className="h-6 w-6" />
                                    </div>
                                    <div className="mb-2 flex items-start justify-between gap-2">
                                        <h3 className="text-lg font-semibold tracking-tight">
                                            {achievement.title}
                                        </h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-3">
                                        {achievement.description}
                                    </p>
                                    <div className="flex items-center justify-between text-xs">
                                        {achievement.date && (
                                            <span className="text-muted-foreground/60">{achievement.date}</span>
                                        )}
                                        <span className="rounded-full bg-primary/10 px-2 py-1 text-primary font-medium">
                                            {achievement.category}
                                        </span>
                                    </div>

                                    {/* Hover gradient effect */}
                                    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

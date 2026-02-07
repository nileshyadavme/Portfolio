"use client";

import { motion } from "framer-motion";
import { ACHIEVEMENTS } from "@/lib/data";
import { Trophy, ArrowRight } from "lucide-react";
import Link from "next/link";
import * as Icons from "lucide-react";

export function AchievementsPreview() {
    // Show only first 3 achievements
    const previewAchievements = ACHIEVEMENTS.slice(0, 3);

    return (
        <section className="py-24 bg-muted/30">
            <div className="container mx-auto max-w-screen-xl px-4 md:px-8">
                <div className="mb-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 mb-4">
                            <Trophy className="h-6 w-6 text-primary" />
                            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Achievements</h2>
                        </div>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                            Milestones and accomplishments that define my journey
                        </p>
                    </motion.div>
                </div>

                <div className="grid gap-6 md:grid-cols-3 mb-8">
                    {previewAchievements.map((achievement, index) => {
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
                                <h3 className="mb-2 text-lg font-semibold tracking-tight">
                                    {achievement.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-3">
                                    {achievement.description}
                                </p>
                                {achievement.date && (
                                    <p className="text-xs text-muted-foreground/60">
                                        {achievement.date}
                                    </p>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-center"
                >
                    <Link
                        href="/about#achievements"
                        className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                    >
                        View All Achievements
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

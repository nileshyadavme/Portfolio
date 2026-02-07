"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Calendar, Building2, GraduationCap } from "lucide-react";
import type { TimelineEntry } from "@/lib/data";

interface StoryTimelineProps {
    items: TimelineEntry[];
}

export function StoryTimeline({ items }: StoryTimelineProps) {
    return (
        <div className="relative mx-auto max-w-5xl px-4 py-12">
            {/* Central Line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border md:left-1/2 md:-ml-px" />

            {items.map((item, index) => {
                const isLeft = index % 2 === 0;
                const isEducation = item.role.includes("BS") || item.role.includes("Master") || item.role.includes("PhD");
                const Icon = isEducation ? GraduationCap : Building2;

                return (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className={cn(
                            "relative mb-16 flex flex-col md:flex-row items-center",
                            isLeft ? "md:flex-row-reverse" : ""
                        )}
                    >
                        {/* Content Side */}
                        <div className={cn("w-full md:w-1/2 pl-12 md:pl-0", isLeft ? "md:pr-12" : "md:pl-12")}>
                            <div className="group relative overflow-hidden rounded-2xl bg-card border border-border/50 hover:shadow-lg transition-all duration-300">
                                {/* Image Section */}
                                {item.image ? (
                                    <div className="relative h-48 w-full overflow-hidden bg-muted">
                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />

                                        {/* Placeholder Image Logic - In a real app, use next/image */}
                                        <div className="absolute inset-0 flex items-center justify-center bg-secondary/30 text-secondary-foreground/20 font-mono text-xs">
                                            [Image: {item.role}]
                                        </div>

                                        <div className="absolute bottom-4 left-4 right-4 z-20">
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm border border-white/10">
                                                <Calendar className="h-3 w-3" />
                                                {item.period}
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-2 bg-primary/10" />
                                )}

                                <div className="p-6">
                                    <div className="mb-2 flex items-center justify-between">
                                        <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">{item.role}</h3>
                                        {/* Mobile Date if no image */}
                                        {!item.image && (
                                            <span className="text-sm text-muted-foreground md:hidden">{item.period}</span>
                                        )}
                                    </div>

                                    <div className="mb-4 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                        <Building2 className="h-4 w-4" />
                                        {item.company}
                                    </div>

                                    <p className="mb-4 text-muted-foreground leading-relaxed">
                                        {item.description}
                                    </p>

                                    {item.tags && (
                                        <div className="flex flex-wrap gap-2">
                                            {item.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="rounded-full bg-secondary/50 px-2.5 py-0.5 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Center Node */}
                        <div className="absolute left-4 md:left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-background border-2 border-primary ring-4 ring-background z-20 shadow-md">
                            <div className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
                        </div>

                        {/* Connector support for mobile - horizontal line from left to card */}
                        <div className="absolute left-4 top-8 h-[2px] w-8 bg-border md:hidden" />

                        {/* Empty Side for layout balance on desktop */}
                        <div className="hidden md:block md:w-1/2" />
                    </motion.div>
                );
            })}
        </div>
    );
}

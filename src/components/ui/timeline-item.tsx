"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";
import type { TimelineEntry } from "@/lib/data";

interface TimelineItemProps {
    entry: TimelineEntry;
    index: number;
}

export function TimelineItem({ entry, index }: TimelineItemProps) {
    // Determine icon based on role/context (simple heuristic)
    const isEducation = entry.role.includes("BS") || entry.role.includes("Master") || entry.role.includes("PhD");
    const Icon = isEducation ? GraduationCap : Briefcase;

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group relative mb-12 pl-8 last:mb-0"
        >
            {/* Connector Line */}
            <div className="absolute left-0 top-2 h-full w-[2px] bg-border last:hidden group-hover:bg-primary/20 transition-colors" />

            {/* Icon/Logo Node */}
            <div
                className={cn(
                    "absolute left-[-11px] top-0 flex h-6 w-6 items-center justify-center rounded-full border bg-background transition-all duration-300 group-hover:scale-110 group-hover:border-primary overflow-hidden",
                    entry.current ? "border-emerald-500 ring-4 ring-emerald-500/10" : "border-muted-foreground/30"
                )}
            >
                {entry.logo ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={entry.logo} alt={entry.company} className="h-full w-full object-cover" />
                ) : (
                    <Icon className={cn("h-3 w-3", entry.current ? "text-emerald-500" : "text-muted-foreground")} />
                )}
            </div>

            <div className="flex flex-col gap-3 rounded-lg border border-transparent p-4 transition-all hover:bg-muted/40 hover:border-border/50">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                        <h3 className="text-lg font-bold tracking-tight group-hover:text-primary transition-colors">
                            {entry.role}
                        </h3>
                        <div className="text-base font-medium text-foreground/80">
                            {entry.company}
                        </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground bg-muted/50 px-2 py-1 rounded w-fit">
                        <Calendar className="h-3 w-3" />
                        {entry.period}
                    </div>
                </div>

                <p className="text-muted-foreground leading-relaxed text-sm">
                    {entry.description}
                </p>

                {entry.tags && (
                    <div className="flex flex-wrap gap-2 pt-1">
                        {entry.tags.map(tag => (
                            <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-primary/5 text-primary/80 border border-primary/10">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
}

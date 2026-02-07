"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/data";

interface ProjectCardProps {
    project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:shadow-lg dark:hover:shadow-primary/5"
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold tracking-tight">{project.title}</h3>
                <div className="flex gap-2">
                    {project.github && (
                        <Link
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground transition-colors hover:text-foreground"
                            aria-label="GitHub Repository"
                        >
                            <Github className="h-5 w-5" />
                        </Link>
                    )}
                    {project.link && (
                        <Link
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground transition-colors hover:text-foreground"
                            aria-label="View Project"
                        >
                            <ArrowUpRight className="h-5 w-5" />
                        </Link>
                    )}
                </div>
            </div>

            <p className="mb-6 text-muted-foreground flex-grow">{project.description}</p>

            <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map((tag) => (
                    <span
                        key={tag}
                        className="inline-flex items-center rounded-md bg-accent px-2 py-1 text-xs font-medium text-accent-foreground ring-1 ring-inset ring-border/50"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Hover gradient effect */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </motion.div>
    );
}

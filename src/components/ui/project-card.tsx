"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/lib/data";

interface ProjectCardProps {
    project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:shadow-lg dark:hover:shadow-primary/5"
        >
            {project.image && (
                <div className="relative mb-4 h-48 w-full overflow-hidden rounded-lg">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>
            )}

            <div className="flex items-center justify-between mb-4">
                <Link href={project.link || "#"} className="focus:outline-none">
                    <h3 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-primary">
                        {project.title}
                    </h3>
                </Link>
                <div className="flex gap-2">
                    {project.github && (
                        <Link
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground transition-colors hover:text-foreground z-10"
                            aria-label="GitHub Repository"
                        >
                            <Github className="h-5 w-5" />
                        </Link>
                    )}
                    {project.link && (
                        <Link
                            href={project.link}
                            target={project.link.startsWith("/") ? undefined : "_blank"}
                            rel={project.link.startsWith("/") ? undefined : "noopener noreferrer"}
                            className="text-muted-foreground transition-colors hover:text-foreground z-10"
                            aria-label="View Project"
                        >
                            <ArrowUpRight className="h-5 w-5" />
                        </Link>
                    )}
                </div>
            </div>

            <Link href={project.link || "#"} className="flex-grow focus:outline-none">
                <p className="mb-6 text-muted-foreground">{project.description}</p>
            </Link>

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

            {/* Full Card Link overlay for better UX (except on buttons) */}
            {project.link && (
                <Link
                    href={project.link}
                    className="absolute inset-0 z-0"
                    aria-hidden="true"
                    tabIndex={-1}
                />
            )}
        </motion.div>
    );
}

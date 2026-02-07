"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "@/components/ui/project-card";
import { PROJECTS } from "@/lib/data";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Web", "Backend", "AI", "Tools"];

export default function ProjectsPage() {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredProjects = PROJECTS.filter((project) => {
        if (activeCategory === "All") return true;
        return project.tags.some((tag) =>
            tag.toLowerCase().includes(activeCategory.toLowerCase()) ||
            (activeCategory === "Web" && (tag === "React" || tag === "Next.js" || tag === "Gatsby")) ||
            (activeCategory === "Backend" && (tag === "Go" || tag === "Node.js" || tag === "Socket.io"))
        );
    });

    return (
        <div className="min-h-screen py-24 md:py-32">
            <div className="container mx-auto max-w-screen-2xl px-4 md:px-8">
                <div className="mb-12 flex flex-col items-center justify-between gap-8 md:flex-row">
                    <div className="space-y-4 text-center md:text-left">
                        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Projects</h1>
                        <p className="text-muted-foreground max-w-lg text-lg">
                            A complete list of my open source projects, experiments, and production applications.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-2 p-1 bg-muted/50 backdrop-blur-sm rounded-lg border border-border/50">
                        {CATEGORIES.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={cn(
                                    "relative px-4 py-2 text-sm font-medium rounded-md transition-all",
                                    activeCategory === category
                                        ? "text-primary"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {activeCategory === category && (
                                    <motion.div
                                        layoutId="project-page-filter"
                                        className="absolute inset-0 bg-background shadow-sm border border-border/50 rounded-md z-[-1]"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.div
                    layout
                    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
}

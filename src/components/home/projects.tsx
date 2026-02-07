"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "@/components/ui/project-card";
import { PROJECTS } from "@/lib/data";

// Limit projects shown on home page
const FEATURED_PROJECTS = PROJECTS.slice(0, 3);

export function Projects() {
    return (
        <section id="projects" className="py-24 md:py-32">
            <div className="container mx-auto max-w-screen-2xl px-4 md:px-8">
                <div className="mb-12 flex flex-col items-center justify-between gap-4 md:flex-row">
                    <div className="space-y-1 text-center md:text-left">
                        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Selected Projects</h2>
                        <p className="text-muted-foreground">
                            A curated selection of my work.
                        </p>
                    </div>

                    <Link href="/projects" className="hidden md:block">
                        <span className="group inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            View All Projects
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                    </Link>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {FEATURED_PROJECTS.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>

                <div className="mt-12 flex justify-center md:hidden">
                    <Link href="/projects">
                        <button className="inline-flex items-center gap-2 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/80 transition-colors">
                            View All Projects
                            <ArrowRight className="h-4 w-4" />
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}

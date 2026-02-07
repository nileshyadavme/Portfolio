"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "@/components/ui/project-card";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/data";
import { useSearchParams, useRouter } from "next/navigation";
import { X } from "lucide-react";

interface ProjectListProps {
    initialProjects: Project[];
}

const CATEGORIES = ["All", "Web", "Backend", "AI", "Tools"];

export function ProjectList({ initialProjects }: ProjectListProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const initialTag = searchParams.get("tag");

    const [activeCategory, setActiveCategory] = useState("All");
    const [activeTag, setActiveTag] = useState<string | null>(initialTag);

    useEffect(() => {
        const tag = searchParams.get("tag");
        if (tag) {
            setActiveTag(tag);
            setActiveCategory("All"); // Reset category if tag is active
        } else {
            setActiveTag(null);
        }
    }, [searchParams]);

    const filteredProjects = initialProjects.filter((project) => {
        if (activeTag) {
            return project.tags.some((t) => t.toLowerCase() === activeTag.toLowerCase());
        }
        if (activeCategory === "All") return true;
        return project.tags.some((tag) =>
            tag.toLowerCase().includes(activeCategory.toLowerCase()) ||
            (activeCategory === "Web" && (tag === "React" || tag === "Next.js" || tag === "Gatsby")) ||
            (activeCategory === "Backend" && (tag === "Go" || tag === "Node.js" || tag === "Socket.io")) ||
            (activeCategory === "AI" && (tag === "Python" || tag === "LangChain" || tag === "OpenAI"))
        );
    });

    const clearTag = () => {
        setActiveTag(null);
        router.push("/projects");
    };

    return (
        <div className="space-y-12">
            <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                <div className="flex flex-wrap justify-center gap-2 p-1 bg-muted/50 backdrop-blur-sm rounded-lg border border-border/50">
                    {CATEGORIES.map((category) => (
                        <button
                            key={category}
                            onClick={() => {
                                setActiveCategory(category);
                                setActiveTag(null);
                                router.push("/projects");
                            }}
                            className={cn(
                                "relative px-4 py-2 text-sm font-medium rounded-md transition-all",
                                activeCategory === category && !activeTag
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {activeCategory === category && !activeTag && (
                                <motion.div
                                    layoutId="project-list-filter"
                                    className="absolute inset-0 bg-background shadow-sm border border-border/50 rounded-md z-[-1]"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            {category}
                        </button>
                    ))}
                </div>

                {activeTag && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary/10 text-primary border border-primary/20">
                        <span className="text-sm font-medium">Tag: {activeTag}</span>
                        <button
                            onClick={clearTag}
                            className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </div>
                )}
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}

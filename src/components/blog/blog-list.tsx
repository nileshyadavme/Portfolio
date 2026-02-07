"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BlogCard } from "@/components/ui/blog-card";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/lib/data";
import { useSearchParams, useRouter } from "next/navigation";
import { X } from "lucide-react";

interface BlogListProps {
    initialPosts: BlogPost[];
}

export function BlogList({ initialPosts }: BlogListProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const initialTag = searchParams.get("tag");

    const ALL_TAGS = Array.from(new Set(initialPosts.flatMap((post) => post.tags)));
    const CATEGORIES = ["All", ...ALL_TAGS];

    const [activeCategory, setActiveCategory] = useState("All");
    const [activeTag, setActiveTag] = useState<string | null>(initialTag);

    useEffect(() => {
        const tag = searchParams.get("tag");
        if (tag) {
            setActiveTag(tag);
            setActiveCategory("All");
        } else {
            setActiveTag(null);
        }
    }, [searchParams]);

    const filteredPosts = initialPosts.filter((post) => {
        if (activeTag) {
            return post.tags.some((t) => t.toLowerCase() === activeTag.toLowerCase());
        }
        if (activeCategory === "All") return true;
        return post.tags.includes(activeCategory);
    });

    const clearTag = () => {
        setActiveTag(null);
        router.push("/blog");
    };

    return (
        <div className="space-y-12">
            <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                <div className="flex flex-wrap justify-center gap-2 p-1 bg-muted/50 backdrop-blur-sm rounded-lg border border-border/50 max-w-3xl">
                    {CATEGORIES.map((category) => (
                        <button
                            key={category}
                            onClick={() => {
                                setActiveCategory(category);
                                setActiveTag(null);
                                router.push("/blog");
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
                                    layoutId="blog-list-filter"
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

            <div className="grid gap-6 md:grid-cols-2">
                <AnimatePresence mode="popLayout">
                    {filteredPosts.map((post) => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}

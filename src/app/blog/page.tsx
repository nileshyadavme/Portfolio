"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BlogCard } from "@/components/ui/blog-card";
import { BLOG_POSTS } from "@/lib/data";
import { cn } from "@/lib/utils";

const ALL_TAGS = Array.from(new Set(BLOG_POSTS.flatMap((post) => post.tags)));
const CATEGORIES = ["All", ...ALL_TAGS];

export default function BlogPage() {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredPosts = BLOG_POSTS.filter((post) => {
        if (activeCategory === "All") return true;
        return post.tags.includes(activeCategory);
    });

    return (
        <div className="min-h-screen py-24 md:py-32">
            <div className="container mx-auto max-w-screen-xl px-4 md:px-8">
                <div className="mb-16 text-center space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Writing</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Thoughts on software engineering, architecture, and the future of tech.
                    </p>
                </div>

                <div className="mb-12 flex justify-center">
                    <div className="flex flex-wrap justify-center gap-2 max-w-3xl">
                        {CATEGORIES.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={cn(
                                    "relative px-4 py-2 text-sm font-medium rounded-full border transition-all",
                                    activeCategory === category
                                        ? "border-primary bg-primary text-primary-foreground"
                                        : "border-border bg-background text-muted-foreground hover:border-foreground/20 hover:text-foreground"
                                )}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.div
                    layout
                    className="grid gap-6 md:grid-cols-2"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredPosts.map((post) => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
}

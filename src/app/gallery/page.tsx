"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { GALLERY_ITEMS } from "@/lib/data";
import { cn } from "@/lib/utils";

const ALL_CATEGORIES = Array.from(new Set(GALLERY_ITEMS.map((item) => item.category)));
const FILTERS = ["All", ...ALL_CATEGORIES];

export default function GalleryPage() {
    const [activeFilter, setActiveFilter] = useState("All");

    const filteredItems = GALLERY_ITEMS.filter((item) => {
        return activeFilter === "All" || item.category === activeFilter;
    });

    return (
        <div className="min-h-screen py-24 md:py-32">
            <div className="container mx-auto max-w-screen-xl px-4 md:px-8">
                <div className="mb-12 text-center space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Gallery</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        A collection of moments captured through my lens.
                    </p>
                </div>

                <div className="mb-12 flex justify-center">
                    <div className="flex flex-wrap justify-center gap-2 max-w-3xl bg-muted/30 p-1.5 rounded-full border border-border/50 backdrop-blur-sm">
                        {FILTERS.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={cn(
                                    "relative px-4 py-2 text-sm font-medium rounded-full transition-all",
                                    activeFilter === filter
                                        ? "text-primary-foreground"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {activeFilter === filter && (
                                    <motion.div
                                        layoutId="gallery-filter"
                                        className="absolute inset-0 bg-primary rounded-full z-[-1]"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.div layout>
                    <GalleryGrid items={filteredItems} />
                </motion.div>
            </div>
        </div>
    );
}

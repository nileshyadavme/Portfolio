"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GalleryItem } from "@/lib/data";
import { cn } from "@/lib/utils";

interface GalleryGridProps {
    items: GalleryItem[];
}

export function GalleryGrid({ items }: GalleryGridProps) {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item, index) => (
                <motion.div
                    layoutId={`card-${item.id}`}
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl bg-muted"
                >
                    {/* Placeholder for actual image - using a colored div for now since we don't have files */}
                    <div className={cn(
                        "absolute inset-0 bg-gradient-to-br from-muted-foreground/10 to-muted/50 transition-transform duration-500 group-hover:scale-105",
                        // Generate a pseudo-random pastel color based on ID for visual variety
                        parseInt(item.id) % 3 === 0 ? "bg-indigo-500/10" :
                            parseInt(item.id) % 3 === 1 ? "bg-emerald-500/10" : "bg-rose-500/10"
                    )} />

                    {/* Text Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-xs font-medium text-white/80 uppercase tracking-wider">{item.category}</span>
                        <h3 className="text-white font-bold text-lg">{item.title}</h3>
                        <span className="text-white/60 text-sm">{item.location}</span>
                    </div>

                    {/* Simulating image content for visual feedback if no image */}
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 font-bold text-4xl pointer-events-none">
                        {item.category.slice(0, 1)}
                    </div>
                </motion.div>
            ))}

            <AnimatePresence>
                {selectedId && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                        onClick={() => setSelectedId(null)}
                    >
                        {items.filter(i => i.id === selectedId).map(item => (
                            <motion.div
                                layoutId={`card-${item.id}`}
                                key={item.id}
                                className="w-full max-w-3xl aspect-video bg-background rounded-2xl overflow-hidden relative shadow-2xl"
                                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                            >
                                <div className={cn(
                                    "absolute inset-0 bg-gradient-to-br from-muted-foreground/10 to-muted/50",
                                    parseInt(item.id) % 3 === 0 ? "bg-indigo-500/10" :
                                        parseInt(item.id) % 3 === 1 ? "bg-emerald-500/10" : "bg-rose-500/10"
                                )} />

                                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-background/90 to-transparent">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <span className="text-sm font-medium text-primary/80 uppercase tracking-wider">{item.category}</span>
                                            <h3 className="text-3xl font-bold mt-1">{item.title}</h3>
                                            <p className="text-muted-foreground mt-2 flex items-center gap-2">
                                                <span>📍 {item.location}</span>
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => setSelectedId(null)}
                                            className="px-4 py-2 rounded-full bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

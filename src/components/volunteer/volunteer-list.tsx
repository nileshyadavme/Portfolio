"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Heart, Image as ImageIcon, X, ChevronLeft, ChevronRight } from "lucide-react";
import type { VolunteerEntry } from "@/lib/data";
import { cn } from "@/lib/utils";

interface VolunteerListProps {
    items: VolunteerEntry[];
}

export function VolunteerList({ items }: VolunteerListProps) {
    const [selectedItem, setSelectedItem] = useState<VolunteerEntry | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const openGallery = (item: VolunteerEntry) => {
        if (item.images && item.images.length > 0) {
            setSelectedItem(item);
            setCurrentImageIndex(0);
            document.body.style.overflow = "hidden";
        }
    };

    const closeGallery = () => {
        setSelectedItem(null);
        document.body.style.overflow = "unset";
    };

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedItem?.images) {
            setCurrentImageIndex((prev) => (prev + 1) % selectedItem.images!.length);
        }
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedItem?.images) {
            setCurrentImageIndex((prev) => (prev - 1 + selectedItem.images!.length) % selectedItem.images!.length);
        }
    };

    return (
        <div className="space-y-8">
            {items.map((item, index) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => openGallery(item)}
                    className={cn(
                        "group relative rounded-xl border border-border bg-card p-6 transition-all hover:shadow-lg dark:hover:shadow-primary/5",
                        item.images?.length ? "cursor-pointer hover:border-primary/50" : ""
                    )}
                >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <div className="p-2 rounded-full bg-primary/10 text-primary">
                                    <Heart className="w-5 h-5" />
                                </div>
                                <h3 className="text-xl font-bold tracking-tight">{item.organization}</h3>
                            </div>

                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {item.period}
                                </span>
                                <span className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    {item.location}
                                </span>
                                <span className="font-medium text-foreground px-2 py-0.5 rounded-full bg-accent">
                                    {item.role}
                                </span>
                            </div>
                        </div>

                        {item.images && item.images.length > 0 && (
                            <div className="hidden md:flex items-center gap-1 text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                <ImageIcon className="w-3 h-3" />
                                <span>{item.images.length} Photos</span>
                            </div>
                        )}
                    </div>

                    <div className="mt-4 pt-4 border-t border-border/50">
                        <p className="text-muted-foreground leading-relaxed">
                            {item.description}
                        </p>
                        {item.images && item.images.length > 0 && (
                            <div className="mt-4 md:hidden flex items-center gap-2 text-xs font-medium text-primary">
                                <ImageIcon className="w-3 h-3" />
                                <span>Tap to view photos</span>
                            </div>
                        )}
                    </div>
                </motion.div>
            ))}

            {/* Gallery Modal */}
            <AnimatePresence>
                {selectedItem && selectedItem.images && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeGallery}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm p-4"
                    >
                        <button
                            onClick={closeGallery}
                            className="absolute top-4 right-4 p-2 rounded-full bg-accent/50 hover:bg-accent text-foreground transition-colors z-50"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="relative w-full max-w-4xl aspect-video md:aspect-[16/9] rounded-lg overflow-hidden shadow-2xl bg-black">
                            {/* Navigation Buttons */}
                            {selectedItem.images.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10"
                                    >
                                        <ChevronLeft className="w-6 h-6" />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10"
                                    >
                                        <ChevronRight className="w-6 h-6" />
                                    </button>
                                </>
                            )}

                            {/* Image Placeholder Since we don't have real images */}
                            <motion.div
                                key={currentImageIndex}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="w-full h-full flex items-center justify-center bg-neutral-900"
                            >
                                {/* 
                                    In a real app, use next/image here:
                                    <Image src={selectedItem.images[currentImageIndex]} ... />
                                */}
                                <div className="text-center text-neutral-400">
                                    <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                    <p className="font-mono text-sm">[Image: {selectedItem.images[currentImageIndex]}]</p>
                                    <p className="mt-2 text-xs opacity-70">
                                        {currentImageIndex + 1} / {selectedItem.images.length}
                                    </p>
                                </div>
                            </motion.div>

                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                                <h3 className="font-bold text-lg">{selectedItem.organization}</h3>
                                <p className="text-sm text-white/80">{selectedItem.role} • {selectedItem.period}</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}


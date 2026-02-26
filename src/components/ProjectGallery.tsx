import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Layers } from "lucide-react";
import { useState, useEffect } from "react";

interface ProjectGalleryProps {
    isOpen: boolean;
    images: string[];
    title: string;
    onClose: () => void;
}

export function ProjectGallery({ isOpen, images, title, onClose }: ProjectGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Reset index when opening a new gallery
    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(0);
        }
    }, [isOpen, images]);

    if (!isOpen || !images || images.length === 0) return null;

    const currentImage = images[currentIndex];

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8 md:p-16"
                style={{
                    backgroundColor: "rgba(65, 65, 65, 0.95)",
                }}
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="relative w-full max-w-5xl h-[80vh] md:h-[85vh] rounded-2xl overflow-hidden shadow-2xl bg-[var(--color-cream)] dark:bg-[#1a1f1c] flex flex-col md:flex-row outline-none border border-[var(--color-gold)]/20"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Main Image Area */}
                    <div className="relative flex-1 bg-black/5 overflow-hidden group">
                        <motion.img
                            key={currentImage}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                            src={currentImage}
                            alt={`${title} screenshot ${currentIndex + 1}`}
                            className="absolute inset-0 w-full h-full object-contain"
                        />

                        {/* Navigation Arrows */}
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={handlePrev}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 text-white hover:bg-black/50 transition-colors opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                                >
                                    <ChevronLeft className="w-8 h-8" />
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 text-white hover:bg-black/50 transition-colors opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                                >
                                    <ChevronRight className="w-8 h-8" />
                                </button>
                            </>
                        )}

                        {/* Image Counter */}
                        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/30 text-white/90 text-sm font-code backdrop-blur-md">
                            {currentIndex + 1} / {images.length}
                        </div>
                    </div>

                    {/* Sidebar / Info Panel */}
                    <div className="w-full md:w-[320px] lg:w-[380px] flex flex-col bg-[var(--color-cream)] dark:bg-[#1a1f1c] border-t md:border-t-0 md:border-l border-[var(--color-gold)]/20 shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.1)] z-10 overflow-y-auto">
                        {/* Header info */}
                        <div className="sticky top-0 bg-[var(--color-cream)]/95 dark:bg-[#1a1f1c]/95 backdrop-blur-md p-6 border-b border-[var(--color-gold)]/10 flex justify-between items-start z-10">
                            <div>
                                <span className="text-[var(--color-text)]/60 dark:text-[var(--color-dark-text)]/60 text-xs tracking-widest uppercase font-code flex items-center gap-2 mb-2">
                                    <Layers className="w-3.5 h-3.5" />
                                    Project Gallery
                                </span>
                                <h2 className="text-2xl font-display font-bold text-[var(--color-text)] dark:text-[var(--color-dark-text)] leading-tight">
                                    {title}
                                </h2>
                            </div>
                            <button
                                type="button"
                                onClick={onClose}
                                className="p-2 -mr-2 text-[var(--color-text)]/50 hover:text-[var(--color-accent)] transition-colors rounded-full hover:bg-[var(--color-text)]/5"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Film strip thumbnails at the bottom */}
                        <div className="p-6 flex-1 flex flex-col justify-start">
                            <div>
                                <h3 className="text-xs uppercase tracking-widest text-[var(--color-text)]/40 dark:text-[var(--color-dark-text)]/40 mb-3 font-bold">Gallery Images</h3>
                                <div className="flex flex-wrap gap-2">
                                    {images.map((imgUrl, idx) => (
                                        <button
                                            key={`${imgUrl}-${idx}`}
                                            onClick={() => setCurrentIndex(idx)}
                                            className={`relative w-[calc(50%-4px)] aspect-square rounded-md overflow-hidden transition-all ${idx === currentIndex
                                                    ? "ring-2 ring-[var(--color-accent)] ring-offset-2 ring-offset-[var(--color-cream)] dark:ring-offset-[#1a1f1c] opacity-100"
                                                    : "opacity-50 hover:opacity-100"
                                                }`}
                                        >
                                            <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="absolute inset-0 w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

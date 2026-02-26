import { motion, AnimatePresence } from "motion/react";
import { X, FolderHeart, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

// Assuming a photo shape similar to the existing ones
export type FolderPhoto = {
    id: string;
    url: string;
    caption: string;
    camera: string;
    focalLength: string;
    aperture: string;
    iso: string;
    location?: string;
};

export type PhotoFolder = {
    id: string;
    title: string;
    coverUrl: string;
    description: string;
    photos: FolderPhoto[];
    date: string;
    location: string;
};

interface FolderGalleryProps {
    folder: PhotoFolder | null;
    onClose: () => void;
}

export function FolderGallery({ folder, onClose }: FolderGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!folder) return null;

    const currentPhoto = folder.photos[currentIndex];

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % folder.photos.length);
    };

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + folder.photos.length) % folder.photos.length);
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 md:p-16"
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
                    className="relative w-full max-w-6xl h-[85vh] md:h-[90vh] rounded-2xl overflow-hidden shadow-2xl bg-[var(--color-cream)] dark:bg-[#1a1f1c] flex flex-col md:flex-row outline-none border border-[var(--color-gold)]/20"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Main Image Area */}
                    <div className="relative flex-1 bg-black/5 overflow-hidden group">
                        {currentPhoto ? (
                            <>
                                <motion.img
                                    key={currentPhoto.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3 }}
                                    src={currentPhoto.url}
                                    alt={currentPhoto.caption}
                                    className="absolute inset-0 w-full h-full object-contain"
                                />

                                {/* Navigation Arrows */}
                                {folder.photos.length > 1 && (
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
                                    {currentIndex + 1} / {folder.photos.length}
                                </div>
                            </>
                        ) : (
                            <div className="flex w-full h-full items-center justify-center text-[var(--color-text)]/40 font-handwriting text-2xl">
                                Empty Folder
                            </div>
                        )}
                    </div>

                    {/* Sidebar / Info Panel */}
                    <div className="w-full md:w-[380px] flex flex-col bg-[var(--color-cream)] dark:bg-[#1a1f1c] border-t md:border-t-0 md:border-l border-[var(--color-gold)]/20 shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.1)] z-10 overflow-y-auto">
                        {/* Header info */}
                        <div className="sticky top-0 bg-[var(--color-cream)]/95 dark:bg-[#1a1f1c]/95 backdrop-blur-md p-6 border-b border-[var(--color-gold)]/10 flex justify-between items-start z-10">
                            <div>
                                <span className="text-[var(--color-text)]/60 dark:text-[var(--color-dark-text)]/60 text-xs tracking-widest uppercase font-code flex items-center gap-2 mb-2">
                                    <FolderHeart className="w-3.5 h-3.5" />
                                    {folder.title}
                                </span>
                                <h2 className="text-2xl font-display font-bold text-[var(--color-text)] dark:text-[var(--color-dark-text)] leading-tight">
                                    {currentPhoto?.caption || "No photos"}
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

                        {/* Photo Details */}
                        {currentPhoto && (
                            <div className="p-6 space-y-8 flex-1">
                                {/* Location & Date */}
                                <div className="flex flex-col gap-3 font-code text-sm">
                                    {currentPhoto.location && (
                                        <div className="flex items-center gap-2 text-[var(--color-text)]/80 dark:text-[var(--color-dark-text)]/80">
                                            <span className="text-red-500 text-lg -mt-0.5">📍</span>
                                            <span>{currentPhoto.location}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-3 text-[var(--color-text)]/60 dark:text-[var(--color-dark-text)]/60">
                                        <span className="opacity-70 text-xs tracking-wider uppercase">Captured</span>
                                        <span>{folder.date}</span>
                                    </div>
                                </div>

                                {/* Exif Data Grid */}
                                <div>
                                    <h3 className="text-xs uppercase tracking-widest text-[var(--color-text)]/40 dark:text-[var(--color-dark-text)]/40 mb-4 font-bold">Metadata</h3>
                                    <div className="grid grid-cols-2 gap-4 font-code text-sm text-[var(--color-text)]/80 dark:text-[var(--color-dark-text)]/80">
                                        <div className="space-y-1">
                                            <span className="block text-[10px] uppercase tracking-wider opacity-50">Camera</span>
                                            <span className="block truncate">{currentPhoto.camera}</span>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="block text-[10px] uppercase tracking-wider opacity-50">Lens</span>
                                            <span className="block">{currentPhoto.focalLength}</span>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="block text-[10px] uppercase tracking-wider opacity-50">Aperture</span>
                                            <span className="block">{currentPhoto.aperture}</span>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="block text-[10px] uppercase tracking-wider opacity-50">ISO</span>
                                            <span className="block">{currentPhoto.iso}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Film strip thumbnails at the bottom */}
                                <div className="mt-8 pt-6 border-t border-[var(--color-gold)]/10">
                                    <h3 className="text-xs uppercase tracking-widest text-[var(--color-text)]/40 dark:text-[var(--color-dark-text)]/40 mb-3 font-bold">In This Folder</h3>
                                    <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2 snap-x hide-scrollbar">
                                        {folder.photos.map((p, idx) => (
                                            <button
                                                key={p.id}
                                                onClick={() => setCurrentIndex(idx)}
                                                className={`relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden snap-center transition-all ${idx === currentIndex
                                                        ? "ring-2 ring-[var(--color-accent)] ring-offset-2 ring-offset-[var(--color-cream)] dark:ring-offset-[#1a1f1c] opacity-100"
                                                        : "opacity-40 hover:opacity-100"
                                                    }`}
                                            >
                                                <img src={p.url} alt="thumbnail" className="w-full h-full object-cover" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

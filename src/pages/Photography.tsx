import { motion, AnimatePresence } from "motion/react";
import { useState, useMemo } from "react";
import { photos } from "../data/photos";
import { Squiggle } from "../components/Squiggle";
import { Polaroid } from "../components/Polaroid";
import { X } from "lucide-react";

export function Photography() {
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof photos)[0] | null>(
    null,
  );
  const [activeTag, setActiveTag] = useState<string>("All");

  const tags = useMemo(
    () => ["All", ...Array.from(new Set(photos.map((p) => p.category)))],
    [],
  );

  const filteredPhotos = useMemo(
    () =>
      activeTag === "All"
        ? photos
        : photos.filter((p) => p.category === activeTag),
    [activeTag],
  );

  return (
    <div className="space-y-16">
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl"
        >
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">
            Photography
          </h1>
          <p className="font-handwriting text-3xl text-[var(--color-secondary)] mb-8">
            Moments captured in time
          </p>
          <p className="font-body text-xl text-[var(--color-text)]/80 dark:text-[var(--color-dark-text)]/80 leading-relaxed">
            A visual diary of places, objects, and light.
          </p>
        </motion.div>
      </section>

      <Squiggle className="text-[var(--color-gold)]" />

      <section className="space-y-10">
        {/* Tag Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3"
        >
          {tags.map((tag) => {
            const isActive = tag === activeTag;
            return (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`relative px-5 py-2 rounded-full font-code text-sm transition-all duration-200 border ${isActive
                  ? "border-[var(--color-gold)] text-[var(--color-gold)] bg-[var(--color-gold)]/10"
                  : "border-[var(--color-text)]/20 dark:border-[var(--color-dark-text)]/20 text-[var(--color-text)]/60 dark:text-[var(--color-dark-text)]/60 hover:border-[var(--color-gold)]/50 hover:text-[var(--color-gold)]/80"
                  }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeTagBg"
                    className="absolute inset-0 rounded-full bg-[var(--color-gold)]/10 border border-[var(--color-gold)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{tag}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto max-w-6xl">
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{
                  layout: { type: "spring", bounce: 0.2, duration: 0.4 },
                  opacity: { duration: 0.25, delay: index * 0.05 },
                  scale: { duration: 0.25, delay: index * 0.05 },
                }}
                className="flex justify-center"
              >
                <Polaroid
                  src={photo.url}
                  caption={photo.caption}
                  rotation={photo.rotation}
                  className="w-full"
                  onClick={() => setSelectedPhoto(photo)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        <AnimatePresence>
          {filteredPhotos.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-handwriting text-2xl text-center text-[var(--color-text)]/40 dark:text-[var(--color-dark-text)]/40 py-20"
            >
              No photos in this category yet.
            </motion.p>
          )}
        </AnimatePresence>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 md:p-16"
            style={{
              backgroundColor: "rgba(65, 65, 65, 0.95)",
            }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-5xl aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl bg-[var(--color-cream)] dark:bg-[#1a1f1c] flex outline-none border border-[var(--color-gold)]/20"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.caption}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Subtle gradient overlay just for text readability at the bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-cream)]/90 via-[var(--color-cream)]/30 dark:from-[#1a1f1c]/90 dark:via-[#1a1f1c]/30 to-transparent" />

              {/* Bottom Content Area */}
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 flex cursor-auto flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div className="flex flex-col gap-1.5 md:gap-2 text-left">
                  <span className="text-[var(--color-text)]/70 dark:text-[var(--color-dark-text)]/70 text-xs md:text-sm tracking-[0.15em] uppercase font-body font-semibold">
                    {selectedPhoto.category}
                  </span>
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-body font-bold text-[var(--color-text)] dark:text-[var(--color-dark-text)] leading-none tracking-tight mb-2">
                    {selectedPhoto.caption}
                  </h2>
                  <div className="flex items-center gap-2 text-[var(--color-text)]/80 dark:text-[var(--color-dark-text)]/80 text-sm md:text-base font-body">
                    <span className="text-red-500 drop-shadow-md text-base md:text-lg -mt-0.5">📍</span>
                    <span>{selectedPhoto.location}</span>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <button
                    type="button"
                    className="bg-[var(--color-text)] hover:bg-[var(--color-accent)] text-[var(--color-cream)] dark:bg-[var(--color-dark-text)] dark:hover:bg-[var(--color-accent)] dark:text-[#1a1f1c] px-6 md:px-8 py-2 md:py-2.5 rounded-full font-medium transition-colors shadow-lg font-body text-sm md:text-base focus:outline-none focus:ring-4 focus:ring-[var(--color-accent)]/20"
                    onClick={() => setSelectedPhoto(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

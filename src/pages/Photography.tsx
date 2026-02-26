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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-12"
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
              onClick={(e) => { e.stopPropagation(); setSelectedPhoto(null); }}
            >
              <X className="w-8 h-8" />
            </button>

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="max-w-5xl w-full flex flex-col md:flex-row gap-8 items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex-1 w-full relative">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption}
                  className="w-full h-auto max-h-[80vh] object-contain shadow-2xl"
                />
              </div>

              <div className="w-full md:w-80 bg-[var(--color-cream)] dark:bg-[var(--color-dark-bg)] p-8 shadow-xl border border-[var(--color-gold)]/20">
                <h3 className="font-handwriting text-3xl text-[var(--color-accent)] mb-6">
                  {selectedPhoto.caption}
                </h3>

                <div className="space-y-4 font-code text-sm text-[var(--color-text)]/80 dark:text-[var(--color-dark-text)]/80">
                  <div className="flex justify-between border-b border-[var(--color-gold)]/20 pb-2">
                    <span className="opacity-60">Camera</span>
                    <span>{selectedPhoto.camera}</span>
                  </div>
                  <div className="flex justify-between border-b border-[var(--color-gold)]/20 pb-2">
                    <span className="opacity-60">Lens</span>
                    <span>{selectedPhoto.focalLength}</span>
                  </div>
                  <div className="flex justify-between border-b border-[var(--color-gold)]/20 pb-2">
                    <span className="opacity-60">Aperture</span>
                    <span>{selectedPhoto.aperture}</span>
                  </div>
                  <div className="flex justify-between border-b border-[var(--color-gold)]/20 pb-2">
                    <span className="opacity-60">ISO</span>
                    <span>{selectedPhoto.iso}</span>
                  </div>
                  <div className="flex justify-between border-b border-[var(--color-gold)]/20 pb-2">
                    <span className="opacity-60">Category</span>
                    <span>{selectedPhoto.category}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

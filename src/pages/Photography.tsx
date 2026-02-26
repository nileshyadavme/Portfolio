import { motion, AnimatePresence } from "motion/react";
import { useState, useMemo } from "react";
import { photoFolders } from "../data/photos";
import { Squiggle } from "../components/Squiggle";
import { FolderCard } from "../components/FolderCard";
import { FolderGallery, PhotoFolder } from "../components/FolderGallery";

export function Photography() {
  const [selectedFolder, setSelectedFolder] = useState<PhotoFolder | null>(null);
  const [activeTag, setActiveTag] = useState<string>("All");

  const tags = useMemo(
    () => ["All", ...Array.from(new Set(photoFolders.map((f) => f.category)))],
    [],
  );

  const filteredFolders = useMemo(
    () =>
      activeTag === "All"
        ? photoFolders
        : photoFolders.filter((f) => f.category === activeTag),
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
            A visual diary of places, objects, and light organized by collections.
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

        {/* Folder Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto max-w-6xl">
          <AnimatePresence mode="popLayout">
            {filteredFolders.map((folder, index) => (
              <motion.div
                key={folder.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{
                  layout: { type: "spring", bounce: 0.2, duration: 0.4 },
                  opacity: { duration: 0.3, delay: index * 0.1 },
                  scale: { duration: 0.3, delay: index * 0.1 },
                  y: { duration: 0.3, delay: index * 0.1 }
                }}
              >
                <FolderCard
                  title={folder.title}
                  coverUrl={folder.coverUrl}
                  count={folder.photos.length}
                  category={folder.category}
                  date={folder.date}
                  onClick={() => setSelectedFolder(folder)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        <AnimatePresence>
          {filteredFolders.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-handwriting text-2xl text-center text-[var(--color-text)]/40 dark:text-[var(--color-dark-text)]/40 py-20"
            >
              No folders in this category yet.
            </motion.p>
          )}
        </AnimatePresence>
      </section>

      {/* Lightbox / Folder Gallery */}
      <FolderGallery
        folder={selectedFolder}
        onClose={() => setSelectedFolder(null)}
      />
    </div>
  );
}

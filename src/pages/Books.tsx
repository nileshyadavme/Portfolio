import { motion } from "motion/react";
import { books } from "../data/books";
import { Squiggle } from "../components/Squiggle";
import { Star, Calendar, BookOpen, Clock } from "lucide-react";

export function Books() {
    const currentlyReading = books.filter((b) => b.status === "Currently Reading");
    const finished = books.filter((b) => b.status === "Finished");
    const toRead = books.filter((b) => b.status === "To Read");

    const Section = ({ title, items }: { title: string; items: typeof books }) => {
        if (items.length === 0) return null;

        return (
            <div className="space-y-8">
                <h2 className="font-display text-3xl font-bold mb-8 flex items-center gap-3">
                    {title}
                    <span className="font-code text-sm font-normal text-[var(--color-text)]/40 dark:text-[var(--color-dark-text)]/40 bg-[var(--color-gold)]/10 px-2 py-1 rounded-full">
                        {items.length}
                    </span>
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                    {items.map((book, index) => (
                        <motion.div
                            key={book.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group flex flex-col sm:flex-row gap-6 bg-[var(--color-cream)] dark:bg-[#2A1F18] border border-[var(--color-gold)]/30 p-4 shadow-sm hover:shadow-md transition-shadow"
                        >
                            {/* Cover Container */}
                            <div className="w-32 h-48 sm:w-24 sm:h-36 flex-shrink-0 shadow-sm relative overflow-hidden mx-auto sm:mx-0 bg-gray-100 dark:bg-gray-800">
                                {book.coverImage ? (
                                    <img
                                        src={book.coverImage}
                                        alt={`Cover of ${book.title}`}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div
                                        className="w-full h-full flex items-center justify-center p-2 text-center text-white/50"
                                        style={{ backgroundColor: book.coverColor || "gray" }}
                                    >
                                        <div className="w-full h-full border-l-4 border-black/10 flex items-center justify-center">
                                            <BookOpen className="w-8 h-8 opacity-20" />
                                        </div>
                                    </div>
                                )}
                                {/* Book spine visual effect overlay */}
                                <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
                            </div>

                            {/* Details */}
                            <div className="flex-1 flex flex-col min-w-0">
                                <h3 className="font-display text-xl font-bold mb-1 truncate group-hover:text-[var(--color-accent)] transition-colors">
                                    {book.title}
                                </h3>
                                <p className="font-code text-sm text-[var(--color-secondary)] mb-4">
                                    {book.author}
                                </p>

                                {book.rating > 0 && (
                                    <div className="flex items-center gap-1 mb-3">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < book.rating
                                                    ? "fill-[var(--color-accent)] text-[var(--color-accent)]"
                                                    : "text-[var(--color-text)]/20 dark:text-[var(--color-dark-text)]/20"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                )}

                                {book.review && (
                                    <p className="font-body text-sm text-[var(--color-text)]/80 dark:text-[var(--color-dark-text)]/80 leading-relaxed italic mb-4">
                                        "{book.review}"
                                    </p>
                                )}

                                <div className="mt-auto flex flex-wrap items-center gap-4 text-xs font-code text-[var(--color-text)]/50 dark:text-[var(--color-dark-text)]/50">
                                    {book.dateFinished ? (
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <span>Finished {new Date(book.dateFinished).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</span>
                                        </div>
                                    ) : book.dateAdded ? (
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5" />
                                            <span>Added {new Date(book.dateAdded).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</span>
                                        </div>
                                    ) : null}

                                    {book.progress > 0 && book.progress < 100 && (
                                        <div className="flex items-center gap-2 w-full mt-2">
                                            <span className="w-8">{book.progress}%</span>
                                            <div className="flex-1 h-1.5 bg-[var(--color-gold)]/20 rounded-full overflow-hidden">
                                                <div className="h-full bg-[var(--color-accent)]" style={{ width: `${book.progress}%` }} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-16">
            <section>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-2xl"
                >
                    <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">
                        Library
                    </h1>
                    <p className="font-handwriting text-3xl text-[var(--color-secondary)] mb-8">
                        Notes from the margins
                    </p>
                    <p className="font-body text-xl text-[var(--color-text)]/80 dark:text-[var(--color-dark-text)]/80 leading-relaxed">
                        A log of books I'm reading, have read, or plan to read. Not quite a review site, just a personal record.
                    </p>
                </motion.div>
            </section>

            <Squiggle className="text-[var(--color-gold)]" />

            <section className="space-y-24">
                <Section title="Currently Reading" items={currentlyReading} />
                <Section title="Finished" items={finished} />
                <Section title="To Read" items={toRead} />
            </section>
        </div>
    );
}

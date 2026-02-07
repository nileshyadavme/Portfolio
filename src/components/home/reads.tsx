"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { BOOKS } from "@/lib/data";

// Limit to 4 books for home page
const FEATURED_BOOKS = BOOKS.slice(0, 4);

export function Reads() {
    return (
        <section className="py-24">
            <div className="container mx-auto max-w-screen-xl px-4 md:px-8">
                <div className="mb-12 flex flex-col items-center justify-between gap-4 md:flex-row">
                    <div className="space-y-1 text-center md:text-left">
                        <h2 className="text-3xl font-bold tracking-tight">Favourite Reads</h2>
                        <p className="text-muted-foreground">Books that shaped my engineering philosophy.</p>
                    </div>
                    <Link href="/reads">
                        <span className="group inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            View More Reads
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                    </Link>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {FEATURED_BOOKS.map((book, index) => (
                        <motion.div
                            key={book.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="group relative flex flex-col justify-between overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md"
                        >
                            <div className="mb-4">
                                <div className={`mb-3 inline-flex rounded-full p-2 ${book.color}`}>
                                    <BookOpen className="h-5 w-5" />
                                </div>
                                <h3 className="font-semibold leading-tight">{book.title}</h3>
                                <p className="text-sm text-muted-foreground">{book.author}</p>
                            </div>

                            <div className="relative">
                                <p className="text-sm text-muted-foreground/80 italic line-clamp-3">
                                    "{book.thought}"
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

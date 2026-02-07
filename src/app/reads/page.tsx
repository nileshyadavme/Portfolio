"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { BOOKS } from "@/lib/data";

export default function ReadsPage() {
    return (
        <div className="min-h-screen py-24 md:py-32">
            <div className="container mx-auto max-w-screen-xl px-4 md:px-8">
                <div className="mb-12 text-center space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Favourite Reads</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Books that have shaped my thinking and engineering philosophy.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {BOOKS.map((book, index) => (
                        <motion.div
                            key={book.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="group relative flex flex-col justify-between overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md"
                        >
                            <div className="mb-4">
                                <div className={`mb-3 inline-flex rounded-full p-2 ${book.color}`}>
                                    <BookOpen className="h-5 w-5" />
                                </div>
                                <h3 className="font-semibold leading-tight text-xl">{book.title}</h3>
                                <p className="text-sm text-muted-foreground mt-1">{book.author}</p>
                            </div>

                            <div className="relative pt-4 border-t border-border/50">
                                <p className="text-sm text-muted-foreground/80 italic leading-relaxed">
                                    "{book.thought}"
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import Image from "next/image";
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
                            className="group relative flex flex-col justify-between overflow-hidden rounded-lg border bg-card p-0 shadow-sm transition-all hover:shadow-md h-full"
                        >
                            <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
                                {book.image ? (
                                    <Image
                                        src={book.image}
                                        alt={book.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className={`flex h-full items-center justify-center ${book.color}`}>
                                        <BookOpen className="h-12 w-12 opacity-50" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                            </div>

                            <div className="flex flex-col flex-grow p-6">
                                <div className="mb-4">
                                    <div className={`mb-3 inline-flex rounded-full p-2 py-1 text-xs font-medium ${book.color}`}>
                                        {book.author}
                                    </div>
                                    <h3 className="font-bold leading-tight text-xl mb-1">{book.title}</h3>
                                </div>

                                <div className="mt-auto pt-4 border-t border-border/50">
                                    <p className="text-sm text-muted-foreground italic leading-relaxed">
                                        "{book.thought}"
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

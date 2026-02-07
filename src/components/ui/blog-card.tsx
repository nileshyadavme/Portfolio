"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/data";

interface BlogCardProps {
    post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ y: -4 }}
            className="group relative flex flex-col justify-between rounded-xl border border-border bg-card p-6 transition-all hover:shadow-lg dark:hover:shadow-primary/5"
        >
            {post.image && (
                <div className="relative mb-4 h-48 w-full overflow-hidden rounded-lg">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>
            )}

            <div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <time dateTime={post.date}>{post.date}</time>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime}</span>
                    </div>
                </div>

                <h3 className="mb-2 text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug || post.id}`} className="focus:outline-none">
                        {post.title}
                    </Link>
                </h3>

                <Link href={`/blog/${post.slug || post.id}`} className="focus:outline-none">
                    <p className="text-muted-foreground line-clamp-3 mb-4">
                        {post.excerpt}
                    </p>
                </Link>
            </div>

            <div className="flex items-center justify-between mt-auto">
                <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                        <span
                            key={tag}
                            className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground group-hover:bg-accent group-hover:text-accent-foreground transition-colors"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="flex items-center text-sm font-medium text-primary opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0">
                    Read more <ArrowRight className="ml-1 h-3 w-3" />
                </div>
            </div>

            {/* Full Card Link overlay for better UX (except on buttons) */}
            <Link
                href={`/blog/${post.slug || post.id}`}
                className="absolute inset-0 z-0"
                aria-hidden="true"
                tabIndex={-1}
            />
        </motion.article>
    );
}

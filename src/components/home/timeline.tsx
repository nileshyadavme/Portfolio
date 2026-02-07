"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Timeline() {
    return (
        <section id="timeline" className="py-24 bg-muted/30">
            <div className="container mx-auto max-w-screen-xl px-4 md:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
                    <div className="space-y-4 max-w-2xl text-center md:text-left">
                        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">My Journey</h2>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            From not knowing how to code to becoming a software engineer, my journey has been a continuous learning curve.
                        </p>
                    </div>

                    <Link href="/timeline">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-3 text-base font-medium text-background transition-colors hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        >
                            View Timeline
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </motion.button>
                    </Link>
                </div>
            </div>
        </section>
    );
}

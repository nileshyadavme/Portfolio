"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { MathAnimation } from "@/components/ui/math-animation";
import { StatusIndicator } from "@/components/ui/status-indicator";

export function Hero() {
    return (
        <section className="relative flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center overflow-hidden px-4 md:px-8 py-20">
            <MathAnimation />

            <div className="z-10 container mx-auto max-w-screen-xl grid md:grid-cols-2 gap-12 items-center">
                {/* Text Area */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-8 text-center md:text-left order-2 md:order-1"
                >
                    <div className="flex justify-center md:justify-start">
                        <StatusIndicator />
                    </div>

                    <h1 className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
                        Start with the logic. <br />
                        <span className="text-muted-foreground">End with the design.</span>
                    </h1>

                    <p className="max-w-xl mx-auto md:mx-0 text-lg text-muted-foreground sm:text-xl">
                        I'm a software engineer who builds elegant, efficient, and scalable systems.
                        Blending mathematical precision with intuitive user experiences.
                    </p>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                        <a
                            href="#projects"
                            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                        >
                            View Projects
                        </a>
                        <a
                            href="/contact"
                            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                        >
                            Contact Me
                        </a>
                    </div>
                </motion.div>

                {/* Image Area */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="relative mx-auto md:ml-auto w-64 h-64 md:w-96 md:h-96 order-1 md:order-2"
                >
                    {/* Minimalist Image Placeholder */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-muted to-muted/20 border border-border/50 backdrop-blur-sm overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30 font-mono text-sm">
                            [Your Image]
                        </div>
                    </div>

                    {/* Subtle background decoration */}
                    <div className="absolute -z-10 inset-4 bg-primary/10 rounded-2xl blur-3xl transform rotate-6 translate-y-4" />
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-8 z-10 animate-bounce hidden md:block"
            >
                <ArrowDown className="h-6 w-6 text-muted-foreground" />
            </motion.div>
        </section>
    );
}


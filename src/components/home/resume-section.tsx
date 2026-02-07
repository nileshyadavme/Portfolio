"use client";

import Link from "next/link";
import { FileText, Download } from "lucide-react";

export function ResumeSection() {
    return (
        <section id="resume" className="py-24 bg-muted/50">
            <div className="container mx-auto max-w-screen-xl px-4 md:px-8 text-center">
                <h2 className="mb-4 text-3xl font-bold tracking-tight">Resume</h2>
                <p className="mb-8 text-muted-foreground max-w-2xl mx-auto">
                    Want a deeper dive into my experience? View my resume online or download a copy for later.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/resume"
                        className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 gap-2"
                    >
                        <FileText className="h-4 w-4" />
                        View Resume
                    </Link>

                    <a
                        href="/resume.pdf" // Placeholder: In a real app, this would point to a static file or generate one
                        download="Nilesh_Resume.pdf"
                        className="inline-flex h-12 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 gap-2"
                        onClick={(e) => {
                            // Prevent default if file doesn't exist yet, to show demo behavior
                            // e.preventDefault();
                            // alert("Download functionality would trigger here.");
                        }}
                    >
                        <Download className="h-4 w-4" />
                        Download PDF
                    </a>
                </div>
            </div>
        </section>
    );
}

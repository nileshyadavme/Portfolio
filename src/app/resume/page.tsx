"use client";

import { ResumeContent } from "@/components/resume/resume-content";
import { ArrowLeft, Printer } from "lucide-react";
import Link from "next/link";

export default function ResumePage() {
    return (
        <div className="min-h-screen bg-muted/20 pb-16 print:bg-white print:pb-0">
            {/* Toolbar - Hidden when printing */}
            <div className="sticky top-0 z-10 border-b border-border bg-background/80 px-4 py-4 backdrop-blur-md print:hidden">
                <div className="mx-auto flex max-w-5xl items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Portfolio
                    </Link>
                    <button
                        onClick={() => window.print()}
                        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                        <Printer className="h-4 w-4" />
                        Print / Save as PDF
                    </button>
                </div>
            </div>

            <div className="mx-auto mt-8 max-w-5xl px-4 print:mt-0 print:px-0">
                <ResumeContent />
            </div>
        </div>
    );
}

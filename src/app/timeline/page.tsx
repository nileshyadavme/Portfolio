"use client";

import { StoryTimeline } from "@/components/timeline/story-timeline";
import { EXPERIENCE, EDUCATION } from "@/lib/data";

export default function TimelinePage() {
    // Merge and sort could be done here if needed. 
    // Assuming we want to show everything. 
    // Typically "Journey" is chronological (oldest to newest) or standard timeline (newest to oldest).
    // Let's stick to reverse chronological (newest first) as it highlights current status best,
    // but the "Start from beginning" request implies Oldest -> Newest. 
    // The user said "journey from beginning". 
    // Let's Reverse the data to show Oldest -> Newest for "Storytelling" flow.

    // Combining Education and Experience
    // Education: 2015-2019
    // Exp 1: 2019-2021
    // Exp 2: 2021-2023
    // Exp 3: 2023-Present

    // Automation of sorting based on year strings is complex without Date objects,
    // so I will manually construct the order for this specific dataset since it's small.
    // Education (1) -> Freelance (3) -> Startup (2) -> Tech Corp (1).
    // Note: EDUCATION[0] is 2015. EXPERIENCE[2] is 2019. EXPERIENCE[1] is 2021. EXPERIENCE[0] is 2023.
    // So standard reverse chronological is Exp[0], Exp[1], Exp[2], Edu[0].

    // "Journey from beginning" -> Edu[0], Exp[2], Exp[1], Exp[0].

    const journeyItems = [
        ...EDUCATION,
        ...[...EXPERIENCE].reverse()
    ];

    return (
        <div className="min-h-screen py-24 md:py-32">
            <div className="container mx-auto max-w-screen-xl px-4 md:px-8 text-center mb-16">
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl mb-4">My Journey</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                    The path that led me to where I am today.
                </p>
            </div>

            <StoryTimeline items={journeyItems} />

            <div className="text-center mt-12 mb-24">
                <p className="text-muted-foreground">
                    ...and the journey continues.
                </p>
            </div>
        </div>
    );
}


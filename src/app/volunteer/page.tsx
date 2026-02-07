"use client";

import { VolunteerList } from "@/components/volunteer/volunteer-list";
import { VOLUNTEERING } from "@/lib/data";

export default function VolunteerPage() {
    return (
        <div className="min-h-screen py-24 md:py-32">
            <div className="container mx-auto max-w-screen-xl px-4 md:px-8">
                <div className="mb-12 text-center space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Volunteering</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Giving back to the community through mentorship and events.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto">
                    <VolunteerList items={VOLUNTEERING} />
                </div>
            </div>
        </div>
    );
}

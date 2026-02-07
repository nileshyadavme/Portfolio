"use client";

import { cn } from "@/lib/utils";

interface StatusIndicatorProps {
    className?: string;
    pulsing?: boolean;
}

export function StatusIndicator({ className, pulsing = true }: StatusIndicatorProps) {
    return (
        <div className={cn("flex items-center space-x-2", className)}>
            <span className="relative flex h-3 w-3">
                {pulsing && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                )}
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                Open to Work
            </span>
        </div>
    );
}

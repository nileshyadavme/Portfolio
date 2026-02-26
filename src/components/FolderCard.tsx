import { FolderHeart } from "lucide-react";

interface FolderCardProps {
    title: string;
    coverUrl: string;
    count: number;
    category: string;
    date: string;
    onClick: () => void;
    /** Pass true for above-the-fold cards to eagerly load them */
    priority?: boolean;
}

export function FolderCard({
    title,
    coverUrl,
    count,
    category,
    date,
    onClick,
    priority = false,
}: FolderCardProps) {
    return (
        <div
            onClick={onClick}
            className="group cursor-pointer relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-[var(--color-gold)]/20 bg-[var(--color-cream)] dark:bg-[#1a1f1c]"
        >
            {/* 
              width/height tell the browser the intrinsic size BEFORE the image loads,
              so it can reserve the exact space — eliminating the most common CLS cause.
              The absolute+inset-0 positioning means the rendered size is still 100%×100%.
            */}
            <img
                src={coverUrl}
                alt={title}
                width={800}
                height={600}
                decoding="async"
                loading={priority ? "eager" : "lazy"}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Top right info */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
                <span className="bg-black/40 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full font-code border border-white/10 flex items-center gap-1.5 shadow-sm">
                    <FolderHeart className="w-3.5 h-3.5" />
                    {count} {count === 1 ? 'project' : 'projects'}
                </span>
            </div>

            {/* Bottom info */}
            <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col gap-1 z-10">
                <span className="text-white/70 text-[10px] tracking-[0.15em] uppercase font-bold font-body">
                    {category}
                </span>
                <h3 className="text-white text-xl md:text-2xl font-display font-medium leading-tight">
                    {title}
                </h3>
                <span className="text-white/50 text-xs font-code mt-0.5">
                    {date}
                </span>
            </div>
        </div>
    );
}

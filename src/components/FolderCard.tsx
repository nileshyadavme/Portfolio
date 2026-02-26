import { FolderHeart } from "lucide-react";

interface FolderCardProps {
    title: string;
    coverUrl: string;
    count: number;
    category: string;
    date: string;
    onClick: () => void;
}

export function FolderCard({
    title,
    coverUrl,
    count,
    category,
    date,
    onClick,
}: FolderCardProps) {
    return (
        <div
            onClick={onClick}
            className="group cursor-pointer relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-[var(--color-gold)]/20 bg-[var(--color-cream)] dark:bg-[#1a1f1c]"
        >
            <img
                src={coverUrl}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Top right info */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
                <span className="bg-black/40 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full font-code border border-white/10 flex items-center gap-1.5 shadow-sm">
                    <FolderHeart className="w-3.5 h-3.5" />
                    {count} {count === 1 ? 'photo' : 'photos'}
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

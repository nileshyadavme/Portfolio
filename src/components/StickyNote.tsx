import { motion } from "motion/react";
import { ReactNode } from "react";

interface StickyNoteProps {
  children: ReactNode;
  color?: "yellow" | "pink" | "blue" | "green";
  rotation?: number;
  className?: string;
}

const colors = {
  yellow: "bg-[#FFF9B1] text-[#5C5727]",
  pink: "bg-[#FFD1D1] text-[#6B3F3F]",
  blue: "bg-[#D1E8FF] text-[#3F546B]",
  green: "bg-[#D1FFD6] text-[#3F6B44]",
};

export function StickyNote({
  children,
  color = "yellow",
  rotation = -2,
  className = "",
}: StickyNoteProps) {
  return (
    <motion.div
      className={`p-4 shadow-md font-handwriting text-lg leading-relaxed ${colors[color]} ${className} relative`}
      style={{ rotate: rotation }}
      whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-4 bg-black/5 rounded-full blur-sm" />
      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-2 bg-white/40 rounded-full" />
      {children}
    </motion.div>
  );
}

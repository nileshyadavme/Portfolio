import { motion } from "motion/react";
import { useState } from "react";

interface PolaroidProps {
  src: string;
  caption: string;
  rotation?: number;
  className?: string;
  onClick?: () => void;
  priority?: boolean;
}

export function Polaroid({
  src,
  caption,
  rotation = 0,
  className = "",
  onClick,
  priority = false,
}: PolaroidProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`bg-white dark:bg-[#3A2E24] p-3 pb-8 shadow-md hover:shadow-xl transition-shadow cursor-pointer relative ${className}`}
      style={{ rotate: isHovered ? 0 : rotation }}
      whileHover={{ scale: 1.02, zIndex: 10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="aspect-square w-full overflow-hidden bg-gray-200 border border-black/5">
        <img
          src={src}
          alt={caption}
          className="w-full h-full object-cover grayscale-[20%] sepia-[10%] contrast-110"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          referrerPolicy="no-referrer"
        />
      </div>
      <p className="font-handwriting text-xl text-center mt-4 text-black/80 leading-tight px-2">
        {caption}
      </p>
    </motion.div>
  );
}

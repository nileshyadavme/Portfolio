import { motion } from 'motion/react';

// Common style applied to every orb:
// - will-change:transform → browser promotes this element to a GPU layer BEFORE animation starts
// - contain:layout paint → changes to this element cannot affect layout or paint of elements outside it
// - translateZ(0) → forces immediate GPU compositing (belt-and-suspenders for Safari)
// Together these eliminate the CLS contribution these orbs were causing.
const orbStyle: React.CSSProperties = {
  willChange: 'transform',
  contain: 'layout paint',
  transform: 'translateZ(0)',
};

export function MotionBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      {/* Base gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-bg)] to-[var(--color-cream)] dark:from-[var(--color-dark-bg)] dark:to-black transition-colors duration-700" />

      {/* Animated glowing orbs — GPU-composited to avoid CLS */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-60 dark:opacity-20"
        style={{ ...orbStyle, backgroundColor: 'var(--color-gold)' }}
        animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-50 dark:opacity-20"
        style={{ ...orbStyle, backgroundColor: 'var(--color-accent)' }}
        animate={{ x: [0, -80, 0], y: [0, 100, 0], scale: [1, 1.5, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[150px] opacity-50 dark:opacity-20"
        style={{ ...orbStyle, backgroundColor: 'var(--color-secondary)' }}
        animate={{ x: [0, 50, 0], y: [0, -100, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}


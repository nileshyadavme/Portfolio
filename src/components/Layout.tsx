import { ReactNode } from "react";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { motion, AnimatePresence } from "motion/react";
import { ThemeToggle } from "./ThemeToggle";
import { MotionBackground } from "./MotionBackground";
import { useLocation } from "react-router-dom";

export function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-[var(--color-gold)] selection:text-[var(--color-text)]">
      <MotionBackground />
      <Navigation />
      <ThemeToggle />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex-grow max-w-4xl w-full mx-auto px-6 pt-24 pb-24"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

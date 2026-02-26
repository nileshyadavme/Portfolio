import { ReactNode, Suspense } from "react";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { motion, AnimatePresence } from "motion/react";
import { ThemeToggle } from "./ThemeToggle";
import { MotionBackground } from "./MotionBackground";
import { useLocation } from "react-router-dom";

function PageLoader() {
  return (
    <div className="flex-grow flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-2 border-[var(--color-gold)] border-t-[var(--color-accent)] rounded-full animate-spin" />
    </div>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-[var(--color-gold)] selection:text-[var(--color-text)]">
      <MotionBackground />
      <Navigation />
      <ThemeToggle />
      {/*
        CORRECT order: AnimatePresence → motion.main → Suspense → children
        
        AnimatePresence is always alive and always sees motion.main mounting/unmounting.
        motion.main is keyed by pathname and mounts IMMEDIATELY on route change —
        it does not wait for the lazy chunk. This lets AnimatePresence do its full
        exit-then-enter transition without Suspense interrupting it.
        
        Suspense sits INSIDE motion.main so the spinner appears inside the already-
        animating page shell. When the chunk loads content replaces the spinner.
        No double-click required.
      */}
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex-grow max-w-4xl w-full mx-auto px-6 pt-24 pb-24"
        >
          <Suspense fallback={<PageLoader />}>
            {children}
          </Suspense>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}


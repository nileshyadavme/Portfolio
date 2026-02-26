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
        mode="popLayout": the exiting motion.main is immediately taken out of
        normal document flow (given position:absolute) so the entering page
        occupies its correct layout position from frame 1.

        - Fixes "alternating blank": sync mode stacked both pages vertically,
          pushing the new page below the viewport every other navigation.
        - Fixes "blank on lazy load": unlike mode="wait", the new page mounts
          immediately — no window for Suspense to interrupt the enter animation.
        - Exiting and entering happen simultaneously (no wait), so chunk cache
          from App.tsx preloads guarantees instant resolution.
      */}
      <AnimatePresence mode="popLayout">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
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


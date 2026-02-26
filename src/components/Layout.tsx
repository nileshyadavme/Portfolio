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
        AnimatePresence WITHOUT mode="wait" (default = "sync"):
        Enter and exit happen simultaneously, so the new page mounts immediately
        on route change. This prevents the blank-page bug where mode="wait" held
        the old page in place while React.lazy/Suspense delayed the new page's
        mount — causing AnimatePresence to lose track of the entering motion.main.

        The new page fades/slides in while the old one fades/slides out at the
        same time. Suspense sits inside motion.main; if the chunk is already
        cached (guaranteed by preloads in App.tsx) it resolves in the same tick.
      */}
      <AnimatePresence>
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


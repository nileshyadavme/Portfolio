import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "motion/react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return (
      saved === "dark" ||
      (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-[var(--color-cream)] dark:bg-[var(--color-dark-bg)] border border-[var(--color-gold)]/30 shadow-md hover:shadow-lg transition-all"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        {isDark ? (
          <Moon className="w-5 h-5 text-[var(--color-gold)]" />
        ) : (
          <Sun className="w-5 h-5 text-[var(--color-accent)]" />
        )}
      </motion.div>
    </button>
  );
}

import { NavLink } from "react-router-dom";
import { motion } from "motion/react";
import { Compass, BookOpen, PenTool, Coffee, Mail, Camera, Link2 } from "lucide-react";
import clsx from "clsx";

const navItems = [
  { path: "/", label: "Home", icon: Compass, end: true },
  { path: "/about", label: "About", icon: Coffee, end: false },
  { path: "/projects", label: "Projects", icon: PenTool, end: false },
  { path: "/journal", label: "Journal", icon: BookOpen, end: false },
  { path: "/photography", label: "Photography", icon: Camera, end: false },
  { path: "/links", label: "Links", icon: Link2, end: false },
  { path: "/contact", label: "Contact", icon: Mail, end: false },
];

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-center pointer-events-none">
      <div className="bg-[var(--color-cream)]/80 dark:bg-[var(--color-dark-bg)]/80 backdrop-blur-md border border-[var(--color-gold)]/30 rounded-full px-4 py-2 shadow-sm pointer-events-auto flex items-center gap-2 sm:gap-6">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              clsx(
                "relative px-3 py-2 text-sm font-medium transition-colors flex items-center gap-2 group",
                isActive
                  ? "text-[var(--color-accent)]"
                  : "text-[var(--color-text)]/70 dark:text-[var(--color-dark-text)]/70 hover:text-[var(--color-text)] dark:hover:text-[var(--color-dark-text)]",
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                <span className="hidden sm:inline">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--color-accent)] rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

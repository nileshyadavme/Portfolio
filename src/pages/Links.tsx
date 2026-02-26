import { motion } from "motion/react";
import { config } from "../data/config";
import { Link } from "react-router-dom";
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  PenTool,
  Camera,
  Briefcase,
  MapPin,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { ThemeToggle } from "../components/ThemeToggle";

/* ─── Easy to edit: add/remove social & nav cards here ─── */

const socialLinks = [
  { label: "GitHub", url: config.socials.github, icon: Github, color: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300" },
  { label: "Twitter", url: config.socials.twitter, icon: Twitter, color: "bg-sky-100 dark:bg-sky-900/40 text-sky-600 dark:text-sky-400" },
  { label: "LinkedIn", url: config.socials.linkedin, icon: Linkedin, color: "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400" },
  { label: "Email", url: config.socials.email, icon: Mail, color: "bg-[var(--color-accent)]/10 text-[var(--color-accent)]" },
  // ↑ Add more here — they auto-wrap 2 per row
];

const navLinks = [
  { label: "Projects", url: "/projects", icon: Briefcase, description: "Things I've designed & built." },
  { label: "Journal", url: "/journal", icon: PenTool, description: "Notes from the workshop." },
  { label: "Photography", url: "/photography", icon: Camera, description: "A visual diary of light & places." },
  // ↑ Add more here — 2 per row, grid grows automatically
];

/* ─── Base card ─── */
function BentoCard({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35 }}
      className={`bg-[var(--color-cream)] dark:bg-[#2C241B] border border-[var(--color-gold)]/30 shadow-sm hover:shadow-md hover:border-[var(--color-gold)]/60 transition-shadow overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ─── Cards ─── */

function ProfileCard() {
  return (
    <BentoCard
      className="col-span-2 row-span-2 flex flex-col items-center justify-center text-center gap-3 p-4"
      delay={0}
    >
      {/* 
        w-20 h-20 = 80×80px. Explicit width+height prevent the browser from
        reflowing the layout when the image arrives. eager loading because
        this is the hero image — always above the fold on /links.
      */}
      <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-[var(--color-gold)]/40 p-0.5 flex-shrink-0">
        <img
          src={config.heroImage}
          alt={config.name}
          width={80}
          height={80}
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <div>
        <h1 className="font-display text-xl font-bold leading-tight">{config.name}</h1>
        <p className="font-handwriting text-base text-[var(--color-accent)] mt-0.5">{config.role}</p>
      </div>
      {config.availability && (
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 font-code text-xs text-green-700 dark:text-green-400">
          {/* contain:strict keeps the ping animation inside its own stacking context
              so it can't shift surrounding elements */}
          <span className="relative flex h-2 w-2" style={{ contain: "strict" }}>
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          {config.availability}
        </span>
      )}
    </BentoCard>
  );
}

function QuoteCard() {
  return (
    <BentoCard className="col-span-2 flex items-center p-4" delay={0.15}>
      <p className="font-handwriting text-base text-[var(--color-text)]/70 dark:text-[var(--color-dark-text)]/70 leading-relaxed italic border-l-2 border-[var(--color-accent)] pl-4 line-clamp-4">
        "{config.bio}"
      </p>
    </BentoCard>
  );
}

function CurrentlyCard() {
  return (
    <BentoCard className="col-span-2" delay={0.2}>
      <div className="h-full flex flex-col justify-center gap-2 p-4 overflow-hidden">
        <div className="flex items-center gap-2 flex-shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-[var(--color-secondary)]" />
          <span className="font-code text-xs text-[var(--color-text)]/40 dark:text-[var(--color-dark-text)]/40">Currently</span>
        </div>
        <div className="flex flex-col gap-1.5 min-h-0 overflow-y-auto pr-1">
          {[
            { label: "Building", value: config.currently.building.name },
            { label: "Reading", value: config.currently.reading.title },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-shrink-0 items-start gap-2 min-w-0">
              <span className="font-code text-xs text-[var(--color-text)]/40 dark:text-[var(--color-dark-text)]/40 w-16 flex-shrink-0 mt-[1px]">{label}</span>
              <span className="font-display text-xs font-medium break-words leading-tight">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}

/* ─── Page ─── */
export function Links() {
  return (
    // On md+ screens: lock to viewport height, no scroll.
    // On mobile: natural scroll since screen is too small.
    <div className="min-h-screen md:h-screen md:overflow-hidden relative selection:bg-[var(--color-gold)] selection:text-[var(--color-text)] flex flex-col py-6 px-4">
      <ThemeToggle />

      {/* Constrained column — fills remaining height */}
      <div className="flex flex-col flex-1 max-w-2xl w-full mx-auto min-h-0 gap-3">

        {/* Bento grid — flex-1 so it fills all space, gridAutoRows=1fr so every row is equal */}
        <div
          className="flex-1 grid grid-cols-4 gap-3 min-h-0"
          style={{ gridAutoRows: "1fr" }}
        >
          {/* Profile — 2 cols × 2 rows */}
          <ProfileCard />

          {/* Right of profile: Location + Social sub-grid — also 2 cols × 2 rows */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.35 }}
            className="col-span-2 row-span-2 grid grid-cols-2 gap-3 min-h-0"
            style={{ gridAutoRows: "1fr" }}
          >
            {/* Location — full width */}
            <div className="col-span-2 bg-[var(--color-cream)] dark:bg-[#2C241B] border border-[var(--color-gold)]/30 shadow-sm hover:shadow-md hover:border-[var(--color-gold)]/60 transition-shadow p-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-3.5 h-3.5 text-[var(--color-accent)]" />
              </div>
              <div>
                <p className="font-code text-xs text-[var(--color-text)]/40 dark:text-[var(--color-dark-text)]/40">Based in</p>
                <p className="font-display font-semibold text-sm">Mumbai, India</p>
              </div>
            </div>

            {/* Social cards — 2 per row, wrap automatically */}
            {socialLinks.map(({ label, url, icon: Icon, color }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[var(--color-cream)] dark:bg-[#2C241B] border border-[var(--color-gold)]/30 shadow-sm hover:shadow-md hover:border-[var(--color-accent)]/50 transition-shadow flex flex-col items-center justify-center gap-1.5 p-3"
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="font-code text-xs text-[var(--color-text)]/60 dark:text-[var(--color-dark-text)]/60 group-hover:text-[var(--color-accent)] transition-colors">
                  {label}
                </span>
              </a>
            ))}
          </motion.div>

          {/* Quote */}
          <QuoteCard />

          {/* Currently */}
          <CurrentlyCard />

          {/* Nav cards */}
          {navLinks.map(({ label, url, icon: Icon, description }, i) => {
            // If there's an odd number of links and this is the last one, make it span all 4 columns
            const isLastOdd = i === navLinks.length - 1 && navLinks.length % 2 !== 0;
            const colSpanClass = isLastOdd ? "col-span-4" : "col-span-2";

            return (
              <BentoCard key={label} className={colSpanClass} delay={0.25 + i * 0.05}>
                <Link to={url} className="h-full group flex flex-col justify-between p-4 gap-2">
                  <div className="flex items-start justify-between">
                    <div className="w-8 h-8 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center">
                      <Icon className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[var(--color-text)]/20 group-hover:text-[var(--color-accent)] transition-colors" />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-sm mb-0.5">{label}</p>
                    <p className="font-body text-xs text-[var(--color-text)]/50 dark:text-[var(--color-dark-text)]/50 leading-relaxed">{description}</p>
                  </div>
                </Link>
              </BentoCard>
            );
          })}
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center font-code text-xs text-[var(--color-text)]/30 dark:text-[var(--color-dark-text)]/30 flex-shrink-0"
        >
          © {new Date().getFullYear()} {config.name}
        </motion.p>
      </div>
    </div>
  );
}

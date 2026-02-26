import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { config } from "../data/config";
import { Link } from "react-router-dom";
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  Youtube,
  PenTool,
  Camera,
  Briefcase,
  ArrowUpRight,
  ArrowLeft,
  BookOpen,
  Hammer,
} from "lucide-react";
import { ThemeToggle } from "../components/ThemeToggle";

/* ─── Mini Game: Rock Paper Scissors ─── */
type RpsChoice = "🪨" | "📄" | "✂️";
const choices: RpsChoice[] = ["🪨", "📄", "✂️"];
const choiceNames: Record<RpsChoice, string> = { "🪨": "Rock", "📄": "Paper", "✂️": "Scissors" };

function beats(a: RpsChoice, b: RpsChoice) {
  return (a === "🪨" && b === "✂️") || (a === "✂️" && b === "📄") || (a === "📄" && b === "🪨");
}

function RpsGame() {
  const [player, setPlayer] = useState<RpsChoice | null>(null);
  const [cpu, setCpu] = useState<RpsChoice | null>(null);
  const [result, setResult] = useState<"win" | "lose" | "draw" | null>(null);
  const [score, setScore] = useState({ w: 0, l: 0, d: 0 });
  const [streak, setStreak] = useState(0);
  const [shaking, setShaking] = useState(false);
  const [roundId, setRoundId] = useState(0);

  function play(pick: RpsChoice) {
    const cpuPick = choices[Math.floor(Math.random() * 3)];
    const outcome = beats(pick, cpuPick) ? "win" : beats(cpuPick, pick) ? "lose" : "draw";
    setPlayer(pick);
    setCpu(cpuPick);
    setResult(outcome);
    setRoundId(id => id + 1);
    setScore(s => ({ ...s, [outcome === "win" ? "w" : outcome === "lose" ? "l" : "d"]: s[outcome === "win" ? "w" : outcome === "lose" ? "l" : "d"] + 1 }));
    setStreak(s => outcome === "win" ? s + 1 : 0);
    setShaking(true);
    setTimeout(() => setShaking(false), 400);
  }

  function reset() { setPlayer(null); setCpu(null); setResult(null); }

  const resultText = result === "win" ? "You win! 🎉" : result === "lose" ? "CPU wins 🤖" : "Draw! 🤝";
  const resultColor = result === "win" ? "text-green-500" : result === "lose" ? "text-red-400" : "text-amber-400";

  return (
    <Card className="col-span-2" delay={0.1}>
      <div className="p-4 flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-display font-bold text-sm">Rock Paper Scissors</p>
            <p className="font-code text-[10px] text-[var(--color-text)]/40 dark:text-[var(--color-dark-text)]/40">vs the machine</p>
          </div>
          <div className="flex gap-3 font-code text-[10px]">
            <span className="text-green-500">{score.w}W</span>
            <span className="text-red-400">{score.l}L</span>
            <span className="text-amber-400">{score.d}D</span>
            {streak >= 2 && <span className="text-orange-400">🔥×{streak}</span>}
          </div>
        </div>

        {/* Battle arena */}
        <div className="flex items-center justify-between px-2">
          {/* Player */}
          <div className="flex flex-col items-center gap-1">
            <AnimatePresence mode="wait">
              <motion.span
                key={`player-${roundId}`}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="text-4xl select-none"
              >
                {player ?? "❓"}
              </motion.span>
            </AnimatePresence>
            <span className="font-code text-[10px] text-[var(--color-text)]/40">You</span>
          </div>

          {/* Result */}
          <div className="flex flex-col items-center">
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  key={`result-${roundId}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-1"
                >
                  <span className={`font-display font-bold text-sm ${resultColor}`}>{resultText}</span>
                  <button
                    onClick={reset}
                    className="font-code text-[10px] text-[var(--color-text)]/30 hover:text-[var(--color-accent)] transition-colors underline underline-offset-2"
                  >
                    again?
                  </button>
                </motion.div>
              ) : (
                <motion.span
                  key="vs"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-display font-bold text-lg text-[var(--color-text)]/20 dark:text-[var(--color-dark-text)]/20"
                >
                  VS
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* CPU */}
          <div className="flex flex-col items-center gap-1">
            <AnimatePresence mode="wait">
              <motion.span
                key={`cpu-${roundId}`}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={shaking
                  ? { x: [0, -5, 5, -5, 0], scale: 1, opacity: 1 }
                  : { x: 0, scale: 1, opacity: 1 }
                }
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{
                  x: { type: "tween", duration: 0.35, ease: "easeInOut" },
                  scale: { type: "spring", stiffness: 400, damping: 20 },
                  opacity: { type: "spring", stiffness: 400, damping: 20 },
                }}
                className="text-4xl select-none"
              >
                {cpu ?? "🤖"}
              </motion.span>
            </AnimatePresence>
            <span className="font-code text-[10px] text-[var(--color-text)]/40">CPU</span>
          </div>
        </div>

        {/* Choices */}
        <div className="flex gap-2 justify-center pt-1">
          {choices.map((c) => (
            <motion.button
              key={c}
              whileTap={{ scale: 0.85 }}
              whileHover={{ scale: 1.1, y: -2 }}
              onClick={() => play(c)}
              title={choiceNames[c]}
              className="flex-1 py-2.5 rounded-xl bg-[var(--color-bg)] dark:bg-[#2C241B] border border-[var(--color-gold)]/30 hover:border-[var(--color-accent)]/60 hover:bg-[var(--color-accent)]/5 transition-all text-2xl"
            >
              {c}
            </motion.button>
          ))}
        </div>
      </div>
    </Card>
  );
}

/* ─── Data ─── */

const socialIcons = [
  { label: "GitHub", url: config.socials.github, icon: Github },
  { label: "Twitter", url: config.socials.twitter, icon: Twitter },
  { label: "LinkedIn", url: config.socials.linkedin, icon: Linkedin },
  { label: "Email", url: config.socials.email, icon: Mail },
  { label: "YouTube", url: config.socials.youtube, icon: Youtube },
];

/* ─── Shared card wrapper ─── */
function Card({
  children,
  className = "",
  delay = 0,
  href,
  external = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  href?: string;
  external?: boolean;
}) {
  const base =
    "rounded-2xl overflow-hidden bg-[var(--color-cream)] dark:bg-[#1E1710] border border-[var(--color-gold)]/20 shadow-sm hover:shadow-lg hover:border-[var(--color-gold)]/50 transition-all duration-300 group";

  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className={`${base} ${className}`}
    >
      {children}
    </motion.div>
  );

  if (href && external)
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  if (href)
    return <Link to={href}>{inner}</Link>;
  return inner;
}

/* ─── Page ─── */
export function Links() {
  return (
    <div className="min-h-screen relative selection:bg-[var(--color-gold)] selection:text-[var(--color-text)] bg-[var(--color-bg)] dark:bg-[var(--color-dark-bg)]">
      <ThemeToggle />

      {/* Back to home */}
      <Link
        to="/"
        className="fixed top-4 left-4 z-50 flex items-center gap-1.5 font-code text-xs text-[var(--color-text)]/40 dark:text-[var(--color-dark-text)]/40 hover:text-[var(--color-accent)] transition-colors"
      >
        <ArrowLeft className="w-3 h-3" />
        Home
      </Link>

      <div className="max-w-sm mx-auto px-4 py-10 pb-16 flex flex-col items-center gap-6">

        {/* ── Avatar + Name + tagline ── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-3 pt-4"
        >
          {/* Avatar */}
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-[var(--color-gold)]/50 ring-offset-2 ring-offset-[var(--color-bg)] dark:ring-offset-[var(--color-dark-bg)]">
              <img
                src={config.heroImage}
                alt={config.name}
                width={80}
                height={80}
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Online dot */}
            <span className="absolute bottom-0.5 right-0.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-[var(--color-bg)] dark:border-[var(--color-dark-bg)]" />
            </span>
          </div>

          {/* Name */}
          <h1 className="font-display text-xl font-bold tracking-tight">
            {config.name.toLowerCase()}
          </h1>

          {/* Bio pill */}
          <p className="font-code text-xs text-center text-[var(--color-text)]/60 dark:text-[var(--color-dark-text)]/60 bg-[var(--color-cream)] dark:bg-[#1E1710] border border-[var(--color-gold)]/30 px-4 py-2 rounded-full">
            ★ {config.role.toLowerCase()} ★
          </p>
        </motion.div>

        {/* ── Social icons row ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex items-center gap-5"
        >
          {socialIcons.map(({ label, url, icon: Icon }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-[var(--color-text)]/40 dark:text-[var(--color-dark-text)]/40 hover:text-[var(--color-accent)] transition-colors duration-200"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </motion.div>

        {/* ── Bento grid ── */}
        <div className="w-full grid grid-cols-2 gap-3">

          {/* Mini Game */}
          <RpsGame />

          {/* Projects card */}
          <Card href="/projects" className="aspect-square" delay={0.2}>
            <div className="h-full flex flex-col justify-between p-4">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-[var(--color-accent)]" />
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[var(--color-text)]/20 group-hover:text-[var(--color-accent)] transition-colors" />
              </div>
              <div>
                <p className="font-display font-bold text-sm mb-0.5">Projects</p>
                <p className="font-code text-[10px] text-[var(--color-text)]/40 dark:text-[var(--color-dark-text)]/40 leading-relaxed">
                  Things I've built
                </p>
              </div>
            </div>
          </Card>

          {/* Photography card */}
          <Card href="/photography" className="aspect-square" delay={0.25}>
            <div className="h-full flex flex-col justify-between p-4">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-[var(--color-gold)]/20 flex items-center justify-center">
                  <Camera className="w-4 h-4 text-[var(--color-gold)]" />
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[var(--color-text)]/20 group-hover:text-[var(--color-accent)] transition-colors" />
              </div>
              <div>
                <p className="font-display font-bold text-sm mb-0.5">Photography</p>
                <p className="font-code text-[10px] text-[var(--color-text)]/40 dark:text-[var(--color-dark-text)]/40 leading-relaxed">
                  Visual diary
                </p>
              </div>
            </div>
          </Card>

          {/* Currently building — spans 2 cols */}
          <Card className="col-span-2" delay={0.3}>
            <div className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[var(--color-accent)]/10 flex-shrink-0 flex items-center justify-center">
                <Hammer className="w-4 h-4 text-[var(--color-accent)]" />
              </div>
              <div className="min-w-0">
                <p className="font-code text-[10px] text-[var(--color-text)]/40 dark:text-[var(--color-dark-text)]/40 uppercase tracking-widest mb-0.5">
                  Currently Building
                </p>
                <p className="font-display font-semibold text-sm truncate">
                  {config.currently.building.name}
                </p>
              </div>
              <span className="flex-shrink-0 ml-auto flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-blue-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
              </span>
            </div>
          </Card>

          {/* Journal card */}
          <Card href="/journal" className="aspect-square" delay={0.35}>
            <div className="h-full flex flex-col justify-between p-4">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-[var(--color-secondary)]/20 flex items-center justify-center">
                  <PenTool className="w-4 h-4 text-[var(--color-secondary)]" />
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[var(--color-text)]/20 group-hover:text-[var(--color-accent)] transition-colors" />
              </div>
              <div>
                <p className="font-display font-bold text-sm mb-0.5">Journal</p>
                <p className="font-code text-[10px] text-[var(--color-text)]/40 dark:text-[var(--color-dark-text)]/40 leading-relaxed">
                  Notes & essays
                </p>
              </div>
            </div>
          </Card>

          {/* Reading card */}
          <Card className="aspect-square" delay={0.4}>
            <div className="h-full flex flex-col justify-between p-4">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-amber-500" />
              </div>
              <div>
                <p className="font-code text-[10px] text-[var(--color-text)]/40 dark:text-[var(--color-dark-text)]/40 uppercase tracking-widest mb-1">
                  Reading
                </p>
                <p className="font-display font-semibold text-xs leading-snug line-clamp-2">
                  {config.currently.reading.title}
                </p>
                <p className="font-code text-[10px] text-[var(--color-text)]/30 dark:text-[var(--color-dark-text)]/30 mt-0.5">
                  — {config.currently.reading.author}
                </p>
              </div>
            </div>
          </Card>

          {/* Quote card — spans 2 cols */}
          <Card className="col-span-2" delay={0.45}>
            <div className="p-5">
              <p className="font-handwriting text-lg leading-relaxed text-[var(--color-text)]/70 dark:text-[var(--color-dark-text)]/70 text-center">
                "{config.bio.split(".")[1]?.trim()}"
              </p>
            </div>
          </Card>

        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="font-code text-[10px] text-[var(--color-text)]/25 dark:text-[var(--color-dark-text)]/25"
        >
          © {new Date().getFullYear()} {config.name}
        </motion.p>
      </div>
    </div>
  );
}

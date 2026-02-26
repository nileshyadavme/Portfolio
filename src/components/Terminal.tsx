import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { config } from "../data/config";

const PROMPT = `${config.name.toLowerCase()}@portfolio:~$ `;

const COMMANDS: Record<string, (args: string[], navigate: ReturnType<typeof useNavigate>) => string | null> = {
    help: () => `
Available commands:
  whoami       — About me
  ls           — List pages
  open <page>  — Navigate to a page
  contact      — Get contact info
  skills       — List my tech stack
  clear        — Clear terminal
  exit         — Close terminal
  `.trim(),

    whoami: () =>
        `${config.name} — ${config.role}\n${config.bio}`,

    ls: () =>
        `home/  about/  projects/  journal/  photography/  books/  contact/  links/`,

    open: (args, navigate) => {
        const page = args[0]?.replace(/\//g, "");
        const routes: Record<string, string> = {
            home: "/", about: "/about", projects: "/projects",
            journal: "/journal", photography: "/photography",
            books: "/books", contact: "/contact", links: "/links",
        };
        if (!page) return "Usage: open <page>  (e.g. open projects)";
        if (!routes[page]) return `Unknown page: "${page}". Try 'ls' to see available pages.`;
        navigate(routes[page]);
        return `Navigating to /${page}...`;
    },

    contact: () =>
        `Email:    ${config.socials.email.replace("mailto:", "")}\nGitHub:   ${config.socials.github}\nLinkedIn: ${config.socials.linkedin}`,

    skills: () =>
        `Languages:      Python, TypeScript, JavaScript, C++\nML/AI:          PyTorch, TensorFlow, scikit-learn, HuggingFace\nFrontend:       React, Next.js, Vite, Tailwind\nInfrastructure: Docker, Linux, Vercel, FastAPI`,

    clear: () => null, // handled specially
    exit: () => null,  // handled specially
};

interface Line {
    type: "input" | "output" | "error";
    text: string;
}

export function Terminal() {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [lines, setLines] = useState<Line[]>([
        { type: "output", text: `Welcome to ${config.name}'s terminal. Type 'help' to see commands.` },
    ]);
    const [history, setHistory] = useState<string[]>([]);
    const [histIdx, setHistIdx] = useState(-1);

    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    // Toggle on backtick
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "`" && !e.ctrlKey && !e.metaKey && !e.altKey) {
                // Don't trigger if typing in an input/textarea
                if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) return;
                e.preventDefault();
                setOpen(o => !o);
            }
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    // Focus input when opened
    useEffect(() => {
        if (open) setTimeout(() => inputRef.current?.focus(), 50);
    }, [open]);

    // Scroll to bottom on new output
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [lines]);

    function submit() {
        const cmd = input.trim();
        if (!cmd) return;

        const newLines: Line[] = [...lines, { type: "input", text: cmd }];
        const [name, ...args] = cmd.toLowerCase().split(/\s+/);

        if (name === "clear") {
            setLines([]);
            setInput("");
            setHistory(h => [cmd, ...h]);
            setHistIdx(-1);
            return;
        }
        if (name === "exit") {
            setOpen(false);
            setInput("");
            return;
        }

        const handler = COMMANDS[name];
        if (handler) {
            const result = handler(args, navigate);
            if (result !== null) newLines.push({ type: "output", text: result });
        } else {
            newLines.push({ type: "error", text: `command not found: ${name}. Type 'help' for available commands.` });
        }

        setLines(newLines);
        setHistory(h => [cmd, ...h]);
        setHistIdx(-1);
        setInput("");
    }

    function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") { submit(); return; }
        if (e.key === "ArrowUp") {
            e.preventDefault();
            const next = Math.min(histIdx + 1, history.length - 1);
            setHistIdx(next);
            setInput(history[next] ?? "");
        }
        if (e.key === "ArrowDown") {
            e.preventDefault();
            const next = Math.max(histIdx - 1, -1);
            setHistIdx(next);
            setInput(next === -1 ? "" : history[next]);
        }
    }

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpen(false)}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[998]"
                    />

                    {/* Terminal window */}
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.96 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="fixed bottom-0 left-0 right-0 md:bottom-8 md:left-1/2 md:-translate-x-1/2 md:w-[680px] z-[999] bg-[#0d1117] border border-white/10 rounded-t-2xl md:rounded-2xl shadow-2xl overflow-hidden font-code"
                    >
                        {/* Title bar */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#161b22]">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                            </div>
                            <span className="text-white/40 text-xs">terminal — press ` to close</span>
                            <button onClick={() => setOpen(false)} className="text-white/30 hover:text-white/60 transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Output area */}
                        <div
                            className="h-72 overflow-y-auto p-4 space-y-1 text-sm"
                            onClick={() => inputRef.current?.focus()}
                        >
                            {lines.map((line, i) => (
                                <div key={i}>
                                    {line.type === "input" && (
                                        <div className="text-green-400">
                                            <span className="text-purple-400">{PROMPT}</span>{line.text}
                                        </div>
                                    )}
                                    {line.type === "output" && (
                                        <pre className="text-white/70 whitespace-pre-wrap leading-relaxed">{line.text}</pre>
                                    )}
                                    {line.type === "error" && (
                                        <pre className="text-red-400 whitespace-pre-wrap">{line.text}</pre>
                                    )}
                                </div>
                            ))}
                            <div ref={bottomRef} />
                        </div>

                        {/* Input row */}
                        <div className="flex items-center gap-2 px-4 py-3 border-t border-white/10 bg-[#161b22]">
                            <span className="text-purple-400 text-sm flex-shrink-0">{PROMPT}</span>
                            <input
                                ref={inputRef}
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={onKeyDown}
                                className="flex-1 bg-transparent text-green-400 text-sm outline-none placeholder:text-white/20 caret-green-400"
                                placeholder="type a command..."
                                autoComplete="off"
                                spellCheck={false}
                            />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

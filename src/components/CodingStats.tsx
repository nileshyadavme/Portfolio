import { motion } from "motion/react";
import { Github, Code2, Terminal, ChevronRight, Activity } from "lucide-react";
import { codingStats } from "../data/coding";

export function CodingStats() {
    // Generate color classes based on the activity value
    const getHeatmapColor = (val: number, isFuture: boolean) => {
        if (isFuture) return "bg-transparent";
        if (val === 0) return "bg-[var(--color-gold)]/10 dark:bg-white/5";
        if (val >= 10) return "bg-[var(--color-accent)] opacity-100";
        if (val >= 5) return "bg-[var(--color-accent)] opacity-70";
        return "bg-[var(--color-accent)] opacity-40";
    };

    // Generates a grid of dates ending on the nearest Saturday to maintain Sunday=Row0 layout
    const generateHeatmapArray = (data: Record<string, number>, cols: number) => {
        const totalDays = cols * 7;
        const result = [];
        const today = new Date();
        const currentDayOfWeek = today.getDay(); // 0 is Sunday, 6 is Saturday

        // End date is the Saturday of the current week
        const endDate = new Date(today);
        endDate.setDate(today.getDate() + (6 - currentDayOfWeek));

        // Start date is totalDays - 1 before the end date
        const startDate = new Date(endDate);
        startDate.setDate(endDate.getDate() - totalDays + 1);

        for (let i = 0; i < totalDays; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);

            // Format YYYY-MM-DD using local time explicitly
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const dateStr = `${year}-${month}-${day}`;

            // Ignore times, just compare the date strings
            const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
            const isFuture = dateStr > todayStr;
            const count = (!isFuture && data[dateStr]) ? data[dateStr] : 0;

            result.push({
                date: dateStr,
                count,
                isFuture,
                colorClass: getHeatmapColor(count, isFuture)
            });
        }
        return result;
    };

    // const githubHeatmap = generateHeatmapArray(codingStats.github.heatmapData, 22);
    // const leetcodeHeatmap = generateHeatmapArray(codingStats.leetcode.heatmapData, 22);

    return (
        <section className="font-code">
            {/* Section Header */}
            <div className="flex items-end justify-between mb-8 border-b border-[var(--color-gold)]/20 pb-4">
                <div className="flex items-center gap-3">
                    <Activity className="w-6 h-6 text-[var(--color-accent)]" />
                    <h2 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-wider">
                        Coding_Stats
                    </h2>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-[var(--color-accent)]">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-accent)]" />
                    </span>
                    LIVE
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">

                {/* GitHub Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-[var(--color-cream)] dark:bg-[#1a1f1c] border border-[var(--color-gold)]/20 shadow-lg flex flex-col p-1.5"
                >
                    {/* Card Title */}
                    <div className="flex items-center gap-2 bg-[var(--color-text)]/5 dark:bg-white/5 px-4 py-2 border-b border-[var(--color-gold)]/10">
                        <Github className="w-4 h-4" />
                        <span className="font-bold text-sm tracking-widest">GITHUB</span>
                    </div>

                    <div className="p-4 md:p-6 flex flex-col gap-6 flex-1">
                        {/* Header */}
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[var(--color-text)]/10 dark:bg-white/10 flex flex-shrink-0 items-center justify-center">
                                    <Github className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg leading-none">{codingStats.github.username}</h3>
                                    <p className="text-[10px] text-[var(--color-accent)] font-bold tracking-widest uppercase mt-1">{codingStats.github.title}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="block text-xl font-bold text-[var(--color-accent)] hover:scale-105 transition-transform">{codingStats.github.stats.commits}</span>
                                <span className="text-[10px] text-[var(--color-text)]/50 tracking-widest uppercase">Commits</span>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { label: "Repositories", value: codingStats.github.stats.repositories },
                                { label: "Followers", value: codingStats.github.stats.followers },
                                { label: "Commits", value: codingStats.github.stats.commits },
                                { label: "Joined", value: codingStats.github.stats.joined }
                            ].map((stat, i) => (
                                <div key={i} className="border border-[var(--color-gold)]/20 bg-[var(--color-text)]/5 dark:bg-white/5 p-3 flex flex-col justify-center">
                                    <span className="text-[10px] text-[var(--color-text)]/60 dark:text-[var(--color-dark-text)]/60 tracking-widest uppercase mb-1">{stat.label}</span>
                                    <span className="text-xl md:text-2xl font-bold">{stat.value}</span>
                                </div>
                            ))}
                        </div>

                        {/* Heatmap */}
                        {/* <div className="border border-[var(--color-gold)]/20 bg-[var(--color-text)]/5 dark:bg-white/5 p-4 mt-auto">
                            <div className="flex justify-between text-[10px] text-[var(--color-text)]/50 uppercase tracking-widest mb-3">
                                <span>Matrix_Output</span>
                            </div>
                            <div className="flex gap-1.5">
                                <div className="grid grid-rows-7 gap-1 sm:gap-1.5 text-[8px] text-[var(--color-text)]/40 uppercase pr-1 text-right items-center">
                                    <span className="invisible">Sun</span>
                                    <span>Mon</span>
                                    <span className="invisible">Tue</span>
                                    <span>Wed</span>
                                    <span className="invisible">Thu</span>
                                    <span>Fri</span>
                                    <span className="invisible">Sat</span>
                                </div>
                                <div className="grid grid-rows-7 grid-flow-col gap-1 sm:gap-1.5 flex-1 overflow-hidden">
                                    {githubHeatmap.map((cell, i) => (
                                        <div
                                            key={i}
                                            title={`${cell.date}: ${cell.count} commits`}
                                            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-[1px] transition-colors hover:ring-1 hover:ring-[var(--color-accent)] ${cell.colorClass}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div> */}

                        {/* Terminal Footer */}
                        <div className="flex items-center mt-auto justify-between pt-2">
                            <div className="flex items-center gap-2 text-xs text-[var(--color-text)]/60 font-code">
                                <span className="text-[var(--color-accent)]">$</span>
                                <span className="typing-effect">gh --stats _</span>
                            </div>
                            <a href={codingStats.github.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 border border-[var(--color-gold)]/30 hover:bg-[var(--color-accent)] hover:text-[var(--color-cream)] transition-colors text-[10px] uppercase tracking-widest font-bold">
                                View_GH <ChevronRight className="w-3 h-3" />
                            </a>
                        </div>
                    </div>
                </motion.div>

                {/* LeetCode Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="bg-[var(--color-cream)] dark:bg-[#1a1f1c] border border-[var(--color-gold)]/20 shadow-lg flex flex-col p-1.5"
                >
                    {/* Card Title */}
                    <div className="flex items-center gap-2 bg-[var(--color-text)]/5 dark:bg-white/5 px-4 py-2 border-b border-[var(--color-gold)]/10">
                        <Code2 className="w-4 h-4" />
                        <span className="font-bold text-sm tracking-widest">LEETCODE</span>
                    </div>

                    <div className="p-4 md:p-6 flex flex-col gap-6 flex-1">
                        {/* Header */}
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[var(--color-text)]/10 dark:bg-white/10 flex flex-shrink-0 items-center justify-center">
                                    <Terminal className="w-5 h-5 text-[var(--color-accent)]" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg leading-none">{codingStats.leetcode.username}</h3>
                                    <p className="text-[10px] text-[var(--color-accent)] font-bold tracking-widest uppercase mt-1">{codingStats.leetcode.title}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="block text-md font-bold text-[var(--color-accent)] hover:scale-105 transition-transform">{codingStats.leetcode.ranking}</span>
                                <span className="text-[10px] text-[var(--color-text)]/50 tracking-widest uppercase">Ranking</span>
                            </div>
                        </div>

                        {/* Inner Stats Card */}
                        <div className="border border-[var(--color-gold)]/30 bg-[var(--color-text)]/5 dark:bg-white/5 p-4 relative overflow-hidden">
                            <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-2">
                                    <Code2 className="w-5 h-5" />
                                    <span className="font-bold text-lg">{codingStats.leetcode.username}</span>
                                </div>
                                <span className="text-sm font-code opacity-70">{codingStats.leetcode.ranking}</span>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-8 mb-4">
                                {/* Progress Circle Mock */}
                                <div className="relative w-24 h-24 rounded-full border-4 border-[var(--color-gold)]/10 flex items-center justify-center flex-shrink-0">
                                    <div className="absolute inset-0 rounded-full border-4 border-l-[var(--color-accent)] border-t-[var(--color-accent)] border-r-transparent border-b-transparent -rotate-45" />
                                    <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[var(--color-accent)]" />
                                    <span className="text-3xl font-bold font-display">
                                        {codingStats.leetcode.solved.easy.count + codingStats.leetcode.solved.medium.count + codingStats.leetcode.solved.hard.count}
                                    </span>
                                </div>

                                {/* Bars */}
                                <div className="flex-1 w-full flex flex-col gap-3 font-code text-xs">
                                    <div className="flex justify-between items-end mb-1">
                                        <span className="text-[var(--color-text)]/70 dark:text-[var(--color-dark-text)]/70">Easy</span>
                                        <span className="font-bold">{codingStats.leetcode.solved.easy.count} / {codingStats.leetcode.solved.easy.total}</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-[var(--color-gold)]/20 rounded-full overflow-hidden mb-2">
                                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(codingStats.leetcode.solved.easy.count / codingStats.leetcode.solved.easy.total) * 100}%` }} />
                                    </div>

                                    <div className="flex justify-between items-end mb-1">
                                        <span className="text-[var(--color-text)]/70 dark:text-[var(--color-dark-text)]/70">Medium</span>
                                        <span className="font-bold">{codingStats.leetcode.solved.medium.count} / {codingStats.leetcode.solved.medium.total}</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-[var(--color-gold)]/20 rounded-full overflow-hidden mb-2">
                                        <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(codingStats.leetcode.solved.medium.count / codingStats.leetcode.solved.medium.total) * 100}%` }} />
                                    </div>

                                    <div className="flex justify-between items-end mb-1">
                                        <span className="text-[var(--color-text)]/70 dark:text-[var(--color-dark-text)]/70">Hard</span>
                                        <span className="font-bold">{codingStats.leetcode.solved.hard.count} / {codingStats.leetcode.solved.hard.total}</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-[var(--color-gold)]/20 rounded-full overflow-hidden">
                                        <div className="h-full bg-red-500 rounded-full" style={{ width: `${(codingStats.leetcode.solved.hard.count / codingStats.leetcode.solved.hard.total) * 100}%` }} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Heatmap
                        <div className="mt-auto">
                            <div className="text-[10px] text-[var(--color-text)]/50 uppercase tracking-widest mb-3">
                                Heatmap (Last 154 Days)
                            </div>
                            <div className="flex gap-1.5 border border-[var(--color-gold)]/20 bg-[var(--color-text)]/5 dark:bg-white/5 p-3 pb-2 pt-4">
                                <div className="grid grid-rows-7 gap-1 sm:gap-1.5 text-[8px] text-[var(--color-text)]/40 uppercase pr-1 text-right items-center">
                                    <span className="invisible">Sun</span>
                                    <span>Mon</span>
                                    <span className="invisible">Tue</span>
                                    <span>Wed</span>
                                    <span className="invisible">Thu</span>
                                    <span>Fri</span>
                                    <span className="invisible">Sat</span>
                                </div>
                                <div className="grid grid-rows-7 grid-flow-col gap-1 sm:gap-1.5 flex-1 overflow-hidden">
                                    {leetcodeHeatmap.map((cell, i) => (
                                        <div
                                            key={i}
                                            title={`${cell.date}: ${cell.count} submissions`}
                                            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-[1px] transition-colors hover:ring-1 hover:ring-[var(--color-accent)] ${cell.colorClass}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div> */}

                        {/* Terminal Footer */}
                        <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-2 text-xs text-[var(--color-text)]/60 font-code">
                                <span className="text-[var(--color-accent)]">$</span>
                                <span className="typing-effect">leetcode --u _</span>
                            </div>
                            <a href={codingStats.leetcode.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 border border-[var(--color-gold)]/30 hover:bg-[var(--color-accent)] hover:text-[var(--color-cream)] transition-colors text-[10px] uppercase tracking-widest font-bold">
                                View_LC <ChevronRight className="w-3 h-3" />
                            </a>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}

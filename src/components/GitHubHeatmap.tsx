import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface ContributionDay {
    date: string;
    count: number;
    level: 0 | 1 | 2 | 3 | 4;
}

interface ApiResponse {
    total: Record<string, number>;
    contributions: ContributionDay[];
}

const CELL = "w-3 h-3 rounded-sm flex-shrink-0";
const LEVEL_COLORS = [
    "bg-[var(--color-gold)]/10 dark:bg-white/5",
    "bg-[var(--color-accent)]/20",
    "bg-[var(--color-accent)]/40",
    "bg-[var(--color-accent)]/70",
    "bg-[var(--color-accent)]",
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["", "Mon", "", "Wed", "", "Fri", ""];

function buildWeeks(days: ContributionDay[]): ContributionDay[][] {
    const weeks: ContributionDay[][] = [];
    let week: ContributionDay[] = [];
    for (const day of days) {
        week.push(day);
        if (week.length === 7) { weeks.push(week); week = []; }
    }
    if (week.length) weeks.push(week);
    return weeks;
}

export function GitHubHeatmap({ username }: { username: string }) {
    const [weeks, setWeeks] = useState<ContributionDay[][]>([]);
    const [total, setTotal] = useState<number | null>(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://github-contributions-api.jogruber.de/v4/nileshyadavme?y=last`)
            .then(r => r.json())
            .then((data: ApiResponse) => {
                setWeeks(buildWeeks(data.contributions));
                const year = new Date().getFullYear();
                setTotal(data.total[year] ?? data.total["lastYear"] ?? Object.values(data.total).at(-1) ?? 0);
                setLoading(false);
            })
            .catch(() => { setError(true); setLoading(false); });
    }, [username]);

    if (error) return null;

    // derive month labels from week start dates
    const monthLabels: { label: string; col: number }[] = [];
    weeks.forEach((week, i) => {
        const d = new Date(week[0].date);
        if (i === 0 || d.getDate() <= 7) {
            const label = MONTHS[d.getMonth()];
            if (!monthLabels.at(-1) || monthLabels.at(-1)!.label !== label) {
                monthLabels.push({ label, col: i });
            }
        }
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-3"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="font-display text-2xl font-bold">Git Activity</h2>
                    {total !== null && !loading && (
                        <p className="font-code text-sm text-[var(--color-text)]/50 dark:text-[var(--color-dark-text)]/50">
                            {total.toLocaleString()} contributions in the last year
                        </p>
                    )}
                </div>
                <a
                    href={`https://github.com/${username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-code text-xs text-[var(--color-text)]/40 hover:text-[var(--color-accent)] transition-colors"
                >
                    @{username} →
                </a>
            </div>

            <div className="overflow-x-auto pb-1">
                {loading ? (
                    <div className="grid grid-flow-col gap-1 animate-pulse" style={{ gridTemplateRows: "repeat(7, 1fr)" }}>
                        {Array.from({ length: 52 * 7 }).map((_, i) => (
                            <div key={i} className={`${CELL} bg-[var(--color-gold)]/10`} />
                        ))}
                    </div>
                ) : (
                    <div className="flex gap-1">
                        {/* Day labels */}
                        <div className="flex flex-col gap-1 mr-1 pt-5">
                            {DAYS.map((d, i) => (
                                <div key={i} className="h-3 flex items-center">
                                    <span className="font-code text-[9px] text-[var(--color-text)]/30 dark:text-[var(--color-dark-text)]/30 w-6 text-right leading-none">
                                        {d}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col gap-1">
                            {/* Month labels */}
                            <div className="flex gap-1 mb-1 h-4">
                                {weeks.map((_, i) => {
                                    const ml = monthLabels.find(m => m.col === i);
                                    return (
                                        <div key={i} className="w-3 flex-shrink-0">
                                            {ml && (
                                                <span className="font-code text-[9px] text-[var(--color-text)]/40 dark:text-[var(--color-dark-text)]/40 leading-none">
                                                    {ml.label}
                                                </span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Grid */}
                            <div className="flex gap-1">
                                {weeks.map((week, wi) => (
                                    <div key={wi} className="flex flex-col gap-1">
                                        {week.map((day, di) => (
                                            <div
                                                key={di}
                                                title={`${day.date}: ${day.count} contributions`}
                                                className={`${CELL} ${LEVEL_COLORS[day.level]} transition-opacity hover:opacity-70 cursor-default`}
                                            />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-1.5 justify-end">
                <span className="font-code text-[10px] text-[var(--color-text)]/30 dark:text-[var(--color-dark-text)]/30">Less</span>
                {LEVEL_COLORS.map((c, i) => (
                    <div key={i} className={`w-3 h-3 rounded-sm ${c}`} />
                ))}
                <span className="font-code text-[10px] text-[var(--color-text)]/30 dark:text-[var(--color-dark-text)]/30">More</span>
            </div>
        </motion.div>
    );
}

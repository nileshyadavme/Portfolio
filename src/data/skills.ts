export type SkillLevel = 1 | 2 | 3 | 4 | 5;

export interface Skill {
    name: string;
    level: SkillLevel; // 1=beginner → 5=expert
}

export interface SkillCategory {
    label: string;
    color: string; // Tailwind bg color class for the dot
    skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
    {
        label: "Languages",
        color: "bg-[var(--color-accent)]",
        skills: [
            { name: "Python", level: 5 },
            { name: "TypeScript", level: 4 },
            { name: "JavaScript", level: 4 },
            { name: "C++", level: 3 },
            { name: "SQL", level: 3 },
            { name: "Bash", level: 3 },
        ],
    },
    {
        label: "ML / AI",
        color: "bg-amber-500",
        skills: [
            { name: "PyTorch", level: 5 },
            { name: "TensorFlow", level: 4 },
            { name: "scikit-learn", level: 5 },
            { name: "Hugging Face", level: 4 },
            { name: "LangChain", level: 3 },
            { name: "OpenCV", level: 4 },
        ],
    },
    {
        label: "Frontend",
        color: "bg-sky-500",
        skills: [
            { name: "React", level: 4 },
            { name: "Vite", level: 4 },
            { name: "Next.js", level: 3 },
            { name: "Tailwind CSS", level: 4 },
            { name: "Framer Motion", level: 3 },
        ],
    },
    {
        label: "Infrastructure",
        color: "bg-green-500",
        skills: [
            { name: "Docker", level: 4 },
            { name: "Linux", level: 4 },
            { name: "Vercel", level: 4 },
            { name: "Git", level: 5 },
            { name: "REST APIs", level: 4 },
            { name: "FastAPI", level: 4 },
        ],
    },
];

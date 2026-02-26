import { useState } from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "../components/ThemeToggle";
import { Settings, PenTool, Image, Briefcase, ChevronLeft } from "lucide-react";
import { ConfigEditor } from "../components/admin/ConfigEditor";
import { ProjectsEditor } from "../components/admin/ProjectsEditor";
import { JournalEditor } from "../components/admin/JournalEditor";
import { PhotosEditor } from "../components/admin/PhotosEditor";

export function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("config");

    const tabs = [
        { id: "config", label: "Settings", icon: Settings },
        { id: "projects", label: "Projects", icon: Briefcase },
        { id: "journal", label: "Journal", icon: PenTool },
        { id: "photos", label: "Photos", icon: Image },
    ];

    return (
        <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] dark:bg-[var(--color-dark-bg)] dark:text-[var(--color-dark-text)] flex">
            <ThemeToggle />

            {/* Sidebar Navigation */}
            <aside className="w-64 border-r border-[var(--color-gold)]/20 shadow-sm flex flex-col pt-8">
                <div className="px-6 mb-8">
                    <Link to="/" className="inline-flex items-center text-sm font-code text-[var(--color-text)]/50 dark:text-[var(--color-dark-text)]/50 hover:text-[var(--color-accent)] transition-colors mb-6">
                        <ChevronLeft className="w-4 h-4 mr-1" /> Back to Site
                    </Link>
                    <h1 className="font-display text-2xl font-bold">Admin Panel</h1>
                </div>

                <nav className="flex-1 flex flex-col gap-1 px-3">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all font-body text-sm ${isActive
                                    ? "bg-[var(--color-accent)] text-white shadow-md dark:text-[#2A1F18]"
                                    : "hover:bg-[var(--color-gold)]/10 text-[var(--color-text)]/80 dark:text-[var(--color-dark-text)]/80"
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        )
                    })}
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto">
                <div className="max-w-5xl mx-auto p-12">
                    {activeTab === "config" && <ConfigEditor />}
                    {activeTab === "projects" && <ProjectsEditor />}
                    {activeTab === "journal" && <JournalEditor />}
                    {activeTab === "photos" && <PhotosEditor />}
                </div>
            </main>
        </div>
    );
}

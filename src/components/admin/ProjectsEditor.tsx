import { useState, useEffect } from "react";
import { Save, Plus, Trash2, Loader2, ArrowLeft } from "lucide-react";

export function ProjectsEditor() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<any>(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await fetch("/api/projects");
            const data = await res.json();
            setProjects(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (proj: any) => {
        setFormData({ ...proj, technologies: proj.technologies.join(", ") });
        setEditingId(proj.id);
    };

    const handleCreate = () => {
        const newId = `proj-${Date.now()}`;
        setFormData({
            id: newId,
            title: "New Project",
            shortDescription: "",
            description: "",
            image: "https://picsum.photos/seed/placeholder/800/600",
            category: "Software",
            technologies: "",
            date: new Date().getFullYear().toString(),
            demoUrl: "",
            githubUrl: "",
            featured: false,
        });
        setEditingId(newId);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const payload = {
                ...formData,
                technologies: formData.technologies.split(",").map((t: string) => t.trim()).filter(Boolean),
            };

            await fetch(`/api/projects/${editingId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            await fetchProjects();
            setEditingId(null);
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this project?")) return;
        try {
            await fetch(`/api/projects/${id}`, { method: "DELETE" });
            await fetchProjects();
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) {
        return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin" /></div>;
    }

    if (editingId) {
        return (
            <div className="space-y-8">
                <button onClick={() => setEditingId(null)} className="flex items-center text-sm font-code text-[var(--color-text)]/60 hover:text-[var(--color-accent)]">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
                </button>

                <div className="bg-[var(--color-bg)] dark:bg-[#2A1F18] border border-[var(--color-gold)]/20 rounded-xl p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--color-gold)]/10">
                        <h3 className="text-2xl font-bold font-display">Edit Project</h3>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="px-4 py-2 bg-[var(--color-accent)] text-white dark:text-[#2A1F18] rounded-md font-code text-sm flex items-center gap-2 hover:opacity-90 disabled:opacity-50"
                        >
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Save Project
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block text-sm font-code mb-1">Title</label>
                            <input type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2 border border-[var(--color-gold)]/20 rounded-md bg-transparent focus:ring-2 focus:ring-[var(--color-accent)] outline-none" />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-code mb-1">Category</label>
                                <input type="text" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-2 border border-[var(--color-gold)]/20 rounded-md bg-transparent focus:ring-2 focus:ring-[var(--color-accent)] outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-code mb-1">Date/Year</label>
                                <input type="text" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} className="w-full px-4 py-2 border border-[var(--color-gold)]/20 rounded-md bg-transparent focus:ring-2 focus:ring-[var(--color-accent)] outline-none" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-code mb-1">Image URL</label>
                            <input type="text" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} className="w-full px-4 py-2 border border-[var(--color-gold)]/20 rounded-md bg-transparent focus:ring-2 focus:ring-[var(--color-accent)] outline-none" />
                        </div>

                        <div>
                            <label className="block text-sm font-code mb-1">Short Description</label>
                            <textarea rows={2} value={formData.shortDescription} onChange={e => setFormData({ ...formData, shortDescription: e.target.value })} className="w-full px-4 py-2 border border-[var(--color-gold)]/20 rounded-md bg-transparent focus:ring-2 focus:ring-[var(--color-accent)] outline-none" />
                        </div>

                        <div>
                            <label className="block text-sm font-code mb-1">Full Description</label>
                            <textarea rows={5} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2 border border-[var(--color-gold)]/20 rounded-md bg-transparent focus:ring-2 focus:ring-[var(--color-accent)] outline-none" />
                        </div>

                        <div>
                            <label className="block text-sm font-code mb-1">Technologies (comma separated)</label>
                            <input type="text" value={formData.technologies} onChange={e => setFormData({ ...formData, technologies: e.target.value })} className="w-full px-4 py-2 border border-[var(--color-gold)]/20 rounded-md bg-transparent focus:ring-2 focus:ring-[var(--color-accent)] outline-none" />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-code mb-1">Demo URL</label>
                                <input type="text" value={formData.demoUrl || ""} onChange={e => setFormData({ ...formData, demoUrl: e.target.value })} className="w-full px-4 py-2 border border-[var(--color-gold)]/20 rounded-md bg-transparent focus:ring-2 focus:ring-[var(--color-accent)] outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-code mb-1">GitHub URL</label>
                                <input type="text" value={formData.githubUrl || ""} onChange={e => setFormData({ ...formData, githubUrl: e.target.value })} className="w-full px-4 py-2 border border-[var(--color-gold)]/20 rounded-md bg-transparent focus:ring-2 focus:ring-[var(--color-accent)] outline-none" />
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <input type="checkbox" id="featured" checked={formData.featured} onChange={e => setFormData({ ...formData, featured: e.target.checked })} className="w-4 h-4 text-[var(--color-accent)] border-[var(--color-gold)]/20 rounded focus:ring-[var(--color-accent)]" />
                            <label htmlFor="featured" className="text-sm font-code">Featured Project</label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-display font-bold mb-2">Projects</h2>
                    <p className="text-[var(--color-text)]/60 dark:text-[var(--color-dark-text)]/60">Manage your portfolio items.</p>
                </div>
                <button
                    onClick={handleCreate}
                    className="px-4 py-2 bg-[var(--color-accent)] text-white dark:text-[#2A1F18] rounded-md font-code text-sm flex items-center gap-2 hover:opacity-90 transition-opacity"
                >
                    <Plus className="w-4 h-4" /> New Project
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {projects.map((proj) => (
                    <div key={proj.id} className="flex items-center justify-between p-4 bg-[var(--color-bg)] dark:bg-[#2A1F18] border border-[var(--color-gold)]/20 rounded-lg shadow-sm hover:border-[var(--color-accent)]/50 transition-colors">
                        <div className="flex items-center gap-4">
                            <img src={proj.image} alt={proj.title} className="w-16 h-12 object-cover rounded shadow-sm opacity-80" />
                            <div>
                                <h4 className="font-bold font-display">{proj.title}</h4>
                                <p className="text-xs text-[var(--color-text)]/50 dark:text-[var(--color-dark-text)]/50 font-code">{proj.category} • {proj.date}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={() => handleEdit(proj)} className="p-2 text-[var(--color-text)]/60 hover:text-[var(--color-accent)] transition-colors rounded-md hover:bg-black/5 dark:hover:bg-white/5">
                                Edit
                            </button>
                            <button onClick={() => handleDelete(proj.id)} className="p-2 text-red-500/70 hover:text-red-500 transition-colors rounded-md hover:bg-red-500/10">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
                {projects.length === 0 && (
                    <div className="p-8 text-center border border-dashed border-[var(--color-gold)]/30 rounded-lg text-[var(--color-text)]/50">
                        No projects found. Create one!
                    </div>
                )}
            </div>
        </div>
    );
}

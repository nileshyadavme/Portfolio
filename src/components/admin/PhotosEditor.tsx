import { useState, useEffect } from "react";
import { Save, Plus, Trash2, Loader2, ArrowLeft } from "lucide-react";

export function PhotosEditor() {
    const [photos, setPhotos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<any>(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchPhotos();
    }, []);

    const fetchPhotos = async () => {
        try {
            const res = await fetch("/api/photos");
            const data = await res.json();
            setPhotos(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (photo: any) => {
        setFormData({ ...photo });
        setEditingId(photo.id);
    };

    const handleCreate = () => {
        const newId = `photo-${Date.now()}`;

        setFormData({
            id: newId,
            thumbnailUrl: "https://picsum.photos/seed/placeholder/800/1000",
            fullUrl: "https://picsum.photos/seed/placeholder/800/1000",
            caption: "New Photo",
            location: "General",
            camera: "Unknown",
            film: "N/A",
        });
        setEditingId(newId);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await fetch(`/api/photos/${editingId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            await fetchPhotos();
            setEditingId(null);
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this photo?")) return;
        try {
            await fetch(`/api/photos/${id}`, { method: "DELETE" });
            await fetchPhotos();
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
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Photos
                </button>

                <div className="bg-[var(--color-bg)] dark:bg-[#2A1F18] border border-[var(--color-gold)]/20 rounded-xl p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--color-gold)]/10">
                        <h3 className="text-2xl font-bold font-display">Edit Photo</h3>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="px-4 py-2 bg-[var(--color-accent)] text-white dark:text-[#2A1F18] rounded-md font-code text-sm flex items-center gap-2 hover:opacity-90 disabled:opacity-50"
                        >
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Save Photo
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-code mb-1">Image URL (Thumbnail)</label>
                                <input type="text" value={formData.thumbnailUrl} onChange={e => setFormData({ ...formData, thumbnailUrl: e.target.value })} className="w-full px-4 py-2 border border-[var(--color-gold)]/20 rounded-md bg-transparent focus:ring-2 focus:ring-[var(--color-accent)] outline-none" />
                            </div>

                            <div>
                                <label className="block text-sm font-code mb-1">Image URL (Full Size)</label>
                                <input type="text" value={formData.fullUrl} onChange={e => setFormData({ ...formData, fullUrl: e.target.value })} className="w-full px-4 py-2 border border-[var(--color-gold)]/20 rounded-md bg-transparent focus:ring-2 focus:ring-[var(--color-accent)] outline-none" />
                            </div>

                            <div>
                                <label className="block text-sm font-code mb-1">Caption</label>
                                <input type="text" value={formData.caption} onChange={e => setFormData({ ...formData, caption: e.target.value })} className="w-full px-4 py-2 border border-[var(--color-gold)]/20 rounded-md bg-transparent focus:ring-2 focus:ring-[var(--color-accent)] outline-none" />
                            </div>

                            <div>
                                <label className="block text-sm font-code mb-1">Location / Category</label>
                                <input type="text" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} className="w-full px-4 py-2 border border-[var(--color-gold)]/20 rounded-md bg-transparent focus:ring-2 focus:ring-[var(--color-accent)] outline-none" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-code mb-1">Camera</label>
                                    <input type="text" value={formData.camera || ""} onChange={e => setFormData({ ...formData, camera: e.target.value })} className="w-full px-4 py-2 border border-[var(--color-gold)]/20 rounded-md bg-transparent focus:ring-2 focus:ring-[var(--color-accent)] outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-code mb-1">ISO / Film</label>
                                    <input type="text" value={formData.film || ""} onChange={e => setFormData({ ...formData, film: e.target.value })} className="w-full px-4 py-2 border border-[var(--color-gold)]/20 rounded-md bg-transparent focus:ring-2 focus:ring-[var(--color-accent)] outline-none" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-code mb-2 text-[var(--color-text)]/50">Preview</label>
                            <div className="bg-black/5 dark:bg-white/5 rounded-lg border border-[var(--color-gold)]/10 aspect-[4/5] flex items-center justify-center overflow-hidden relative">
                                {formData.thumbnailUrl ? (
                                    <img src={formData.thumbnailUrl} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-sm font-code text-[var(--color-text)]/40">No image URL</span>
                                )}
                            </div>
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
                    <h2 className="text-3xl font-display font-bold mb-2">Photography</h2>
                    <p className="text-[var(--color-text)]/60 dark:text-[var(--color-dark-text)]/60">Manage your photo gallery.</p>
                </div>
                <button
                    onClick={handleCreate}
                    className="px-4 py-2 bg-[var(--color-accent)] text-white dark:text-[#2A1F18] rounded-md font-code text-sm flex items-center gap-2 hover:opacity-90 transition-opacity"
                >
                    <Plus className="w-4 h-4" /> Add Photo
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {photos.map((photo) => (
                    <div key={photo.id} className="group relative aspect-[4/5] bg-black/5 dark:bg-white/5 rounded-lg overflow-hidden border border-[var(--color-gold)]/10 shadow-sm">
                        <img src={photo.thumbnailUrl} alt={photo.caption} className="w-full h-full object-cover" />

                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                            <button onClick={() => handleEdit(photo)} className="px-4 py-2 bg-white text-black font-code text-xs rounded shadow-lg hover:scale-105 transition-transform">
                                Edit
                            </button>
                            <button onClick={() => handleDelete(photo.id)} className="px-4 py-2 bg-red-500 text-white font-code text-xs rounded shadow-lg hover:scale-105 transition-transform">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {photos.length === 0 && (
                <div className="p-8 text-center border border-dashed border-[var(--color-gold)]/30 rounded-lg text-[var(--color-text)]/50">
                    No photos found. Add some!
                </div>
            )}
        </div>
    );
}

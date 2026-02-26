import { useState, useEffect } from "react";
import { Save, Loader2 } from "lucide-react";

export function ConfigEditor() {
    const [data, setData] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState(true);
    const [savingConfig, setSavingConfig] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/config")
            .then((res) => res.json())
            .then((configObj) => {
                setData(configObj);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to load config", err);
                setLoading(false);
            });
    }, []);

    const handleSave = async (id: string) => {
        setSavingConfig(id);
        try {
            await fetch(`/api/config/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data[id]),
            });
            // Optionally show a success toast here
        } catch (err) {
            console.error("Failed to save config item", err);
        } finally {
            setSavingConfig(null);
        }
    };

    const handleChange = (id: string, key: string, value: any, isNested: boolean = false, parentKey: string = "") => {
        setData((prev) => {
            const newData = { ...prev };
            if (isNested) {
                newData[id] = { ...newData[id], [parentKey]: { ...newData[id][parentKey], [key]: value } };
            } else {
                newData[id] = { ...newData[id], [key]: value };
            }
            return newData;
        });
    };

    if (loading) {
        return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin" /></div>;
    }

    return (
        <div className="space-y-12">
            <div>
                <h2 className="text-3xl font-display font-bold mb-2">Site Configuration</h2>
                <p className="text-[var(--color-text)]/60 dark:text-[var(--color-dark-text)]/60 mb-8">Manage the global settings and text used across your portfolio.</p>
            </div>

            {Object.keys(data).map((id) => (
                <section key={id} className="bg-[var(--color-bg)] dark:bg-[#2A1F18] border border-[var(--color-gold)]/20 rounded-xl p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--color-gold)]/10">
                        <h3 className="text-xl font-bold font-display capitalize">{id}</h3>
                        <button
                            onClick={() => handleSave(id)}
                            disabled={savingConfig === id}
                            className="px-4 py-2 bg-[var(--color-accent)] text-white dark:text-[#2A1F18] rounded-md font-code text-sm flex items-center gap-2 hover:opacity-90 disabled:opacity-50 transition-opacity"
                        >
                            {savingConfig === id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Save {id} Let
                        </button>
                    </div>

                    <div className="space-y-6">
                        {typeof data[id] === 'object' && Object.keys(data[id]).map((key) => {
                            const val = data[id][key];

                            if (typeof val === 'object' && val !== null) {
                                // Render nested object (e.g., socials or currently)
                                return (
                                    <div key={key} className="space-y-4 p-4 bg-black/5 dark:bg-white/5 rounded-lg border border-[var(--color-gold)]/10">
                                        <h4 className="font-bold capitalize mb-2">{key}</h4>
                                        {Object.keys(val).map((nestedKey) => (
                                            <div key={nestedKey}>
                                                <label className="block text-sm font-code text-[var(--color-text)]/70 dark:text-[var(--color-dark-text)]/70 mb-1.5 capitalize">{nestedKey}</label>
                                                {typeof val[nestedKey] === 'object' ? (
                                                    <div className="pl-4 border-l-2 border-[var(--color-gold)]/20 space-y-3">
                                                        {Object.keys(val[nestedKey]).map((deepKey) => (
                                                            <div key={deepKey}>
                                                                <label className="block text-xs uppercase tracking-wider text-[var(--color-text)]/50 mb-1">{deepKey}</label>
                                                                <input
                                                                    type="text"
                                                                    value={val[nestedKey][deepKey] || ""}
                                                                    onChange={(e) => {
                                                                        setData(prev => {
                                                                            const newD = { ...prev };
                                                                            newD[id][key][nestedKey][deepKey] = e.target.value;
                                                                            return newD;
                                                                        })
                                                                    }}
                                                                    className="w-full px-4 py-2 rounded-md border border-[var(--color-gold)]/20 bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all font-body"
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <input
                                                        type="text"
                                                        value={val[nestedKey] || ""}
                                                        onChange={(e) => handleChange(id, nestedKey, e.target.value, true, key)}
                                                        className="w-full px-4 py-2 rounded-md border border-[var(--color-gold)]/20 bg-[var(--color-bg)] dark:bg-[var(--color-dark-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all font-body"
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                );
                            }

                            // Render normal string/number field
                            return (
                                <div key={key}>
                                    <label className="block text-sm font-code text-[var(--color-text)]/70 dark:text-[var(--color-dark-text)]/70 mb-1.5 capitalize">{key}</label>
                                    {key === 'bio' || key.includes('description') ? (
                                        <textarea
                                            value={val || ""}
                                            onChange={(e) => handleChange(id, key, e.target.value)}
                                            rows={4}
                                            className="w-full px-4 py-2 rounded-md border border-[var(--color-gold)]/20 bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all font-body resize-y"
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            value={val || ""}
                                            onChange={(e) => handleChange(id, key, e.target.value)}
                                            className="w-full px-4 py-2 rounded-md border border-[var(--color-gold)]/20 bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all font-body"
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>
            ))}
        </div>
    );
}

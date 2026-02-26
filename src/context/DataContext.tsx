import React, { createContext, useContext, useState, useEffect } from "react";
import { Loader2, AlertTriangle } from "lucide-react";

interface DataContextType {
    config: any;
    projects: any[];
    journalPosts: any[];
    experience: any[];
    timeline: any[];
    photos: any[];
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
    const [data, setData] = useState<Omit<DataContextType, 'loading' | 'refresh' | 'error'>>({
        config: null,
        projects: [],
        journalPosts: [],
        experience: [],
        timeline: [],
        photos: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            setError(null);
            const [cfgRes, projRes, jpRes, expRes, timeRes, photoRes] = await Promise.all([
                fetch("/api/config"),
                fetch("/api/projects"),
                fetch("/api/journal"),
                fetch("/api/experience"),
                fetch("/api/timeline"),
                fetch("/api/photos"),
            ]);

            if (!cfgRes.ok) throw new Error("Failed to connect to backend API");

            setData({
                config: await cfgRes.json(),
                projects: await projRes.json(),
                journalPosts: await jpRes.json(),
                experience: await expRes.json(),
                timeline: await timeRes.json(),
                photos: await photoRes.json(),
            });
        } catch (err: any) {
            console.error("Failed to load initial data", err);
            setError(err.message || "Failed to load dynamic data. Is the backend running?");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--color-accent)]" />
            </div>
        );
    }

    if (error || !data.config) {
        return (
            <div className="min-h-screen bg-[var(--color-bg)] flex flex-col items-center justify-center p-6 text-center">
                <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
                <h2 className="text-2xl font-display font-bold mb-2">Could not connect to database</h2>
                <p className="text-[var(--color-text)]/70 max-w-md font-body">
                    It looks like the backend API isn't running. If you are developing locally, please restart your <code>npm run dev</code> server.
                </p>
                <p className="mt-4 text-xs font-code opacity-50">{error}</p>
            </div>
        );
    }

    return (
        <DataContext.Provider value={{ ...data, loading, error, refresh: fetchData }}>
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    const context = useContext(DataContext);
    if (!context) throw new Error("useData must be used within DataProvider");
    return context;
}

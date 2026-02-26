import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, X } from "lucide-react";

interface ToastProps {
    message: string;
    visible: boolean;
    onDismiss: () => void;
    duration?: number;
}

export function Toast({ message, visible, onDismiss, duration = 2500 }: ToastProps) {
    useEffect(() => {
        if (!visible) return;
        const t = setTimeout(onDismiss, duration);
        return () => clearTimeout(t);
    }, [visible, duration, onDismiss]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: 24, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-3 px-5 py-3 rounded-full bg-[var(--color-text)] dark:bg-[var(--color-cream)] text-[var(--color-cream)] dark:text-[var(--color-text)] shadow-xl font-code text-sm select-none whitespace-nowrap"
                >
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    {message}
                    <button
                        onClick={onDismiss}
                        className="ml-1 opacity-50 hover:opacity-100 transition-opacity"
                        aria-label="Dismiss"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

/** Hook that copies text and shows a toast */
export function useCopyToast() {
    return async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch {
            return false;
        }
    };
}

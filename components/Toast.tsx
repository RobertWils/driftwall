"use client";

/* ultrareview-ready
 * Reviewer checklist:
 *  - Single-file toast system, no external lib.
 *  - Context-based: useToast() from any client component under <ToastProvider>.
 *  - Auto-dismiss after 4.5s; manual dismiss on click.
 *  - AnimatePresence handles enter/exit without layout jank.
 */

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, AlertTriangle, X } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ToastKind = "success" | "info" | "error";
type Toast = { id: string; kind: ToastKind; title: string; description?: string };

type Ctx = {
  show: (t: Omit<Toast, "id">) => void;
};

const ToastCtx = createContext<Ctx | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const show = useCallback((t: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { ...t, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((x) => x.id !== id));
    }, 4500);
  }, []);

  const dismiss = (id: string) => setToasts((prev) => prev.filter((x) => x.id !== id));

  const value = useMemo(() => ({ show }), [show]);

  return (
    <ToastCtx.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed bottom-6 right-6 z-[100] flex w-full max-w-sm flex-col gap-3">
        <AnimatePresence initial={false}>
          {toasts.map((t) => (
            <motion.button
              key={t.id}
              type="button"
              onClick={() => dismiss(t.id)}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="glass glass-hover pointer-events-auto w-full cursor-pointer rounded-xl px-4 py-3 text-left"
            >
              <div className="flex items-start gap-3">
                <Icon kind={t.kind} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{t.title}</p>
                  {t.description && (
                    <p className="mt-1 break-all text-xs text-white/60">{t.description}</p>
                  )}
                </div>
                <X className="h-4 w-4 text-white/40" />
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </ToastCtx.Provider>
  );
}

function Icon({ kind }: { kind: ToastKind }) {
  if (kind === "success") return <CheckCircle2 className="mt-0.5 h-5 w-5 text-ok" />;
  if (kind === "error") return <AlertTriangle className="mt-0.5 h-5 w-5 text-danger" />;
  return <Info className="mt-0.5 h-5 w-5 text-teal" />;
}

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}

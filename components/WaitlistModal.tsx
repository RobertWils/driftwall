"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

export function WaitlistModal({
  open,
  onClose,
  source = "waitlist",
}: {
  open: boolean;
  onClose: () => void;
  source?: string;
}) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setEmail("");
        setSubmitted(false);
        setError(null);
        setSubmitting(false);
      }, 250);
      return () => clearTimeout(t);
    }
  }, [open]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Enter a valid email");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      if (!res.ok) throw new Error("failed");
      setSubmitted(true);
    } catch {
      setError("Couldn't save email. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative m-auto w-full max-w-md overflow-y-auto rounded-2xl border border-white/10 bg-[#0d1f35] p-8"
            style={{
              maxHeight: "90vh",
              boxShadow: "0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(0,212,255,0.12)",
            }}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 rounded-md p-1 text-white/40 transition-colors hover:bg-white/5 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {submitted ? (
              <div className="flex flex-col items-center py-4 text-center">
                <p className="text-2xl font-semibold text-teal">You&apos;re on the list ✓</p>
                <p className="mt-3 text-sm text-white/60">
                  We&apos;ll reach out within 48 hours.
                </p>
              </div>
            ) : (
              <>
                <span className="inline-block rounded-md border border-teal/40 bg-teal/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-teal">
                  Early Access
                </span>
                <h2 className="mt-4 text-2xl font-semibold text-white">Join the waitlist</h2>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  Be first to know when Driftwall launches. We&apos;re onboarding security teams now.
                </p>
                <form onSubmit={submit} className="mt-6 flex flex-col gap-3">
                  <input
                    autoFocus
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full rounded-md border border-white/10 bg-navy-950/60 px-3 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-teal/60 focus:outline-none"
                  />
                  {error && <p className="text-xs text-danger">{error}</p>}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="early-access-btn mt-1 rounded-md border border-teal/60 bg-teal/15 px-4 py-2.5 text-sm font-medium text-teal transition-all hover:bg-teal/25 disabled:opacity-50"
                  >
                    {submitting ? "Sending…" : "Request Access →"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

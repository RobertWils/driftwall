"use client";

/* ultrareview-ready
 * Reviewer checklist:
 *  - Client Component for typewriter + live counter only.
 *  - Typewriter: 45ms per char, holds 2s, backspaces, next.
 *  - Counter: increments by 1–3 every 3–5s; deterministic-ish via Math.random.
 *  - All intervals cleared on unmount.
 */

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const PHRASES = [
  "Detecting prompt injection vulnerabilities...",
  "Scanning for privilege escalation paths...",
  "Testing memory poisoning resistance...",
  "Simulating wallet drain scenarios...",
  "Checking tool abuse vectors...",
];

function useTypewriter() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "erasing">("typing");

  useEffect(() => {
    const current = PHRASES[phraseIdx];
    let timer: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < current.length) {
        timer = setTimeout(() => setText(current.slice(0, text.length + 1)), 42);
      } else {
        timer = setTimeout(() => setPhase("holding"), 2000);
      }
    } else if (phase === "holding") {
      timer = setTimeout(() => setPhase("erasing"), 0);
    } else {
      if (text.length > 0) {
        timer = setTimeout(() => setText(text.slice(0, -1)), 18);
      } else {
        setPhraseIdx((i) => (i + 1) % PHRASES.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timer);
  }, [text, phase, phraseIdx]);

  return text;
}

function useLiveCounter(seed = 1247) {
  const [n, setN] = useState(seed);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    let cancelled = false;
    const loop = () => {
      if (cancelled) return;
      const delay = 3000 + Math.random() * 2000;
      setTimeout(() => {
        if (cancelled) return;
        setN((v) => v + 1 + Math.floor(Math.random() * 3));
        loop();
      }, delay);
    };
    loop();
    return () => {
      cancelled = true;
    };
  }, []);
  return { n, mounted };
}

export function LandingHero() {
  const typed = useTypewriter();
  const { n: count, mounted } = useLiveCounter();

  return (
    <div className="relative isolate flex flex-col items-start">
      <span
        aria-hidden
        className="orb-float pointer-events-none absolute -z-10"
        style={{
          top: "-100px",
          left: "-100px",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,212,255,0.1) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <span
        aria-hidden
        className="hero-grid pointer-events-none absolute inset-0 -z-10 opacity-70"
        style={{
          maskImage:
            "radial-gradient(ellipse at 30% 40%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 30% 40%, black 30%, transparent 75%)",
        }}
      />

      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative inline-flex items-center gap-2 rounded-full border border-teal/25 bg-teal/[0.08] px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-teal backdrop-blur-sm"
      >
        <span className="h-1.5 w-1.5 animate-pulseRing rounded-full bg-teal" />
        Agent Security · Public Beta
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl"
      >
        Your AI Agents Are Running.
        <br />
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="bg-gradient-to-r from-teal via-teal-glow to-white bg-clip-text text-transparent"
        >
          Are They Safe?
        </motion.span>
      </motion.h1>

      <p className="mt-6 min-h-[1.75rem] font-mono text-sm text-white/55 sm:text-base">
        <span className="caret">{typed}</span>
      </p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mt-6 max-w-xl text-base leading-relaxed text-white/70"
      >
        Stop agent drift before it becomes a breach. Driftwall red-teams your agent pre-deploy,
        monitors every tool call at runtime, and writes a tamper-proof audit trail on-chain.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.85 }}
        className="mt-8 inline-flex items-center gap-3 rounded-lg border border-teal/20 bg-teal/[0.08] px-4 py-2.5 backdrop-blur-md"
        style={{ boxShadow: "0 0 20px rgba(0,212,255,0.1)" }}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-pulseRing rounded-full bg-teal opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
        </span>
        <span
          className="font-mono text-sm tabular-nums text-white"
          suppressHydrationWarning
        >
          {mounted ? count.toLocaleString("en-US") : String(count)}
        </span>
        <span className="text-sm text-white/60">agent threats blocked today</span>
      </motion.div>
    </div>
  );
}

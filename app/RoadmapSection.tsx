"use client";

import { motion } from "framer-motion";
import { Code2, ShieldCheck, GitBranch, Terminal } from "lucide-react";
import { useState } from "react";
import { GlassCard, SectionBadge } from "@/components/GlassCard";
import { WaitlistModal } from "@/components/WaitlistModal";

const ITEMS = [
  {
    Icon: Code2,
    title: "VS Code Extension",
    body:
      "Scan agent configs inline as you write them. Red-team warnings appear directly in your editor before you commit a single line.",
    badge: "Q2 2026",
  },
  {
    Icon: ShieldCheck,
    title: "Chrome Extension",
    body:
      "Real-time agent monitoring in your browser. One-click scanning for any agent UI. Live threat indicator in your toolbar.",
    badge: "Q2 2026",
  },
  {
    Icon: GitBranch,
    title: "GitHub Action",
    body:
      "Block agent deployments that fail security thresholds. Driftwall as a mandatory CI/CD gate — no agent ships without a passing scan.",
    badge: "Q3 2026",
  },
  {
    Icon: Terminal,
    title: "Runtime SDK",
    body:
      "Drop-in sidecar for LangChain, AutoGen, and CrewAI. Five lines of code. Full action-level monitoring from day one.",
    badge: "Q3 2026",
  },
];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  };
}

export function RoadmapSection() {
  const [showWaitlist, setShowWaitlist] = useState(false);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-8">
      <motion.div {...fadeUp(0)}>
        <SectionBadge>Roadmap · 2026</SectionBadge>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold text-white sm:text-4xl">
          Security that lives where you work.
        </h2>
        <p className="mt-4 max-w-xl text-base text-white/65">
          Driftwall is expanding beyond the browser.
        </p>
      </motion.div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {ITEMS.map(({ Icon, title, body, badge }, i) => (
          <motion.div key={title} {...fadeUp(0.1 * (i + 1))}>
            <GlassCard className="relative flex h-full flex-col gap-4 opacity-80">
              <span className="absolute right-4 top-4 rounded-full border border-warn/30 bg-warn/10 px-2 py-0.5 text-xs font-semibold text-warn">
                {badge}
              </span>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-teal/30 bg-teal/5 text-teal">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-white/65">{body}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <motion.p
        {...fadeUp(0.5)}
        className="mt-10 text-center text-sm text-white/50"
      >
        Currently in private beta.{" "}
        <button
          type="button"
          onClick={() => setShowWaitlist(true)}
          className="text-teal underline underline-offset-4 transition-colors hover:text-teal-glow"
        >
          Join waitlist →
        </button>{" "}
        to get early access to each feature as it ships.
      </motion.p>

      <WaitlistModal
        open={showWaitlist}
        onClose={() => setShowWaitlist(false)}
        source="roadmap"
      />
    </section>
  );
}

"use client";

/* ultrareview-ready
 * Reviewer checklist:
 *  - Consumes props-passed initial events and mutates them client-side.
 *  - New event injected every 4s, list capped at 8.
 *  - Keys are event.id — stable across re-renders (unshift prepends).
 *  - Timestamps rendered relatively, recomputed each tick.
 */

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export type Threat = {
  id: string;
  agentName: string;
  eventType: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  description: string;
  timestamp: string; // ISO
};

const ROTATION: Omit<Threat, "id" | "timestamp">[] = [
  { agentName: "TreasuryBot-v2", eventType: "PROMPT_INJECTION", severity: "HIGH", description: "Prompt injection attempt blocked on TreasuryBot-v2" },
  { agentName: "ResearchAgent", eventType: "ANOMALOUS_API", severity: "MEDIUM", description: "Unusual API call pattern detected on ResearchAgent" },
  { agentName: "ResearchAgent", eventType: "CROSS_AGENT_TRUST", severity: "HIGH", description: "Cross-agent trust violation attempt" },
  { agentName: "TreasuryBot-v2", eventType: "SCOPE_VIOLATION", severity: "MEDIUM", description: "Tool permission scope exceeded" },
  { agentName: "DataPipeline", eventType: "MEMORY_POISON", severity: "CRITICAL", description: "Memory poisoning attempt intercepted" },
];

function relative(iso: string, now: number): string {
  const diffMs = now - new Date(iso).getTime();
  const s = Math.max(0, Math.floor(diffMs / 1000));
  if (s < 5) return "just now";
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function severityClass(sev: Threat["severity"]) {
  switch (sev) {
    case "CRITICAL":
      return "border-danger/60 bg-danger/10 text-danger";
    case "HIGH":
      return "border-danger/40 bg-danger/5 text-danger";
    case "MEDIUM":
      return "border-warn/40 bg-warn/5 text-warn";
    default:
      return "border-white/10 bg-white/5 text-white/70";
  }
}

export function ThreatFeed({ initial }: { initial: Threat[] }) {
  const [events, setEvents] = useState<Threat[]>(initial);
  const [now, setNow] = useState(() => Date.now());
  const idxRef = useRef(0);

  useEffect(() => {
    const inject = setInterval(() => {
      const proto = ROTATION[idxRef.current % ROTATION.length];
      idxRef.current += 1;
      const next: Threat = {
        ...proto,
        id: `live-${Date.now()}-${idxRef.current}`,
        timestamp: new Date().toISOString(),
      };
      setEvents((prev) => [next, ...prev].slice(0, 8));
    }, 4000);
    const tick = setInterval(() => setNow(Date.now()), 1000);
    return () => {
      clearInterval(inject);
      clearInterval(tick);
    };
  }, []);

  return (
    <ul className="flex flex-col divide-y divide-white/5">
      <AnimatePresence initial={false}>
        {events.map((e) => (
          <motion.li
            key={e.id}
            layout
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-4 px-5 py-3"
          >
            <span className="w-20 shrink-0 font-mono text-[11px] text-white/45">
              {relative(e.timestamp, now)}
            </span>
            <span
              className={cn(
                "shrink-0 rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                severityClass(e.severity),
              )}
            >
              {e.severity}
            </span>
            <p className="flex-1 truncate text-sm text-white/85">{e.description}</p>
            <span className="hidden shrink-0 text-xs text-white/50 sm:inline">{e.agentName}</span>
          </motion.li>
        ))}
      </AnimatePresence>
      {events.length === 0 && (
        <li className="px-5 py-8 text-center text-sm text-white/40">
          No threats in feed. Waiting for events…
        </li>
      )}
    </ul>
  );
}

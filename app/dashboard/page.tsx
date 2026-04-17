import { SectionBadge } from "@/components/GlassCard";
import { DashboardClient } from "./DashboardClient";
import { prisma } from "@/lib/prisma";
import type { Threat } from "@/components/ThreatFeed";

export const metadata = {
  title: "Dashboard · Driftwall",
};

export const dynamic = "force-dynamic";

async function loadInitialThreats(): Promise<Threat[]> {
  try {
    const rows = await prisma.threatEvent.findMany({
      orderBy: { timestamp: "desc" },
      take: 8,
    });
    return rows.map((r) => ({
      id: r.id,
      agentName: r.agentId,
      eventType: r.eventType,
      severity: (["CRITICAL", "HIGH", "MEDIUM", "LOW"].includes(r.severity) ? r.severity : "LOW") as Threat["severity"],
      description: r.description,
      timestamp: r.timestamp.toISOString(),
    }));
  } catch {
    // DB not reachable yet — render with seeded in-memory events.
    return FALLBACK_EVENTS;
  }
}

const FALLBACK_EVENTS: Threat[] = [
  { id: "fb-1", agentName: "TreasuryBot-v2", eventType: "PROMPT_INJECTION", severity: "HIGH", description: "Prompt injection attempt blocked on TreasuryBot-v2", timestamp: new Date(Date.now() - 2 * 60_000).toISOString() },
  { id: "fb-2", agentName: "ResearchAgent", eventType: "ANOMALOUS_API", severity: "MEDIUM", description: "Unusual API call pattern detected on ResearchAgent", timestamp: new Date(Date.now() - 7 * 60_000).toISOString() },
  { id: "fb-3", agentName: "DataPipeline", eventType: "SCOPE_VIOLATION", severity: "LOW", description: "Tool permission scope exceeded", timestamp: new Date(Date.now() - 22 * 60_000).toISOString() },
  { id: "fb-4", agentName: "TreasuryBot-v2", eventType: "MEMORY_POISON", severity: "CRITICAL", description: "Memory poisoning attempt intercepted", timestamp: new Date(Date.now() - 45 * 60_000).toISOString() },
];

export default async function DashboardPage() {
  const initial = await loadInitialThreats();
  return (
    <section className="relative">
      <div className="pointer-events-none absolute inset-0 grid-bg" />
      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-8">
        <SectionBadge>RUNTIME MONITOR · LIVE</SectionBadge>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Agent Fleet Overview
        </h1>
        <p className="mt-3 max-w-2xl text-base text-white/60">
          Cross-framework visibility into every agent you run. Every tool call, every memory write,
          every outbound transaction — captured and scored in real time.
        </p>

        <div className="mt-10">
          <DashboardClient initialThreats={initial} />
        </div>
      </div>
    </section>
  );
}

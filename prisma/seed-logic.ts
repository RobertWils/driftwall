// Shared seeder used by both the prisma/seed.ts CLI and /api/seed.
// Wipes+reseeds AgentScan and ThreatEvent tables so state is predictable.

import type { PrismaClient } from "@prisma/client";
import { computeResults } from "@/lib/attacks";
import { PRESETS } from "@/lib/presets";

const AGENTS = [
  { name: "TreasuryBot-v2", framework: "LangChain" as const, agentId: "TreasuryBot-v2" },
  { name: "ResearchAgent", framework: "AutoGen" as const, agentId: "ResearchAgent" },
  { name: "DataPipeline", framework: "CrewAI" as const, agentId: "DataPipeline" },
];

const EVENT_TEMPLATES = [
  { eventType: "PROMPT_INJECTION", severity: "HIGH", description: "Prompt injection attempt blocked" },
  { eventType: "ANOMALOUS_API", severity: "MEDIUM", description: "Unusual API call pattern detected" },
  { eventType: "CROSS_AGENT_TRUST", severity: "HIGH", description: "Cross-agent trust violation attempt" },
  { eventType: "SCOPE_VIOLATION", severity: "MEDIUM", description: "Tool permission scope exceeded" },
  { eventType: "MEMORY_POISON", severity: "CRITICAL", description: "Memory poisoning attempt intercepted" },
  { eventType: "DATA_EXFIL", severity: "CRITICAL", description: "Data exfiltration heuristic triggered" },
  { eventType: "JAILBREAK", severity: "MEDIUM", description: "Jailbreak attempt rejected by policy layer" },
  { eventType: "CREDENTIAL_PROBE", severity: "HIGH", description: "Credential harvesting probe blocked" },
  { eventType: "RATE_SPIKE", severity: "LOW", description: "Tool call rate spike under threshold" },
  { eventType: "WALLET_GUARD", severity: "CRITICAL", description: "Wallet drain simulation blocked by guardrail" },
];

export async function seedDatabase(prisma: PrismaClient) {
  // Wipe existing demo rows.
  await prisma.threatEvent.deleteMany({});
  await prisma.agentScan.deleteMany({});

  // 3 scans — one per framework.
  for (const a of AGENTS) {
    const { results, riskScore } = computeResults(a.framework);
    await prisma.agentScan.create({
      data: {
        agentName: a.name,
        framework: a.framework,
        configSnapshot: PRESETS[a.framework],
        riskScore,
        attackResults: results,
      },
    });
  }

  // 50 threat events spread across 24h, weighted toward recent.
  const now = Date.now();
  const DAY = 24 * 60 * 60 * 1000;
  const events = Array.from({ length: 50 }, (_, i) => {
    const agent = AGENTS[i % AGENTS.length];
    const tpl = EVENT_TEMPLATES[i % EVENT_TEMPLATES.length];
    // Exponential-ish distribution: more recent events denser.
    const frac = Math.pow(Math.random(), 2);
    const ts = new Date(now - frac * DAY);
    return {
      agentId: agent.agentId,
      eventType: tpl.eventType,
      severity: tpl.severity,
      description: `${tpl.description} on ${agent.name}`,
      timestamp: ts,
    };
  });
  await prisma.threatEvent.createMany({ data: events });

  const [scans, threats] = await Promise.all([
    prisma.agentScan.count(),
    prisma.threatEvent.count(),
  ]);
  return { scans, threats };
}

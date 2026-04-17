// DRIFTWALL — shared attack catalog + deterministic scan results.
// Kept in lib/ so both the client-side scanner animation and the
// /api/scan route agree on the same 20-category truth table.

export type AttackStatus = "PASS" | "WARN" | "FAIL";

export type AttackCategory = {
  id: number;
  name: string;
  reference?: string;
  shortDesc: string;
};

export const ATTACK_CATEGORIES: AttackCategory[] = [
  { id: 1, name: "Prompt Injection", reference: "OWASP ASI-01", shortDesc: "Malicious user input attempts to override the system prompt." },
  { id: 2, name: "Goal Hijacking", shortDesc: "Attacker redirects the agent to pursue their objective instead of the user's." },
  { id: 3, name: "Context Manipulation", shortDesc: "Retrieved context is poisoned to steer the model's reasoning." },
  { id: 4, name: "Jailbreak Resistance", shortDesc: "Role-play and persona attacks to bypass safety policies." },
  { id: 5, name: "System Prompt Extraction", shortDesc: "Attacker tries to exfiltrate the hidden instructions or tools list." },
  { id: 6, name: "Memory Poisoning", shortDesc: "Persistent memory is seeded with false facts that bias later runs." },
  { id: 7, name: "Tool Abuse", shortDesc: "Agent uses tools in unintended ways (e.g., SSRF via fetch tool)." },
  { id: 8, name: "Privilege Escalation", shortDesc: "Agent gains capabilities beyond its declared scope." },
  { id: 9, name: "Data Exfiltration", shortDesc: "Sensitive data leaves the agent via side-channels." },
  { id: 10, name: "Wallet Drain Simulation", shortDesc: "Adversary tricks an on-chain agent into signing a malicious tx." },
  { id: 11, name: "Cross-Agent Trust Attack", shortDesc: "Agent-to-agent messages are trusted without verification." },
  { id: 12, name: "Supply Chain Poisoning", shortDesc: "A compromised dependency or MCP server injects instructions." },
  { id: 13, name: "Indirect Prompt Injection", shortDesc: "Instructions hidden in retrieved documents, emails, or web pages." },
  { id: 14, name: "Session Hijacking", shortDesc: "Session tokens or identity are reused across agent runs." },
  { id: 15, name: "Permission Scope Violation", shortDesc: "Agent calls tools outside its granted permission scope." },
  { id: 16, name: "Credential Harvesting", shortDesc: "Prompts designed to extract API keys from context." },
  { id: 17, name: "API Key Exposure", shortDesc: "Keys leak into logs, traces, or outbound tool calls." },
  { id: 18, name: "Hallucination-Based Fraud", shortDesc: "Fabricated facts drive irreversible downstream actions." },
  { id: 19, name: "Denial of Service", shortDesc: "Prompt or tool loops exhaust tokens, compute, or budget." },
  { id: 20, name: "Regulatory Compliance Check", reference: "EU AI Act", shortDesc: "High-risk capabilities without required controls or logging." },
];

export type Framework = "LangChain" | "AutoGen" | "CrewAI" | "Custom";

type Profile = {
  failIds: number[];
  warnIds: number[];
  riskScore: number;
  label: "LOW RISK" | "MEDIUM RISK" | "HIGH RISK";
  labelColor: "ok" | "warn" | "danger";
  summary: string;
};

// Deterministic profiles per the spec. Every other category is PASS.
export const PROFILES: Record<Framework, Profile> = {
  LangChain: {
    failIds: [3, 12],
    warnIds: [4, 7, 10, 16],
    riskScore: 62,
    label: "MEDIUM RISK",
    labelColor: "warn",
    summary:
      "Your LangChain agent blocks most direct attacks but leaks context under indirect injection and trusts unsigned upstream tool responses.",
  },
  AutoGen: {
    failIds: [1, 11, 13],
    warnIds: [4, 7, 8, 15, 16],
    riskScore: 71,
    label: "HIGH RISK",
    labelColor: "danger",
    summary:
      "Multi-agent delegation is the main exposure: peer agents are trusted without verification and indirect prompts escape through group chat.",
  },
  CrewAI: {
    failIds: [10, 18],
    warnIds: [7, 19],
    riskScore: 44,
    label: "LOW RISK",
    labelColor: "ok",
    summary:
      "Solid baseline. Remaining exposure is around tool-call scoping and over-trusting model-generated on-chain payloads.",
  },
  Custom: {
    failIds: [1, 7, 13, 17],
    warnIds: [3, 5, 10, 15, 18],
    riskScore: 78,
    label: "HIGH RISK",
    labelColor: "danger",
    summary:
      "Pasted config lacks guardrail metadata, allow-listed tools, and output filters — the agent is wide open on most injection vectors.",
  },
};

export function computeResults(framework: Framework): {
  results: { id: number; name: string; status: AttackStatus }[];
  riskScore: number;
  profile: Profile;
} {
  const profile = PROFILES[framework];
  const results = ATTACK_CATEGORIES.map((c) => {
    const status: AttackStatus = profile.failIds.includes(c.id)
      ? "FAIL"
      : profile.warnIds.includes(c.id)
        ? "WARN"
        : "PASS";
    return { id: c.id, name: c.name, status };
  });
  return { results, riskScore: profile.riskScore, profile };
}

export function criticalFindings(framework: Framework) {
  const profile = PROFILES[framework];
  return profile.failIds.map((id) => {
    const cat = ATTACK_CATEGORIES.find((c) => c.id === id)!;
    return {
      id: cat.id,
      title: cat.name,
      reference: cat.reference,
      description: cat.shortDesc,
      remediation: REMEDIATIONS[cat.id],
    };
  });
}

const REMEDIATIONS: Record<number, string> = {
  1: "Add input classification + system-prompt isolation via a policy layer.",
  3: "Sign retrieved documents; verify provenance before they enter the context window.",
  7: "Require an explicit tool-use allow list and validate arguments against JSON schema.",
  10: "Mandate human-in-the-loop for any tx > $100 and simulate before signing.",
  11: "Treat inter-agent messages as untrusted input and re-run the injection filter.",
  12: "Pin MCP servers and dependencies to signed versions; verify checksums on load.",
  13: "Strip instructions from retrieved content; render it as data, never as a prompt.",
  17: "Route all outbound credentials through a secret broker; never echo them back.",
  18: "Ground every claim in a cited source before any irreversible downstream action.",
};

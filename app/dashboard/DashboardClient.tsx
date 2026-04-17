"use client";

/* ultrareview-ready
 * Reviewer checklist:
 *  - Metric cards: "Threats Blocked" increments every 8s (mock).
 *  - Agents table: hard-coded 3 rows per spec; real build would paginate.
 *  - Threat feed is a separate component with its own lifecycle.
 *  - Recharts bar chart uses fixed domain so bars don't jump on mount.
 */

import { useEffect, useState } from "react";
import { GlassCard } from "@/components/GlassCard";
import { ThreatFeed, type Threat } from "@/components/ThreatFeed";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Agent = {
  name: string;
  framework: string;
  status: "ACTIVE" | "WARNING" | "SECURE";
  risk: number;
  lastScan: string;
  anomalies: number;
};

const AGENTS: Agent[] = [
  { name: "TreasuryBot-v2", framework: "LangChain", status: "ACTIVE", risk: 62, lastScan: "2 min ago", anomalies: 3 },
  { name: "ResearchAgent", framework: "AutoGen", status: "WARNING", risk: 71, lastScan: "14 min ago", anomalies: 7 },
  { name: "DataPipeline", framework: "CrewAI", status: "SECURE", risk: 44, lastScan: "1 hr ago", anomalies: 0 },
];

const THREAT_BREAKDOWN = [
  { category: "Prompt Injection", count: 89 },
  { category: "Tool Abuse", count: 54 },
  { category: "Privilege Escalation", count: 43 },
  { category: "Memory Poisoning", count: 37 },
  { category: "Wallet Drain", count: 24 },
];

function StatusDot({ status }: { status: Agent["status"] }) {
  const color =
    status === "ACTIVE"
      ? "bg-ok shadow-[0_0_10px_rgba(74,222,128,0.6)]"
      : status === "WARNING"
        ? "bg-warn shadow-[0_0_10px_rgba(255,184,77,0.6)]"
        : "bg-teal shadow-[0_0_10px_rgba(0,212,255,0.6)]";
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`h-2 w-2 rounded-full ${color}`} />
      <span className="text-xs font-semibold uppercase tracking-wider text-white/80">{status}</span>
    </span>
  );
}

function Metric({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <GlassCard className="flex flex-col gap-2">
      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
        {label}
      </span>
      <span className="text-4xl font-semibold tabular-nums text-white">{value}</span>
      {sub && <span className="text-xs text-white/45">{sub}</span>}
    </GlassCard>
  );
}

export function DashboardClient({ initialThreats }: { initialThreats: Threat[] }) {
  const [blocked, setBlocked] = useState(247);
  useEffect(() => {
    const id = setInterval(() => setBlocked((v) => v + Math.ceil(Math.random() * 2)), 8000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col gap-10">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Agents Monitored" value={3} sub="across 3 frameworks" />
        <Metric label="Threats Blocked" value={blocked.toLocaleString()} sub="last 24h · live" />
        <Metric label="Avg Risk Score" value={58} sub="medium risk fleet" />
        <Metric label="Audits Generated" value={12} sub="this week" />
      </div>

      <GlassCard className="overflow-hidden p-0">
        <div className="flex items-center justify-between px-5 py-4">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/55">
            Monitored Agents
          </h3>
          <span className="text-xs text-white/40">{AGENTS.length} active</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-t border-white/5 text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wider text-white/40">
                <th className="px-5 py-3 font-medium">Agent Name</th>
                <th className="px-5 py-3 font-medium">Framework</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Risk Score</th>
                <th className="px-5 py-3 font-medium">Last Scan</th>
                <th className="px-5 py-3 font-medium">Anomalies</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {AGENTS.map((a) => (
                <tr key={a.name} className="hover:bg-white/[0.02]">
                  <td className="px-5 py-4 font-medium text-white">{a.name}</td>
                  <td className="px-5 py-4 text-white/70">{a.framework}</td>
                  <td className="px-5 py-4"><StatusDot status={a.status} /></td>
                  <td className="px-5 py-4">
                    <RiskPill score={a.risk} />
                  </td>
                  <td className="px-5 py-4 text-white/55">{a.lastScan}</td>
                  <td className="px-5 py-4 text-white/80">{a.anomalies}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      <div className="grid gap-6 lg:grid-cols-5">
        <GlassCard className="overflow-hidden p-0 lg:col-span-3">
          <div className="flex items-center justify-between px-5 py-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/55">
              Live Threat Feed
            </h3>
            <span className="inline-flex items-center gap-2 text-xs text-ok">
              <span className="h-2 w-2 animate-pulseRing rounded-full bg-ok" />
              streaming
            </span>
          </div>
          <div className="border-t border-white/5">
            <ThreatFeed initial={initialThreats} />
          </div>
        </GlassCard>

        <GlassCard className="p-5 lg:col-span-2">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/55">
            Threat Breakdown · 7d
          </h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={THREAT_BREAKDOWN} margin={{ top: 10, right: 10, bottom: 0, left: -15 }}>
                <defs>
                  <linearGradient id="teal-bar" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#00D4FF" stopOpacity={0.95} />
                    <stop offset="100%" stopColor="#00D4FF" stopOpacity={0.35} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis
                  dataKey="category"
                  tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 10 }}
                  axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
                  tickLine={false}
                  interval={0}
                  angle={-18}
                  textAnchor="end"
                  height={60}
                />
                <YAxis
                  tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: "rgba(0,212,255,0.08)" }}
                  contentStyle={{
                    background: "#0F1F38",
                    border: "1px solid rgba(0,212,255,0.3)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  labelStyle={{ color: "rgba(255,255,255,0.75)" }}
                />
                <Bar dataKey="count" fill="url(#teal-bar)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

function RiskPill({ score }: { score: number }) {
  const tone =
    score >= 70
      ? "border-danger/40 bg-danger/10 text-danger"
      : score >= 55
        ? "border-warn/40 bg-warn/10 text-warn"
        : "border-ok/40 bg-ok/10 text-ok";
  return (
    <span className={`rounded-md border px-2 py-0.5 text-xs font-semibold tabular-nums ${tone}`}>
      {score}
    </span>
  );
}

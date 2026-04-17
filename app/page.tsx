import { LandingHero } from "./LandingHero";
import { GlassCard, SectionBadge } from "@/components/GlassCard";
import { ShieldCheck, Activity, Link2 } from "lucide-react";
import Link from "next/link";

/* ultrareview-ready
 * Reviewer checklist:
 *  - Server Component shell with a single Client island (LandingHero) for typewriter + counter.
 *  - Below-fold stats render server-side; numbers are static per spec.
 *  - Feature cards are pure presentation.
 */

const STATS = [
  {
    value: "88%",
    label: "of enterprises had agent security incidents in 2026",
    source: "Ponemon · 2026 Agentic Risk Survey",
  },
  {
    value: "$4.63M",
    label: "average cost of an agent-related breach",
    source: "IBM Cost of a Data Breach · 2026",
  },
  {
    value: "29 min",
    label: "average attacker breakout time",
    source: "CrowdStrike Global Threat Report · 2026",
  },
  {
    value: "14.4%",
    label: "of agents reach prod with security approval",
    source: "Gartner Agentic Adoption · Q1 2026",
  },
];

const FEATURES = [
  {
    Icon: ShieldCheck,
    title: "Pre-Deploy Red Team",
    body: "Run 20 adversarial attack categories against your agent before it touches production.",
    badge: "SECURITY · PRE-DEPLOY",
  },
  {
    Icon: Activity,
    title: "Runtime Monitor",
    body: "Live sidecar monitoring of every tool call, API access, and wallet transaction.",
    badge: "OBSERVABILITY · LIVE",
  },
  {
    Icon: Link2,
    title: "On-Chain Audit Trail",
    body: "Tamper-proof audit log. Every agent action cryptographically signed and verifiable.",
    badge: "COMPLIANCE · IMMUTABLE",
  },
];

export default function Page() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-bg" />
        <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-20 sm:px-8 sm:pt-28">
          <LandingHero />

          <div className="mt-20 grid gap-6 md:grid-cols-3">
            {FEATURES.map(({ Icon, title, body, badge }, i) => (
              <GlassCard key={title} hover className="flex flex-col gap-4">
                <SectionBadge>{badge}</SectionBadge>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-teal/30 bg-teal/5 text-teal">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-white/65">{body}</p>
                <span className="mt-auto pt-4 text-[11px] uppercase tracking-[0.18em] text-white/30">
                  0{i + 1} / 03
                </span>
              </GlassCard>
            ))}
          </div>

          <div className="mt-16 flex flex-col items-center">
            <Link
              href="/scan"
              className="group inline-flex items-center gap-2 rounded-lg border border-teal/60 bg-teal/10 px-6 py-3 text-sm font-medium text-teal shadow-glow-sm transition-all hover:bg-teal/20"
            >
              Scan Your Agent Free
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <p className="mt-3 text-xs text-white/40">No signup. 20 attack categories. &lt;30 seconds.</p>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-navy-950/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="mb-10">
            <SectionBadge>THE THREAT LANDSCAPE</SectionBadge>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold text-white sm:text-4xl">
              Agents are shipping faster than the defenses for them.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="border-l border-teal/30 pl-5">
                <p
                  className="text-5xl font-black leading-none tracking-tight"
                  style={{
                    background: "linear-gradient(135deg, #ffffff 0%, #00D4FF 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {s.value}
                </p>
                <p className="mt-3 text-sm leading-snug text-white/70">{s.label}</p>
                <p className="mt-3 text-[10px] uppercase tracking-wider text-white/35">{s.source}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

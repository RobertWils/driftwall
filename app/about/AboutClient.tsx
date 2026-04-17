"use client";

/* ultrareview-ready
 * Reviewer checklist:
 *  - Single client component so we can run Framer Motion entrances across
 *    all sections with staggered reveals.
 *  - Pure presentation — no data fetching, no form state.
 */

import { motion } from "framer-motion";
import Link from "next/link";
import { ShieldCheck, Activity, Link2 } from "lucide-react";
import { GlassCard, SectionBadge } from "@/components/GlassCard";

const PROBLEMS = [
  {
    title: "Agents are already in production",
    stat: "81%",
    statLabel: "of companies have AI agents deployed beyond planning phase",
    body:
      "Yet only 14.4% went through any security approval before going live. The gap between deployment speed and security readiness has never been wider.",
  },
  {
    title: "The blast radius is enormous",
    stat: "$4.63M",
    statLabel: "average cost of an agent-related security breach",
    body:
      "An agent with access to APIs, wallets, and databases can cause catastrophic damage in under 29 minutes. Traditional security tools can't see it happening.",
  },
  {
    title: "Existing tools don't cover agents",
    stat: "0",
    statLabel: "security platforms built specifically for agentic runtime",
    body:
      "HiddenLayer secures models. Lakera filters prompts. Nobody monitors the actual agent — its tool calls, memory, wallet access, and multi-agent trust chains.",
  },
];

const SOLUTIONS = [
  {
    Icon: ShieldCheck,
    title: "Pre-Deploy Red Team",
    body:
      "Before your agent touches production, we run 20 adversarial attack categories against it. Prompt injection, memory poisoning, privilege escalation, wallet drain. You get a risk score and a full findings report.",
  },
  {
    Icon: Activity,
    title: "Runtime Monitor",
    body:
      "A lightweight sidecar watches every tool call, API access, and wallet transaction your agent makes. Anomalies are flagged in real time. You define the policy — we enforce it.",
  },
  {
    Icon: Link2,
    title: "On-Chain Audit Trail",
    body:
      "Every agent action is cryptographically signed and written to an immutable on-chain log. Tamper-evident by design. EU AI Act compliant. When regulators ask what your agent did, you have the answer.",
  },
];

const DEADLINES = [
  {
    title: "EU AI Act — August 2026",
    body:
      "High-risk AI systems require human oversight, audit trails, and documented risk assessments. Agents qualify.",
  },
  {
    title: "NIST AI Agent Standards — February 2026",
    body:
      "The AI Agent Standards Initiative has published its first framework. Compliance is becoming expected.",
  },
  {
    title: "California AB 316 — January 2026",
    body:
      "Autonomous operation is no longer a defense against liability. If your agent causes harm, you're responsible.",
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

export function AboutClient() {
  return (
    <div className="flex flex-col gap-24">
      {/* Hero */}
      <section className="relative isolate">
        <span
          aria-hidden
          className="orb-float pointer-events-none absolute -left-20 -top-28 -z-10 h-[500px] w-[500px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(closest-side, rgba(0,212,255,0.1), transparent 70%)" }}
        />
        <motion.div {...fadeUp(0)}>
          <SectionBadge>Why Driftwall Exists</SectionBadge>
        </motion.div>
        <motion.h1
          {...fadeUp(0.15)}
          className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          AI agents are the most dangerous thing your team ships without a
          <span className="bg-gradient-to-r from-teal to-white bg-clip-text text-transparent"> security review</span>.
        </motion.h1>
        <motion.p
          {...fadeUp(0.3)}
          className="mt-6 max-w-2xl text-lg text-white/65"
        >
          Every other layer of your stack has a security tool. Agents don't.
        </motion.p>
      </section>

      {/* Problem */}
      <section>
        <motion.div {...fadeUp(0)}>
          <SectionBadge>The Problem</SectionBadge>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold text-white sm:text-4xl">
            Three uncomfortable truths about agent security today.
          </h2>
        </motion.div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {PROBLEMS.map((p, i) => (
            <motion.div key={p.title} {...fadeUp(0.15 * (i + 1))}>
              <GlassCard className="h-full border-danger/30 bg-danger/[0.04]">
                <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                <p className="mt-4 text-4xl font-extrabold leading-none text-danger">{p.stat}</p>
                <p className="mt-2 text-xs uppercase tracking-wider text-white/45">{p.statLabel}</p>
                <p className="mt-4 text-sm leading-relaxed text-white/70">{p.body}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Solution */}
      <section>
        <motion.div {...fadeUp(0)}>
          <SectionBadge>How Driftwall Fixes This</SectionBadge>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold text-white sm:text-4xl">
            Three layers of protection. Built for how agents actually work.
          </h2>
        </motion.div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {SOLUTIONS.map(({ Icon, title, body }, i) => (
            <motion.div key={title} {...fadeUp(0.15 * (i + 1))}>
              <GlassCard hover className="h-full border-teal/20">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-teal/30 bg-teal/10 text-teal shadow-glow-sm">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{body}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Regulatory */}
      <section>
        <motion.div {...fadeUp(0)}>
          <SectionBadge>The Clock Is Ticking</SectionBadge>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold text-white sm:text-4xl">
            Three deadlines making this urgent right now.
          </h2>
        </motion.div>
        <div className="mt-10 flex flex-col gap-5">
          {DEADLINES.map((d, i) => (
            <motion.div
              key={d.title}
              {...fadeUp(0.1 * (i + 1))}
              className="rounded-xl border border-white/5 bg-white/[0.02] py-5 pl-6 pr-5"
              style={{ borderLeft: "2px solid #00D4FF" }}
            >
              <h3 className="text-base font-semibold text-white">{d.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-white/65">{d.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SVH Cohort */}
      <section>
        <motion.div {...fadeUp(0)} className="flex flex-col items-center text-center">
          <SectionBadge>SVH Cohort · 2026</SectionBadge>
          <h3 className="mt-5 text-2xl font-semibold text-white sm:text-3xl">
            Driftwall is venture one.
          </h3>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
            We&apos;re building the full infrastructure stack for autonomous AI agents — security,
            identity, and monetization. Built by Singularity Venture Hub.
          </p>
        </motion.div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { num: "01", pillar: "Security", name: "DRIFTWALL", status: "Live", tone: "teal" as const, href: "/" },
            { num: "02", pillar: "Identity", name: "AGENTPASSPORT", status: "Coming Q2", tone: "warn" as const },
            { num: "03", pillar: "Monetization", name: "METERMIND", status: "Coming Q3", tone: "warn" as const },
          ].map((c, i) => {
            const badgeClasses =
              c.tone === "teal"
                ? "border-teal/40 bg-teal/10 text-teal"
                : "border-warn/40 bg-warn/10 text-warn";
            const body = (
              <GlassCard
                hover={!!c.href}
                className="h-full border-white/10 bg-navy-950/40"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tracking-[0.2em] text-teal">
                    {c.num} / {c.pillar}
                  </span>
                  <span
                    className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${badgeClasses}`}
                  >
                    {c.status}
                  </span>
                </div>
                <p className="mt-6 text-base font-semibold tracking-wide text-white">{c.name}</p>
              </GlassCard>
            );
            return (
              <motion.div key={c.name} {...fadeUp(0.1 * (i + 1))}>
                {c.href ? (
                  <Link href={c.href} className="block h-full">
                    {body}
                  </Link>
                ) : (
                  body
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <motion.section {...fadeUp(0)} className="flex flex-col items-center gap-5 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent px-6 py-14 text-center">
        <h2 className="max-w-2xl text-2xl font-semibold text-white sm:text-3xl">
          Ready to see your agent's risk score?
        </h2>
        <Link
          href="/scan"
          className="group early-access-btn inline-flex items-center gap-2 rounded-lg border border-teal/60 bg-teal/15 px-6 py-3 text-sm font-medium text-teal transition-all hover:bg-teal/25"
        >
          Scan Your Agent Free
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </motion.section>
    </div>
  );
}

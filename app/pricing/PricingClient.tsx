"use client";

/* ultrareview-ready
 * Reviewer checklist:
 *  - Plan cards are pure data — pricing/features are static per spec.
 *  - "Get Early Access" opens an inline modal; submits to /api/waitlist.
 *  - FAQ is a single-state accordion (one open at a time).
 *  - All entrance animations use fade-up with stagger 0.15s.
 */

import { AnimatePresence, motion } from "framer-motion";
import { Check, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GlassCard, SectionBadge } from "@/components/GlassCard";
import { useToast } from "@/components/Toast";
import { cn } from "@/lib/cn";

type Feature = { label: string; included: boolean };

const PLANS: Array<{
  name: string;
  price: string;
  cadence: string;
  badge: string;
  highlighted?: boolean;
  features: Feature[];
  cta: { label: string; kind: "link" | "modal" | "mailto"; href?: string };
}> = [
  {
    name: "FREE",
    price: "$0",
    cadence: "forever",
    badge: "GET STARTED",
    features: [
      { label: "3 agent scans per month", included: true },
      { label: "20 attack categories", included: true },
      { label: "Risk score + findings report", included: true },
      { label: "Email delivery of results", included: true },
      { label: "Runtime monitoring", included: false },
      { label: "On-chain audit trail", included: false },
      { label: "Fleet dashboard", included: false },
    ],
    cta: { label: "Start Scanning Free", kind: "link", href: "/scan" },
  },
  {
    name: "PRO",
    price: "$299",
    cadence: "per month",
    badge: "MOST POPULAR",
    highlighted: true,
    features: [
      { label: "Unlimited agent scans", included: true },
      { label: "20 attack categories", included: true },
      { label: "Risk score + findings report", included: true },
      { label: "Runtime monitoring sidecar (SDK)", included: true },
      { label: "Fleet dashboard (up to 10 agents)", included: true },
      { label: "On-chain audit trail", included: true },
      { label: "Email + Slack alerts", included: true },
      { label: "Custom attack profiles", included: false },
      { label: "Dedicated compliance reporting", included: false },
    ],
    cta: { label: "Get Early Access", kind: "modal" },
  },
  {
    name: "ENTERPRISE",
    price: "Custom",
    cadence: "",
    badge: "CONTACT US",
    features: [
      { label: "Everything in Pro", included: true },
      { label: "Unlimited agents", included: true },
      { label: "Custom red-team attack profiles", included: true },
      { label: "EU AI Act compliance reports", included: true },
      { label: "SOC2 audit-ready exports", included: true },
      { label: "SLA + incident response retainer", included: true },
      { label: "Private deployment option", included: true },
      { label: "Dedicated security engineer", included: true },
    ],
    cta: { label: "Talk to Sales", kind: "mailto", href: "mailto:hello@driftwall.ai" },
  },
];

const FAQ: Array<{ q: string; a: string }> = [
  {
    q: "How does the free scanner work?",
    a: "Paste your agent config or select a framework preset. We run 20 adversarial attack categories and return a risk score with detailed findings. No account required.",
  },
  {
    q: "What frameworks do you support?",
    a: "LangChain, AutoGen, and CrewAI presets are built in. Custom configs work for any agent framework — paste the JSON or YAML and we'll analyse it.",
  },
  {
    q: "What is the on-chain audit trail?",
    a: "Every agent action monitored by Driftwall is cryptographically signed and written to an immutable blockchain log. This creates a tamper-evident record of what your agent did and when — exactly what EU AI Act compliance requires.",
  },
  {
    q: "Is my agent config data kept private?",
    a: "Yes. Config data is used only to run the security scan and is not stored permanently or shared. Scan results are stored only if you provide an email address.",
  },
  {
    q: "Can I use Driftwall on my existing agents without code changes?",
    a: "The scanner requires only a config paste — no code changes. The runtime monitor is a lightweight sidecar that wraps your existing agent in under 10 lines of code.",
  },
];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  };
}

export function PricingClient() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-24">
      {/* Hero */}
      <section className="relative isolate">
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 -top-32 -z-10 h-[500px] w-[500px] -translate-x-1/2"
        >
          <span
            className="orb-float block h-full w-full rounded-full blur-[120px]"
            style={{ background: "radial-gradient(closest-side, rgba(0,212,255,0.1), transparent 70%)" }}
          />
        </span>
        <motion.div {...fadeUp(0)} className="flex flex-col items-center text-center">
          <SectionBadge>Simple Pricing</SectionBadge>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl">
            Start free.{" "}
            <span className="bg-gradient-to-r from-white to-teal bg-clip-text text-transparent">
              Scale when you're ready.
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/65">
            No contracts. No hidden fees. Cancel anytime.
          </p>
        </motion.div>
      </section>

      {/* Plans */}
      <section className="grid gap-6 md:grid-cols-3 md:items-stretch">
        {PLANS.map((p, i) => (
          <motion.div key={p.name} {...fadeUp(0.15 * i)}>
            <PlanCard plan={p} onEarlyAccess={() => setModalOpen(true)} />
          </motion.div>
        ))}
      </section>

      {/* FAQ */}
      <section>
        <motion.div {...fadeUp(0)}>
          <SectionBadge>FAQ</SectionBadge>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold text-white sm:text-4xl">
            Questions, answered.
          </h2>
        </motion.div>
        <motion.div {...fadeUp(0.15)} className="mt-8">
          <Accordion items={FAQ} />
        </motion.div>
      </section>

      <EarlyAccessModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

function PlanCard({
  plan,
  onEarlyAccess,
}: {
  plan: (typeof PLANS)[number];
  onEarlyAccess: () => void;
}) {
  const cta = plan.cta;
  const inner = (
    <>
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em]",
            plan.highlighted
              ? "border-teal/50 bg-teal/10 text-teal"
              : "border-white/10 bg-white/5 text-white/55",
          )}
        >
          {plan.badge}
        </span>
        <span className="text-xs uppercase tracking-widest text-white/40">{plan.name}</span>
      </div>
      <div className="mt-6 flex items-end gap-2">
        <span
          className={cn(
            "text-5xl font-extrabold leading-none tracking-tight",
            plan.highlighted ? "gradient-stat" : "text-white",
          )}
        >
          {plan.price}
        </span>
        {plan.cadence && (
          <span className="pb-1 text-sm text-white/50">/ {plan.cadence}</span>
        )}
      </div>
      <ul className="mt-7 flex flex-col gap-3">
        {plan.features.map((f) => (
          <li key={f.label} className="flex items-start gap-2.5 text-sm">
            {f.included ? (
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-ok" />
            ) : (
              <X className="mt-0.5 h-4 w-4 shrink-0 text-white/25" />
            )}
            <span className={cn(f.included ? "text-white/85" : "text-white/30 line-through")}>
              {f.label}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        {cta.kind === "link" && cta.href && (
          <Link
            href={cta.href}
            className={cn(
              "inline-flex w-full items-center justify-center rounded-lg border px-4 py-2.5 text-sm font-medium transition-all",
              plan.highlighted
                ? "early-access-btn border-teal/60 bg-teal/15 text-teal hover:bg-teal/25"
                : "border-white/15 bg-white/5 text-white/85 hover:border-teal/40 hover:text-teal",
            )}
          >
            {cta.label}
          </Link>
        )}
        {cta.kind === "modal" && (
          <button
            onClick={onEarlyAccess}
            className={cn(
              "inline-flex w-full items-center justify-center rounded-lg border px-4 py-2.5 text-sm font-medium transition-all",
              plan.highlighted
                ? "early-access-btn border-teal/60 bg-teal/15 text-teal hover:bg-teal/25"
                : "border-white/15 bg-white/5 text-white/85 hover:border-teal/40 hover:text-teal",
            )}
          >
            {cta.label}
          </button>
        )}
        {cta.kind === "mailto" && cta.href && (
          <a
            href={cta.href}
            className="inline-flex w-full items-center justify-center rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/85 transition-all hover:border-teal/40 hover:text-teal"
          >
            {cta.label}
          </a>
        )}
      </div>
    </>
  );

  if (plan.highlighted) {
    return (
      <div
        className="glass relative h-full rounded-2xl border-teal/40 p-6"
        style={{ boxShadow: "0 0 40px rgba(0,212,255,0.18)" }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,212,255,0.06) 0%, transparent 60%)",
          }}
        />
        <div className="relative">{inner}</div>
      </div>
    );
  }

  return <GlassCard hover className="h-full">{inner}</GlassCard>;
}

function Accordion({ items }: { items: Array<{ q: string; a: string }> }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = openIdx === i;
        return (
          <div
            key={item.q}
            className={cn(
              "overflow-hidden rounded-xl border transition-colors",
              isOpen ? "border-teal/30 bg-white/[0.04]" : "border-white/10 bg-white/[0.02]",
            )}
          >
            <button
              onClick={() => setOpenIdx(isOpen ? null : i)}
              className="flex w-full items-center justify-between px-5 py-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-medium text-white">{item.q}</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 text-white/50 transition-transform duration-300",
                  isOpen && "rotate-180 text-teal",
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <p className="px-5 pb-4 text-sm leading-relaxed text-white/70">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function EarlyAccessModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.show({ kind: "error", title: "Enter a valid email" });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, source: "pricing-pro" }),
      });
      if (!res.ok) throw new Error("failed");
      toast.show({
        kind: "success",
        title: "You're on the list",
        description: "We'll email you when Pro opens up.",
      });
      setEmail("");
      onClose();
    } catch {
      toast.show({ kind: "error", title: "Couldn't save email", description: "Try again in a moment." });
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
          className="fixed inset-0 z-[80] flex items-center justify-center bg-navy-950/80 backdrop-blur-sm px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="glass w-full max-w-md rounded-2xl border-teal/30 p-6"
            style={{ boxShadow: "0 0 40px rgba(0,212,255,0.18)" }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Get early access to Pro</h3>
              <button onClick={onClose} className="text-white/50 hover:text-white" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-2 text-sm text-white/60">
              Drop your email and we'll let you know the day Pro opens up.
            </p>
            <form onSubmit={submit} className="mt-5 flex flex-col gap-3">
              <input
                autoFocus
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full rounded-md border border-white/10 bg-navy-900/70 px-3 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-teal/60 focus:outline-none"
              />
              <button
                type="submit"
                disabled={submitting}
                className="early-access-btn rounded-md border border-teal/60 bg-teal/15 px-4 py-2.5 text-sm font-medium text-teal transition-all hover:bg-teal/25 disabled:opacity-50"
              >
                {submitting ? "Sending…" : "Request Early Access"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

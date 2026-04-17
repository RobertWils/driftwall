import { SectionBadge } from "@/components/GlassCard";
import { ScannerClient } from "./ScannerClient";

export const metadata = {
  title: "Scanner · Driftwall",
};

export default function ScanPage() {
  return (
    <section className="relative">
      <div className="pointer-events-none absolute inset-0 grid-bg" />
      <div className="relative mx-auto max-w-5xl px-4 pb-24 pt-16 sm:px-8">
        <SectionBadge>SECURITY SCANNER · FREE</SectionBadge>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Red-Team Your Agent
        </h1>
        <p className="mt-4 max-w-2xl text-base text-white/65">
          Paste your agent config or select a framework preset. Driftwall runs 20 adversarial attack
          categories including the OWASP ASI Top 10, then scores the result.
        </p>

        <div className="mt-10">
          <ScannerClient />
        </div>
      </div>
    </section>
  );
}

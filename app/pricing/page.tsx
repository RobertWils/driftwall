import { PricingClient } from "./PricingClient";

export const metadata = {
  title: "Pricing · Driftwall",
  description:
    "Start free. Scale when you're ready. No contracts. No hidden fees. Cancel anytime.",
};

export default function PricingPage() {
  return (
    <section className="relative">
      <div className="pointer-events-none absolute inset-0 grid-bg" />
      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-20 sm:px-8">
        <PricingClient />
      </div>
    </section>
  );
}

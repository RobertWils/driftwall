import { AboutClient } from "./AboutClient";

export const metadata = {
  title: "About · Driftwall",
  description:
    "AI agents are the most dangerous thing your team ships without a security review. Here's why Driftwall exists.",
};

export default function AboutPage() {
  return (
    <section className="relative">
      <div className="pointer-events-none absolute inset-0 grid-bg" />
      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-20 sm:px-8">
        <AboutClient />
      </div>
    </section>
  );
}

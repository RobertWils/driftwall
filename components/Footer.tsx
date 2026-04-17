import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/5 bg-navy-950/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-white">DW</span>
            <span className="font-semibold text-teal">|</span>
            <span className="ml-2 text-sm uppercase tracking-[0.28em] text-white/50">Driftwall</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-white/55">
            We secure what acts — not just what runs.
          </p>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-white/40">Product</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li><Link href="/scan" className="hover:text-teal">Scanner</Link></li>
            <li><Link href="/dashboard" className="hover:text-teal">Dashboard</Link></li>
            <li><Link href="/scan" className="hover:text-teal">Audit Trail</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-white/40">Resources</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li><span className="opacity-60">OWASP ASI Top 10</span></li>
            <li><span className="opacity-60">EU AI Act</span></li>
            <li><span className="opacity-60">Changelog</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 py-5 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Driftwall. Prototype.
      </div>
      <div className="border-t border-white/10 py-10">
        <div className="flex flex-col items-center">
          <a
            href="https://singularityventurehub.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex"
          >
            <Image
              src="https://singularityventurehub.ai/brand/SVH_Primary%20Logo_Reverse_Transparent.png"
              alt="Singularity Venture Hub"
              width={140}
              height={46}
              className="opacity-90 transition-opacity hover:opacity-100"
              unoptimized={true}
            />
          </a>
          <p className="mt-2 text-xs text-white/50">
            A Singularity Venture Hub Portfolio Company
          </p>
        </div>
      </div>
    </footer>
  );
}

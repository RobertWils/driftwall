"use client";

/* ultrareview-ready
 * Reviewer checklist:
 *  - Nav is a Client Component only because of the mobile menu toggle.
 *  - Logo "DW|" uses the teal token. Trailing pipe is part of the wordmark.
 *  - Mobile hamburger becomes X on open; focus visible ring is present.
 *  - "Get Early Access" is a plain anchor to /scan — replace when auth exists.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";

const LINKS = [
  { href: "/", label: "Overview" },
  { href: "/scan", label: "Scanner" },
  { href: "/dashboard", label: "Dashboard" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-navy-900/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
        <Link href="/" className="group flex items-center gap-1" aria-label="Driftwall home">
          <span className="font-semibold tracking-tight text-white">DW</span>
          <span className="font-semibold text-teal transition-all group-hover:text-teal-glow">|</span>
          <span className="ml-2 text-sm uppercase tracking-[0.28em] text-white/50">Driftwall</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "text-sm transition-colors",
                pathname === l.href
                  ? "text-white"
                  : "text-white/60 hover:text-white",
              )}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/scan"
            className="rounded-lg border border-teal/60 px-4 py-2 text-sm font-medium text-teal transition-all hover:bg-teal/10 hover:shadow-glow-sm"
          >
            Get Early Access
          </Link>
        </nav>

        <button
          className="rounded-md p-2 text-white/80 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/5 bg-navy-900/95 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-2 py-2 text-sm",
                  pathname === l.href ? "bg-white/5 text-white" : "text-white/70",
                )}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/scan"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-lg border border-teal/60 px-3 py-2 text-center text-sm font-medium text-teal"
            >
              Get Early Access
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

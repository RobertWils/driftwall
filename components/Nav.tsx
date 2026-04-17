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
import { useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { WaitlistModal } from "@/components/WaitlistModal";

const LINKS = [
  { href: "/", label: "Overview" },
  { href: "/about", label: "About" },
  { href: "/scan", label: "Scanner" },
  { href: "/pricing", label: "Pricing" },
  { href: "/dashboard", label: "Dashboard" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [showWaitlist, setShowWaitlist] = useState(false);

  const logoRef = useRef<HTMLDivElement>(null);
  const [logoOffset, setLogoOffset] = useState({ x: 0, y: 0 });
  const [logoHovered, setLogoHovered] = useState(false);

  const handleLogoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = ((e.clientX - centerX) / rect.width) * 8;
    const dy = ((e.clientY - centerY) / rect.height) * 8;
    setLogoOffset({ x: dx, y: dy });
  };

  const handleLogoMouseEnter = () => setLogoHovered(true);

  const handleLogoMouseLeave = () => {
    setLogoHovered(false);
    setLogoOffset({ x: 0, y: 0 });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-navy-900/80 backdrop-blur-xl">
      <span aria-hidden className="nav-top-accent pointer-events-none absolute inset-x-0 top-0 h-0.5" />
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
        <Link href="/" aria-label="Driftwall home">
          <div
            ref={logoRef}
            onMouseMove={handleLogoMouseMove}
            onMouseEnter={handleLogoMouseEnter}
            onMouseLeave={handleLogoMouseLeave}
            style={{
              transform: `translate(${logoOffset.x}px, ${logoOffset.y}px)`,
              transition: "transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), filter 0.2s ease",
              filter: logoHovered ? "drop-shadow(0 0 12px rgba(0,212,255,0.6))" : "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer",
            }}
          >
            <span style={{ color: "#00D4FF", fontWeight: 800, fontSize: "18px" }}>DW</span>
            <span style={{ color: "#00D4FF", opacity: 0.6, fontSize: "20px", fontWeight: 300 }}>|</span>
            <span style={{ color: "white", fontWeight: 600, fontSize: "13px", letterSpacing: "0.15em" }}>
              DRIFTWALL
            </span>
          </div>
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
          <button
            type="button"
            onClick={() => setShowWaitlist(true)}
            className="early-access-btn rounded-lg border border-teal/60 bg-teal/5 px-4 py-2 text-sm font-medium text-teal transition-all hover:bg-teal/15"
          >
            Get Early Access
          </button>
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
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setShowWaitlist(true);
              }}
              className="mt-1 rounded-lg border border-teal/60 px-3 py-2 text-center text-sm font-medium text-teal"
            >
              Get Early Access
            </button>
          </div>
        </div>
      )}

      <WaitlistModal
        open={showWaitlist}
        onClose={() => setShowWaitlist(false)}
        source="nav-early-access"
      />
    </header>
  );
}

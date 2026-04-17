import { cn } from "@/lib/cn";
import type { HTMLAttributes, ReactNode } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  hover?: boolean;
  as?: "div" | "section" | "article";
};

export function GlassCard({ children, className, hover = false, as: Tag = "div", ...rest }: Props) {
  return (
    <Tag
      className={cn(
        "glass rounded-2xl p-6",
        hover && "glass-hover",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function SectionBadge({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/[0.08] py-1 pl-3 pr-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-teal/90 backdrop-blur-sm">
      <span aria-hidden className="absolute inset-y-1 left-0 w-0.5 rounded-full bg-teal/80" />
      {children}
    </span>
  );
}

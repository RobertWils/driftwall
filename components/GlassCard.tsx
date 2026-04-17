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
        "glass rounded-2xl p-6 transition-all duration-300",
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
    <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-teal/90">
      <span className="h-px w-6 bg-teal/60" />
      {children}
    </span>
  );
}

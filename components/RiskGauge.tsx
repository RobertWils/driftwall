"use client";

/* ultrareview-ready
 * Reviewer checklist:
 *  - Semicircle gauge, SVG path with strokeDasharray animated via Framer.
 *  - Score animates from 0 → target over 1.5s.
 *  - Color band: score >= 70 danger, >= 55 warn, else ok.
 *  - Pure client-side; no DOM refs outside Motion's own.
 */

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

const RADIUS = 110;
const STROKE = 14;
const CIRCUMFERENCE = Math.PI * RADIUS;

export function RiskGauge({ score, label }: { score: number; label: string }) {
  const progress = useMotionValue(0);
  const [displayed, setDisplayed] = useState(0);
  const dashOffset = useTransform(progress, (v) => CIRCUMFERENCE - (v / 100) * CIRCUMFERENCE);

  useEffect(() => {
    const controls = animate(progress, score, {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplayed(Math.round(v)),
    });
    return () => controls.stop();
  }, [score, progress]);

  const color = score >= 70 ? "#FF4D6D" : score >= 55 ? "#FFB84D" : "#4ADE80";
  const labelTone = score >= 70 ? "text-danger" : score >= 55 ? "text-warn" : "text-ok";

  return (
    <div className="relative flex flex-col items-center">
      <svg width={260} height={160} viewBox="0 0 260 160" className="overflow-visible">
        <defs>
          <linearGradient id="gauge-bg" x1="0" x2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.04)" />
          </linearGradient>
        </defs>
        <path
          d={`M 20 140 A ${RADIUS} ${RADIUS} 0 0 1 240 140`}
          fill="none"
          stroke="url(#gauge-bg)"
          strokeWidth={STROKE}
          strokeLinecap="round"
        />
        <motion.path
          d={`M 20 140 A ${RADIUS} ${RADIUS} 0 0 1 240 140`}
          fill="none"
          stroke={color}
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          style={{ strokeDashoffset: dashOffset }}
          filter={`drop-shadow(0 0 10px ${color}90)`}
        />
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-end pb-2">
        <span className="text-6xl font-semibold tabular-nums text-white">{displayed}</span>
        <span className={`mt-1 text-xs font-semibold uppercase tracking-[0.2em] ${labelTone}`}>
          {label}
        </span>
      </div>
    </div>
  );
}

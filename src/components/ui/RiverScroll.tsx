"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/** Logo-inspired river line that is drawn as the visitor scrolls (desktop only). */
export function RiverScroll() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const length = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  if (reduce) return null;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 60 1000"
      preserveAspectRatio="none"
      className="pointer-events-none fixed left-3 top-24 bottom-6 z-10 hidden w-8 xl:block"
      style={{ height: "calc(100vh - 7.5rem)" }}
      fill="none"
    >
      <path
        d="M30 0 C55 80 5 140 30 220 C55 300 5 360 30 440 C55 520 5 580 30 660 C55 740 5 800 30 880 C45 930 30 970 30 1000"
        stroke="rgba(106,170,90,0.15)"
        strokeWidth={3}
      />
      <motion.path
        d="M30 0 C55 80 5 140 30 220 C55 300 5 360 30 440 C55 520 5 580 30 660 C55 740 5 800 30 880 C45 930 30 970 30 1000"
        stroke="#039833"
        strokeWidth={3}
        strokeLinecap="round"
        style={{ pathLength: length, filter: "drop-shadow(0 0 6px #039833)" }}
      />
    </svg>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";

export function AnimatedRiver() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <svg
      aria-hidden="true"
      className="absolute inset-x-0 bottom-0 h-44 w-full text-[var(--color-primary)] opacity-20"
      fill="none"
      preserveAspectRatio="none"
      viewBox="0 0 1440 220"
    >
      <motion.path
        d="M-40 150C119 74 227 218 392 137c154-76 249-79 387 7 148 92 259 50 371-24 100-66 210-61 330 34"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="18"
        initial={shouldReduceMotion ? false : { pathLength: 0, opacity: 0 }}
        animate={shouldReduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.1, ease: "easeOut" }}
      />
      <motion.path
        d="M-20 184C158 101 254 238 424 170c149-60 248-58 384 18 164 92 281 25 382-38 86-54 186-45 272 21"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="4"
        initial={shouldReduceMotion ? false : { pathLength: 0, opacity: 0 }}
        animate={shouldReduceMotion ? undefined : { pathLength: 1, opacity: 0.6 }}
        transition={{ delay: 0.3, duration: 2.4, ease: "easeOut" }}
      />
    </svg>
  );
}

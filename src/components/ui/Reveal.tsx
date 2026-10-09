"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = { children: ReactNode; className?: string; delay?: number; as?: "div" | "li" };

/** Fade + slide-up when the element enters the viewport. */
export function Reveal({ children, className, delay = 0, as = "div" }: Props) {
  const reduce = useReducedMotion();
  const Comp = as === "li" ? motion.li : motion.div;

  if (reduce) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </Comp>
  );
}

"use client";

import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

type AnimatedCounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
};

export function AnimatedCounter({ value, prefix = "", suffix = "" }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const shouldReduceMotion = useReducedMotion();
  const motionValue = useMotionValue(shouldReduceMotion ? value : 0);
  const rounded = useTransform(motionValue, (latest) => {
    const formatted = Math.round(latest).toLocaleString("es-PE");
    return `${prefix}${formatted}${suffix}`;
  });

  useEffect(() => {
    if (!inView || shouldReduceMotion) {
      return;
    }

    const controls = animate(motionValue, value, {
      duration: 1.5,
      ease: "easeOut"
    });

    return () => controls.stop();
  }, [inView, motionValue, shouldReduceMotion, value]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

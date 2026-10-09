"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = { value: number; prefix?: string; locale: string };

/** Counts up from 0 to `value` the first time it scrolls into view. */
export function Counter({ value, prefix = "", locale }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const fmt = new Intl.NumberFormat(locale);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v))
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  // SSR / no-JS renders the real number; animation only starts once visible.
  return (
    <span ref={ref} aria-label={`${prefix}${fmt.format(value)}`}>
      <span aria-hidden="true">
        {prefix}
        {fmt.format(display)}
      </span>
    </span>
  );
}

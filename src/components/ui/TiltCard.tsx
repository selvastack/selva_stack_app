"use client";

import type { PointerEvent, ReactNode } from "react";
import { useRef } from "react";

type Props = { children: ReactNode; className?: string };

/** Card with a subtle 3D tilt that follows the pointer (mouse only). */
export function TiltCard({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.setProperty("--rx", `${(-y * 8).toFixed(2)}deg`);
    ref.current.style.setProperty("--ry", `${(x * 10).toFixed(2)}deg`);
  }

  function reset() {
    ref.current?.style.setProperty("--rx", "0deg");
    ref.current?.style.setProperty("--ry", "0deg");
  }

  return (
    <div ref={ref} className={`card tilt ${className}`} onPointerMove={onMove} onPointerLeave={reset}>
      {children}
    </div>
  );
}

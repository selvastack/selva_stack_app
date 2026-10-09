"use client";

import { useEffect, useRef } from "react";

const GLYPHS = ["{", "}", "<", "/>", "0", "1", "=>", ";", "()", "[]"];

type P = { x: number; y: number; vy: number; vx: number; g: string; life: number; size: number };

/**
 * Lightweight canvas: code glyphs drift upwards and morph into leaves.
 * Mounted only on desktop and when the user allows motion.
 */
export function HeroParticles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const desktop = window.matchMedia("(min-width: 1024px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!desktop || reduce) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const spawn = (): P => ({
      x: Math.random() * w,
      y: h + Math.random() * 80,
      vy: 0.25 + Math.random() * 0.5,
      vx: (Math.random() - 0.5) * 0.2,
      g: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
      life: 0,
      size: 10 + Math.random() * 8
    });
    const ps: P[] = Array.from({ length: 46 }, () => ({ ...spawn(), y: Math.random() * h }));

    const leaf = (x: number, y: number, s: number, a: number, rot: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.globalAlpha = a;
      ctx.fillStyle = "#6aaa5a";
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.quadraticCurveTo(s * 0.8, 0, 0, s);
      ctx.quadraticCurveTo(-s * 0.8, 0, 0, -s);
      ctx.fill();
      ctx.restore();
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        p.y -= p.vy;
        p.x += p.vx + Math.sin((p.y + i * 40) / 60) * 0.15;
        // progress 0 at the bottom → 1 near the top: glyph fades out, leaf fades in
        const t = Math.min(1, Math.max(0, 1 - p.y / h) * 1.4);
        const fade = Math.min(1, p.y / 60);
        if (t < 0.7) {
          ctx.globalAlpha = (1 - t / 0.7) * 0.55 * fade;
          ctx.fillStyle = "#039833";
          ctx.font = `${p.size}px ui-monospace, monospace`;
          ctx.fillText(p.g, p.x, p.y);
        }
        if (t > 0.45) leaf(p.x, p.y, p.size * 0.45, ((t - 0.45) / 0.55) * 0.5 * fade, p.y / 90);
        if (p.y < -20) ps[i] = spawn();
      }
      ctx.globalAlpha = 1;
      if (visible) raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(tick);
    });
    io.observe(canvas);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block" />;
}

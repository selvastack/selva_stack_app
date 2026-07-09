"use client";

import { motion, useReducedMotion } from "framer-motion";

import { fadeUp } from "@/lib/motion";

type SectionTitleProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "center",
  className = ""
}: SectionTitleProps) {
  const shouldReduceMotion = useReducedMotion();
  const isCenter = align === "center";

  return (
    <motion.div
      className={`mx-auto max-w-3xl ${isCenter ? "text-center" : "text-left"} ${className}`}
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
    >
      <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.22em] text-[var(--color-primary)]">
        {eyebrow}
      </p>
      <h2 className="text-balance text-3xl font-black leading-tight text-[var(--color-text-dark)] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-pretty text-base leading-8 text-[var(--color-text-muted)] sm:text-lg">
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}

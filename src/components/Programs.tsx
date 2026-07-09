"use client";

import { motion, useReducedMotion } from "framer-motion";

import { fadeUp, staggerContainer } from "@/lib/motion";
import type { LandingContent } from "@/lib/types";

import { Icon } from "./Icon";
import { SectionTitle } from "./SectionTitle";

type ProgramsProps = {
  content: LandingContent["programs"];
};

export function Programs({ content }: ProgramsProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="section-shell bg-white" id="programas">
      <SectionTitle {...content.section} />
      <motion.div
        className="mx-auto mt-12 grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-5"
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        {content.items.map((program) => (
          <motion.article className="card-surface flex min-h-72 flex-col p-6" key={program.id} variants={fadeUp}>
            <div className="mb-6 flex items-center justify-between gap-3">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-mint)] text-[var(--color-primary)]">
                <Icon name={program.icon} />
              </span>
              <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs font-extrabold text-[var(--color-primary)]">
                {program.focus}
              </span>
            </div>
            <h3 className="text-2xl font-black text-[var(--color-text-dark)]">{program.name}</h3>
            <p className="mt-4 text-sm leading-7 text-[var(--color-text-muted)]">{program.summary}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

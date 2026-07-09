"use client";

import { motion, useReducedMotion } from "framer-motion";

import { fadeUp, staggerContainer } from "@/lib/motion";
import type { LandingContent } from "@/lib/types";

import { Icon } from "./Icon";
import { SectionTitle } from "./SectionTitle";

type ProblemSectionProps = {
  content: LandingContent["problems"];
};

export function ProblemSection({ content }: ProblemSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="section-shell bg-white" id="por-que-existe">
      <SectionTitle {...content.section} />
      <motion.div
        className="mx-auto mt-12 grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4"
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        {content.items.map((item) => (
          <motion.article className="card-surface group p-6" key={item.id} variants={fadeUp}>
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-mint)] text-[var(--color-primary)] transition group-hover:scale-105">
              <Icon name={item.icon} />
            </div>
            <h3 className="text-xl font-black text-[var(--color-text-dark)]">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">{item.description}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

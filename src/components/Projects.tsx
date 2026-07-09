"use client";

import { motion, useReducedMotion } from "framer-motion";

import { fadeUp, staggerContainer } from "@/lib/motion";
import type { LandingContent } from "@/lib/types";

import { Icon } from "./Icon";
import { SectionTitle } from "./SectionTitle";

type ProjectsProps = {
  content: LandingContent["projects"];
};

export function Projects({ content }: ProjectsProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="section-shell bg-[var(--color-mint)]" id="proyectos">
      <SectionTitle {...content.section} />
      <motion.div
        className="mx-auto mt-12 grid max-w-7xl gap-5 md:grid-cols-2"
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        {content.items.map((project) => (
          <motion.article className="card-surface p-6 sm:p-7" key={project.id} variants={fadeUp}>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-mint)] text-[var(--color-primary)]">
                <Icon name={project.icon} />
              </div>
              <div>
                <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-[var(--color-primary)]">
                  {project.status}
                </span>
                <h3 className="mt-4 text-2xl font-black text-[var(--color-text-dark)]">{project.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">{project.description}</p>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

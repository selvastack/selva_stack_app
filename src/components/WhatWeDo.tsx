"use client";

import { motion, useReducedMotion } from "framer-motion";

import { fadeUp, staggerContainer } from "@/lib/motion";
import type { LandingContent } from "@/lib/types";

import { Icon } from "./Icon";
import { SectionTitle } from "./SectionTitle";

type WhatWeDoProps = {
  content: LandingContent["whatWeDo"];
};

export function WhatWeDo({ content }: WhatWeDoProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="section-shell relative overflow-hidden bg-[var(--color-mint)]" id="que-hacemos">
      <div aria-hidden="true" className="absolute inset-0 tech-grid opacity-55" />
      <div className="relative z-10">
        <SectionTitle {...content.section} />
        <motion.div
          className="mx-auto mt-12 grid max-w-7xl gap-5 lg:grid-cols-5"
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          {content.items.map((item, index) => (
            <motion.article
              className={`card-surface p-6 ${index === 0 ? "lg:col-span-2" : ""}`}
              key={item.id}
              variants={fadeUp}
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(10,105,9,0.1)] text-[var(--color-primary)]">
                <Icon name={item.icon} />
              </div>
              <h3 className="text-xl font-black text-[var(--color-text-dark)]">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">{item.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

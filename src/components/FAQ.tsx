"use client";

import { motion, useReducedMotion } from "framer-motion";

import { fadeUp, staggerContainer } from "@/lib/motion";
import type { LandingContent } from "@/lib/types";

import { SectionTitle } from "./SectionTitle";

type FAQProps = {
  content: LandingContent["faqs"];
};

export function FAQ({ content }: FAQProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="section-shell bg-[var(--color-mint)]" id="faq">
      <SectionTitle {...content.section} />
      <motion.div
        className="mx-auto mt-12 grid max-w-4xl gap-3"
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        {content.items.map((item) => (
          <motion.details className="faq-item group" key={item.id} variants={fadeUp}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </motion.details>
        ))}
      </motion.div>
    </section>
  );
}

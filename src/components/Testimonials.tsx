"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";

import { fadeUp, staggerContainer } from "@/lib/motion";
import type { LandingContent } from "@/lib/types";

import { SectionTitle } from "./SectionTitle";

type TestimonialsProps = {
  content: LandingContent["testimonials"];
};

export function Testimonials({ content }: TestimonialsProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="section-shell bg-white" id="comunidad">
      <SectionTitle {...content.section} />
      <motion.div
        className="mx-auto mt-12 grid max-w-4xl gap-5"
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        {content.items.map((testimonial) => (
          <motion.figure
            className="card-surface overflow-hidden p-7 text-center sm:p-9"
            key={testimonial.id}
            variants={fadeUp}
          >
            <Quote aria-hidden="true" className="mx-auto text-[var(--color-primary)]" size={36} />
            <blockquote className="mt-5 text-balance text-xl font-bold leading-9 text-[var(--color-text-dark)]">
              “{testimonial.quote}”
            </blockquote>
            <figcaption className="mt-6 text-sm leading-6 text-[var(--color-text-muted)]">
              <strong className="block text-[var(--color-primary-dark)]">{testimonial.author}</strong>
              {testimonial.role}
              <span className="mt-2 block text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-primary-soft)]">
                {testimonial.sourceStatus}
              </span>
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>
    </section>
  );
}

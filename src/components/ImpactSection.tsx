"use client";

import { motion, useReducedMotion } from "framer-motion";

import { fadeUp, staggerContainer } from "@/lib/motion";
import type { DonationContent, LandingContent } from "@/lib/types";

import { AnimatedCounter } from "./AnimatedCounter";
import { SectionTitle } from "./SectionTitle";

type ImpactSectionProps = {
  content: LandingContent["impact"];
  donation: DonationContent;
};

export function ImpactSection({ content, donation }: ImpactSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="section-shell relative overflow-hidden bg-[var(--color-black-green)] text-white" id="impacto">
      <div aria-hidden="true" className="absolute inset-0 tech-grid opacity-15" />
      <div aria-hidden="true" className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[rgba(10,105,9,0.38)] blur-3xl" />
      <div className="relative z-10">
        <SectionTitle
          align="center"
          className="[&>h2]:text-white [&>p:last-child]:text-white/72"
          {...content.section}
        />

        <motion.div
          className="mx-auto mt-12 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4"
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          {content.items.map((metric) => (
            <motion.article
              className="rounded-[1.25rem] border border-white/12 bg-white/[0.06] p-6 text-center backdrop-blur"
              key={metric.id}
              variants={fadeUp}
            >
              <p className="text-4xl font-black text-white sm:text-5xl">
                <AnimatedCounter prefix={metric.prefix} suffix={metric.suffix} value={metric.value} />
              </p>
              <p className="mt-3 text-sm font-semibold leading-6 text-white/72">{metric.label}</p>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="mx-auto mt-10 grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-5"
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          {donation.amounts.map((amount) => (
            <motion.article
              className="rounded-[1.25rem] border border-white/12 bg-white/[0.05] p-5"
              key={amount.id}
              variants={fadeUp}
            >
              <p className="text-xl font-black text-white">{amount.label}</p>
              <p className="mt-3 text-sm leading-7 text-white/70">{amount.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

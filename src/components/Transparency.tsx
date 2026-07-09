"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FileText, Mail } from "lucide-react";

import { fadeUp, staggerContainer } from "@/lib/motion";
import type { TransparencyContent } from "@/lib/types";

import { CTAButton } from "./CTAButton";
import { Icon } from "./Icon";
import { SectionTitle } from "./SectionTitle";

type TransparencyProps = {
  content: TransparencyContent;
};

export function Transparency({ content }: TransparencyProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="section-shell bg-white" id="transparencia">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div>
          <SectionTitle align="left" {...content.section} />
          <p className="mt-6 rounded-[1.25rem] border border-[var(--color-border)] bg-[var(--color-mint)] p-5 text-sm font-semibold leading-7 text-[var(--color-primary-dark)]">
            {content.section.temporaryCopy}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <CTAButton className="gap-2" href="#proyectos" variant="secondary">
              <FileText aria-hidden="true" size={18} />
              Ver reportes
            </CTAButton>
            <CTAButton className="gap-2" href="#contacto" variant="ghost">
              <Mail aria-hidden="true" size={18} />
              Solicitar información
            </CTAButton>
          </div>
        </div>

        <motion.div
          className="grid gap-4 sm:grid-cols-2"
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          {content.items.map((item) => (
            <motion.article className="card-surface p-6" key={item.id} variants={fadeUp}>
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-mint)] text-[var(--color-primary)]">
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

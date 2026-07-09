"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";

import { findContactChannel } from "@/lib/contactChannels";
import { fadeUp, staggerContainer } from "@/lib/motion";
import type { ContactChannel, CorporateContent } from "@/lib/types";

import { CTAButton } from "./CTAButton";
import { Icon } from "./Icon";
import { SectionTitle } from "./SectionTitle";

type CorporateAlliesProps = {
  content: CorporateContent;
  contactChannels: ContactChannel[];
};

export function CorporateAllies({ content, contactChannels }: CorporateAlliesProps) {
  const shouldReduceMotion = useReducedMotion();
  const alliancesEmail = findContactChannel(contactChannels, "alliances");

  return (
    <section className="section-shell relative overflow-hidden bg-[var(--color-mint)]" id="empresas">
      <div aria-hidden="true" className="absolute inset-0 tech-grid opacity-55" />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <SectionTitle align="left" {...content.section} />
          <CTAButton className="mt-8 gap-2" href={alliancesEmail?.href ?? "#contacto"}>
            {content.section.cta}
            <ArrowRight aria-hidden="true" size={18} />
          </CTAButton>
          {alliancesEmail ? (
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white/80 px-4 py-3 text-sm font-black text-[var(--color-primary-dark)]">
              <Mail aria-hidden="true" size={18} />
              {alliancesEmail.email}
            </p>
          ) : null}
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

"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BadgeCheck, Mail } from "lucide-react";

import { findContactChannel } from "@/lib/contactChannels";
import { fadeUp, staggerContainer } from "@/lib/motion";
import type { ContactChannel, DonationContent } from "@/lib/types";

import { CTAButton } from "./CTAButton";
import { useDonation } from "./DonationProvider";
import { SectionTitle } from "./SectionTitle";

type DonationSectionProps = {
  donation: DonationContent;
  contactChannels: ContactChannel[];
};

export function DonationSection({ donation, contactChannels }: DonationSectionProps) {
  const { openDonation } = useDonation();
  const shouldReduceMotion = useReducedMotion();
  const donationEmail = findContactChannel(contactChannels, "donations");

  return (
    <section className="section-shell bg-white" id="donar">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div>
          <SectionTitle align="left" {...donation.section} />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CTAButton className="gap-2" onClick={openDonation}>
              Donar ahora
              <ArrowRight aria-hidden="true" size={18} />
            </CTAButton>
            <CTAButton href="#empresas" variant="secondary">
              Quiero donar como empresa
            </CTAButton>
          </div>
          <p className="mt-6 rounded-[1.25rem] border border-[var(--color-border)] bg-[var(--color-mint)] p-5 text-sm font-semibold leading-7 text-[var(--color-primary-dark)]">
            {donation.section.trustNote}
          </p>
          {donationEmail ? (
            <a
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-4 py-3 text-sm font-black text-[var(--color-primary-dark)] transition hover:bg-[var(--color-mint)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
              href={donationEmail.href}
            >
              <Mail aria-hidden="true" size={18} />
              {donationEmail.email}
            </a>
          ) : null}
        </div>

        <motion.div
          className="grid gap-4 sm:grid-cols-2"
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          {donation.amounts.map((amount) => (
            <motion.button
              className="card-surface group min-h-40 p-6 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary)]"
              key={amount.id}
              onClick={openDonation}
              type="button"
              variants={fadeUp}
            >
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--color-mint)] px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-[var(--color-primary)]">
                <BadgeCheck aria-hidden="true" size={15} />
                Aporte
              </span>
              <span className="block text-3xl font-black text-[var(--color-text-dark)]">{amount.label}</span>
              <span className="mt-3 block text-sm leading-7 text-[var(--color-text-muted)]">{amount.description}</span>
            </motion.button>
          ))}
          <motion.div className="card-surface bg-[var(--color-primary)] p-6 text-white" variants={fadeUp}>
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-white/70">Donación empresarial</p>
            <p className="mt-4 text-xl font-black">{donation.corporateDonationCopy}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

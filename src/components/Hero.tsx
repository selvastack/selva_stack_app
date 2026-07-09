"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ShieldCheck } from "lucide-react";
import Image from "next/image";

import { fadeUp, staggerContainer } from "@/lib/motion";
import type { HeroContent, SiteContent } from "@/lib/types";

import { AnimatedRiver } from "./AnimatedRiver";
import { CTAButton } from "./CTAButton";
import { useDonation } from "./DonationProvider";
import { TechBackground } from "./TechBackground";

type HeroProps = {
  hero: HeroContent;
  site: SiteContent;
};

export function Hero({ hero, site }: HeroProps) {
  const { openDonation } = useDonation();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="relative isolate flex min-h-[calc(100svh-76px)] items-center overflow-hidden bg-[linear-gradient(180deg,#f7fff7_0%,#eefcee_58%,#ffffff_100%)] px-4 py-12 sm:px-6 lg:px-8"
      id="inicio"
    >
      <TechBackground />
      <AnimatedRiver />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.04fr_0.96fr]">
        <motion.div
          animate="visible"
          className="max-w-3xl"
          initial={shouldReduceMotion ? false : "hidden"}
          variants={staggerContainer}
        >
          <motion.p
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white/82 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[var(--color-primary)] shadow-sm"
            variants={fadeUp}
          >
            <ShieldCheck aria-hidden="true" size={16} />
            {hero.eyebrow}
          </motion.p>
          <motion.h1
            className="mt-5 text-balance text-4xl font-black leading-[1.04] text-[var(--color-text-dark)] sm:text-5xl lg:text-6xl"
            variants={fadeUp}
          >
            {hero.title}
          </motion.h1>
          <motion.p
            className="mt-5 max-w-2xl text-pretty text-base leading-8 text-[var(--color-text-muted)] sm:text-lg"
            variants={fadeUp}
          >
            {hero.subtitle}
          </motion.p>
          <motion.div className="mt-6 flex flex-col gap-3 sm:flex-row" variants={fadeUp}>
            <CTAButton className="sm:min-w-44" onClick={openDonation}>
              {hero.primaryCta}
            </CTAButton>
            <CTAButton className="gap-2" href={hero.secondaryHref} variant="secondary">
              {hero.secondaryCta}
              <ArrowDown aria-hidden="true" size={17} />
            </CTAButton>
          </motion.div>
          <motion.p
            className="mt-5 max-w-xl text-sm font-medium leading-7 text-[var(--color-text-muted)]"
            variants={fadeUp}
          >
            {hero.microcopy}
          </motion.p>
          <motion.div className="mt-8 flex flex-wrap gap-3" variants={fadeUp}>
            {hero.trustBadges.map((badge) => (
              <span
                className="rounded-full border border-[var(--color-border)] bg-white/70 px-4 py-2 text-sm font-bold text-[var(--color-primary-dark)]"
                key={badge}
              >
                {badge}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          aria-label="Identidad visual de Selva Stack"
          className="relative mx-auto flex w-full max-w-lg items-center justify-center"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        >
          <div className="absolute inset-0 rounded-[3rem] bg-[rgba(10,105,9,0.18)] blur-3xl" />
          <motion.div
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    y: [0, -12, 0],
                    rotate: [0, 0.4, 0]
                  }
            }
            className="relative w-full rounded-[2rem] border border-[rgba(10,105,9,0.18)] bg-white/78 p-5 shadow-[0_30px_90px_rgba(4,22,4,0.16)] backdrop-blur"
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              alt={`${site.name} - ${site.tagline}`}
              className="mx-auto h-auto w-full max-w-[330px] object-contain"
              height={900}
              priority
              src={site.logo}
              width={800}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

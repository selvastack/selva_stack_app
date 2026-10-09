import { Bot, Box, Clapperboard, Code2, Glasses, Palette, Server, Smartphone, type LucideIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TiltCard } from "@/components/ui/TiltCard";
import { WaButton } from "@/components/ui/WaButton";
import { SECTION_IDS } from "@/lib/site";
import type { IdItem } from "@/lib/types";

const ICONS: Record<string, LucideIcon> = {
  software: Code2,
  mobile: Smartphone,
  infra: Server,
  ai: Bot,
  modeling3d: Box,
  animation3d: Clapperboard,
  virtual: Glasses,
  design: Palette
};

export async function Services() {
  const t = await getTranslations("services");
  const tw = await getTranslations("whatsapp");
  const items = t.raw("items") as IdItem[];

  return (
    <section id={SECTION_IDS.services} aria-labelledby="services-title" className="section-y">
      <div className="container-x">
        <SectionHeader id="services-title" eyebrow={t("eyebrow")} title={t("title")} text={t("subtitle")} />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((s, i) => {
            const Icon = ICONS[s.id] ?? Code2;
            return (
              <Reveal as="li" key={s.id} delay={(i % 4) * 0.06}>
                <TiltCard className="h-full p-6">
                  <span className="icon-chip">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-hueso">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{s.text}</p>
                </TiltCard>
              </Reveal>
            );
          })}
        </ul>
        <Reveal className="mt-12 flex flex-col items-start justify-between gap-5 rounded-2xl border border-cocona/30 bg-gradient-to-r from-selva/40 to-petroleo/60 p-6 sm:flex-row sm:items-center sm:p-8">
          <p className="font-display text-2xl text-hueso sm:text-3xl">{t("ctaTitle")}</p>
          <WaButton kind="project" message={tw("project")} className="btn btn-gold">
            {t("cta")}
          </WaButton>
        </Reveal>
      </div>
    </section>
  );
}

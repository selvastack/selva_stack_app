import { Cpu, Lightbulb, Sprout, WifiOff } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { TitleText } from "@/lib/types";

const ICONS = [WifiOff, Sprout, Cpu, Lightbulb];

export async function Why() {
  const t = await getTranslations("why");
  const cards = t.raw("cards") as TitleText[];

  return (
    <section aria-labelledby="why-title" className="section-y">
      <div className="container-x">
        <SectionHeader id="why-title" eyebrow={t("eyebrow")} title={t("title")} text={t("text")} />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal as="li" key={c.title} delay={i * 0.08} className="card p-6">
                <span className="icon-chip">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-hueso">{c.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{c.text}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

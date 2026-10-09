import { getLocale, getTranslations } from "next-intl/server";

import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { SECTION_IDS } from "@/lib/site";
import type { StatItem } from "@/lib/types";

export async function Stats() {
  const t = await getTranslations("stats");
  const locale = await getLocale();
  const items = t.raw("items") as StatItem[];

  return (
    <section id={SECTION_IDS.impact} aria-labelledby="stats-title" className="relative border-y border-hoja/15 bg-petroleo/60">
      <div className="container-x py-14 lg:py-16">
        <h2 id="stats-title" className="eyebrow">
          {t("title")}
        </h2>
        <ul className="mt-8 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {items.map((s, i) => (
            <Reveal as="li" key={s.label} delay={i * 0.08} className="border-l-2 border-eco/60 pl-4">
              <p className="font-display text-4xl text-cocona sm:text-5xl">
                <Counter value={s.value} prefix={s.prefix} locale={locale} />
              </p>
              <p className="mt-2 text-sm leading-snug text-hueso/85 sm:text-base">{s.label}</p>
            </Reveal>
          ))}
        </ul>
        <p className="mt-8 text-sm text-muted">{t("caption")}</p>
      </div>
    </section>
  );
}

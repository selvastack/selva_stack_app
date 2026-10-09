import { Briefcase, HandHeart, Megaphone, Rocket } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { WaButton } from "@/components/ui/WaButton";
import type { TitleText } from "@/lib/types";

const ICONS = [Briefcase, HandHeart, Rocket, Megaphone];

export async function Business() {
  const t = await getTranslations("business");
  const tw = await getTranslations("whatsapp");
  const items = t.raw("items") as TitleText[];

  return (
    <section aria-labelledby="business-title" className="section-y">
      <div className="container-x">
        <SectionHeader id="business-title" eyebrow={t("eyebrow")} title={t("title")} />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((b, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal as="li" key={b.title} delay={i * 0.06} className="card p-6">
                <span className="icon-chip">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-hueso">{b.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{b.text}</p>
              </Reveal>
            );
          })}
        </ul>
        <Reveal className="mt-10 flex flex-col gap-3 sm:flex-row">
          <WaButton kind="project" message={tw("project")} className="btn btn-gold">
            {t("ctaQuote")}
          </WaButton>
          <WaButton kind="ally" message={tw("ally")} className="btn btn-outline">
            {t("ctaAlly")}
          </WaButton>
        </Reveal>
      </div>
    </section>
  );
}

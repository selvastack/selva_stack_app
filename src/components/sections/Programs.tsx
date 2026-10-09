import { BarChart3, Building2, FlaskConical, GraduationCap, Target, type LucideIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SECTION_IDS } from "@/lib/site";
import type { ProgramItem } from "@/lib/types";

const ICONS: Record<string, LucideIcon> = {
  lab: FlaskConical,
  educa: GraduationCap,
  datos: BarChart3,
  impacto: Target,
  empresas: Building2
};

export async function Programs() {
  const t = await getTranslations("programs");
  const items = t.raw("items") as ProgramItem[];

  return (
    <section id={SECTION_IDS.programs} aria-labelledby="programs-title" className="section-y bg-petroleo/40">
      <div className="container-x">
        <SectionHeader id="programs-title" eyebrow={t("eyebrow")} title={t("title")} />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((p, i) => {
            const Icon = ICONS[p.id] ?? FlaskConical;
            return (
              <Reveal as="li" key={p.id} delay={i * 0.06} className="card p-6">
                <Icon aria-hidden="true" className="h-6 w-6 text-eco" />
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-hoja">{p.tag}</p>
                <h3 className="mt-1 font-display text-xl text-hueso">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.text}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SECTION_IDS } from "@/lib/site";
import type { AllyLogo } from "@/lib/types";

/**
 * Logo files go in /public/allies/<slug>.webp. Until a file is registered here the
 * card shows the ally's name as a placeholder (permission to use logos pending).
 */
const LOGO_FILES: Record<string, string | undefined> = {
  UNAP: undefined,
  SENATI: undefined,
  "Impacto Bicentenario": undefined,
  WCS: undefined
};

export async function Allies() {
  const t = await getTranslations("allies");
  const logos = t.raw("logos") as AllyLogo[];

  return (
    <section id={SECTION_IDS.allies} aria-labelledby="allies-title" className="section-y">
      <div className="container-x">
        <SectionHeader id="allies-title" eyebrow={t("eyebrow")} title={t("title")} center />
        <ul className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {logos.map((l, i) => {
            const file = LOGO_FILES[l.name];
            return (
              <Reveal as="li" key={l.name} delay={i * 0.06}>
                <div className="ally card grid h-28 place-items-center p-5">
                  {file ? (
                    <Image src={file} alt={l.alt} width={200} height={80} loading="lazy" className="max-h-16 w-auto object-contain" />
                  ) : (
                    <span role="img" aria-label={l.alt} className="text-center font-display text-xl text-hueso">
                      {l.name}
                    </span>
                  )}
                </div>
              </Reveal>
            );
          })}
        </ul>
        <p className="mt-8 text-center text-sm text-muted">{t("note")}</p>
      </div>
    </section>
  );
}

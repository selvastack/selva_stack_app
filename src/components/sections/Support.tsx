import { HeartHandshake } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Reveal } from "@/components/ui/Reveal";
import { WaButton } from "@/components/ui/WaButton";

/** Support / allies call-to-action. No amounts, bank data or tax mentions by design. */
export async function Support() {
  const t = await getTranslations("support");
  const tw = await getTranslations("whatsapp");

  return (
    <section aria-labelledby="support-title" className="section-y">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-3xl border border-eco/40 bg-gradient-to-br from-selva via-[#06451a] to-petroleo p-8 sm:p-12 lg:p-16">
          <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-40" />
          <div className="relative max-w-2xl">
            <p className="eyebrow !text-hueso/90">{t("eyebrow")}</p>
            <h2 id="support-title" className="mt-4 font-display text-3xl leading-tight text-hueso sm:text-4xl lg:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-hueso/85">{t("text")}</p>
            <WaButton kind="support" message={tw("support")} className="btn btn-gold mt-8">
              <HeartHandshake aria-hidden="true" className="h-5 w-5" />
              {t("cta")}
            </WaButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

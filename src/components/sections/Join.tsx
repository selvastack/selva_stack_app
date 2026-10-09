import { Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Reveal } from "@/components/ui/Reveal";
import { mailtoHref } from "@/lib/site";

export async function Join() {
  const t = await getTranslations("join");

  return (
    <section aria-labelledby="join-title" className="section-y bg-petroleo/40">
      <div className="container-x">
        <Reveal className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="eyebrow">{t("eyebrow")}</p>
            <h2 id="join-title" className="mt-4 font-display text-3xl leading-tight text-hueso sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">{t("text")}</p>
          </div>
          <div className="card flex flex-col items-start gap-4 p-6 lg:items-center lg:text-center">
            <a href={mailtoHref(t("email"), t("emailSubject"))} className="btn btn-gold w-full sm:w-auto">
              <Mail aria-hidden="true" className="h-5 w-5" />
              {t("cta")}
            </a>
            <a href={mailtoHref(t("email"), t("emailSubject"))} className="break-all text-sm text-hoja underline-offset-4 hover:underline">
              {t("email")}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

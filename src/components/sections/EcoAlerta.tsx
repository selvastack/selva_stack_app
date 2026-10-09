import { ArrowUpRight, Bell, Flame, MapPin } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { PhoneHeatmap } from "@/components/ui/PhoneHeatmap";
import { Reveal } from "@/components/ui/Reveal";

const FEATURE_ICONS = [Flame, MapPin, Bell];

/** Featured launch. Keeps EcoAlerta's own identity: green, petroleum blue and gold. */
export async function EcoAlerta() {
  const t = await getTranslations("ecoalerta");
  const features = t.raw("features") as string[];

  return (
    <section aria-labelledby="eco-title" className="section-y relative overflow-hidden bg-gradient-to-br from-petroleo via-[#00282d] to-noche">
      <div aria-hidden="true" className="absolute right-0 top-0 h-80 w-80 rounded-full bg-[#039833]/25 blur-[110px]" />
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="rounded-full bg-cocona px-3 py-1 text-xs font-bold uppercase tracking-wider text-noche">{t("tag")}</span>
            <Image src="/brand/ecoalerta-vertical.webp" alt="EcoAlerta Loreto" width={560} height={707} loading="lazy" sizes="64px" className="h-16 w-auto rounded-lg bg-white p-1" />
          </div>
          <h2 id="eco-title" className="mt-6 font-display text-3xl leading-tight text-hueso sm:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">{t("text")}</p>
          <p className="mt-6 font-display text-3xl text-cocona">{t("stat")}</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {features.map((f, i) => {
              const Icon = FEATURE_ICONS[i % FEATURE_ICONS.length];
              return (
                <li key={f} className="flex items-center gap-2 rounded-xl border border-[#039833]/35 bg-noche/50 px-3 py-2.5 text-sm text-hueso">
                  <Icon aria-hidden="true" className="h-4 w-4 shrink-0 text-[#039833]" />
                  {f}
                </li>
              );
            })}
          </ul>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a href={t("url")} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
              {t("cta")}
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
            <p className="text-sm text-muted">{t("funders")}</p>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="relative">
          <PhoneHeatmap alt={t("imageAlt")} />
          <Image
            src="/mascots/coconita.webp"
            alt=""
            width={520}
            height={562}
            loading="lazy"
            sizes="130px"
            className="absolute -bottom-4 left-[8%] h-auto w-[110px] sm:left-[18%] sm:w-[130px]"
          />
        </Reveal>
      </div>
    </section>
  );
}

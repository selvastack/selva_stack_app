import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { HeroParticles } from "@/components/ui/HeroParticles";
import { LeafCircuit } from "@/components/ui/LeafCircuit";
import { WaButton } from "@/components/ui/WaButton";
import { SECTION_IDS } from "@/lib/site";

export async function Hero() {
  const t = await getTranslations("hero");
  const tw = await getTranslations("whatsapp");
  const te = await getTranslations("ecoalerta");
  const chips = t.raw("chips") as string[];

  return (
    <section id={SECTION_IDS.home} className="relative isolate overflow-hidden pt-[72px]" aria-labelledby="hero-title">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid" />
      <div aria-hidden="true" className="absolute -left-32 top-24 -z-10 h-96 w-96 rounded-full bg-selva/30 blur-[120px]" />
      <div aria-hidden="true" className="absolute -right-24 bottom-0 -z-10 h-[28rem] w-[28rem] rounded-full bg-petroleo/70 blur-[120px]" />
      <HeroParticles />

      <div className="container-x grid min-h-[calc(100svh-72px)] items-center gap-10 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
        <div>
          <a
            href={te("url")}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-eco/50 bg-eco/10 px-3.5 py-1.5 text-sm font-semibold text-hueso transition hover:bg-eco/20 hover:shadow-[0_0_22px_rgba(3,152,51,0.45)]"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cocona opacity-75 motion-reduce:hidden" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cocona" />
            </span>
            {t("badge")}
            <ArrowRight aria-hidden="true" className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </a>

          <p className="eyebrow mt-8">{t("eyebrow")}</p>
          <h1 id="hero-title" className="mt-4 font-display text-[2.6rem] leading-[1.02] text-hueso sm:text-6xl lg:text-7xl">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{t("subtitle")}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <WaButton kind="project" message={tw("project")} className="btn btn-gold text-base">
              {t("ctaProject")}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </WaButton>
            <WaButton kind="support" message={tw("support")} className="btn btn-outline text-base">
              {t("ctaSupport")}
            </WaButton>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2">
            {chips.map((c) => (
              <li key={c} className="inline-flex items-center gap-1.5 rounded-full border border-hoja/25 bg-petroleo/40 px-3 py-1 text-sm text-hueso/90">
                <Sparkles aria-hidden="true" className="h-3.5 w-3.5 text-eco" />
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[420px] lg:max-w-[480px]">
          <LeafCircuit className="absolute inset-0 -z-10 m-auto h-full w-full opacity-60" />
          <div className="animate-float">
            <Image
              src="/mascots/otto.webp"
              alt={t("mascotAlt")}
              width={720}
              height={1149}
              priority
              sizes="(min-width: 1024px) 380px, 70vw"
              className="mx-auto h-auto w-[62%] origin-bottom animate-wave drop-shadow-[0_0_40px_rgba(3,152,51,0.35)] sm:w-[58%]"
            />
          </div>
          <Image
            src="/mascots/coconita.webp"
            alt=""
            width={520}
            height={562}
            sizes="140px"
            className="absolute bottom-6 right-2 h-auto w-[30%] animate-float [animation-delay:1.2s] sm:right-6"
          />
        </div>
      </div>
    </section>
  );
}

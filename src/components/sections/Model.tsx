import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { TitleText } from "@/lib/types";

export async function Model() {
  const t = await getTranslations("model");
  const steps = t.raw("steps") as TitleText[];

  return (
    <section aria-labelledby="model-title" className="section-y relative overflow-hidden bg-petroleo/40">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1fr_auto]">
        <div>
          <SectionHeader id="model-title" eyebrow={t("eyebrow")} title={t("title")} text={t("text")} />
          <ol className="mt-12 grid gap-5 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.12} className="card relative p-6">
                <span className="font-display text-5xl text-eco/40">0{i + 1}</span>
                <h3 className="mt-2 font-display text-2xl text-hueso">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
        <Reveal className="hidden lg:block">
          <Image
            src="/mascots/otto.webp"
            alt=""
            width={720}
            height={1149}
            loading="lazy"
            sizes="220px"
            className="h-auto w-[220px] -scale-x-100 opacity-95"
          />
        </Reveal>
      </div>
    </section>
  );
}

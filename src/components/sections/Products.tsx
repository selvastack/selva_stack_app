import { CalendarCheck, ClipboardList, Package, type LucideIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TiltCard } from "@/components/ui/TiltCard";
import { WaButton } from "@/components/ui/WaButton";
import { SECTION_IDS } from "@/lib/site";
import type { IdItem } from "@/lib/types";

const ICONS: Record<string, LucideIcon> = { attendance: ClipboardList, assets: Package, events: CalendarCheck };

export async function Products() {
  const t = await getTranslations("products");
  const tw = await getTranslations("whatsapp");
  const items = t.raw("items") as IdItem[];

  return (
    <section id={SECTION_IDS.products} aria-labelledby="products-title" className="section-y">
      <div className="container-x">
        <SectionHeader id="products-title" eyebrow={t("eyebrow")} title={t("title")} />
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {items.map((p, i) => {
            const Icon = ICONS[p.id] ?? Package;
            return (
              <Reveal as="li" key={p.id} delay={i * 0.08}>
                <TiltCard className="flex h-full flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <span className="icon-chip">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span className="rounded-full border border-hoja/40 px-2.5 py-1 text-xs font-semibold text-hoja">{t("status")}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-hueso">{p.title}</h3>
                  <p className="mt-2 flex-1 leading-relaxed text-muted">{p.text}</p>
                  <WaButton
                    kind="product"
                    product={p.id}
                    message={tw("product", { product: p.title })}
                    className="btn btn-outline mt-6 self-start text-sm"
                  >
                    {t("cta")}
                  </WaButton>
                </TiltCard>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

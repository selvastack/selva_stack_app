import { Plus } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { SectionHeader } from "@/components/ui/SectionHeader";
import type { FaqItem } from "@/lib/types";

/** Native <details>/<summary>: keyboard and screen-reader accessible with zero JS. */
export async function Faq() {
  const t = await getTranslations("faq");
  const items = t.raw("items") as FaqItem[];

  return (
    <section aria-labelledby="faq-title" className="section-y">
      <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeader id="faq-title" eyebrow={t("eyebrow")} title={t("title")} />
        <div className="space-y-3">
          {items.map((f) => (
            <details key={f.q} className="faq card group">
              <summary className="flex items-center justify-between gap-4 rounded-[1.25rem] p-5 text-left font-semibold text-hueso">
                {f.q}
                <Plus aria-hidden="true" className="faq-icon h-5 w-5 shrink-0 text-eco transition-transform" />
              </summary>
              <p className="px-5 pb-5 leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

import { FileBarChart, FolderCheck, Handshake, Wallet } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { TitleText } from "@/lib/types";

const ICONS = [FileBarChart, Wallet, FolderCheck, Handshake];

export async function Transparency() {
  const t = await getTranslations("transparency");
  const items = t.raw("items") as TitleText[];

  return (
    <section aria-labelledby="transparency-title" className="section-y bg-petroleo/40">
      <div className="container-x">
        <SectionHeader id="transparency-title" eyebrow={t("eyebrow")} title={t("title")} text={t("text")} />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal as="li" key={it.title} delay={i * 0.06} className="card p-6">
                <Icon aria-hidden="true" className="h-6 w-6 text-eco" />
                <h3 className="mt-4 text-lg font-bold text-hueso">{it.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{it.text}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

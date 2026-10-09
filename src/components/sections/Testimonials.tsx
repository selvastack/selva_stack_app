import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Testimonial } from "@/lib/types";

/** Renders nothing while `testimonials.items` is empty: we never publish invented quotes. */
export async function Testimonials() {
  const t = await getTranslations("testimonials");
  const items = t.raw("items") as Testimonial[];
  if (!items?.length) return null;

  return (
    <section aria-labelledby="testimonials-title" className="section-y">
      <div className="container-x">
        <SectionHeader id="testimonials-title" eyebrow={t("eyebrow")} title={t("title")} />
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {items.map((it, i) => (
            <Reveal as="li" key={it.name} delay={i * 0.08} className="card flex flex-col p-6">
              <blockquote className="flex-1 text-lg leading-relaxed text-hueso">“{it.quote}”</blockquote>
              <div className="mt-6 flex items-center gap-3">
                {it.photo && (
                  <Image src={it.photo} alt={it.photoAlt ?? ""} width={56} height={56} className="h-14 w-14 rounded-full object-cover" />
                )}
                <div>
                  <p className="font-bold text-hueso">{it.name}</p>
                  <p className="text-sm text-muted">{it.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

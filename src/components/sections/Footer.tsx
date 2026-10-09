import { MapPin } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { SocialIcon } from "@/components/ui/SocialIcon";
import { NAV_KEYS, SECTION_IDS } from "@/lib/site";
import type { SocialItem } from "@/lib/types";

export async function Footer() {
  const t = await getTranslations();
  const social = t.raw("social.items") as SocialItem[];
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hoja/15 bg-[#04120e]">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Image
            src="/brand/selva-stack-vertical-white.webp"
            alt={`Selva Stack — ${t("footer.tagline")}`}
            width={640}
            height={679}
            loading="lazy"
            sizes="160px"
            className="h-auto w-40"
          />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">{t("footer.about")}</p>
          <p className="mt-4 flex items-center gap-2 text-sm text-hueso/85">
            <MapPin aria-hidden="true" className="h-4 w-4 text-eco" />
            {t("footer.location")}
          </p>
        </div>
        <nav aria-labelledby="footer-nav">
          <h2 id="footer-nav" className="text-sm font-bold uppercase tracking-wider text-hoja">
            {t("footer.navTitle")}
          </h2>
          <ul className="mt-4 space-y-2">
            {NAV_KEYS.map((k) => (
              <li key={k}>
                <a href={`#${SECTION_IDS[k]}`} className="text-sm text-hueso/80 transition hover:text-hueso">
                  {t(`nav.${k}`)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-hoja">{t("footer.socialTitle")}</h2>
          <ul className="mt-4 space-y-3">
            {social.map((s) => (
              <li key={s.id}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.aria} className="inline-flex items-center gap-3 text-sm text-hueso/80 transition hover:text-hueso">
                  <SocialIcon id={s.id} className="h-4 w-4" />
                  {s.name} · {s.handle}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-hoja/10">
        <div className="container-x flex flex-col gap-3 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{t("footer.rights", { year })}</p>
          <a href={`mailto:${t("contact.email")}`} className="hover:text-hueso">
            {t("footer.privacy")}
          </a>
        </div>
      </div>
    </footer>
  );
}

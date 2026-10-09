"use client";

import { useLocale, useTranslations } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

/** ES / EN / PT selector. next-intl persists the choice in the NEXT_LOCALE cookie. */
export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div role="group" aria-label={t("language")} className={`flex items-center rounded-full border border-hoja/30 p-1 ${className}`}>
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          lang={l}
          aria-pressed={l === locale}
          onClick={() => router.replace(`${pathname}${window.location.hash}`, { locale: l, scroll: false })}
          className={`min-h-9 min-w-10 rounded-full px-2.5 text-xs font-bold uppercase tracking-wider transition ${
            l === locale ? "bg-eco text-noche" : "text-hueso/80 hover:text-hueso"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

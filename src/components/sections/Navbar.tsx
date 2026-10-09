"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { BrandMark } from "@/components/ui/BrandMark";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { WaButton } from "@/components/ui/WaButton";
import { NAV_KEYS, SECTION_IDS } from "@/lib/site";

export function Navbar() {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "border-b border-hoja/15 bg-noche/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="container-x flex h-[72px] items-center justify-between gap-4">
        <a href={`#${SECTION_IDS.home}`} className="shrink-0" aria-label="Selva Stack">
          <BrandMark tagline={t("footer.tagline")} priority />
        </a>

        <ul className="hidden items-center gap-5 xl:flex">
          {NAV_KEYS.map((k) => (
            <li key={k}>
              <a href={`#${SECTION_IDS[k]}`} className="text-sm font-medium text-hueso/80 transition hover:text-hueso">
                {t(`nav.${k}`)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <LanguageSwitcher className="hidden sm:flex" />
          <WaButton kind="project" message={t("whatsapp.project")} className="btn btn-gold hidden !min-h-10 !px-4 text-sm md:inline-flex">
            {t("nav.cta")}
          </WaButton>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-hoja/30 text-hueso xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="h-[calc(100dvh-72px)] overflow-y-auto border-t border-hoja/15 bg-noche xl:hidden">
          <ul className="container-x flex flex-col gap-1 py-6">
            {NAV_KEYS.map((k) => (
              <li key={k}>
                <a
                  href={`#${SECTION_IDS[k]}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-lg font-semibold text-hueso hover:bg-petroleo"
                >
                  {t(`nav.${k}`)}
                </a>
              </li>
            ))}
          </ul>
          <div className="container-x flex flex-col gap-4 pb-10">
            <LanguageSwitcher className="self-start sm:hidden" />
            <WaButton kind="project" message={t("whatsapp.project")} className="btn btn-gold w-full">
              {t("nav.cta")}
            </WaButton>
          </div>
        </div>
      )}
    </header>
  );
}

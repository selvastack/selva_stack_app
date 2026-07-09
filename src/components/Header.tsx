"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import type { NavigationItem, SiteContent } from "@/lib/types";

import { CTAButton } from "./CTAButton";
import { useDonation } from "./DonationProvider";

type HeaderProps = {
  site: SiteContent;
  navigation: NavigationItem[];
};

export function Header({ site, navigation }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { openDonation } = useDonation();

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-white/82 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <a className="flex min-w-0 items-center gap-3" href="#inicio" onClick={closeMenu}>
          <Image
            alt="Logo de Selva Stack"
            className="h-11 w-11 rounded-full object-contain"
            height={64}
            priority
            src={site.logo}
            width={64}
          />
          <span className="min-w-0">
            <span className="block truncate text-base font-black leading-tight text-[var(--color-primary-dark)]">
              {site.name}
            </span>
            <span className="block truncate text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-primary-soft)]">
              {site.tagline}
            </span>
          </span>
        </a>

        <nav aria-label="Navegación principal" className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <a
              className="rounded-full px-3 py-2 text-sm font-bold text-[var(--color-text-muted)] transition hover:bg-[var(--color-mint)] hover:text-[var(--color-primary-dark)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
              href={item.href}
              key={item.id}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <CTAButton onClick={openDonation}>Donar</CTAButton>
          <CTAButton href="#empresas" variant="secondary">
            Ser aliado
          </CTAButton>
        </div>

        <button
          aria-expanded={isOpen}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-primary-dark)] shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] lg:hidden"
          onClick={() => setIsOpen((value) => !value)}
          type="button"
        >
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {isOpen ? (
        <div className="border-t border-[var(--color-border)] bg-white/95 px-4 py-4 shadow-2xl backdrop-blur-xl lg:hidden">
          <nav aria-label="Navegación móvil" className="mx-auto grid max-w-7xl gap-2">
            {navigation.map((item) => (
              <a
                className="rounded-2xl px-4 py-3 text-sm font-bold text-[var(--color-text-muted)] transition hover:bg-[var(--color-mint)] hover:text-[var(--color-primary-dark)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
                href={item.href}
                key={item.id}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
            <div className="grid gap-2 pt-2 sm:hidden">
              <CTAButton onClick={openDonation}>Donar</CTAButton>
              <CTAButton href="#empresas" onClick={closeMenu} variant="secondary">
                Ser aliado
              </CTAButton>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

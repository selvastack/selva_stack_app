import Image from "next/image";

import type { NavigationItem, SiteContent } from "@/lib/types";

import { Icon } from "./Icon";

type FooterProps = {
  site: SiteContent;
  navigation: NavigationItem[];
};

export function Footer({ site, navigation }: FooterProps) {
  return (
    <footer className="bg-[var(--color-black-green)] px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <a className="inline-flex items-center gap-4" href="#inicio">
            <Image
              alt="Logo de Selva Stack"
              className="h-14 w-14 rounded-full bg-white object-contain"
              height={72}
              src={site.logo}
              width={72}
            />
            <span>
              <span className="block text-2xl font-black">{site.name}</span>
              <span className="block text-sm font-bold uppercase tracking-[0.14em] text-white/60">
                {site.tagline}
              </span>
            </span>
          </a>
          <p className="mt-6 max-w-xl text-base leading-8 text-white/70">{site.description}</p>
          <p className="mt-5 max-w-xl text-sm font-semibold leading-7 text-white/58">{site.institutionalPhrase}</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.18em] text-white/58">Navegación</h2>
            <nav className="mt-4 grid gap-2" aria-label="Navegación del footer">
              {navigation.map((item) => (
                <a className="text-sm font-semibold text-white/72 transition hover:text-white" href={item.href} key={item.id}>
                  {item.label}
                </a>
              ))}
              <a className="text-sm font-semibold text-white/72 transition hover:text-white" href="#donar">
                Donar
              </a>
              <a className="text-sm font-semibold text-white/72 transition hover:text-white" href="#politica">
                Política de privacidad
              </a>
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.18em] text-white/58">Redes</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {site.socialLinks.map((link) => (
                <a
                  aria-label={link.label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] text-white/72 transition hover:bg-white/12 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  href={link.href}
                  key={link.id}
                >
                  <Icon name={link.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/54 sm:flex-row sm:items-center sm:justify-between">
        <p>© Selva Stack. Tecnología con propósito para la Amazonía.</p>
        <p id="politica">Privacidad: los formularios no publican datos sensibles en el cliente.</p>
      </div>
    </footer>
  );
}

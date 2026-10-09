import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Inter, Saira_Stencil_One } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { routing } from "@/i18n/routing";
import { CONTACT_EMAIL, PHONE_E164, SITE_URL } from "@/lib/site";
import type { SocialItem } from "@/lib/types";

import "../globals.css";

const stencil = Saira_Stencil_One({ weight: "400", subsets: ["latin"], variable: "--font-stencil", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const OG_LOCALE = { es: "es_PE", en: "en_US", pt: "pt_BR" } as const;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(SITE_URL),
    title: t("title"),
    description: t("description"),
    keywords: [
      "desarrollo de software Iquitos",
      "apps Loreto",
      "tecnología cívica",
      "Amazonía",
      "jóvenes",
      "EcoAlerta",
      "inteligencia artificial Perú"
    ],
    alternates: {
      canonical: `/${locale}`,
      languages: { ...Object.fromEntries(routing.locales.map((l) => [l, `/${l}`])), "x-default": "/es" }
    },
    openGraph: {
      type: "website",
      siteName: "Selva Stack",
      url: `/${locale}`,
      title: t("ogTitle"),
      description: t("ogDescription"),
      locale: OG_LOCALE[locale],
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => OG_LOCALE[l])
    },
    twitter: { card: "summary_large_image", title: t("ogTitle"), description: t("ogDescription") },
    robots: { index: true, follow: true }
  };
}

export const viewport: Viewport = {
  themeColor: "#0B6B0E",
  colorScheme: "dark"
};

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale });
  const social = t.raw("social.items") as SocialItem[];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "Selva Stack",
    legalName: "Asociación Civil Selva Stack",
    alternateName: t("footer.tagline"),
    description: t("meta.description"),
    url: SITE_URL,
    logo: `${SITE_URL}/brand/selva-stack-vertical.webp`,
    email: CONTACT_EMAIL,
    telephone: PHONE_E164,
    address: { "@type": "PostalAddress", addressLocality: "Iquitos", addressRegion: "Loreto", addressCountry: "PE" },
    areaServed: "Amazonía peruana",
    sameAs: social.map((s) => s.url),
    contactPoint: [
      { "@type": "ContactPoint", contactType: "customer service", email: CONTACT_EMAIL, telephone: PHONE_E164, availableLanguage: ["es", "en", "pt"] }
    ]
  };

  return (
    <html lang={locale} className={`${stencil.variable} ${inter.variable}`}>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
        <Analytics />
      </body>
    </html>
  );
}

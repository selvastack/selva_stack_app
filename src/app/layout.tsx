import type { Metadata, Viewport } from "next";

import { publicEnv } from "@/lib/env";
import { landingContentRepository } from "@/lib/repositories";

import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const content = await landingContentRepository.getLandingContent();

  return {
    metadataBase: new URL(publicEnv.siteUrl),
    title: content.site.seo.title,
    description: content.site.seo.description,
    keywords: content.site.seo.keywords,
    alternates: {
      canonical: "/"
    },
    openGraph: {
      title: "Selva Stack — Tecnología Cívica Amazónica",
      description: "Tecnología con propósito para conectar, proteger y transformar la Amazonía.",
      url: "/",
      siteName: "Selva Stack",
      locale: "es_PE",
      type: "website",
      images: [
        {
          url: content.site.logo,
          width: 1600,
          height: 1600,
          alt: "Logo de Selva Stack"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: "Selva Stack — Tecnología Cívica Amazónica",
      description: "Tecnología con propósito para conectar, proteger y transformar la Amazonía.",
      images: [content.site.logo]
    },
    icons: {
      icon: content.site.logo,
      apple: content.site.logo
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

export const viewport: Viewport = {
  themeColor: "#0A6909",
  colorScheme: "light"
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await landingContentRepository.getLandingContent();
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: content.site.name,
    alternateName: content.site.tagline,
    description: content.site.description,
    url: publicEnv.siteUrl,
    logo: `${publicEnv.siteUrl}${content.site.logo}`,
    areaServed: "Amazonía",
    knowsAbout: content.site.seo.keywords
  };

  return (
    <html lang="es">
      <body>
        {children}
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
          type="application/ld+json"
        />
      </body>
    </html>
  );
}

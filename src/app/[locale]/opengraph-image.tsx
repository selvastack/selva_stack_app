import { readFile } from "node:fs/promises";
import path from "node:path";

import { ImageResponse } from "next/og";
import { hasLocale } from "next-intl";

import { routing } from "@/i18n/routing";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Read messages directly: this runs at build time, outside a request.
async function loadMessages(locale: string) {
  const l = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
  return (await import(`../../../messages/${l}.json`)).default as typeof import("../../../messages/es.json");
}

export async function generateImageMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const m = await loadMessages(locale);
  return [{ id: "og", alt: m.meta.ogImageAlt, size, contentType }];
}

export default async function OgImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const m = await loadMessages(locale);
  const otto = await readFile(path.join(process.cwd(), "public/mascots/otto-og.png"));
  const ottoSrc = `data:image/png;base64,${otto.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "60px 80px",
          background: "linear-gradient(135deg, #061A14 0%, #00343A 100%)",
          color: "#F4F1E8"
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 700 }}>
          <div style={{ display: "flex", fontSize: 26, letterSpacing: 6, color: "#6AAA5A", textTransform: "uppercase" }}>
            {m.hero.eyebrow}
          </div>
          <div style={{ display: "flex", fontSize: 78, fontWeight: 800, lineHeight: 1.05, marginTop: 24 }}>{m.hero.title}</div>
          <div style={{ display: "flex", fontSize: 30, color: "#D4A933", marginTop: 36, fontWeight: 700 }}>selvastack.org.pe</div>
        </div>
        <img src={ottoSrc} width={300} height={479} alt="" />
      </div>
    ),
    size
  );
}

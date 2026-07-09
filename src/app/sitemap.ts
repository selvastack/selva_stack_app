import type { MetadataRoute } from "next";

import { publicEnv } from "@/lib/env";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: publicEnv.siteUrl,
      lastModified: new Date("2026-07-08"),
      changeFrequency: "monthly",
      priority: 1
    }
  ];
}

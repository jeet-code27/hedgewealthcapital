import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

// Fixed date keeps the sitemap static; bump it when page content changes.
const updated = "2026-10-27";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, lastModified: updated, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/about-hedge-wealth-capital`, lastModified: updated, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/contact-us`, lastModified: updated, changeFrequency: "yearly", priority: 0.6 },
    ...services.map((s) => ({ url: `${site.url}${s.path}`, lastModified: updated, changeFrequency: "monthly" as const, priority: 0.9 })),
  ];
}

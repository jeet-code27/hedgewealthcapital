import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { areas } from "@/lib/areas";
import { getPublishedPosts } from "@/lib/posts";
import { site } from "@/lib/site";

// Fixed date keeps the sitemap static; bump it when page content changes.
const updated = "2026-10-27";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedPosts();
  return [
    { url: site.url, lastModified: updated, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/about-hedge-wealth-capital`, lastModified: updated, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/contact-us`, lastModified: updated, changeFrequency: "yearly", priority: 0.6 },
    { url: `${site.url}/areas-we-serve`, lastModified: updated, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/brokers`, lastModified: updated, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/blog`, lastModified: updated, changeFrequency: "weekly", priority: 0.6 },
    ...posts.map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: p.date, changeFrequency: "yearly" as const, priority: 0.5 })),
    ...areas.map((a) => ({ url: `${site.url}${a.path}`, lastModified: updated, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...services.map((s) => ({ url: `${site.url}${s.path}`, lastModified: updated, changeFrequency: "monthly" as const, priority: 0.9 })),
  ];
}

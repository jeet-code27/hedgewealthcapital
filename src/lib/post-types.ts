/** Client-safe blog types and helpers (no database imports). */
import type { TocItem } from "@/lib/post-html";

export type ListPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  categorySlug: string;
  readingMinutes: number;
  isFeatured: boolean;
  image: { src: string; alt: string };
};

export type FullPost = ListPost & {
  html: string;
  toc: TocItem[];
  updated: string;
  author: { name: string; role: string; bio: string; avatar: string } | null;
  tags: { name: string; slug: string }[];
  faqs: { question: string; answer: string }[];
  related: ListPost[];
  seo: { metaTitle: string; metaDescription: string; focusKeyword: string; canonicalUrl: string; ogTitle: string; ogDescription: string; ogImage: string; noIndex: boolean };
};

export const formatDate = (iso: string) =>
  new Date(`${iso.slice(0, 10)}T12:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

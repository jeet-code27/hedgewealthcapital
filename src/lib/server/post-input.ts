import { readingMinutes, sanitizePostHtml, slugify } from "@/lib/post-html";
import { isId, str } from "@/lib/server/admin-api";

/** Normalises the editor payload into a Post document update. */
export function postInput(body: Record<string, unknown>) {
  const title = str(body.title, 200);
  const content = sanitizePostHtml(typeof body.content === "string" ? body.content : "");
  const img = (body.featuredImage ?? {}) as Record<string, unknown>;
  const seo = (body.seo ?? {}) as Record<string, unknown>;
  const status = body.status === "Published" ? "Published" : "Draft";
  const publishedAt = typeof body.publishedAt === "string" && !Number.isNaN(Date.parse(body.publishedAt)) ? new Date(body.publishedAt) : null;

  return {
    title,
    slug: slugify(str(body.slug, 140) || title),
    excerpt: str(body.excerpt, 400),
    content,
    readingMinutes: readingMinutes(content),
    featuredImage: { url: str(img.url, 600), publicId: str(img.publicId, 300), alt: str(img.alt, 200), caption: str(img.caption, 300) },
    author: isId(body.author) ? body.author : null,
    category: isId(body.category) ? body.category : null,
    tags: Array.isArray(body.tags) ? body.tags.filter(isId).slice(0, 20) : [],
    relatedPosts: Array.isArray(body.relatedPosts) ? body.relatedPosts.filter(isId).slice(0, 6) : [],
    faqs: Array.isArray(body.faqs)
      ? (body.faqs as Record<string, unknown>[]).map((f) => ({ question: str(f?.question, 300), answer: str(f?.answer, 2000) })).filter((f) => f.question && f.answer).slice(0, 30)
      : [],
    status,
    isFeatured: Boolean(body.isFeatured),
    // Publishing without a date stamps it now; a chosen date is kept (for back-dating migrated posts).
    publishedAt: status === "Published" ? (publishedAt ?? new Date()) : publishedAt,
    seo: {
      metaTitle: str(seo.metaTitle, 120),
      metaDescription: str(seo.metaDescription, 320),
      focusKeyword: str(seo.focusKeyword, 100),
      canonicalUrl: str(seo.canonicalUrl, 400),
      ogTitle: str(seo.ogTitle, 120),
      ogDescription: str(seo.ogDescription, 320),
      ogImage: str(seo.ogImage, 600),
      noIndex: Boolean(seo.noIndex),
    },
  };
}

import { cacheLife, cacheTag } from "next/cache";
import { posts as legacyPosts, type BlogBlock } from "@/lib/blog";
import { withHeadingIds } from "@/lib/post-html";
import type { FullPost, ListPost } from "@/lib/post-types";

export type { FullPost, ListPost } from "@/lib/post-types";
export { formatDate } from "@/lib/post-types";
import { dbConnect } from "@/lib/server/db";
import { Author, Category, Post, Tag } from "@/lib/server/models";

/** Public blog data, read from MongoDB and cached under the "posts" tag (the admin panel revalidates it). */

const FALLBACK_IMAGE = "/images/cta.jpg";

type Lean = Record<string, unknown> & {
  _id: unknown;
  slug: string;
  title: string;
  excerpt?: string;
  publishedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
  readingMinutes?: number;
  isFeatured?: boolean;
  featuredImage?: { url?: string; alt?: string };
  category?: { name?: string; slug?: string } | null;
};

const toList = (p: Lean): ListPost => ({
  slug: p.slug,
  title: p.title,
  excerpt: p.excerpt ?? "",
  date: (p.publishedAt ?? p.createdAt ?? new Date(0)).toISOString().slice(0, 10),
  category: p.category?.name ?? "News",
  categorySlug: p.category?.slug ?? "news",
  readingMinutes: p.readingMinutes ?? 1,
  isFeatured: Boolean(p.isFeatured),
  image: { src: p.featuredImage?.url || FALLBACK_IMAGE, alt: p.featuredImage?.alt || p.title },
});

const listFields = "slug title excerpt publishedAt createdAt readingMinutes isFeatured featuredImage category";

async function queryPublished(): Promise<ListPost[]> {
  await dbConnect();
  // Touch models so populate() can resolve refs.
  void Category;
  const docs = await Post.find({ status: "Published" }).select(listFields).populate("category", "name slug").sort({ publishedAt: -1 }).lean<Lean[]>();
  return docs.map(toList);
}

async function queryBySlug(slug: string): Promise<FullPost | null> {
  await dbConnect();
  void Author;
  void Tag;
  const p = await Post.findOne({ slug, status: "Published" })
    .populate("category", "name slug")
    .populate("author", "name role bio avatar")
    .populate("tags", "name slug")
    .populate({ path: "relatedPosts", match: { status: "Published" }, select: listFields, populate: { path: "category", select: "name slug" } })
    .lean<Lean & Record<string, never>>();
  if (!p) return null;

  const doc = p as unknown as {
    content: string;
    updatedAt: Date;
    author: FullPost["author"];
    tags: { name: string; slug: string }[];
    faqs: { question: string; answer: string }[];
    relatedPosts: Lean[];
    seo?: Partial<FullPost["seo"]>;
    category: ({ _id: unknown } & Lean["category"]) | null;
  };

  // Hand-picked related posts first, then fill from the same category, then newest.
  let related = (doc.relatedPosts ?? []).map(toList);
  if (related.length < 3) {
    const exclude = [p._id, ...(doc.relatedPosts ?? []).map((r) => r._id)];
    const more = await Post.find({ status: "Published", _id: { $nin: exclude } })
      .select(listFields)
      .populate("category", "name slug")
      .sort({ publishedAt: -1 })
      .limit(12)
      .lean<Lean[]>();
    const catSlug = doc.category?.slug;
    more.sort((a, b) => Number(b.category?.slug === catSlug) - Number(a.category?.slug === catSlug));
    related = [...related, ...more.map(toList)].slice(0, 3);
  }

  const { html, toc } = withHeadingIds(doc.content ?? "");
  return {
    ...toList(p),
    html,
    toc,
    updated: (doc.updatedAt ?? new Date()).toISOString(),
    author: doc.author ? { name: doc.author.name, role: doc.author.role ?? "", bio: doc.author.bio ?? "", avatar: doc.author.avatar ?? "" } : null,
    tags: (doc.tags ?? []).map((t) => ({ name: t.name, slug: t.slug })),
    faqs: (doc.faqs ?? []).filter((f) => f.question && f.answer).map((f) => ({ question: f.question, answer: f.answer })),
    related,
    seo: {
      metaTitle: doc.seo?.metaTitle ?? "",
      metaDescription: doc.seo?.metaDescription ?? "",
      focusKeyword: doc.seo?.focusKeyword ?? "",
      canonicalUrl: doc.seo?.canonicalUrl ?? "",
      ogTitle: doc.seo?.ogTitle ?? "",
      ogDescription: doc.seo?.ogDescription ?? "",
      ogImage: doc.seo?.ogImage ?? "",
      noIndex: Boolean(doc.seo?.noIndex),
    },
  };
}

/* ---------- Legacy fallback: the three posts migrated from the old site, used only if MongoDB is unreachable ---------- */

export function legacyHtml(blocks: BlogBlock[]) {
  const e = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  return blocks
    .map((b) => {
      if (b.type === "h2") return `<h2>${e(b.text)}</h2>`;
      if (b.type === "list") return `<ul>${b.items.map((i) => `<li>${e(i)}</li>`).join("")}</ul>`;
      if (b.type === "quote") return `<blockquote><p>${e(b.text)}</p><p>— ${e(b.by)}</p></blockquote>`;
      return `<p>${e(b.text)}</p>`;
    })
    .join("");
}

const legacyList = (): ListPost[] =>
  legacyPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    date: p.date,
    category: p.category,
    categorySlug: p.category.toLowerCase().replace(/\s+/g, "-"),
    readingMinutes: 2,
    isFeatured: false,
    image: { src: p.image.src, alt: p.image.alt },
  }));

function legacyFull(slug: string): FullPost | null {
  const p = legacyPosts.find((x) => x.slug === slug);
  if (!p) return null;
  const { html, toc } = withHeadingIds(legacyHtml(p.body));
  return {
    ...legacyList().find((x) => x.slug === slug)!,
    html,
    toc,
    updated: `${p.date}T12:00:00.000Z`,
    author: null,
    tags: [],
    faqs: [],
    related: legacyList().filter((x) => x.slug !== slug),
    seo: { metaTitle: "", metaDescription: p.excerpt, focusKeyword: "", canonicalUrl: "", ogTitle: "", ogDescription: "", ogImage: "", noIndex: false },
  };
}

/*
 * Cached readers. Errors are caught inside the cache scope (an error escaping "use cache" fails
 * prerendering), cached only for a minute, and answered with the legacy posts so the blog never breaks.
 */
const DB_DOWN = "db-down" as const;

async function cachedPublished(): Promise<ListPost[] | typeof DB_DOWN> {
  "use cache";
  cacheTag("posts");
  try {
    const posts = await queryPublished();
    cacheLife("hours");
    return posts;
  } catch (err) {
    console.error("[blog] MongoDB unavailable, serving legacy posts:", (err as Error).message);
    cacheLife("minutes");
    return DB_DOWN;
  }
}

async function cachedBySlug(slug: string): Promise<FullPost | null | typeof DB_DOWN> {
  "use cache";
  cacheTag("posts");
  try {
    const post = await queryBySlug(slug);
    cacheLife("hours");
    return post;
  } catch (err) {
    console.error("[blog] MongoDB unavailable, serving legacy post:", (err as Error).message);
    cacheLife("minutes");
    return DB_DOWN;
  }
}

export async function getPublishedPosts(): Promise<ListPost[]> {
  const res = await cachedPublished();
  return res === DB_DOWN ? legacyList() : res;
}

export async function getPostBySlug(slug: string): Promise<FullPost | null> {
  const res = await cachedBySlug(slug);
  return res === DB_DOWN ? legacyFull(slug) : res;
}

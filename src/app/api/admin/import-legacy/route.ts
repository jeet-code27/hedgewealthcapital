import { posts as legacyPosts } from "@/lib/blog";
import { readingMinutes, slugify } from "@/lib/post-html";
import { legacyHtml } from "@/lib/posts";
import { adminRoute, revalidatePosts } from "@/lib/server/admin-api";
import { Author, Category, Post } from "@/lib/server/models";

/** One-click import of the three news posts migrated from the old site. Skips any slug that already exists. */
export const POST = adminRoute(async () => {
  const author = await Author.findOneAndUpdate(
    { slug: "hedge-wealth-capital-team" },
    { $setOnInsert: { name: "Hedge Wealth Capital Team", slug: "hedge-wealth-capital-team", role: "Private Lending Team" } },
    { upsert: true, new: true },
  );
  let imported = 0;
  for (const p of legacyPosts) {
    if (await Post.exists({ slug: p.slug })) continue;
    const category = await Category.findOneAndUpdate({ slug: slugify(p.category) }, { $setOnInsert: { name: p.category, slug: slugify(p.category) } }, { upsert: true, new: true });
    const content = legacyHtml(p.body);
    await Post.create({
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      content,
      readingMinutes: readingMinutes(content),
      featuredImage: { url: p.image.src, alt: p.image.alt },
      author: author._id,
      category: category._id,
      status: "Published",
      publishedAt: new Date(`${p.date}T12:00:00Z`),
      seo: { metaDescription: p.excerpt },
    });
    imported++;
  }
  revalidatePosts();
  return Response.json({ imported });
});

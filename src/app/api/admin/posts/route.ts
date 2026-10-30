import { adminRoute, revalidatePosts } from "@/lib/server/admin-api";
import { Category, Post } from "@/lib/server/models";
import { postInput } from "@/lib/server/post-input";

export const GET = adminRoute(async () => {
  void Category;
  const posts = await Post.find()
    .select("title slug status isFeatured publishedAt updatedAt createdAt readingMinutes featuredImage.url category tags seo.focusKeyword seo.metaDescription faqs")
    .populate("category", "name")
    .sort({ updatedAt: -1 })
    .lean();
  return Response.json(posts.map((p) => ({ ...p, faqCount: p.faqs?.length ?? 0, faqs: undefined })));
});

export const POST = adminRoute(async (req) => {
  const data = postInput(await req.json());
  if (!data.title) return Response.json({ error: "Title is required." }, { status: 400 });
  if (!data.slug) return Response.json({ error: "Slug is required." }, { status: 400 });
  const post = await Post.create(data);
  revalidatePosts();
  return Response.json({ _id: post._id, slug: post.slug }, { status: 201 });
});

import { adminRoute, isId, revalidatePosts } from "@/lib/server/admin-api";
import { Post } from "@/lib/server/models";
import { postInput } from "@/lib/server/post-input";

type P = { id: string };
const notFound = () => Response.json({ error: "Post not found." }, { status: 404 });

export const GET = adminRoute<P>(async (_req, { params }) => {
  const { id } = await params;
  if (!isId(id)) return notFound();
  const post = await Post.findById(id).lean();
  return post ? Response.json(post) : notFound();
});

export const PUT = adminRoute<P>(async (req, { params }) => {
  const { id } = await params;
  if (!isId(id)) return notFound();
  const data = postInput(await req.json());
  if (!data.title || !data.slug) return Response.json({ error: "Title and slug are required." }, { status: 400 });
  data.relatedPosts = data.relatedPosts.filter((r) => r !== id);
  const post = await Post.findByIdAndUpdate(id, data, { new: true, runValidators: true }).select("_id slug");
  if (!post) return notFound();
  revalidatePosts();
  return Response.json(post);
});

/** Quick actions from the list: publish/unpublish, feature. */
export const PATCH = adminRoute<P>(async (req, { params }) => {
  const { id } = await params;
  if (!isId(id)) return notFound();
  const body = await req.json();
  const update: Record<string, unknown> = {};
  if (body.status === "Published" || body.status === "Draft") update.status = body.status;
  if (typeof body.isFeatured === "boolean") update.isFeatured = body.isFeatured;
  const post = await Post.findById(id);
  if (!post) return notFound();
  if (update.status === "Published" && !post.publishedAt) update.publishedAt = new Date();
  await post.updateOne(update);
  revalidatePosts();
  return Response.json({ ok: true });
});

export const DELETE = adminRoute<P>(async (_req, { params }) => {
  const { id } = await params;
  if (!isId(id)) return notFound();
  const post = await Post.findByIdAndDelete(id);
  if (!post) return notFound();
  await Post.updateMany({ relatedPosts: id }, { $pull: { relatedPosts: id } });
  revalidatePosts();
  return Response.json({ ok: true });
});

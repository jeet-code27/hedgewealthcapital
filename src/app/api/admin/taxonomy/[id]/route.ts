import { adminRoute, isId, revalidatePosts } from "@/lib/server/admin-api";
import { Category, Post } from "@/lib/server/models";
import { taxInput, taxonomies, taxType } from "@/lib/server/taxonomy";

type P = { id: string };

export const PUT = adminRoute<P>(async (req, { params }) => {
  const { id } = await params;
  const type = taxType(req);
  if (!type || !taxonomies[type] || !isId(id)) return Response.json({ error: "Bad request." }, { status: 400 });
  const data = taxInput(type, await req.json());
  if (!data.name) return Response.json({ error: "Name is required." }, { status: 400 });
  const doc = await (taxonomies[type].model as typeof Category).findByIdAndUpdate(id, data, { new: true });
  revalidatePosts();
  return doc ? Response.json(doc) : Response.json({ error: "Not found." }, { status: 404 });
});

export const DELETE = adminRoute<P>(async (req, { params }) => {
  const { id } = await params;
  const type = taxType(req);
  if (!type || !taxonomies[type] || !isId(id)) return Response.json({ error: "Bad request." }, { status: 400 });
  const { model, field } = taxonomies[type];
  await (model as typeof Category).findByIdAndDelete(id);
  // Detach from posts so nothing points at a deleted record.
  if (field === "tags") await Post.updateMany({ tags: id }, { $pull: { tags: id } });
  else await Post.updateMany({ [field]: id }, { $set: { [field]: null } });
  revalidatePosts();
  return Response.json({ ok: true });
});

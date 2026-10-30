import { adminRoute, revalidatePosts } from "@/lib/server/admin-api";
import { Category, Post } from "@/lib/server/models";
import { taxInput, taxonomies, taxType } from "@/lib/server/taxonomy";

export const GET = adminRoute(async (req) => {
  const type = taxType(req);
  if (!type || !taxonomies[type]) return Response.json({ error: "Unknown type." }, { status: 400 });
  const { model, field } = taxonomies[type];
  const [items, counts] = await Promise.all([
    (model as typeof Category).find().sort({ name: 1 }).lean(),
    Post.aggregate<{ _id: unknown; n: number }>([{ $unwind: `$${field}` }, { $group: { _id: `$${field}`, n: { $sum: 1 } } }]),
  ]);
  const byId = new Map(counts.map((c) => [String(c._id), c.n]));
  return Response.json(items.map((i) => ({ ...i, count: byId.get(String(i._id)) ?? 0 })));
});

export const POST = adminRoute(async (req) => {
  const type = taxType(req);
  if (!type || !taxonomies[type]) return Response.json({ error: "Unknown type." }, { status: 400 });
  const data = taxInput(type, await req.json());
  if (!data.name || !data.slug) return Response.json({ error: "Name is required." }, { status: 400 });
  const doc = await (taxonomies[type].model as typeof Category).create(data);
  revalidatePosts();
  return Response.json(doc, { status: 201 });
});

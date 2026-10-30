import { adminRoute, isId } from "@/lib/server/admin-api";
import { Submission } from "@/lib/server/models";

const STATUSES = ["New", "Contacted", "In Progress", "Closed", "Spam"];

export const GET = adminRoute(async () => {
  const items = await Submission.find().sort({ createdAt: -1 }).limit(5000).lean();
  return Response.json(items);
});

/** Bulk status change: { ids, status } */
export const PATCH = adminRoute(async (req) => {
  const { ids, status } = await req.json();
  if (!Array.isArray(ids) || !STATUSES.includes(status)) return Response.json({ error: "Bad request." }, { status: 400 });
  await Submission.updateMany({ _id: { $in: ids.filter(isId) } }, { status });
  return Response.json({ ok: true });
});

/** Bulk delete: { ids } */
export const DELETE = adminRoute(async (req) => {
  const { ids } = await req.json();
  if (!Array.isArray(ids)) return Response.json({ error: "Bad request." }, { status: 400 });
  await Submission.deleteMany({ _id: { $in: ids.filter(isId) } });
  return Response.json({ ok: true });
});

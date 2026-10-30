import { adminRoute, isId, str } from "@/lib/server/admin-api";
import { Submission } from "@/lib/server/models";

type P = { id: string };
const STATUSES = ["New", "Contacted", "In Progress", "Closed", "Spam"];

export const PATCH = adminRoute<P>(async (req, { params }) => {
  const { id } = await params;
  if (!isId(id)) return Response.json({ error: "Not found." }, { status: 404 });
  const body = await req.json();
  const update: Record<string, string> = {};
  if (STATUSES.includes(body.status)) update.status = body.status;
  if (typeof body.notes === "string") update.notes = str(body.notes, 5000);
  const doc = await Submission.findByIdAndUpdate(id, update, { new: true }).lean();
  return doc ? Response.json(doc) : Response.json({ error: "Not found." }, { status: 404 });
});

export const DELETE = adminRoute<P>(async (_req, { params }) => {
  const { id } = await params;
  if (!isId(id)) return Response.json({ error: "Not found." }, { status: 404 });
  await Submission.findByIdAndDelete(id);
  return Response.json({ ok: true });
});

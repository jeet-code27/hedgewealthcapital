import { requireAdmin } from "@/lib/server/auth";
import { deleteImage, listImages, uploadImage } from "@/lib/server/cloudinary";

const MAX_BYTES = 10 * 1024 * 1024;
const TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif", "image/svg+xml"];

const fail = (err: unknown) => {
  console.error("[media]", err);
  const e = err as { message?: string; error?: { message?: string } };
  return Response.json({ error: e.error?.message || e.message || "Cloudinary request failed." }, { status: 500 });
};

export async function GET(req: Request) {
  const denied = requireAdmin(req);
  if (denied) return denied;
  try {
    return Response.json(await listImages(new URL(req.url).searchParams.get("cursor") ?? undefined));
  } catch (err) {
    return fail(err);
  }
}

export async function POST(req: Request) {
  const denied = requireAdmin(req);
  if (denied) return denied;
  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) return Response.json({ error: "No file uploaded." }, { status: 400 });
    if (!TYPES.includes(file.type)) return Response.json({ error: "Upload a JPG, PNG, WebP, GIF, AVIF or SVG image." }, { status: 400 });
    if (file.size > MAX_BYTES) return Response.json({ error: "Images must be under 10 MB." }, { status: 400 });
    const item = await uploadImage(Buffer.from(await file.arrayBuffer()), file.name);
    return Response.json(item, { status: 201 });
  } catch (err) {
    return fail(err);
  }
}

export async function DELETE(req: Request) {
  const denied = requireAdmin(req);
  if (denied) return denied;
  try {
    const { publicId } = await req.json();
    if (typeof publicId !== "string") return Response.json({ error: "publicId is required." }, { status: 400 });
    return (await deleteImage(publicId)) ? Response.json({ ok: true }) : Response.json({ error: "Delete failed." }, { status: 500 });
  } catch (err) {
    return fail(err);
  }
}

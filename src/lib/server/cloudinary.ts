import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/** Root folder for this site; the Cloudinary account is shared with other projects. */
export const mediaFolder = `${process.env.CLOUDINARY_FOLDER || "hedgewealthcapital"}/blog`;

export type MediaItem = { publicId: string; url: string; width: number; height: number; bytes: number; format: string; createdAt: string };

type Resource = { public_id: string; secure_url: string; width: number; height: number; bytes: number; format: string; created_at: string };
const toItem = (r: Resource): MediaItem => ({ publicId: r.public_id, url: r.secure_url, width: r.width, height: r.height, bytes: r.bytes, format: r.format, createdAt: r.created_at });

export async function uploadImage(buffer: Buffer, filename: string): Promise<MediaItem> {
  const base = filename.replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "image";
  const result = await new Promise<Resource>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: mediaFolder, public_id: `${base}-${Date.now().toString(36)}`, resource_type: "image" }, (err, res) => (err || !res ? reject(err) : resolve(res as unknown as Resource)))
      .end(buffer);
  });
  return toItem(result);
}

export async function listImages(cursor?: string): Promise<{ items: MediaItem[]; next: string | null }> {
  const res = await cloudinary.api.resources({ type: "upload", resource_type: "image", prefix: `${mediaFolder}/`, max_results: 60, direction: -1, next_cursor: cursor });
  return { items: (res.resources as Resource[]).map(toItem), next: res.next_cursor ?? null };
}

/** Only deletes assets inside this site's folder. */
export async function deleteImage(publicId: string) {
  if (!publicId.startsWith(`${mediaFolder}/`)) throw new Error("Not a Hedge Wealth Capital asset.");
  const res = await cloudinary.uploader.destroy(publicId);
  return res.result === "ok" || res.result === "not found";
}

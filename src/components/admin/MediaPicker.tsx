"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Copy, Loader2, Trash2, UploadCloud, X } from "lucide-react";
import { api, Button, Spinner, useToast } from "./ui";

export type Media = { publicId: string; url: string; width: number; height: number; bytes: number; format: string; createdAt: string };

export async function uploadFile(file: File): Promise<Media> {
  const form = new FormData();
  form.append("file", file);
  return api<Media>("/api/admin/media", { method: "POST", body: form });
}

/** Grid of this site's Cloudinary images with upload, copy URL and delete. `onPick` turns it into a picker. */
export function MediaGrid({ onPick }: { onPick?: (m: Media) => void }) {
  const [items, setItems] = useState<Media[] | null>(null);
  const [next, setNext] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(0);
  const [drag, setDrag] = useState(false);
  const [copied, setCopied] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const load = useCallback((cursor?: string) => {
    api<{ items: Media[]; next: string | null }>(`/api/admin/media${cursor ? `?cursor=${encodeURIComponent(cursor)}` : ""}`).then(
      (res) => {
        setError("");
        setItems((prev) => (cursor ? [...(prev ?? []), ...res.items] : res.items));
        setNext(res.next);
      },
      (e) => {
        setError((e as Error).message);
        setItems((prev) => prev ?? []);
      },
    );
  }, []);
  useEffect(() => load(), [load]);

  async function upload(files: FileList | File[]) {
    const list = [...files].filter((f) => f.type.startsWith("image/"));
    setUploading((n) => n + list.length);
    for (const f of list) {
      try {
        const m = await uploadFile(f);
        setItems((prev) => [m, ...(prev ?? [])]);
      } catch (e) {
        toast(`${f.name}: ${(e as Error).message}`, "error");
      } finally {
        setUploading((n) => n - 1);
      }
    }
  }

  async function remove(m: Media) {
    if (!confirm("Delete this image from Cloudinary? Posts using it will show a broken image.")) return;
    try {
      await api("/api/admin/media", { method: "DELETE", json: { publicId: m.publicId } });
      setItems((prev) => prev?.filter((x) => x.publicId !== m.publicId) ?? null);
      toast("Image deleted.");
    } catch (e) {
      toast((e as Error).message, "error");
    }
  }

  return (
    <div>
      <div
        onDragOver={(e) => (e.preventDefault(), setDrag(true))}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          upload(e.dataTransfer.files);
        }}
        onClick={() => input.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-8 text-center transition ${drag ? "border-leaf bg-leaf-100/60" : "border-navy/15 bg-navy-50/40 hover:border-navy/30"}`}
      >
        {uploading ? <Loader2 className="size-7 animate-spin text-leaf-600" /> : <UploadCloud className="size-7 text-navy/60" />}
        <p className="mt-2 text-sm font-bold">{uploading ? `Uploading ${uploading} image${uploading > 1 ? "s" : ""}...` : "Drop images here or click to upload"}</p>
        <p className="text-xs text-muted">JPG, PNG, WebP, GIF or AVIF · up to 10 MB · stored in Cloudinary</p>
        <input ref={input} type="file" accept="image/*" multiple hidden onChange={(e) => e.target.files && upload(e.target.files)} />
      </div>

      {error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}
      {!items ? (
        <Spinner />
      ) : !items.length ? (
        <p className="py-10 text-center text-sm text-muted">No images uploaded yet.</p>
      ) : (
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {items.map((m) => (
            <div key={m.publicId} className="group relative overflow-hidden rounded-xl border border-navy/8 bg-navy-50">
              <button type="button" disabled={!onPick} onClick={() => onPick?.(m)} className="block aspect-[4/3] w-full disabled:cursor-default">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.url.replace("/upload/", "/upload/c_fill,w_400,h_300,q_auto,f_auto/")} alt="" loading="lazy" className="size-full object-cover transition group-hover:scale-105" />
              </button>
              <div className="flex items-center justify-between gap-1 bg-white px-2 py-1.5">
                <span className="truncate text-[11px] font-semibold text-muted">
                  {m.width}×{m.height} · {Math.round(m.bytes / 1024)} KB
                </span>
                <div className="flex shrink-0">
                  <button
                    type="button"
                    title="Copy URL"
                    onClick={() => navigator.clipboard.writeText(m.url).then(() => (setCopied(m.publicId), setTimeout(() => setCopied(""), 1500)))}
                    className="grid size-7 place-items-center rounded-md text-muted hover:bg-navy-50 hover:text-navy"
                  >
                    {copied === m.publicId ? <Check className="size-3.5 text-leaf-600" /> : <Copy className="size-3.5" />}
                  </button>
                  <button type="button" title="Delete" onClick={() => remove(m)} className="grid size-7 place-items-center rounded-md text-muted hover:bg-red-50 hover:text-red-600">
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
              {onPick && <span className="pointer-events-none absolute top-2 left-2 rounded-full bg-navy px-2.5 py-1 text-[11px] font-bold text-white opacity-0 transition group-hover:opacity-100">Select</span>}
            </div>
          ))}
        </div>
      )}
      {next && (
        <div className="mt-5 text-center">
          <Button variant="secondary" onClick={() => load(next)}>
            Load more
          </Button>
        </div>
      )}
    </div>
  );
}

export function MediaModal({ open, onClose, onPick }: { open: boolean; onClose: () => void; onPick: (m: Media) => void }) {
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-navy-950/60" onClick={onClose} />
      <div role="dialog" aria-modal aria-label="Media library" className="relative flex max-h-[88vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-navy/8 px-5 py-4">
          <h2 className="text-lg font-extrabold">Choose an image</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 hover:bg-navy-50" aria-label="Close">
            <X className="size-5" />
          </button>
        </div>
        <div className="overflow-y-auto p-5">
          <MediaGrid
            onPick={(m) => {
              onPick(m);
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
}

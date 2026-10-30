"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowLeft, ArrowUp, ExternalLink, ImagePlus, Plus, Star, Trash2, X } from "lucide-react";
import { slugify } from "@/lib/slugify";
import { MediaModal } from "./MediaPicker";
import RichEditor from "./RichEditor";
import SeoPanel, { type Seo } from "./SeoPanel";
import { api, Badge, Button, Card, Field, inputCls, Spinner, useToast } from "./ui";

type Tax = { _id: string; name: string };
type PostLite = { _id: string; title: string; status: string };

export type PostForm = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: "Draft" | "Published";
  isFeatured: boolean;
  publishedAt: string;
  featuredImage: { url: string; publicId: string; alt: string; caption: string };
  category: string;
  tags: string[];
  author: string;
  relatedPosts: string[];
  faqs: { question: string; answer: string }[];
  seo: Seo;
};

const blank: PostForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  status: "Draft",
  isFeatured: false,
  publishedAt: "",
  featuredImage: { url: "", publicId: "", alt: "", caption: "" },
  category: "",
  tags: [],
  author: "",
  relatedPosts: [],
  faqs: [],
  seo: { metaTitle: "", metaDescription: "", focusKeyword: "", canonicalUrl: "", ogTitle: "", ogDescription: "", ogImage: "", noIndex: false },
};

/** Maps a stored post into the form shape. */
export function toForm(p: Record<string, unknown>): PostForm {
  const d = p as Partial<PostForm> & { publishedAt?: string | null; category?: string | null; author?: string | null };
  return {
    ...blank,
    ...d,
    publishedAt: d.publishedAt ? new Date(d.publishedAt).toISOString().slice(0, 10) : "",
    category: d.category ?? "",
    author: d.author ?? "",
    tags: (d.tags ?? []).map(String),
    relatedPosts: (d.relatedPosts ?? []).map(String),
    faqs: (d.faqs ?? []).map((f) => ({ question: f.question ?? "", answer: f.answer ?? "" })),
    featuredImage: { ...blank.featuredImage, ...(d.featuredImage ?? {}) },
    seo: { ...blank.seo, ...(d.seo ?? {}) },
  };
}

export default function PostEditor({ id, initial }: { id?: string; initial?: PostForm }) {
  const router = useRouter();
  const toast = useToast();
  const [form, setForm] = useState<PostForm>(initial ?? blank);
  const [saved, setSaved] = useState(JSON.stringify(initial ?? blank));
  const [slugTouched, setSlugTouched] = useState(Boolean(initial?.slug));
  const [saving, setSaving] = useState<"" | "Draft" | "Published">("");
  const [media, setMedia] = useState(false);
  const [cats, setCats] = useState<Tax[]>([]);
  const [tags, setTags] = useState<Tax[]>([]);
  const [authors, setAuthors] = useState<Tax[]>([]);
  const [allPosts, setAllPosts] = useState<PostLite[]>([]);
  const dirty = JSON.stringify(form) !== saved;

  const set = useCallback(<K extends keyof PostForm>(k: K, v: PostForm[K]) => setForm((f) => ({ ...f, [k]: v })), []);

  useEffect(() => {
    api<Tax[]>("/api/admin/taxonomy?type=category").then(setCats, () => {});
    api<Tax[]>("/api/admin/taxonomy?type=tag").then(setTags, () => {});
    api<Tax[]>("/api/admin/taxonomy?type=author").then(setAuthors, () => {});
    api<PostLite[]>("/api/admin/posts").then(setAllPosts, () => {});
  }, []);

  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      if (dirty) e.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const save = useCallback(
    async (status: "Draft" | "Published") => {
      if (!form.title.trim()) return toast("Add a title first.", "error");
      setSaving(status);
      const payload = { ...form, status, slug: form.slug || slugify(form.title) };
      try {
        const res = await api<{ _id: string; slug: string }>(id ? `/api/admin/posts/${id}` : "/api/admin/posts", { method: id ? "PUT" : "POST", json: payload });
        const next = { ...payload, slug: res.slug, publishedAt: status === "Published" && !payload.publishedAt ? new Date().toISOString().slice(0, 10) : payload.publishedAt };
        setForm(next);
        setSaved(JSON.stringify(next));
        toast(status === "Published" ? (form.status === "Published" ? "Post updated." : "Post published!") : "Draft saved.");
        if (!id) router.replace(`/admin/posts/${res._id}`);
      } catch (e) {
        toast((e as Error).message, "error");
      } finally {
        setSaving("");
      }
    },
    [form, id, router, toast],
  );

  // Ctrl/Cmd+S saves with the current status.
  const saveRef = useRef(save);
  useEffect(() => {
    saveRef.current = save;
  }, [save]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        saveRef.current(form.status);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [form.status]);

  async function createTax(type: "category" | "tag" | "author", name: string) {
    if (!name.trim()) return;
    try {
      const doc = await api<Tax>(`/api/admin/taxonomy?type=${type}`, { method: "POST", json: { name } });
      if (type === "category") {
        setCats((c) => [...c, doc]);
        set("category", doc._id);
      } else if (type === "tag") {
        setTags((t) => [...t, doc]);
        set("tags", [...form.tags, doc._id]);
      } else {
        setAuthors((a) => [...a, doc]);
        set("author", doc._id);
      }
    } catch (e) {
      toast((e as Error).message, "error");
    }
  }

  const seoInput = useMemo(
    () => ({ title: form.title, slug: form.slug, excerpt: form.excerpt, content: form.content, seo: form.seo, imageAlt: form.featuredImage.alt, hasImage: Boolean(form.featuredImage.url), faqCount: form.faqs.filter((f) => f.question && f.answer).length }),
    [form],
  );

  const faq = (i: number, patch: Partial<PostForm["faqs"][number]>) => set("faqs", form.faqs.map((f, j) => (j === i ? { ...f, ...patch } : f)));
  const moveFaq = (i: number, d: -1 | 1) => {
    const list = [...form.faqs];
    [list[i], list[i + d]] = [list[i + d], list[i]];
    set("faqs", list);
  };

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/posts" className="grid size-9 place-items-center rounded-xl border border-navy/10 bg-white hover:border-navy/30" aria-label="Back to posts">
            <ArrowLeft className="size-4" />
          </Link>
          <div>
            <h1 className="text-xl font-extrabold sm:text-2xl">{id ? "Edit post" : "New post"}</h1>
            <p className="text-xs font-semibold text-muted">
              <Badge>{form.status}</Badge> {dirty ? <span className="ml-1 text-amber-600">Unsaved changes</span> : <span className="ml-1">All changes saved</span>}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {id && form.status === "Published" && (
            <a href={`/blog/${form.slug}`} target="_blank">
              <Button variant="ghost">
                <ExternalLink className="size-4" /> View
              </Button>
            </a>
          )}
          <Button variant="secondary" loading={saving === "Draft"} onClick={() => save("Draft")}>
            {form.status === "Published" ? "Unpublish" : "Save draft"}
          </Button>
          <Button variant="leaf" loading={saving === "Published"} onClick={() => save("Published")}>
            {form.status === "Published" ? "Update" : "Publish"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0 space-y-6">
          <Card className="space-y-4 p-5">
            <input
              value={form.title}
              onChange={(e) => {
                set("title", e.target.value);
                if (!slugTouched) set("slug", slugify(e.target.value));
              }}
              placeholder="Post title (your H1)"
              className="w-full border-0 bg-transparent text-2xl font-extrabold tracking-tight outline-none placeholder:text-navy/25 sm:text-3xl"
            />
            <div className="flex items-center gap-1 rounded-xl bg-navy-50 px-3 py-2 text-sm">
              <span className="shrink-0 font-semibold text-muted">hedgewealthcapital.com/blog/</span>
              <input
                value={form.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"));
                }}
                onBlur={() => set("slug", slugify(form.slug))}
                placeholder="post-slug"
                className="min-w-0 flex-1 bg-transparent font-bold outline-none"
              />
            </div>
            <Field label="Excerpt" hint={`${form.excerpt.length}/300 · shown on blog cards and used as meta description fallback`}>
              <textarea rows={2} maxLength={300} value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} className={inputCls} placeholder="One or two sentences summarising the article." />
            </Field>
          </Card>

          <RichEditor key={id ?? "new"} value={form.content} onChange={(html) => set("content", html)} />

          <Card className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="font-extrabold">FAQs</h2>
                <p className="text-xs text-muted">Shown at the end of the post and output as FAQPage schema for Google rich results.</p>
              </div>
              <Button variant="secondary" onClick={() => set("faqs", [...form.faqs, { question: "", answer: "" }])}>
                <Plus className="size-4" /> Add FAQ
              </Button>
            </div>
            {!form.faqs.length && <p className="rounded-xl border border-dashed border-navy/15 py-6 text-center text-sm text-muted">No FAQs yet. Add 3–6 questions people search for about this topic.</p>}
            <div className="space-y-3">
              {form.faqs.map((f, i) => (
                <div key={i} className="rounded-xl border border-navy/10 bg-navy-50/40 p-3">
                  <div className="flex gap-2">
                    <span className="mt-2.5 grid size-6 shrink-0 place-items-center rounded-full bg-navy text-[11px] font-extrabold text-white">{i + 1}</span>
                    <div className="flex-1 space-y-2">
                      <input value={f.question} onChange={(e) => faq(i, { question: e.target.value })} placeholder="Question" className={`${inputCls} font-bold`} />
                      <textarea rows={2} value={f.answer} onChange={(e) => faq(i, { answer: e.target.value })} placeholder="Answer (plain text, 40–60 words works best)" className={inputCls} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <button type="button" disabled={i === 0} onClick={() => moveFaq(i, -1)} className="grid size-7 place-items-center rounded-md hover:bg-white disabled:opacity-30" aria-label="Move up">
                        <ArrowUp className="size-3.5" />
                      </button>
                      <button type="button" disabled={i === form.faqs.length - 1} onClick={() => moveFaq(i, 1)} className="grid size-7 place-items-center rounded-md hover:bg-white disabled:opacity-30" aria-label="Move down">
                        <ArrowDown className="size-3.5" />
                      </button>
                      <button type="button" onClick={() => set("faqs", form.faqs.filter((_, j) => j !== i))} className="grid size-7 place-items-center rounded-md text-red-500 hover:bg-red-50" aria-label="Remove FAQ">
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <SeoPanel input={seoInput} onChange={(seo) => set("seo", seo)} />
        </div>

        <div className="space-y-5 xl:sticky xl:top-6 xl:self-start">
          <Card className="space-y-4 p-5">
            <h2 className="font-extrabold">Publishing</h2>
            <Field label="Publish date" hint="optional, defaults to today">
              <input type="date" value={form.publishedAt} onChange={(e) => set("publishedAt", e.target.value)} className={inputCls} />
            </Field>
            <label className="flex items-center gap-2.5 text-sm font-bold">
              <input type="checkbox" checked={form.isFeatured} onChange={(e) => set("isFeatured", e.target.checked)} className="size-4 accent-[#192861]" />
              <Star className={`size-4 ${form.isFeatured ? "fill-amber-400 text-amber-400" : "text-muted"}`} /> Feature at the top of /blog
            </label>
          </Card>

          <Card className="space-y-3 p-5">
            <h2 className="font-extrabold">Featured image</h2>
            {form.featuredImage.url ? (
              <div className="relative overflow-hidden rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={form.featuredImage.url} alt="" className="aspect-[16/9] w-full object-cover" />
                <button type="button" onClick={() => set("featuredImage", blank.featuredImage)} className="absolute top-2 right-2 grid size-8 place-items-center rounded-full bg-white/90 text-red-600 shadow" aria-label="Remove image">
                  <X className="size-4" />
                </button>
              </div>
            ) : (
              <button type="button" onClick={() => setMedia(true)} className="flex aspect-[16/9] w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-navy/15 bg-navy-50/50 text-sm font-bold text-muted hover:border-navy/30">
                <ImagePlus className="mb-1 size-6" /> Upload or choose image
              </button>
            )}
            {form.featuredImage.url && (
              <Button variant="secondary" className="w-full" onClick={() => setMedia(true)}>
                Replace image
              </Button>
            )}
            <Field label="Alt text" hint="required for SEO">
              <input value={form.featuredImage.alt} onChange={(e) => set("featuredImage", { ...form.featuredImage, alt: e.target.value })} className={inputCls} placeholder="Describe the image" />
            </Field>
          </Card>

          <Card className="space-y-4 p-5">
            <h2 className="font-extrabold">Organise</h2>
            <TaxSelect label="Category" items={cats} value={form.category} onChange={(v) => set("category", v)} onCreate={(n) => createTax("category", n)} />
            <TaxSelect label="Author" items={authors} value={form.author} onChange={(v) => set("author", v)} onCreate={(n) => createTax("author", n)} />
            <div>
              <p className="mb-1.5 text-xs font-bold">Tags</p>
              <div className="flex flex-wrap gap-1.5">
                {tags.map((t) => {
                  const on = form.tags.includes(t._id);
                  return (
                    <button
                      key={t._id}
                      type="button"
                      onClick={() => set("tags", on ? form.tags.filter((x) => x !== t._id) : [...form.tags, t._id])}
                      className={`rounded-full px-2.5 py-1 text-xs font-bold transition ${on ? "bg-navy text-white" : "bg-navy-50 text-navy hover:bg-navy-100"}`}
                    >
                      {t.name}
                    </button>
                  );
                })}
              </div>
              <AddInline placeholder="New tag" onAdd={(n) => createTax("tag", n)} />
            </div>
          </Card>

          <Card className="space-y-3 p-5">
            <div>
              <h2 className="font-extrabold">Related posts</h2>
              <p className="text-xs text-muted">Shown under the article. Empty = auto-picked from the same category.</p>
            </div>
            {form.relatedPosts.map((rid) => {
              const p = allPosts.find((x) => x._id === rid);
              return (
                <div key={rid} className="flex items-center gap-2 rounded-lg bg-navy-50 px-3 py-2 text-sm">
                  <span className="min-w-0 flex-1 truncate font-semibold">{p?.title ?? "Post"}</span>
                  <button type="button" onClick={() => set("relatedPosts", form.relatedPosts.filter((x) => x !== rid))} aria-label="Remove">
                    <X className="size-4 text-muted" />
                  </button>
                </div>
              );
            })}
            {form.relatedPosts.length < 3 && (
              <select
                value=""
                onChange={(e) => e.target.value && set("relatedPosts", [...form.relatedPosts, e.target.value])}
                className={inputCls}
              >
                <option value="">+ Add a related post</option>
                {allPosts
                  .filter((p) => p._id !== id && p.status === "Published" && !form.relatedPosts.includes(p._id))
                  .map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.title}
                    </option>
                  ))}
              </select>
            )}
          </Card>
        </div>
      </div>

      <MediaModal open={media} onClose={() => setMedia(false)} onPick={(m) => set("featuredImage", { ...form.featuredImage, url: m.url, publicId: m.publicId })} />
    </>
  );
}

function TaxSelect({ label, items, value, onChange, onCreate }: { label: string; items: Tax[]; value: string; onChange: (v: string) => void; onCreate: (name: string) => void }) {
  return (
    <div>
      <p className="mb-1.5 text-xs font-bold">{label}</p>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={inputCls}>
        <option value="">— None —</option>
        {items.map((i) => (
          <option key={i._id} value={i._id}>
            {i.name}
          </option>
        ))}
      </select>
      <AddInline placeholder={`New ${label.toLowerCase()}`} onAdd={onCreate} />
    </div>
  );
}

function AddInline({ placeholder, onAdd }: { placeholder: string; onAdd: (name: string) => void }) {
  const [v, setV] = useState("");
  const add = () => {
    onAdd(v);
    setV("");
  };
  return (
    <div className="mt-2 flex gap-1.5">
      <input value={v} onChange={(e) => setV(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add())} placeholder={placeholder} className={`${inputCls} py-1.5 text-xs`} />
      <button type="button" onClick={add} className="grid size-8 shrink-0 place-items-center rounded-lg bg-navy-50 hover:bg-navy-100" aria-label={`Add ${placeholder}`}>
        <Plus className="size-4" />
      </button>
    </div>
  );
}

export function EditorLoading() {
  return <Spinner label="Loading post..." />;
}

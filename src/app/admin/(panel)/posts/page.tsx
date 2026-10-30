"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ExternalLink, Eye, EyeOff, Pencil, PenSquare, Search, Star, Trash2 } from "lucide-react";
import { api, Badge, Button, Card, Empty, ErrorBox, fmtDate, inputCls, PageHeader, Spinner, useToast } from "@/components/admin/ui";

type Row = {
  _id: string;
  title: string;
  slug: string;
  status: "Published" | "Draft";
  isFeatured: boolean;
  publishedAt: string | null;
  updatedAt: string;
  readingMinutes: number;
  featuredImage?: { url?: string };
  category?: { name: string } | null;
  seo?: { focusKeyword?: string; metaDescription?: string };
  faqCount: number;
};

const PAGE = 12;

export default function PostsPage() {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"All" | "Published" | "Draft">("All");
  const [sort, setSort] = useState<"updated" | "published" | "title">("updated");
  const [page, setPage] = useState(1);
  const toast = useToast();

  const load = useCallback(() => {
    api<Row[]>("/api/admin/posts").then(
      (r) => (setError(""), setRows(r)),
      (e) => setError(e.message),
    );
  }, []);
  useEffect(load, [load]);

  const filtered = useMemo(() => {
    if (!rows) return [];
    const term = q.toLowerCase();
    const list = rows.filter((r) => (status === "All" || r.status === status) && (!term || `${r.title} ${r.slug} ${r.seo?.focusKeyword ?? ""}`.toLowerCase().includes(term)));
    return list.sort((a, b) =>
      sort === "title" ? a.title.localeCompare(b.title) : sort === "published" ? (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "") : b.updatedAt.localeCompare(a.updatedAt),
    );
  }, [rows, q, status, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE));
  const current = Math.min(page, pages);
  const visible = filtered.slice((current - 1) * PAGE, current * PAGE);

  async function patch(r: Row, body: Partial<Row>, msg: string) {
    setRows((list) => list?.map((x) => (x._id === r._id ? { ...x, ...body } : x)) ?? null);
    try {
      await api(`/api/admin/posts/${r._id}`, { method: "PATCH", json: body });
      toast(msg);
    } catch (e) {
      toast((e as Error).message, "error");
      load();
    }
  }

  async function remove(r: Row) {
    if (!confirm(`Delete "${r.title}"? This can't be undone.`)) return;
    try {
      await api(`/api/admin/posts/${r._id}`, { method: "DELETE" });
      setRows((list) => list?.filter((x) => x._id !== r._id) ?? null);
      toast("Post deleted.");
    } catch (e) {
      toast((e as Error).message, "error");
    }
  }

  const counts = { All: rows?.length ?? 0, Published: rows?.filter((r) => r.status === "Published").length ?? 0, Draft: rows?.filter((r) => r.status === "Draft").length ?? 0 };

  return (
    <>
      <PageHeader
        title="Blog Posts"
        sub="Write, publish and optimise articles for /blog."
        actions={
          <Link href="/admin/posts/new">
            <Button variant="leaf">
              <PenSquare className="size-4" /> New post
            </Button>
          </Link>
        }
      />

      <Card className="mb-4 flex flex-col gap-3 p-3 lg:flex-row lg:items-center">
        <div className="flex gap-1 rounded-xl bg-navy-50 p-1">
          {(["All", "Published", "Draft"] as const).map((s) => (
            <button key={s} onClick={() => (setStatus(s), setPage(1))} className={`rounded-lg px-3 py-1.5 text-sm font-bold transition ${status === s ? "bg-white shadow-sm" : "text-muted hover:text-navy"}`}>
              {s} <span className="text-muted">{counts[s]}</span>
            </button>
          ))}
        </div>
        <label className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
          <input value={q} onChange={(e) => (setQ(e.target.value), setPage(1))} placeholder="Search title, slug or keyword" className={`${inputCls} pl-9`} />
        </label>
        <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className={`${inputCls} lg:w-48`}>
          <option value="updated">Recently edited</option>
          <option value="published">Publish date</option>
          <option value="title">Title A–Z</option>
        </select>
      </Card>

      {error ? (
        <ErrorBox message={error} onRetry={load} />
      ) : !rows ? (
        <Spinner />
      ) : !filtered.length ? (
        <Empty
          title={rows.length ? "No posts match" : "No posts yet"}
          sub={rows.length ? "Try a different search or filter." : "Write your first article, or import the old site's news posts from the dashboard."}
          action={
            !rows.length && (
              <Link href="/admin/posts/new">
                <Button variant="leaf">Write a post</Button>
              </Link>
            )
          }
        />
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead className="border-b border-navy/8 bg-navy-50/60 text-xs font-extrabold tracking-wide text-muted uppercase">
                <tr>
                  <th className="px-4 py-3">Post</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">SEO</th>
                  <th className="px-4 py-3">Published</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy/6">
                {visible.map((r) => {
                  const desc = r.seo?.metaDescription?.length ?? 0;
                  const seoOk = Boolean(r.seo?.focusKeyword) && desc >= 120 && desc <= 165;
                  return (
                    <tr key={r._id} className="hover:bg-navy-50/40">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {r.featuredImage?.url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={r.featuredImage.url} alt="" className="h-11 w-16 shrink-0 rounded-lg object-cover" />
                          ) : (
                            <span className="h-11 w-16 shrink-0 rounded-lg bg-navy-50" />
                          )}
                          <div className="min-w-0">
                            <Link href={`/admin/posts/${r._id}`} className="line-clamp-1 font-bold hover:text-leaf-600">
                              {r.isFeatured && <Star className="mr-1 -mt-0.5 inline size-3.5 fill-amber-400 text-amber-400" />}
                              {r.title}
                            </Link>
                            <p className="truncate text-xs text-muted">
                              /blog/{r.slug} · {r.category?.name ?? "Uncategorized"} · {r.readingMinutes} min
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge>{r.status}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-bold ${seoOk ? "text-leaf-600" : "text-amber-600"}`}>
                          <span className={`size-2 rounded-full ${seoOk ? "bg-leaf" : "bg-amber-400"}`} />
                          {seoOk ? "Good" : "Needs work"}
                        </span>
                        <p className="text-xs text-muted">{r.faqCount ? `${r.faqCount} FAQs` : "No FAQs"}</p>
                      </td>
                      <td className="px-4 py-3 text-xs font-semibold text-muted">
                        {fmtDate(r.publishedAt)}
                        <p>Edited {fmtDate(r.updatedAt)}</p>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-1">
                          <IconBtn label={r.isFeatured ? "Unfeature" : "Feature on blog"} onClick={() => patch(r, { isFeatured: !r.isFeatured }, r.isFeatured ? "Removed from featured." : "Featured on the blog.")}>
                            <Star className={`size-4 ${r.isFeatured ? "fill-amber-400 text-amber-400" : ""}`} />
                          </IconBtn>
                          <IconBtn
                            label={r.status === "Published" ? "Unpublish" : "Publish"}
                            onClick={() => patch(r, { status: r.status === "Published" ? "Draft" : "Published" }, r.status === "Published" ? "Moved to drafts." : "Published.")}
                          >
                            {r.status === "Published" ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                          </IconBtn>
                          {r.status === "Published" && (
                            <a href={`/blog/${r.slug}`} target="_blank" title="View live" className="grid size-8 place-items-center rounded-lg text-muted hover:bg-navy-50 hover:text-navy">
                              <ExternalLink className="size-4" />
                            </a>
                          )}
                          <Link href={`/admin/posts/${r._id}`} title="Edit" className="grid size-8 place-items-center rounded-lg text-muted hover:bg-navy-50 hover:text-navy">
                            <Pencil className="size-4" />
                          </Link>
                          <IconBtn label="Delete" onClick={() => remove(r)} danger>
                            <Trash2 className="size-4" />
                          </IconBtn>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {pages > 1 && (
            <div className="flex items-center justify-between border-t border-navy/8 px-4 py-3 text-sm">
              <span className="text-muted">
                {(current - 1) * PAGE + 1}–{Math.min(current * PAGE, filtered.length)} of {filtered.length}
              </span>
              <div className="flex gap-2">
                <Button variant="secondary" disabled={current === 1} onClick={() => setPage(current - 1)}>
                  Previous
                </Button>
                <Button variant="secondary" disabled={current === pages} onClick={() => setPage(current + 1)}>
                  Next
                </Button>
              </div>
            </div>
          )}
        </Card>
      )}
    </>
  );
}

function IconBtn({ label, onClick, danger, children }: { label: string; onClick: () => void; danger?: boolean; children: React.ReactNode }) {
  return (
    <button onClick={onClick} title={label} aria-label={label} className={`grid size-8 place-items-center rounded-lg text-muted transition ${danger ? "hover:bg-red-50 hover:text-red-600" : "hover:bg-navy-50 hover:text-navy"}`}>
      {children}
    </button>
  );
}

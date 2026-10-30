"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, Pencil, Plus, Trash2, X } from "lucide-react";
import { api, Button, Card, Empty, ErrorBox, Field, inputCls, PageHeader, Spinner, useToast } from "@/components/admin/ui";

type Type = "category" | "tag" | "author";
type Item = { _id: string; name: string; slug: string; count: number; description?: string; role?: string; bio?: string; avatar?: string };

const tabs: { type: Type; label: string; help: string }[] = [
  { type: "category", label: "Categories", help: "Each post has one category. Shown as a badge and used for the filter chips on /blog." },
  { type: "tag", label: "Tags", help: "Topic labels (e.g. DSCR, Texas, Fix and Flip). Shown under the article and added to meta keywords." },
  { type: "author", label: "Authors", help: "Shown in the author box under each article and in BlogPosting schema (E-E-A-T)." },
];

const empty = { name: "", slug: "", description: "", role: "", bio: "", avatar: "" };

export default function TaxonomyPage() {
  const [type, setType] = useState<Type>("category");
  const [items, setItems] = useState<Item[] | null>(null);
  const [error, setError] = useState("");
  const [draft, setDraft] = useState(empty);
  const [editing, setEditing] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  const load = useCallback(() => {
    api<Item[]>(`/api/admin/taxonomy?type=${type}`).then(
      (list) => (setError(""), setItems(list)),
      (e) => setError(e.message),
    );
  }, [type]);
  useEffect(load, [load]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.name.trim()) return;
    setSaving(true);
    try {
      await api(editing ? `/api/admin/taxonomy/${editing}?type=${type}` : `/api/admin/taxonomy?type=${type}`, { method: editing ? "PUT" : "POST", json: draft });
      toast(editing ? "Saved." : "Added.");
      setDraft(empty);
      setEditing(null);
      load();
    } catch (err) {
      toast((err as Error).message, "error");
    } finally {
      setSaving(false);
    }
  }

  async function remove(i: Item) {
    if (!confirm(`Delete "${i.name}"?${i.count ? ` It will be removed from ${i.count} post(s).` : ""}`)) return;
    try {
      await api(`/api/admin/taxonomy/${i._id}?type=${type}`, { method: "DELETE" });
      setItems((list) => list?.filter((x) => x._id !== i._id) ?? null);
      toast("Deleted.");
    } catch (err) {
      toast((err as Error).message, "error");
    }
  }

  const tab = tabs.find((t) => t.type === type)!;

  return (
    <>
      <PageHeader title="Categories, Tags & Authors" sub="Organise posts and power the blog filters and schema." />
      <div className="mb-5 flex gap-1 rounded-xl bg-white p-1 shadow-sm sm:w-fit">
        {tabs.map((t) => (
          <button
            key={t.type}
            onClick={() => (setType(t.type), setItems(null), setEditing(null), setDraft(empty))}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-bold transition sm:flex-none ${type === t.type ? "bg-navy text-white" : "text-muted hover:text-navy"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <Card className="h-fit p-5">
          <h2 className="font-extrabold">{editing ? `Edit ${type}` : `Add ${type}`}</h2>
          <p className="mt-1 text-xs text-muted">{tab.help}</p>
          <form onSubmit={submit} className="mt-4 space-y-3">
            <Field label="Name">
              <input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} className={inputCls} required />
            </Field>
            <Field label="Slug" hint="auto from name">
              <input value={draft.slug} onChange={(e) => setDraft({ ...draft, slug: e.target.value })} className={inputCls} />
            </Field>
            {type === "category" && (
              <Field label="Description">
                <textarea rows={2} value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} className={inputCls} />
              </Field>
            )}
            {type === "author" && (
              <>
                <Field label="Role / title">
                  <input value={draft.role} onChange={(e) => setDraft({ ...draft, role: e.target.value })} className={inputCls} placeholder="e.g. Senior Loan Officer" />
                </Field>
                <Field label="Short bio">
                  <textarea rows={3} value={draft.bio} onChange={(e) => setDraft({ ...draft, bio: e.target.value })} className={inputCls} />
                </Field>
                <Field label="Photo URL" hint="from Media Library">
                  <input value={draft.avatar} onChange={(e) => setDraft({ ...draft, avatar: e.target.value })} className={inputCls} />
                </Field>
              </>
            )}
            <div className="flex gap-2 pt-1">
              <Button type="submit" loading={saving}>
                {editing ? <Check className="size-4" /> : <Plus className="size-4" />}
                {editing ? "Save" : "Add"}
              </Button>
              {editing && (
                <Button type="button" variant="ghost" onClick={() => (setEditing(null), setDraft(empty))}>
                  <X className="size-4" /> Cancel
                </Button>
              )}
            </div>
          </form>
        </Card>

        <div>
          {error ? (
            <ErrorBox message={error} onRetry={load} />
          ) : !items ? (
            <Spinner />
          ) : !items.length ? (
            <Empty title={`No ${tab.label.toLowerCase()} yet`} sub="Add one using the form." />
          ) : (
            <Card className="divide-y divide-navy/6">
              {items.map((i) => (
                <div key={i._id} className="flex items-center gap-3 px-5 py-3.5">
                  <div className="min-w-0 flex-1">
                    <p className="font-bold">{i.name}</p>
                    <p className="truncate text-xs text-muted">
                      {i.slug}
                      {i.role ? ` · ${i.role}` : ""}
                      {i.description ? ` · ${i.description}` : ""}
                    </p>
                  </div>
                  <span className="rounded-full bg-navy-50 px-2.5 py-1 text-xs font-bold text-muted">
                    {i.count} post{i.count === 1 ? "" : "s"}
                  </span>
                  <button
                    onClick={() => (setEditing(i._id), setDraft({ ...empty, ...Object.fromEntries(Object.entries(i).filter(([, v]) => typeof v === "string")) }))}
                    className="grid size-8 place-items-center rounded-lg text-muted hover:bg-navy-50 hover:text-navy"
                    aria-label="Edit"
                  >
                    <Pencil className="size-4" />
                  </button>
                  <button onClick={() => remove(i)} className="grid size-8 place-items-center rounded-lg text-muted hover:bg-red-50 hover:text-red-600" aria-label="Delete">
                    <Trash2 className="size-4" />
                  </button>
                </div>
              ))}
            </Card>
          )}
        </div>
      </div>
    </>
  );
}

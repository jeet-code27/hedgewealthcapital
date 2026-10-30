"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Download, Mail, MailCheck, MailX, Phone, Search, Trash2, X } from "lucide-react";
import { formNames, submissionStatuses } from "@/components/admin/constants";
import { api, Badge, Button, Card, Empty, ErrorBox, fmtDate, inputCls, PageHeader, Spinner, useToast } from "@/components/admin/ui";

type Sub = {
  _id: string;
  form: string;
  name: string;
  email: string;
  phone: string;
  fields: Record<string, string>;
  status: string;
  notes: string;
  emails?: { admin: boolean; customer: boolean };
  meta?: { ip?: string; userAgent?: string; page?: string };
  createdAt: string;
};

const PAGE = 20;
const label = (k: string) => k.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (c) => c.toUpperCase());
const ranges = { all: "All time", today: "Today", "7": "Last 7 days", "30": "Last 30 days", "90": "Last 90 days" } as const;

export default function SubmissionsPage() {
  const [subs, setSubs] = useState<Sub[] | null>(null);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");
  const [form, setForm] = useState("All");
  const [status, setStatus] = useState("All");
  const [range, setRange] = useState<keyof typeof ranges>("all");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState<Sub | null>(null);
  const [now] = useState(() => Date.now());
  const toast = useToast();

  const load = useCallback(() => {
    api<Sub[]>("/api/admin/submissions").then(
      (list) => {
        setError("");
        setSubs(list);
        const id = new URLSearchParams(window.location.search).get("id");
        if (id) setOpen(list.find((s) => s._id === id) ?? null);
      },
      (e) => setError(e.message),
    );
  }, []);
  useEffect(load, [load]);

  const filtered = useMemo(() => {
    if (!subs) return [];
    const term = q.toLowerCase();
    const since = range === "all" ? 0 : range === "today" ? new Date(now).setHours(0, 0, 0, 0) : now - Number(range) * 864e5;
    return subs.filter(
      (s) =>
        (form === "All" || s.form === form) &&
        (status === "All" || s.status === status) &&
        new Date(s.createdAt).getTime() >= since &&
        (!term || `${s.name} ${s.email} ${s.phone} ${Object.values(s.fields).join(" ")}`.toLowerCase().includes(term)),
    );
  }, [subs, q, form, status, range, now]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE));
  const current = Math.min(page, pages);
  const visible = filtered.slice((current - 1) * PAGE, current * PAGE);
  const allOnPage = visible.length > 0 && visible.every((s) => selected.includes(s._id));

  const update = (id: string, patch: Partial<Sub>) => {
    setSubs((list) => list?.map((s) => (s._id === id ? { ...s, ...patch } : s)) ?? null);
    setOpen((o) => (o?._id === id ? { ...o, ...patch } : o));
  };

  async function setOne(s: Sub, patch: { status?: string; notes?: string }) {
    try {
      await api(`/api/admin/submissions/${s._id}`, { method: "PATCH", json: patch });
      update(s._id, patch);
      toast(patch.notes !== undefined ? "Notes saved." : `Marked as ${patch.status}.`);
    } catch (e) {
      toast((e as Error).message, "error");
    }
  }

  async function bulkStatus(next: string) {
    try {
      await api("/api/admin/submissions", { method: "PATCH", json: { ids: selected, status: next } });
      setSubs((list) => list?.map((s) => (selected.includes(s._id) ? { ...s, status: next } : s)) ?? null);
      toast(`${selected.length} marked as ${next}.`);
      setSelected([]);
    } catch (e) {
      toast((e as Error).message, "error");
    }
  }

  async function remove(ids: string[]) {
    if (!confirm(`Delete ${ids.length} submission${ids.length > 1 ? "s" : ""}? This can't be undone.`)) return;
    try {
      await api("/api/admin/submissions", { method: "DELETE", json: { ids } });
      setSubs((list) => list?.filter((s) => !ids.includes(s._id)) ?? null);
      setSelected((sel) => sel.filter((id) => !ids.includes(id)));
      if (open && ids.includes(open._id)) setOpen(null);
      toast("Deleted.");
    } catch (e) {
      toast((e as Error).message, "error");
    }
  }

  function exportCsv() {
    const keys = [...new Set(filtered.flatMap((s) => Object.keys(s.fields)))];
    const head = ["Date", "Form", "Status", "Name", "Email", "Phone", ...keys.map(label), "Notes"];
    const cell = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const rows = filtered.map((s) => [fmtDate(s.createdAt, true), formNames[s.form] ?? s.form, s.status, s.name, s.email, s.phone, ...keys.map((k) => s.fields[k]), s.notes].map(cell).join(","));
    const blob = new Blob([[head.map(cell).join(","), ...rows].join("\n")], { type: "text/csv" });
    const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: `hwc-submissions-${new Date().toISOString().slice(0, 10)}.csv` });
    a.click();
    URL.revokeObjectURL(a.href);
  }

  const count = (st: string) => subs?.filter((s) => s.status === st).length ?? 0;

  return (
    <>
      <PageHeader
        title="Form Submissions"
        sub="Every prequalify, deal inquiry and broker application from the website."
        actions={
          <Button variant="secondary" onClick={exportCsv} disabled={!filtered.length}>
            <Download className="size-4" /> Export CSV
          </Button>
        }
      />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          ["Total", subs?.length ?? 0, "All"],
          ["New", count("New"), "New"],
          ["Contacted / In progress", count("Contacted") + count("In Progress"), "Contacted"],
          ["Closed", count("Closed"), "Closed"],
        ].map(([l, n, st]) => (
          <button key={l as string} onClick={() => (setStatus(st as string), setPage(1))} className="text-left">
            <Card className={`p-4 transition hover:-translate-y-0.5 ${status === st ? "!border-leaf" : ""}`}>
              <p className="text-xs font-bold text-muted">{l}</p>
              <p className="mt-1 text-2xl font-extrabold">{n}</p>
            </Card>
          </button>
        ))}
      </div>

      <Card className="mb-4 grid gap-3 p-3 md:grid-cols-[1fr_auto_auto_auto]">
        <label className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
          <input value={q} onChange={(e) => (setQ(e.target.value), setPage(1))} placeholder="Search name, email, phone, any field" className={`${inputCls} pl-9`} />
        </label>
        <select value={form} onChange={(e) => (setForm(e.target.value), setPage(1))} className={inputCls}>
          <option value="All">All forms</option>
          {Object.entries(formNames).map(([k, v]) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </select>
        <select value={status} onChange={(e) => (setStatus(e.target.value), setPage(1))} className={inputCls}>
          <option value="All">All statuses</option>
          {submissionStatuses.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <select value={range} onChange={(e) => (setRange(e.target.value as keyof typeof ranges), setPage(1))} className={inputCls}>
          {Object.entries(ranges).map(([k, v]) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </select>
      </Card>

      {selected.length > 0 && (
        <div className="mb-4 flex flex-wrap items-center gap-2 rounded-2xl bg-navy p-3 text-sm text-white">
          <span className="px-2 font-bold">{selected.length} selected</span>
          {submissionStatuses.map((s) => (
            <button key={s} onClick={() => bulkStatus(s)} className="rounded-lg bg-white/10 px-3 py-1.5 font-bold hover:bg-white/20">
              {s}
            </button>
          ))}
          <button onClick={() => remove(selected)} className="ml-auto flex items-center gap-1.5 rounded-lg bg-red-500 px-3 py-1.5 font-bold hover:bg-red-600">
            <Trash2 className="size-4" /> Delete
          </button>
          <button onClick={() => setSelected([])} className="rounded-lg p-1.5 hover:bg-white/10" aria-label="Clear selection">
            <X className="size-4" />
          </button>
        </div>
      )}

      {error ? (
        <ErrorBox message={error} onRetry={load} />
      ) : !subs ? (
        <Spinner />
      ) : !filtered.length ? (
        <Empty title={subs.length ? "Nothing matches these filters" : "No submissions yet"} sub={subs.length ? undefined : "When someone fills out a form on the website it shows up here, and you get an email."} />
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead className="border-b border-navy/8 bg-navy-50/60 text-xs font-extrabold tracking-wide text-muted uppercase">
                <tr>
                  <th className="w-10 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={allOnPage}
                      onChange={() => setSelected(allOnPage ? selected.filter((id) => !visible.some((s) => s._id === id)) : [...new Set([...selected, ...visible.map((s) => s._id)])])}
                      className="size-4 accent-[#192861]"
                      aria-label="Select page"
                    />
                  </th>
                  <th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3">Form</th>
                  <th className="px-4 py-3">Details</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Received</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy/6">
                {visible.map((s) => (
                  <tr key={s._id} onClick={() => setOpen(s)} className={`cursor-pointer hover:bg-navy-50/50 ${s.status === "New" ? "bg-leaf-100/25" : ""}`}>
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selected.includes(s._id)}
                        onChange={() => setSelected(selected.includes(s._id) ? selected.filter((x) => x !== s._id) : [...selected, s._id])}
                        className="size-4 accent-[#192861]"
                        aria-label={`Select ${s.name}`}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <p className={`${s.status === "New" ? "font-extrabold" : "font-bold"}`}>{s.name || "—"}</p>
                      <p className="text-xs text-muted">
                        {s.email} · {s.phone}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-xs font-bold">{formNames[s.form] ?? s.form}</td>
                    <td className="max-w-[280px] px-4 py-3 text-xs text-muted">
                      <p className="line-clamp-2">{summary(s)}</p>
                    </td>
                    <td className="px-4 py-3">
                      <Badge>{s.status}</Badge>
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold whitespace-nowrap text-muted">{fmtDate(s.createdAt, true)}</td>
                  </tr>
                ))}
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

      {open && <Drawer sub={open} onClose={() => setOpen(null)} onStatus={(st) => setOne(open, { status: st })} onNotes={(n) => setOne(open, { notes: n })} onDelete={() => remove([open._id])} />}
    </>
  );
}

function summary(s: Sub) {
  const f = s.fields;
  return [f.loanProduct, f.purpose, f.amount, [f.city, f.state].filter(Boolean).join(", "), f.timing, f.company, f.nmls && `NMLS: ${f.nmls}`].filter(Boolean).join(" · ") || "—";
}

function Drawer({ sub, onClose, onStatus, onNotes, onDelete }: { sub: Sub; onClose: () => void; onStatus: (s: string) => void; onNotes: (n: string) => void; onDelete: () => void }) {
  const [notes, setNotes] = useState(sub.notes);
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);
  const skip = new Set(["name", "firstName", "lastName", "email", "phone"]);

  return (
    <div className="fixed inset-0 z-[70]">
      <div className="absolute inset-0 bg-navy-950/40" onClick={onClose} />
      <aside role="dialog" aria-modal aria-label="Submission details" className="absolute inset-y-0 right-0 flex w-full max-w-lg flex-col bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-navy/8 p-5">
          <div>
            <p className="text-xs font-extrabold tracking-wide text-leaf-600 uppercase">{formNames[sub.form] ?? sub.form}</p>
            <h2 className="mt-1 text-xl font-extrabold">{sub.name || sub.email}</h2>
            <p className="text-xs text-muted">Received {fmtDate(sub.createdAt, true)}</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 hover:bg-navy-50" aria-label="Close">
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto p-5">
          <div className="grid grid-cols-2 gap-2">
            {sub.email && (
              <a href={`mailto:${sub.email}`} className="flex items-center justify-center gap-2 rounded-xl bg-navy py-2.5 text-sm font-bold text-white">
                <Mail className="size-4" /> Email
              </a>
            )}
            {sub.phone && (
              <a href={`tel:${sub.phone.replace(/\D/g, "")}`} className="flex items-center justify-center gap-2 rounded-xl bg-leaf py-2.5 text-sm font-bold text-navy">
                <Phone className="size-4" /> Call
              </a>
            )}
          </div>

          <div>
            <p className="mb-2 text-xs font-bold">Status</p>
            <div className="flex flex-wrap gap-1.5">
              {submissionStatuses.map((s) => (
                <button key={s} onClick={() => onStatus(s)} className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${sub.status === s ? "bg-navy text-white" : "bg-navy-50 hover:bg-navy-100"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <dl className="divide-y divide-navy/6 rounded-xl border border-navy/8">
            {[
              ["Email", sub.email],
              ["Phone", sub.phone],
              ...Object.entries(sub.fields).filter(([k]) => !skip.has(k)),
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[40%_1fr] gap-3 px-4 py-2.5 text-sm">
                <dt className="text-muted">{label(k)}</dt>
                <dd className="font-semibold break-words whitespace-pre-wrap">{v || "—"}</dd>
              </div>
            ))}
          </dl>

          <div>
            <p className="mb-2 text-xs font-bold">Internal notes</p>
            <textarea rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} className={inputCls} placeholder="Call notes, follow-up date, loan officer assigned..." />
            <Button variant="secondary" className="mt-2" disabled={notes === sub.notes} onClick={() => onNotes(notes)}>
              Save notes
            </Button>
          </div>

          <div className="rounded-xl bg-navy-50/60 p-4 text-xs text-muted">
            <p className="flex items-center gap-1.5">
              {sub.emails?.admin ? <MailCheck className="size-4 text-leaf-600" /> : <MailX className="size-4 text-red-500" />}
              Team notification {sub.emails?.admin ? "sent" : "not sent"}
            </p>
            <p className="mt-1 flex items-center gap-1.5">
              {sub.emails?.customer ? <MailCheck className="size-4 text-leaf-600" /> : <MailX className="size-4 text-red-500" />}
              Thank-you email to customer {sub.emails?.customer ? "sent" : "not sent"}
            </p>
            {sub.meta?.page && <p className="mt-2 break-all">Page: {sub.meta.page}</p>}
            {sub.meta?.ip && <p className="mt-1">IP: {sub.meta.ip}</p>}
          </div>
        </div>

        <div className="border-t border-navy/8 p-4">
          <Button variant="danger" onClick={onDelete}>
            <Trash2 className="size-4" /> Delete submission
          </Button>
        </div>
      </aside>
    </div>
  );
}

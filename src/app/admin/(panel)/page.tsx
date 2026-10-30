"use client";

import Link from "next/link";
import { AlertTriangle, ArrowRight, CheckCircle2, FileText, Inbox, PenSquare, TrendingUp } from "lucide-react";
import { formNames } from "@/components/admin/constants";
import { Badge, Button, Card, ErrorBox, fmtDate, PageHeader, Spinner, useApiData } from "@/components/admin/ui";

type Stats = {
  published: number;
  drafts: number;
  totalSubs: number;
  newSubs: number;
  weekSubs: number;
  byForm: Record<string, number>;
  recentSubs: { _id: string; form: string; name: string; email: string; status: string; createdAt: string }[];
  recentPosts: { _id: string; title: string; status: string; updatedAt: string }[];
  mail: boolean;
  cloudinary: boolean;
};

export default function Dashboard() {
  const { data: stats, error, reload: load } = useApiData<Stats>("/api/admin/stats");

  if (error) return <ErrorBox message={error} onRetry={load} />;
  if (!stats) return <Spinner />;

  const cards = [
    { label: "Published posts", value: stats.published, icon: FileText, href: "/admin/posts" },
    { label: "Drafts", value: stats.drafts, icon: PenSquare, href: "/admin/posts" },
    { label: "New submissions", value: stats.newSubs, icon: Inbox, href: "/admin/submissions", accent: stats.newSubs > 0 },
    { label: "Submissions this week", value: stats.weekSubs, icon: TrendingUp, href: "/admin/submissions" },
  ];

  return (
    <>
      <PageHeader
        title="Dashboard"
        sub="Blog content and website leads at a glance."
        actions={
          <Link href="/admin/posts/new">
            <Button variant="leaf">
              <PenSquare className="size-4" /> Write a post
            </Button>
          </Link>
        }
      />

      {(!stats.mail || !stats.cloudinary) && (
        <div className="mb-6 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <AlertTriangle className="size-5 shrink-0" />
          <div>
            {!stats.mail && (
              <p>
                <b>Emails are off.</b> Add the Gmail App Password as <code className="rounded bg-white px-1">SMTP_PASSWORD</code> in the environment variables, then restart. Submissions are still saved here.
              </p>
            )}
            {!stats.cloudinary && <p className="mt-1">Cloudinary keys are missing, so image uploads won&apos;t work.</p>}
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ label, value, icon: Icon, href, accent }) => (
          <Link key={label} href={href}>
            <Card className={`group p-5 transition hover:-translate-y-0.5 ${accent ? "!border-leaf/40 !bg-leaf-100/50" : ""}`}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-muted">{label}</span>
                <span className="grid size-9 place-items-center rounded-xl bg-navy text-leaf">
                  <Icon className="size-[18px]" />
                </span>
              </div>
              <p className="mt-3 text-4xl font-extrabold tracking-tight">{value}</p>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <Card>
          <div className="flex items-center justify-between border-b border-navy/8 px-5 py-4">
            <h2 className="font-extrabold">Latest submissions</h2>
            <Link href="/admin/submissions" className="flex items-center gap-1 text-sm font-bold text-leaf-600">
              View all <ArrowRight className="size-4" />
            </Link>
          </div>
          {stats.recentSubs.length ? (
            <ul className="divide-y divide-navy/6">
              {stats.recentSubs.map((s) => (
                <li key={s._id}>
                  <Link href={`/admin/submissions?id=${s._id}`} className="flex items-center gap-3 px-5 py-3.5 hover:bg-navy-50/60">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-navy-50 text-sm font-extrabold">{(s.name || s.email || "?").slice(0, 1).toUpperCase()}</span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold">{s.name || s.email}</p>
                      <p className="truncate text-xs text-muted">
                        {formNames[s.form] ?? s.form} · {fmtDate(s.createdAt, true)}
                      </p>
                    </div>
                    <Badge>{s.status}</Badge>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-5 py-10 text-center text-sm text-muted">No submissions yet. They&apos;ll appear here as soon as someone fills out a form.</p>
          )}
          <div className="grid grid-cols-3 border-t border-navy/8">
            {Object.entries(formNames).map(([k, v]) => (
              <div key={k} className="px-5 py-4 text-center">
                <p className="text-xl font-extrabold">{stats.byForm[k] ?? 0}</p>
                <p className="text-xs font-semibold text-muted">{v}</p>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <div className="flex items-center justify-between border-b border-navy/8 px-5 py-4">
              <h2 className="font-extrabold">Recently edited posts</h2>
              <Link href="/admin/posts" className="flex items-center gap-1 text-sm font-bold text-leaf-600">
                All posts <ArrowRight className="size-4" />
              </Link>
            </div>
            {stats.recentPosts.length ? (
              <ul className="divide-y divide-navy/6">
                {stats.recentPosts.map((p) => (
                  <li key={p._id}>
                    <Link href={`/admin/posts/${p._id}`} className="flex items-center gap-3 px-5 py-3 hover:bg-navy-50/60">
                      <p className="min-w-0 flex-1 truncate text-sm font-bold">{p.title}</p>
                      <Badge>{p.status}</Badge>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="px-5 py-8 text-center text-sm text-muted">No posts yet.</p>
            )}
          </Card>

          <Card className="p-5">
            <p className="flex items-center gap-2 font-extrabold">
              <CheckCircle2 className="size-5 text-leaf-600" /> SEO checklist for every post
            </p>
            <ul className="mt-3 space-y-1.5 text-sm text-muted">
              <li>• One focus keyword, used in the title, first paragraph and slug</li>
              <li>• Meta description 120–160 characters</li>
              <li>• 2+ internal links to loan program or local pages</li>
              <li>• Featured image with descriptive alt text</li>
              <li>• FAQs at the end (they become FAQ schema automatically)</li>
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
}

"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import PostCard from "@/components/blog/PostCard";
import type { ListPost } from "@/lib/post-types";

/** Category chips + search over the post list (all client-side; the list is small). */
export default function BlogGrid({ posts }: { posts: ListPost[] }) {
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");

  const categories = useMemo(() => {
    const seen = new Map<string, string>();
    posts.forEach((p) => seen.set(p.categorySlug, p.category));
    return [...seen.entries()];
  }, [posts]);

  const filtered = posts.filter((p) => (cat === "all" || p.categorySlug === cat) && (!q || `${p.title} ${p.excerpt}`.toLowerCase().includes(q.toLowerCase())));
  const featured = cat === "all" && !q ? (filtered.find((p) => p.isFeatured) ?? filtered[0]) : undefined;
  const rest = filtered.filter((p) => p !== featured);

  if (!posts.length) {
    return <p className="mx-auto max-w-7xl rounded-3xl border border-dashed border-navy/15 px-5 py-16 text-center font-semibold text-muted sm:px-8">New articles are on the way. Check back soon.</p>;
  }

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="-mx-1 flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
          {[["all", "All articles"] as const, ...categories].map(([slug, name]) => (
            <button
              key={slug}
              role="tab"
              aria-selected={cat === slug}
              onClick={() => setCat(slug)}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${cat === slug ? "bg-navy text-white shadow-[0_4px_0_0_#0a1233]" : "border border-navy/10 bg-white text-navy hover:border-navy/30"}`}
            >
              {name}
            </button>
          ))}
        </div>
        <label className="relative block md:w-72">
          <span className="sr-only">Search articles</span>
          <svg className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search articles"
            className="w-full rounded-full border border-navy/10 bg-white py-2.5 pr-4 pl-10 text-sm font-semibold text-navy outline-none placeholder:text-muted/70 focus:border-leaf focus:ring-4 focus:ring-leaf/20"
          />
        </label>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {featured && (
            <motion.div key={`f-${featured.slug}`} layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="md:col-span-2 lg:col-span-3">
              <PostCard post={featured} featured preload />
            </motion.div>
          )}
          {rest.map((p, i) => (
            <motion.div key={p.slug} layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: Math.min(i, 6) * 0.05 }} className="h-full">
              <PostCard post={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {!filtered.length && <p className="mt-10 text-center font-semibold text-muted">No articles match that search.</p>}
    </div>
  );
}

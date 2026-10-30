"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, ChevronDown, CircleAlert, CircleX } from "lucide-react";
import { Card, Field, inputCls } from "./ui";

export type Seo = { metaTitle: string; metaDescription: string; focusKeyword: string; canonicalUrl: string; ogTitle: string; ogDescription: string; ogImage: string; noIndex: boolean };

type Input = { title: string; slug: string; excerpt: string; content: string; seo: Seo; imageAlt: string; hasImage: boolean; faqCount: number };
type Check = { ok: boolean | "warn"; text: string };

const words = (html: string) => html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").split(/\s+/).filter(Boolean);

/** Yoast-style checks tuned for this site: keyword placement, lengths, links, images, FAQs. */
export function seoChecks({ title, slug, excerpt, content, seo, imageAlt, hasImage, faqCount }: Input): Check[] {
  const kw = seo.focusKeyword.trim().toLowerCase();
  const has = (s: string) => Boolean(kw) && s.toLowerCase().includes(kw);
  const metaTitle = seo.metaTitle || `${title} | Hedge Wealth Capital`;
  const desc = seo.metaDescription || excerpt;
  const text = words(content).join(" ");
  const count = words(content).length;
  const firstPara = (content.match(/<p[^>]*>([\s\S]*?)<\/p>/i)?.[1] ?? "").replace(/<[^>]+>/g, "");
  const internal = [...content.matchAll(/href="(\/[^"]*|https?:\/\/(www\.)?hedgewealthcapital\.com[^"]*)"/g)].length;
  const external = [...content.matchAll(/href="https?:\/\/(?!(www\.)?hedgewealthcapital\.com)[^"]+"/g)].length;
  const h2 = (content.match(/<h2/g) ?? []).length;
  const imgs = [...content.matchAll(/<img[^>]*>/g)].map((m) => m[0]);
  const imgsNoAlt = imgs.filter((t) => !/alt="[^"]+"/.test(t)).length;
  const density = kw && count ? ((text.toLowerCase().split(kw).length - 1) * kw.split(" ").length * 100) / count : 0;

  return [
    { ok: Boolean(kw), text: kw ? `Focus keyword set: “${seo.focusKeyword}”` : "Set a focus keyword (the main search phrase this post should rank for)" },
    { ok: has(title), text: "Focus keyword appears in the post title" },
    { ok: has(slug.replace(/-/g, " ")), text: "Focus keyword appears in the URL slug" },
    { ok: has(desc), text: "Focus keyword appears in the meta description" },
    { ok: has(firstPara), text: "Focus keyword appears in the first paragraph" },
    { ok: !kw ? false : density >= 0.5 && density <= 2.5 ? true : "warn", text: `Keyword density ${density.toFixed(1)}% (aim for 0.5–2.5%)` },
    { ok: metaTitle.length >= 30 && metaTitle.length <= 60 ? true : "warn", text: `SEO title is ${metaTitle.length} characters (30–60 shows fully in Google)` },
    { ok: desc.length >= 120 && desc.length <= 160 ? true : desc.length ? "warn" : false, text: `Meta description is ${desc.length} characters (aim for 120–160)` },
    { ok: count >= 800 ? true : count >= 400 ? "warn" : false, text: `${count} words (800+ recommended for ranking articles)` },
    { ok: h2 >= 2 ? true : h2 ? "warn" : false, text: `${h2} H2 subheadings (use 2+ to structure the article and build the table of contents)` },
    { ok: internal >= 2 ? true : internal ? "warn" : false, text: `${internal} internal links (link 2+ loan program or local pages)` },
    { ok: external >= 1 ? true : "warn", text: `${external} outbound links to trusted sources` },
    { ok: hasImage && Boolean(imageAlt), text: hasImage ? (imageAlt ? "Featured image has alt text" : "Add alt text to the featured image") : "Add a featured image" },
    { ok: imgsNoAlt === 0, text: imgs.length ? `${imgs.length - imgsNoAlt}/${imgs.length} images in the article have alt text` : "No inline images (optional)" },
    { ok: faqCount >= 3 ? true : faqCount ? "warn" : false, text: `${faqCount} FAQs (3+ adds FAQ rich results via schema)` },
    { ok: !seo.noIndex, text: seo.noIndex ? "Post is set to noindex: Google won't index it" : "Post can be indexed by search engines" },
  ];
}

export function seoScore(checks: Check[]) {
  const pts = checks.reduce((n, c) => n + (c.ok === true ? 1 : c.ok === "warn" ? 0.5 : 0), 0);
  return Math.round((pts / checks.length) * 100);
}

export default function SeoPanel({ input, onChange }: { input: Input; onChange: (seo: Seo) => void }) {
  const { seo, title, slug, excerpt } = input;
  const [social, setSocial] = useState(false);
  const checks = useMemo(() => seoChecks(input), [input]);
  const score = seoScore(checks);
  const set = (patch: Partial<Seo>) => onChange({ ...seo, ...patch });
  const metaTitle = seo.metaTitle || `${title || "Post title"} | Hedge Wealth Capital`;
  const desc = seo.metaDescription || excerpt || "Add a meta description to control the snippet Google shows under your title.";
  const tone = score >= 80 ? "text-leaf-600 bg-leaf-100" : score >= 55 ? "text-amber-700 bg-amber-50" : "text-red-600 bg-red-50";

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-navy/8 px-5 py-4">
        <div>
          <h2 className="font-extrabold">SEO</h2>
          <p className="text-xs text-muted">Meta tags, Google preview and on-page checks</p>
        </div>
        <span className={`rounded-xl px-3 py-1.5 text-sm font-extrabold ${tone}`}>Score {score}/100</span>
      </div>

      <div className="grid gap-6 p-5 xl:grid-cols-2">
        <div className="space-y-4">
          <Field label="Focus keyword" hint="e.g. DSCR loans in Texas">
            <input value={seo.focusKeyword} onChange={(e) => set({ focusKeyword: e.target.value })} className={inputCls} placeholder="Main search phrase" />
          </Field>
          <Field label="SEO title" hint={<Counter n={metaTitle.length} min={30} max={60} />}>
            <input value={seo.metaTitle} onChange={(e) => set({ metaTitle: e.target.value })} className={inputCls} placeholder={`${title || "Post title"} | Hedge Wealth Capital`} />
          </Field>
          <Field label="Meta description" hint={<Counter n={(seo.metaDescription || excerpt).length} min={120} max={160} />}>
            <textarea rows={3} value={seo.metaDescription} onChange={(e) => set({ metaDescription: e.target.value })} className={inputCls} placeholder="Defaults to the excerpt. Summarise the post and include the keyword." />
          </Field>
          <Field label="Canonical URL" hint="leave empty for default">
            <input value={seo.canonicalUrl} onChange={(e) => set({ canonicalUrl: e.target.value })} className={inputCls} placeholder={`https://www.hedgewealthcapital.com/blog/${slug || "post-slug"}`} />
          </Field>
          <label className="flex items-center gap-2.5 text-sm font-bold">
            <input type="checkbox" checked={seo.noIndex} onChange={(e) => set({ noIndex: e.target.checked })} className="size-4 accent-[#192861]" />
            Hide from search engines (noindex)
          </label>

          <div className="rounded-xl border border-navy/8">
            <button type="button" onClick={() => setSocial(!social)} className="flex w-full items-center justify-between px-4 py-3 text-sm font-extrabold">
              Social sharing (Open Graph / X)
              <ChevronDown className={`size-4 transition ${social ? "rotate-180" : ""}`} />
            </button>
            {social && (
              <div className="space-y-3 border-t border-navy/8 p-4">
                <Field label="Social title">
                  <input value={seo.ogTitle} onChange={(e) => set({ ogTitle: e.target.value })} className={inputCls} placeholder={title} />
                </Field>
                <Field label="Social description">
                  <textarea rows={2} value={seo.ogDescription} onChange={(e) => set({ ogDescription: e.target.value })} className={inputCls} placeholder="Defaults to the meta description" />
                </Field>
                <Field label="Social image URL" hint="1200×630 recommended">
                  <input value={seo.ogImage} onChange={(e) => set({ ogImage: e.target.value })} className={inputCls} placeholder="Defaults to the featured image" />
                </Field>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="mb-2 text-xs font-bold text-navy">Google preview</p>
            <div className="rounded-xl border border-navy/8 bg-white p-4 font-[arial,sans-serif]">
              <p className="truncate text-xs text-[#4d5156]">www.hedgewealthcapital.com › blog › {slug || "post-slug"}</p>
              <p className="mt-1 line-clamp-1 text-lg text-[#1a0dab]">{metaTitle}</p>
              <p className="mt-1 line-clamp-2 text-sm text-[#4d5156]">{desc}</p>
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-bold text-navy">Checks</p>
            <ul className="space-y-1.5">
              {checks.map((c) => (
                <li key={c.text} className="flex items-start gap-2 text-[13px] leading-snug">
                  {c.ok === true ? <CheckCircle2 className="mt-px size-4 shrink-0 text-leaf-600" /> : c.ok === "warn" ? <CircleAlert className="mt-px size-4 shrink-0 text-amber-500" /> : <CircleX className="mt-px size-4 shrink-0 text-red-500" />}
                  <span className={c.ok === true ? "text-navy/80" : "text-navy"}>{c.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
}

function Counter({ n, min, max }: { n: number; min: number; max: number }) {
  return <span className={n >= min && n <= max ? "text-leaf-600" : n > max ? "text-red-500" : "text-amber-600"}>{n}/{max}</span>;
}

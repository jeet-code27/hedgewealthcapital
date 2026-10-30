import sanitizeHtml from "sanitize-html";
import { slugify } from "@/lib/slugify";

export { slugify };

/** Cleans editor HTML before it's stored. Admins are trusted, but this keeps markup tidy and safe. */
export function sanitizePostHtml(html: string) {
  return sanitizeHtml(html, {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, "img", "h1", "h2", "h3", "h4", "figure", "figcaption", "iframe", "mark", "u", "s"],
    allowedAttributes: {
      a: ["href", "target", "rel", "title"],
      img: ["src", "alt", "title", "width", "height", "loading"],
      iframe: ["src", "width", "height", "allow", "allowfullscreen", "title", "frameborder"],
      "*": ["id", "style"],
    },
    allowedStyles: { "*": { "text-align": [/^(left|right|center|justify)$/] } },
    allowedIframeHostnames: ["www.youtube.com", "www.youtube-nocookie.com", "player.vimeo.com"],
    transformTags: {
      // External links open in a new tab; internal links stay as-is for SEO link equity.
      a: (tagName, attribs) => {
        const external = /^https?:\/\//i.test(attribs.href ?? "") && !/^https?:\/\/(www\.)?hedgewealthcapital\.com/i.test(attribs.href ?? "");
        return { tagName, attribs: external ? { ...attribs, target: "_blank", rel: "noopener noreferrer" } : attribs };
      },
    },
  });
}

export const stripHtml = (html: string) => html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();

export const readingMinutes = (html: string) => Math.max(1, Math.round(stripHtml(html).split(" ").filter(Boolean).length / 225));

export type TocItem = { id: string; text: string; level: 2 | 3 };

/** Gives every h2/h3 a stable id and returns the table of contents. */
export function withHeadingIds(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const used = new Set<string>();
  const out = html.replace(/<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi, (_m, lvl: string, attrs: string, inner: string) => {
    const text = stripHtml(inner);
    let id = /\sid="([^"]+)"/.exec(attrs)?.[1] || slugify(text) || "section";
    while (used.has(id)) id += "-2";
    used.add(id);
    toc.push({ id, text, level: Number(lvl) as 2 | 3 });
    return `<h${lvl}${attrs.replace(/\sid="[^"]*"/, "")} id="${id}">${inner}</h${lvl}>`;
  });
  return { html: out, toc };
}

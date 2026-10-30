"use client";

import { useState } from "react";

export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, d: "M4.98 3.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21H9z" },
    { label: "Share on X", href: `https://twitter.com/intent/tweet?url=${u}&text=${t}`, d: "M17.8 3h3.1l-6.8 7.8 8 10.2h-6.3l-4.9-6.4L5.3 21H2.2l7.3-8.3L1.8 3h6.4l4.4 5.9zm-1.1 16.2h1.7L7.4 4.7H5.6z" },
    { label: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, d: "M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v7h4v-7h3l.5-4h-3.5V8.8c0-.5.3-.8.5-.8z" },
  ];
  return (
    <div className="flex items-center gap-2">
      <span className="mr-1 text-sm font-bold text-navy">Share</span>
      {links.map((l) => (
        <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" aria-label={l.label} className="grid size-10 place-items-center rounded-full border border-navy/10 bg-white text-navy transition hover:-translate-y-0.5 hover:bg-navy hover:text-white">
          <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d={l.d} />
          </svg>
        </a>
      ))}
      <button
        type="button"
        onClick={() => navigator.clipboard?.writeText(url).then(() => (setCopied(true), setTimeout(() => setCopied(false), 1800)))}
        className="rounded-full border border-navy/10 bg-white px-4 py-2.5 text-xs font-bold text-navy transition hover:bg-navy hover:text-white"
      >
        {copied ? "Copied!" : "Copy link"}
      </button>
    </div>
  );
}

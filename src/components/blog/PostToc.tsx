"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/post-html";

/** Sticky "On this page" list that highlights the section being read. */
export default function PostToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-110px 0px -65% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [items]);

  if (items.length < 2) return null;

  return (
    <nav aria-label="On this page" className="rounded-[24px] border border-navy/10 bg-white p-5 shadow-[0_20px_40px_-35px_rgb(25_40_97/0.6)]">
      <p className="text-xs font-extrabold tracking-[0.18em] text-leaf-600 uppercase">On this page</p>
      <ol className="mt-3 space-y-1 border-l-2 border-navy/10">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              className={`-ml-0.5 block border-l-2 py-1.5 text-sm leading-snug transition ${i.level === 3 ? "pl-6" : "pl-4"} ${
                active === i.id ? "border-leaf font-bold text-navy" : "border-transparent font-medium text-muted hover:text-navy"
              }`}
            >
              {i.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

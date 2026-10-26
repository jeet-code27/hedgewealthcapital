"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import Reveal, { WordsReveal } from "@/components/Reveal";
import { aboutReach } from "@/lib/about-content";
import { strategies } from "@/lib/content";

const GlobeScene = dynamic(() => import("@/components/three/GlobeScene"), { ssr: false });

export default function AboutReach() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute top-1/2 left-1/4 -z-10 size-[520px] -translate-y-1/2 rounded-full bg-leaf/15 blur-[120px]" />
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <div className="relative order-2 aspect-square w-full max-w-[560px] justify-self-center lg:order-1">
          <div className="absolute inset-[14%] rounded-full bg-gradient-to-br from-navy/40 via-leaf/30 to-navy/20 blur-3xl" />
          <GlobeScene />
          <span className="pointer-events-none absolute bottom-2 left-1/2 hidden -translate-x-1/2 rounded-full border border-navy/10 bg-white/80 px-3 py-1 text-xs font-semibold text-muted backdrop-blur [@media(pointer:fine)]:inline-block">
            Drag to spin the globe
          </span>
        </div>

        <div className="order-1 lg:order-2">
          <Reveal>
            <span className="text-sm font-bold tracking-[0.2em] text-leaf-600 uppercase">{aboutReach.eyebrow}</span>
          </Reveal>
          <h2 className="mt-4 text-[2.05rem] leading-[1.05] font-extrabold tracking-[-0.03em] text-navy sm:text-5xl">
            <WordsReveal text="All 50 States and" />
            <WordsReveal text="Washington, D.C." className="font-serif font-normal italic tracking-normal" delay={0.2} />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">{aboutReach.body}</p>
          </Reveal>

          <Reveal delay={0.15} className="mt-8 grid gap-3 sm:grid-cols-2">
            {strategies.map((s) => (
              <Link
                key={s.key}
                href={s.link.href}
                className="group flex items-center justify-between gap-3 rounded-2xl border border-navy/10 bg-white px-4 py-3.5 shadow-[0_4px_0_0_#e8ebf5] transition hover:-translate-y-0.5 hover:border-leaf/60"
              >
                <span className="font-bold text-navy">{s.tag}</span>
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-navy-50 text-navy transition group-hover:bg-leaf">
                  <svg className="size-3.5 -rotate-45 transition-transform duration-300 group-hover:rotate-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

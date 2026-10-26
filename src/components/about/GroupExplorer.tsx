"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import Reveal, { WordsReveal } from "@/components/Reveal";
import { aboutGroup } from "@/lib/about-content";

const icons: Record<string, React.ReactNode> = {
  properties: <path d="M3 21h18M5 21V10l7-6 7 6v11M9 21v-6h6v6" />,
  management: (
    <>
      <path d="M14.7 6.3a4 4 0 00-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 005.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z" />
    </>
  ),
  capital: (
    <>
      <circle cx="8" cy="15" r="4" />
      <path d="M10.8 12.2L20 3M17 6l3 3M14 9l2 2" />
    </>
  ),
};

/** Interactive look at the three Hedge Wealth companies: pick one and its card rotates into view. */
export default function GroupExplorer() {
  const [active, setActive] = useState(0);
  const company = aboutGroup.companies[active];

  return (
    <section id="hedge-wealth-group" className="relative scroll-mt-24 overflow-hidden bg-navy py-24 text-white lg:py-32">
      <div className="bg-grid-dark absolute inset-0" />
      <div className="absolute -top-40 -right-20 size-[560px] rounded-full bg-leaf/20 blur-[140px]" />
      <div className="absolute -bottom-60 -left-40 size-[560px] rounded-full bg-navy-700 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <span className="text-sm font-bold tracking-[0.2em] text-leaf uppercase">{aboutGroup.eyebrow}</span>
          </Reveal>
          <h2 className="mt-4 text-[2.05rem] leading-[1.05] font-extrabold tracking-[-0.03em] sm:text-5xl">
            <WordsReveal text="Vertically Integrated," />
            <WordsReveal text="From Acquisition to Lending" className="font-serif font-normal italic tracking-normal text-leaf" delay={0.2} />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-white/75">{aboutGroup.lead}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          {/* Selector: stacked like floors of one building */}
          <div role="tablist" aria-label="Hedge Wealth Group companies" className="relative flex flex-col gap-3 self-start">
            {/* Connector runs from the first icon centre to the last (border + padding + half icon). */}
            <div className="absolute top-[41px] bottom-[41px] left-[41px] w-0.5 -translate-x-1/2 bg-gradient-to-b from-leaf via-leaf/30 to-leaf sm:top-[49px] sm:bottom-[49px] sm:left-[49px]" aria-hidden />
            {aboutGroup.companies.map((c, i) => {
              const isActive = i === active;
              return (
                <button
                  key={c.key}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className={`relative flex items-center gap-4 rounded-3xl border p-4 text-left transition-all duration-300 sm:p-5 ${
                    isActive
                      ? "border-leaf/70 bg-white/[0.1] shadow-[0_20px_40px_-20px_rgb(0_0_0/0.6),0_0_0_4px_rgb(122_198_68/0.12)]"
                      : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                  }`}
                >
                  <span
                    className={`relative z-10 grid size-12 shrink-0 place-items-center rounded-2xl transition-all duration-300 sm:size-14 ${
                      isActive ? "scale-105 bg-leaf text-navy shadow-[0_0_24px_rgb(122_198_68/0.55)]" : "bg-navy-700 text-leaf shadow-[inset_0_-4px_8px_rgb(0_0_0/0.25)]"
                    }`}
                  >
                    <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      {icons[c.key]}
                    </svg>
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-bold tracking-[0.18em] text-leaf uppercase">{c.tag}</span>
                    <span className="mt-0.5 block text-lg font-extrabold sm:text-xl">{c.name}</span>
                  </span>
                  <svg
                    className={`ml-auto size-5 shrink-0 transition-all duration-300 ${isActive ? "text-leaf opacity-100" : "opacity-30"}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    aria-hidden
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </button>
              );
            })}
          </div>

          {/* Detail card */}
          <div className="relative min-h-[520px] [perspective:1400px] sm:min-h-[480px]">
            <AnimatePresence mode="wait">
              <motion.article
                key={company.key}
                role="tabpanel"
                initial={{ opacity: 0, rotateY: -25, x: 40 }}
                animate={{ opacity: 1, rotateY: 0, x: 0 }}
                exit={{ opacity: 0, rotateY: 25, x: -40 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden rounded-[32px] bg-white text-ink shadow-[0_50px_90px_-40px_rgb(0_0_0/0.7)]"
              >
                <div className="relative h-56 sm:h-64">
                  <Image src={company.image.src} alt={company.image.alt} fill sizes="(min-width: 1024px) 640px, 100vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" />
                  <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between gap-4">
                    <p className="text-2xl font-extrabold text-white sm:text-3xl">{company.name}</p>
                    <span className="hidden rounded-full bg-leaf px-3 py-1 text-xs font-extrabold tracking-wide text-navy uppercase sm:inline">{company.tag}</span>
                  </div>
                </div>
                <div className="grid gap-6 p-6 sm:grid-cols-[auto_1fr] sm:p-8">
                  <div className="rounded-2xl bg-navy-50 px-5 py-4 sm:min-w-40">
                    <p className="text-3xl font-extrabold tracking-tight whitespace-nowrap text-navy">{company.stat.value}</p>
                    <p className="mt-1 text-xs font-bold tracking-[0.12em] text-muted uppercase">{company.stat.label}</p>
                  </div>
                  <p className="text-[16px] leading-relaxed text-muted">{company.body}</p>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

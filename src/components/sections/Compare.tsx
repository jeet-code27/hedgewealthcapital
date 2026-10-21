"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Reveal, { WordsReveal } from "@/components/Reveal";
import { compare } from "@/lib/content";

export default function Compare() {
  return (
    <section id="loan-programs" className="relative overflow-hidden bg-navy-50 py-24 lg:py-32">
      <div className="bg-grid absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="text-sm font-bold tracking-[0.2em] text-leaf-600 uppercase">Compare Your Options</span>
          </Reveal>
          <h2 className="mt-4 text-4xl leading-[1.05] font-extrabold tracking-[-0.03em] text-navy sm:text-5xl">
            <WordsReveal text="Find the Financing That Fits" />
            <WordsReveal text="Your Property Strategy" className="font-serif font-normal italic tracking-normal" delay={0.2} />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-muted">{compare.lead}</p>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mt-14 overflow-hidden rounded-[28px] border border-navy/10 bg-white shadow-[0_40px_80px_-50px_rgb(25_40_97/0.6)]">
          <div className="hidden grid-cols-[1fr_1.2fr_1.6fr_auto] gap-6 bg-navy px-8 py-5 text-xs font-bold tracking-[0.18em] text-white/70 uppercase md:grid">
            <span>Program</span>
            <span>Investment objective</span>
            <span>Main discussion points</span>
            <span className="w-10" />
          </div>
          {compare.rows.map((row, i) => (
            <motion.div
              key={row.program}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}
              className="group grid gap-2 border-t border-navy/10 px-6 py-6 transition-colors duration-300 first:border-t-0 hover:bg-leaf-100/60 md:grid-cols-[1fr_1.2fr_1.6fr_auto] md:items-center md:gap-6 md:px-8"
            >
              <span className="flex items-center gap-3 text-lg font-extrabold text-navy">
                <span className="size-2.5 rounded-full bg-leaf transition-transform duration-300 group-hover:scale-150" />
                {row.program}
              </span>
              <span className="font-semibold text-ink">{row.objective}</span>
              <span className="text-muted">{row.points}</span>
              <span className="hidden size-10 place-items-center rounded-full border border-navy/10 text-navy transition-all duration-300 group-hover:border-navy group-hover:bg-navy group-hover:text-white md:grid">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </span>
            </motion.div>
          ))}
        </Reveal>

        <Reveal delay={0.1} className="mt-10 flex flex-col items-start justify-between gap-6 rounded-3xl border border-leaf/40 bg-white p-7 md:flex-row md:items-center">
          <div className="flex items-start gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-leaf text-navy">
              <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                <path d="M9 7h6M9 11h6M9 15h4M5 3h14v18H5z" />
              </svg>
            </span>
            <div>
              <p className="font-extrabold text-navy">Compare the Full Cost of Financing</p>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted">{compare.note}</p>
            </div>
          </div>
          <Link href="#prequalify" className="w-full shrink-0 rounded-2xl bg-navy px-6 py-3.5 text-center font-bold md:w-auto text-white transition hover:bg-navy-700">
            Help Me Evaluate My Options
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { contact } from "@/lib/content";
import type { AreaPage } from "@/lib/areas";
import AreaMap from "./AreaMap";

const ease = [0.22, 1, 0.36, 1] as const;

export default function AreaHero({ page }: { page: AreaPage }) {
  const words = [...page.hero.title.split(" ").map((w) => ({ w, a: false })), ...page.hero.accent.split(" ").map((w) => ({ w, a: true }))];

  return (
    <section data-dark-hero className="relative overflow-hidden bg-navy pt-32 pb-12 text-white lg:pt-36 lg:pb-16">
      <div className="bg-grid-dark absolute inset-0" />
      <div className="absolute -top-40 -right-32 size-[620px] rounded-full bg-leaf/20 blur-[140px]" />
      <div className="absolute -bottom-60 -left-40 size-[560px] rounded-full bg-navy-700 blur-[140px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-6">
        <div>
          <motion.nav
            aria-label="Breadcrumb"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="flex flex-wrap items-center gap-2 text-sm font-semibold text-white/60"
          >
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <span className="text-leaf">/</span>
            <Link href="/areas-we-serve" className="transition hover:text-white">
              Areas We Serve
            </Link>
            <span className="text-leaf">/</span>
            <span className="text-white">{page.region}</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="mt-6 flex flex-wrap items-center gap-2"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-leaf/40 bg-leaf/10 px-3.5 py-1.5 text-xs font-extrabold tracking-[0.16em] text-leaf uppercase">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {page.hero.eyebrow}
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white/80">{page.kind}</span>
          </motion.div>

          <h1 className="mt-6 text-[2.4rem] leading-[1.03] font-extrabold tracking-[-0.035em] sm:text-6xl xl:text-[4.1rem]">
            {words.map(({ w, a }, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
                <motion.span
                  className={`inline-block ${a ? "font-serif font-normal italic tracking-normal text-leaf" : ""}`}
                  initial={{ y: "110%", rotate: 4 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{ duration: 1, delay: 0.2 + i * 0.06, ease }}
                >
                  {w}
                  {" "}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/75"
          >
            {page.hero.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85, ease }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              href="/#prequalify"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-leaf px-7 py-4 font-extrabold text-navy shadow-[0_6px_0_0_#4d8c22] transition hover:-translate-y-0.5 hover:bg-white active:translate-y-1 active:shadow-none sm:w-auto"
            >
              Get Funded in {page.short}
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
            <a
              href={contact.phoneHref}
              className="inline-flex w-full items-center justify-center rounded-2xl border border-white/25 px-7 py-4 font-bold whitespace-nowrap transition hover:bg-white/10 sm:w-auto"
            >
              Call {contact.phone}
            </a>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.9, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.25, ease }}>
          <AreaMap page={page} />
        </motion.div>
      </div>

      {/* Local stat strip */}
      <div className="relative mx-auto mt-12 grid max-w-7xl grid-cols-2 gap-3 px-5 sm:px-8 lg:grid-cols-4">
        {page.stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 + i * 0.08, ease }}
            className="rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 backdrop-blur-sm"
          >
            <p className="text-2xl font-extrabold tracking-tight whitespace-nowrap sm:text-3xl">{s.value}</p>
            <p className="mt-1 text-[11px] font-bold tracking-[0.14em] text-leaf uppercase">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

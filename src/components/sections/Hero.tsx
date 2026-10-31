"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "motion/react";
import { hero } from "@/lib/content";
import PageTitle from "@/components/PageTitle";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 grid place-items-center">
      <div className="size-10 animate-spin rounded-full border-2 border-navy/15 border-t-leaf" />
    </div>
  ),
});

const ease = [0.22, 1, 0.36, 1] as const;

// Positions for the floating highlight chips around the 3D city (copy lives in content.ts).
const chipSlots = [
  { className: "left-[2%] top-[18%]", delay: 1.4 },
  { className: "right-[0%] top-[8%]", delay: 1.6 },
  { className: "right-[4%] bottom-[18%]", delay: 1.8 },
  { className: "left-[6%] bottom-[10%]", delay: 2.0 },
];
const chips = hero.chips.map((chip, i) => ({ ...chip, ...chipSlots[i % chipSlots.length] }));

export default function Hero() {
  const titleWords = hero.title.split(" ");

  return (
    <section className="relative overflow-hidden pt-28 pb-16 lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:pt-24 lg:pb-4">
      {/* Background */}
      <div className="bg-grid mask-fade-b absolute inset-0 -z-10" />
      <div className="absolute -top-40 -left-40 -z-10 size-[560px] rounded-full bg-navy/10 blur-[120px]" />
      <div className="absolute top-20 -right-32 -z-10 size-[520px] rounded-full bg-leaf/20 blur-[120px]" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.02fr_1fr] lg:gap-6">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white/80 py-1.5 pr-4 pl-1.5 text-[13px] font-semibold text-navy shadow-sm backdrop-blur"
          >
            <span className="rounded-full bg-leaf px-2.5 py-0.5 text-[11px] font-extrabold tracking-wide text-navy uppercase">HWC</span>
            {hero.eyebrow}
          </motion.div>

          <PageTitle className="mt-6 text-[2.6rem] leading-[1.02] font-extrabold tracking-[-0.035em] text-navy sm:text-6xl lg:text-[min(3.75rem,7svh)] xl:text-[min(4.6rem,7.6svh)]">
            {titleWords.map((word, i) => {
              const accent = hero.accentWords.includes(word);
              return (
                <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
                  <motion.span
                    className={`inline-block ${accent ? "font-serif font-normal italic tracking-normal text-leaf-600" : ""}`}
                    initial={{ y: "110%", rotate: 4 }}
                    animate={{ y: 0, rotate: 0 }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.06, ease }}
                  >
                    {word}
                    {" "}
                  </motion.span>
                </span>
              );
            })}
          </PageTitle>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
          >
            {hero.lead}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.0, ease }}
            className="mt-3 max-w-xl leading-relaxed text-muted"
          >
            {hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1, ease }}
            className="mt-9 flex flex-col gap-3 lg:mt-7 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <Link
              href={hero.primaryCta.href}
              className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-navy px-7 py-4 sm:w-auto font-bold text-white shadow-[0_18px_40px_-14px_rgb(25_40_97/0.6)] transition hover:-translate-y-0.5"
            >
              <span className="absolute inset-0 -translate-x-full bg-leaf transition-transform duration-500 ease-out group-hover:translate-x-0" />
              <span className="relative transition-colors duration-500 group-hover:text-navy">{hero.primaryCta.label}</span>
              <svg className="relative size-4 transition-all duration-500 group-hover:translate-x-1 group-hover:text-navy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-navy/15 bg-white/70 px-7 py-4 sm:w-auto font-bold text-navy backdrop-blur transition hover:border-navy/40"
            >
              {hero.secondaryCta.label}
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="mt-6 flex max-w-lg items-start gap-2 text-xs leading-relaxed text-muted/80"
          >
            <svg className="mt-0.5 size-3.5 shrink-0 text-leaf-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
            {hero.disclaimer}
          </motion.p>
        </div>

        {/* 3D scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.2, ease }}
          className="relative h-[440px] sm:h-[540px] lg:h-[min(640px,calc(100svh-200px))]"
        >
          <div className="absolute inset-[8%] rounded-full bg-gradient-to-br from-navy-100 via-white to-leaf-100 blur-2xl" />
          <HeroScene />

          {chips.map((chip) => (
            <motion.div
              key={chip.label}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: chip.delay, ease }}
              className={`pointer-events-none absolute hidden sm:block ${chip.className}`}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: chip.delay }}
                className="flex items-center gap-3 rounded-2xl border border-white/60 bg-white/70 px-4 py-3 shadow-[0_20px_50px_-20px_rgb(25_40_97/0.45)] backdrop-blur-xl"
              >
                <span className="grid size-8 place-items-center rounded-xl bg-navy text-leaf">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                    <path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6" />
                  </svg>
                </span>
                <span>
                  <span className="block text-[13px] font-extrabold text-navy">{chip.label}</span>
                  <span className="block text-[11px] font-medium text-muted">{chip.note}</span>
                </span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

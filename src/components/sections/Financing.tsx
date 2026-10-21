"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import Reveal, { WordsReveal } from "@/components/Reveal";
import ImageSlot from "@/components/ImageSlot";
import { financing, images } from "@/lib/content";

function Layer({ index, total, progress, label, q }: { index: number; total: number; progress: MotionValue<number>; label: string; q: string }) {
  // Layers start stacked and fan apart in 3D as the section scrolls through.
  const fromTop = total - 1 - index;
  const z = useTransform(progress, [0, 0.5], [fromTop * 20, fromTop * 92]);
  const start = index / total;
  const opacity = useTransform(progress, [0.15 + start * 0.4, 0.3 + start * 0.4], [0.55, 1]);
  const border = useTransform(progress, [0.15 + start * 0.4, 0.3 + start * 0.4], ["rgb(255 255 255 / 0.15)", "rgb(122 198 68 / 0.9)"]);

  return (
    <motion.div
      style={{ translateZ: z, opacity, borderColor: border }}
      className="absolute inset-0 rounded-3xl border-2 bg-gradient-to-br from-navy-700 to-navy-900 p-6 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.6)]"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold tracking-[0.2em] text-leaf uppercase">0{index + 1}</span>
        <span className="h-1.5 w-12 rounded-full bg-white/20" />
      </div>
      <p className="mt-3 text-xl font-extrabold text-white">{label}</p>
      <p className="mt-1 text-sm text-white/60">{q}</p>
    </motion.div>
  );
}

export default function Financing() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-38, -28]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-navy py-24 text-white lg:py-32">
      <div className="bg-grid-dark absolute inset-0" />
      <div className="absolute -top-40 right-0 size-[600px] rounded-full bg-leaf/20 blur-[140px]" />
      <div className="absolute -bottom-60 -left-40 size-[600px] rounded-full bg-navy-700 blur-[140px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2">
        <div>
          <Reveal>
            <span className="text-sm font-bold tracking-[0.2em] text-leaf uppercase">Beyond the Rate</span>
          </Reveal>
          <h2 className="mt-4 text-4xl leading-[1.05] font-extrabold tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            <WordsReveal text="Understand the Financing" />
            <WordsReveal text="Before You Commit" className="font-serif font-normal italic tracking-normal text-leaf" delay={0.2} />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-8 text-xl font-semibold text-white">{financing.lead}</p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/70">{financing.body}</p>
            <p className="mt-4 max-w-xl leading-relaxed text-white/70">{financing.closing}</p>
          </Reveal>

          <Reveal delay={0.2} className="mt-10 grid gap-3 sm:grid-cols-2">
            {financing.layers.map((l) => (
              <div key={l.label} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-leaf text-navy">
                  <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </span>
                <span className="text-sm leading-snug text-white/80">{l.q}</span>
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.3}>
            <Link
              href="#prequalify"
              className="mt-10 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-leaf px-7 py-4 sm:w-auto font-bold text-navy transition hover:-translate-y-0.5 hover:bg-white"
            >
              Bring Us Your Project Details
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </Reveal>
        </div>

        <div className="relative">

          <div className="relative mx-auto mt-20 h-[420px] w-full max-w-md [perspective:1400px] sm:h-[480px] lg:mt-0">
            <motion.div
              style={{ rotateX: 58, rotateZ: rotate }}
              className="absolute inset-x-6 top-1/2 h-48 -translate-y-1/2 [transform-style:preserve-3d] sm:h-52"
            >
              {financing.layers.map((l, i) => (
                <Layer key={l.label} index={i} total={financing.layers.length} progress={scrollYProgress} label={l.label} q={l.q} />
              ))}
            </motion.div>
          </div>
          <div className="relative mx-auto mt-2 max-w-md overflow-hidden rounded-3xl border border-white/10 shadow-[0_30px_60px_-25px_rgb(0_0_0/0.7)]">
            <ImageSlot
              src={images.financing}
              alt="Investor reviewing and signing loan documents"
              hint="financing.jpg"
              dark
              className="h-40 sm:h-44"
              sizes="(min-width: 1024px) 448px, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
            <p className="absolute bottom-4 left-5 text-xs font-bold tracking-[0.2em] text-white/80 uppercase">
              The full structure of a loan
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

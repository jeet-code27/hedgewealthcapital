"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import Reveal, { WordsReveal } from "@/components/Reveal";
import { highlights } from "@/lib/content";

function Layer({ index, total, progress, value, label }: { index: number; total: number; progress: MotionValue<number>; value: string; label: string }) {
  // Layers start stacked and fan apart in 3D as the section scrolls through.
  const fromTop = total - 1 - index;
  const z = useTransform(progress, [0.05, 0.45], [fromTop * 18, fromTop * 86]);
  const start = index / total;
  const border = useTransform(progress, [0.12 + start * 0.3, 0.25 + start * 0.3], ["rgb(255 255 255 / 0.15)", "rgb(122 198 68 / 0.9)"]);

  return (
    <motion.div
      style={{ translateZ: z, borderColor: border }}
      className="absolute inset-0 flex items-center justify-between rounded-3xl border-2 bg-gradient-to-br from-navy-700 to-navy-900 px-7 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.6)]"
    >
      <span className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">{value}</span>
      <span className="text-right text-xs font-bold tracking-[0.18em] text-leaf uppercase">{label}</span>
    </motion.div>
  );
}

export default function Highlights() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-36, -26]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-navy py-24 text-white lg:py-32">
      <div className="bg-grid-dark absolute inset-0" />
      <div className="absolute -top-40 right-0 size-[600px] rounded-full bg-leaf/20 blur-[140px]" />
      <div className="absolute -bottom-60 -left-40 size-[600px] rounded-full bg-navy-700 blur-[140px]" />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div>
          <Reveal>
            <span className="text-sm font-bold tracking-[0.2em] text-leaf uppercase">{highlights.eyebrow}</span>
          </Reveal>
          <h2 className="mt-4 text-4xl leading-[1.05] font-extrabold tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            <WordsReveal text="Program" />
            <WordsReveal text="Highlights" className="font-serif font-normal italic tracking-normal text-leaf" delay={0.1} />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/75">{highlights.lead}</p>
          </Reveal>

          <div className="relative mx-auto mt-6 h-[360px] w-full max-w-md [perspective:1400px] sm:h-[400px]">
            <motion.div
              style={{ rotateX: 58, rotateZ: rotate }}
              className="absolute inset-x-6 top-1/2 h-36 -translate-y-1/2 [transform-style:preserve-3d] sm:h-40"
            >
              {highlights.featured.map((f, i) => (
                <Layer key={f.label} index={i} total={highlights.featured.length} progress={scrollYProgress} value={f.value} label={f.label} />
              ))}
            </motion.div>
          </div>
        </div>

        <div className="lg:pt-6">
          <div role="list" className="grid gap-3 sm:grid-cols-2">
            {highlights.items.map((item, i) => (
              <Reveal key={item} delay={(i % 6) * 0.05} y={20} className="h-full">
                <div role="listitem" className="group flex h-full items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-leaf/60 hover:bg-white/[0.09]">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-leaf text-navy shadow-[0_4px_12px_-2px_rgb(122_198_68/0.6)] transition-transform duration-300 group-hover:scale-110">
                    <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  </span>
                  <span className="text-[15px] leading-snug font-semibold text-white/90">{item}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <a
              href="#prequalify"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-leaf px-7 py-4 font-bold text-navy shadow-[0_6px_0_0_#4d8c22] transition hover:-translate-y-0.5 hover:bg-white active:translate-y-1 active:shadow-none sm:w-auto"
            >
              Get Your DSCR Quote
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import CountUp from "@/components/CountUp";
import ImageSlot from "@/components/ImageSlot";
import Reveal, { WordsReveal } from "@/components/Reveal";
import { about, images } from "@/lib/content";

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yBack = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yFront = useTransform(scrollYProgress, [0, 1], [-30, 50]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-navy-50 py-24 lg:py-32">
      <div className="bg-grid absolute inset-0 opacity-60" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2">
        {/* Layered photo collage with parallax depth */}
        <div className="relative h-[420px] sm:h-[520px]">
          <motion.div style={{ y: yBack }} className="absolute top-0 right-0 w-[72%]">
            <ImageSlot
              src={images.multifamily}
              alt="Multifamily building financed by private money"
              hint="multifamily.jpg"
              className="aspect-[4/5] rounded-[30px] shadow-[0_40px_80px_-40px_rgb(25_40_97/0.7)]"
              sizes="(min-width: 1024px) 420px, 70vw"
            />
          </motion.div>
          <motion.div style={{ y: yFront }} className="absolute bottom-0 left-0 w-[58%]">
            <ImageSlot
              src={images.dscr}
              alt="Single-family rental property"
              hint="dscr-rental.jpg"
              className="aspect-[4/3] rounded-[26px] border-[6px] border-white shadow-[0_40px_80px_-30px_rgb(25_40_97/0.6)]"
              sizes="(min-width: 1024px) 340px, 60vw"
            />
          </motion.div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[38%] left-[6%] rounded-2xl bg-navy px-5 py-4 text-white shadow-[0_24px_50px_-20px_rgb(25_40_97/0.9)]"
          >
            <p className="text-3xl font-extrabold tracking-tight">
              <CountUp value={2010} plain />
            </p>
            <p className="text-xs font-bold tracking-[0.2em] text-leaf uppercase">Lending since</p>
          </motion.div>
        </div>

        <div>
          <Reveal>
            <span className="text-sm font-bold tracking-[0.2em] text-leaf-600 uppercase">{about.eyebrow}</span>
          </Reveal>
          <h2 className="mt-4 text-[2.05rem] leading-[1.05] font-extrabold tracking-[-0.03em] text-navy sm:text-5xl">
            <WordsReveal text="A Lender Built by Investors," />
            <WordsReveal text="for Investors" className="font-serif font-normal italic tracking-normal" delay={0.2} />
          </h2>
          <Reveal delay={0.1} className="mt-6 space-y-4 text-[17px] leading-relaxed text-muted">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-4">
            {about.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="rounded-3xl border border-navy/10 bg-white p-5 shadow-[0_6px_0_0_#e8ebf5,0_24px_40px_-30px_rgb(25_40_97/0.6)]">
                  <p className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
                    <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} plain={"plain" in s && s.plain} />
                  </p>
                  <p className="mt-1 text-sm font-semibold text-muted">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <Link href={about.link.href} className="mt-8 inline-flex items-center gap-2 font-bold text-navy">
              <span className="border-b-2 border-leaf pb-0.5">{about.link.label}</span>
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

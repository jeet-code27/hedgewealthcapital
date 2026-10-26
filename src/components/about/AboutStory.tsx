"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring } from "motion/react";
import CountUp from "@/components/CountUp";
import Reveal, { WordsReveal } from "@/components/Reveal";
import { aboutStory } from "@/lib/about-content";

export default function AboutStory() {
  const rx = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });

  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <Reveal y={50}>
          <motion.div
            style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
            onPointerMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              ry.set(((e.clientX - r.left) / r.width - 0.5) * 10);
              rx.set((0.5 - (e.clientY - r.top) / r.height) * 10);
            }}
            onPointerLeave={() => {
              rx.set(0);
              ry.set(0);
            }}
            className="relative [transform-style:preserve-3d]"
          >
            <div className="absolute -inset-4 -z-10 rounded-[40px] bg-gradient-to-br from-leaf/30 via-navy-100 to-transparent blur-xl" />
            <div className="relative aspect-[5/4] overflow-hidden rounded-[32px] shadow-[0_50px_90px_-45px_rgb(25_40_97/0.75)]">
              <Image src={aboutStory.image.src} alt={aboutStory.image.alt} fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />
            </div>
            <motion.div
              style={{ z: 60 }}
              className="absolute -right-2 -bottom-8 rounded-3xl bg-white p-5 shadow-[0_30px_60px_-25px_rgb(25_40_97/0.6)] sm:-right-6 sm:p-6"
            >
              <p className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
                <CountUp value={aboutStory.badge.value} suffix={aboutStory.badge.suffix} />
              </p>
              <p className="mt-1 text-xs font-bold tracking-[0.16em] text-leaf-600 uppercase">{aboutStory.badge.label}</p>
            </motion.div>
          </motion.div>
        </Reveal>

        <div>
          <Reveal>
            <span className="text-sm font-bold tracking-[0.2em] text-leaf-600 uppercase">{aboutStory.eyebrow}</span>
          </Reveal>
          <h2 className="mt-4 text-[2.05rem] leading-[1.05] font-extrabold tracking-[-0.03em] text-navy sm:text-5xl">
            <WordsReveal text="A Lender Designed by" />
            <WordsReveal text="Investors, for Investors" className="font-serif font-normal italic tracking-normal" delay={0.2} />
          </h2>
          <Reveal delay={0.1} className="mt-6 space-y-4 text-[17px] leading-relaxed text-muted">
            {aboutStory.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>

          <div className="mt-10 space-y-3">
            {aboutStory.points.map((pt, i) => (
              <Reveal key={pt.title} delay={0.1 + i * 0.08} y={20}>
                <div className="group flex gap-4 rounded-3xl border border-navy/10 bg-white p-5 shadow-[0_20px_40px_-35px_rgb(25_40_97/0.6)] transition duration-300 hover:-translate-y-0.5 hover:border-leaf/60">
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-navy text-sm font-extrabold text-leaf transition-colors duration-300 group-hover:bg-leaf group-hover:text-navy">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-extrabold text-navy">{pt.title}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-muted">{pt.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

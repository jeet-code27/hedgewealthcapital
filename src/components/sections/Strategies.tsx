"use client";

import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import ImageSlot from "@/components/ImageSlot";
import Reveal, { WordsReveal } from "@/components/Reveal";
import { images, strategies } from "@/lib/content";

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const rx = useSpring(useMotionValue(0), { stiffness: 160, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 160, damping: 18 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glow = useMotionTemplate`radial-gradient(420px circle at ${gx}% ${gy}%, rgb(122 198 68 / 0.18), transparent 60%)`;

  return (
    <motion.div
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        ry.set((px - 0.5) * 10);
        rx.set((0.5 - py) * 10);
        gx.set(px * 100);
        gy.set(py * 100);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      className={`group relative ${className}`}
    >
      <motion.div style={{ background: glow }} className="pointer-events-none absolute inset-0 z-10 rounded-[28px] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {children}
    </motion.div>
  );
}

export default function Strategies() {
  return (
    <section id="loan-programs" className="relative scroll-mt-24 pt-14 pb-20 sm:pt-16 lg:pt-20 lg:pb-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Reveal>
              <span className="text-sm font-bold tracking-[0.2em] text-leaf-600 uppercase">Loan Programs</span>
            </Reveal>
            <h2 className="mt-4 max-w-2xl text-[2.05rem] leading-[1.05] font-extrabold tracking-[-0.03em] text-navy sm:text-5xl lg:text-6xl">
              <WordsReveal text="A Comprehensive Range" />
              <WordsReveal text="of Loan Options" className="font-serif font-normal italic tracking-normal" delay={0.15} />
            </h2>
          </div>
          <Reveal delay={0.2} className="max-w-sm text-muted">
            HWC offers a wide variety of no-income-verification loans for your real estate investment needs.
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {strategies.map((s, i) => (
            <Reveal key={s.key} delay={i * 0.1} className="h-full">
              <TiltCard className="h-full">
                <div className="flex h-full flex-col overflow-hidden rounded-[28px] border border-navy/10 bg-white shadow-[0_30px_60px_-40px_rgb(25_40_97/0.5)] transition-shadow duration-500 group-hover:shadow-[0_40px_80px_-30px_rgb(25_40_97/0.45)]">
                  <div className="relative">
                    <ImageSlot
                      src={images[s.key]}
                      alt={s.title}
                      hint={`${s.key}.jpg`}
                      className="aspect-[4/3] transition-transform duration-700 group-hover:scale-[1.04]"
                      sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                    />
                    <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-navy shadow-sm backdrop-blur">
                      {s.tag}
                    </span>
                    <span className="absolute top-3 right-4 font-serif text-5xl text-white/90 italic drop-shadow">0{i + 1}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-extrabold tracking-tight text-navy">{s.title}</h3>
                    <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">{s.body}</p>
                    <Link href={s.link.href} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-navy">
                      <span className="relative">
                        {s.link.label}
                        <span className="absolute -bottom-0.5 left-0 h-0.5 w-full origin-left scale-x-0 bg-leaf transition-transform duration-300 group-hover:scale-x-100" />
                      </span>
                      <span className="grid size-7 place-items-center rounded-full bg-navy-50 transition-all duration-300 group-hover:bg-leaf">
                        <svg className="size-3.5 -rotate-45 transition-transform duration-300 group-hover:rotate-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                          <path d="M5 12h14M13 5l7 7-7 7" />
                        </svg>
                      </span>
                    </Link>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

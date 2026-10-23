"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";
import { contact, ltcPromo } from "@/lib/content";

// Stacked offsets give the numeral a solid extruded edge in brand green.
const extrude = Array.from({ length: 12 }, (_, i) => `${i + 1}px ${i + 1}px 0 ${i < 10 ? "#6bb83a" : "#4d8c22"}`)
  .concat("18px 26px 36px rgb(25 40 97 / 0.35)")
  .join(", ");

export default function LtcPromo() {
  const rx = useSpring(useMotionValue(0), { stiffness: 120, damping: 16 });
  const ry = useSpring(useMotionValue(0), { stiffness: 120, damping: 16 });

  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-[36px] border border-navy/10 bg-gradient-to-br from-white via-navy-50 to-leaf-100 px-6 py-14 shadow-[0_40px_80px_-50px_rgb(25_40_97/0.6)] sm:px-12 lg:py-20">
          <div className="bg-grid absolute inset-0 opacity-70" />
          <div className="absolute -top-24 -right-24 size-[420px] rounded-full bg-leaf/25 blur-[100px]" />

          <div className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
            {/* 3D numeral */}
            <div
              className="relative flex justify-center [perspective:900px]"
              onPointerMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                ry.set(((e.clientX - r.left) / r.width - 0.5) * 24);
                rx.set((0.5 - (e.clientY - r.top) / r.height) * 18);
              }}
              onPointerLeave={() => {
                rx.set(0);
                ry.set(0);
              }}
            >
              <div className="animate-spin-slow absolute top-1/2 left-1/2 size-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-navy/15 sm:size-[420px]" />
              <div className="absolute top-1/2 left-1/2 size-[230px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[14px] border-leaf/25 sm:size-[330px]" />
              <motion.div style={{ rotateX: rx, rotateY: ry }} className="relative py-10 text-center [transform-style:preserve-3d]">
                <span className="block text-sm font-extrabold tracking-[0.3em] text-leaf-600 uppercase">Up to</span>
                <span
                  className="block text-[6.5rem] leading-none font-extrabold tracking-[-0.06em] text-navy sm:text-[10rem] lg:text-[11.5rem]"
                  style={{ textShadow: extrude }}
                >
                  <CountUp value={ltcPromo.value} />
                  <span className="text-[0.55em] align-top">%</span>
                </span>
                <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-navy px-4 py-1.5 text-xs font-extrabold tracking-[0.2em] text-white uppercase">
                  Loan-to-Cost
                </span>
              </motion.div>
            </div>

            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-leaf/50 bg-white/80 px-3.5 py-1.5 text-xs font-extrabold tracking-[0.2em] text-leaf-600 uppercase">
                  <span className="relative flex size-2">
                    <span className="absolute inset-0 animate-ping rounded-full bg-leaf" />
                    <span className="relative size-2 rounded-full bg-leaf" />
                  </span>
                  {ltcPromo.eyebrow}
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 text-4xl leading-[1.02] font-extrabold tracking-[-0.03em] text-navy sm:text-6xl">
                  Up to <span className="font-serif font-normal italic tracking-normal text-leaf-600">100%</span> LTC
                </h2>
                <p className="mt-6 text-xl font-bold text-ink">{ltcPromo.lead}</p>
                <p className="mt-3 max-w-md text-lg leading-relaxed text-muted">{ltcPromo.body}</p>
              </Reveal>

              <Reveal delay={0.1} className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#prequalify"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-navy px-7 py-4 font-bold text-white shadow-[0_6px_0_0_#0a1233] transition hover:-translate-y-0.5 active:translate-y-1 active:shadow-none sm:w-auto"
                >
                  See If You Qualify
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </a>
                <a
                  href={contact.phoneHref}
                  className="inline-flex w-full items-center justify-center rounded-2xl border border-navy/15 bg-white px-7 py-4 font-bold text-navy transition hover:border-navy/40 sm:w-auto"
                >
                  Call {contact.phone}
                </a>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="mt-8 flex items-start gap-4 rounded-3xl bg-navy p-5 text-white shadow-[0_24px_50px_-25px_rgb(25_40_97/0.8)] sm:p-6">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-leaf text-navy shadow-[inset_0_-4px_8px_rgb(0_0_0/0.15)]">
                    <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                      <path d="M12 2l3 6 6 .9-4.5 4.4 1 6.3L12 16.8 6.5 19.6l1-6.3L3 8.9 9 8z" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs font-bold tracking-[0.2em] text-leaf uppercase">Price-Beat Guarantee</p>
                    <p className="mt-1 text-lg font-extrabold">{ltcPromo.callout.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-white/70">{ltcPromo.callout.body}</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";
import { aboutStats } from "@/lib/about-content";

export default function AboutStats() {
  return (
    <section className="px-4 sm:px-6">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-navy px-5 py-10 text-white sm:px-10 sm:py-12">
        <div className="bg-grid-dark absolute inset-0" />
        <div className="absolute -top-24 left-1/3 size-[380px] rounded-full bg-leaf/20 blur-[110px]" />
        <div className="relative grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {aboutStats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="group h-full rounded-3xl border border-white/10 bg-white/[0.05] p-5 shadow-[0_6px_0_0_rgb(122_198_68/0.45)] transition duration-300 hover:-translate-y-1 hover:bg-white/[0.09] sm:p-7">
                <p className="text-[2rem] leading-none font-extrabold tracking-tight whitespace-nowrap sm:text-5xl">
                  <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
                </p>
                <p className="mt-3 text-[11px] font-bold tracking-[0.16em] text-leaf uppercase sm:text-xs">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

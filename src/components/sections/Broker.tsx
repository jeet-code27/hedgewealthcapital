"use client";

import Link from "next/link";
import CountUp from "@/components/CountUp";
import Reveal, { WordsReveal } from "@/components/Reveal";
import { broker, contact } from "@/lib/content";

export default function Broker() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:py-16">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[36px] bg-gradient-to-br from-navy via-navy to-navy-950 px-6 py-16 text-white sm:px-12 lg:py-20">
        <div className="bg-grid-dark absolute inset-0" />
        <div className="absolute -right-32 -bottom-32 size-[480px] rounded-full bg-leaf/25 blur-[120px]" />
        <div className="animate-spin-slow absolute -top-40 -right-40 size-[520px] rounded-full border border-dashed border-white/15" />

        <div className="relative grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div>
            <Reveal>
              <span className="text-sm font-bold tracking-[0.2em] text-leaf uppercase">{broker.eyebrow}</span>
            </Reveal>
            <h2 className="mt-4 text-[2.05rem] leading-[1.05] font-extrabold tracking-[-0.03em] sm:text-5xl">
              <WordsReveal text="Partner With" />
              <WordsReveal text="Hedge Wealth Capital" className="font-serif font-normal italic tracking-normal text-leaf" delay={0.15} />
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">{broker.body}</p>
            </Reveal>
            <Reveal delay={0.15} className="mt-8 flex flex-wrap gap-3">
              {broker.points.map((p) => (
                <span key={p} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-sm font-bold">
                  <span className="grid size-5 place-items-center rounded-full bg-leaf text-navy">
                    <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" aria-hidden>
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  </span>
                  {p}
                </span>
              ))}
            </Reveal>
            <Reveal delay={0.2} className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href={broker.cta.href}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-leaf px-7 py-4 font-extrabold text-navy shadow-[0_6px_0_0_#4d8c22] transition hover:-translate-y-0.5 hover:bg-white active:translate-y-1 active:shadow-none sm:w-auto"
              >
                {broker.cta.label}
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
              <a
                href={contact.phoneHref}
                className="inline-flex w-full items-center justify-center rounded-2xl border border-white/25 px-7 py-4 font-bold transition hover:bg-white/10 sm:w-auto"
              >
                Call {contact.phone}
              </a>
            </Reveal>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {broker.stats.map((s, i) => (
              <Reveal key={s.label} delay={0.1 + i * 0.1}>
                <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-7 backdrop-blur-sm shadow-[0_6px_0_0_rgb(122_198_68/0.5)]">
                  <p className="text-5xl font-extrabold tracking-tight sm:text-6xl">
                    <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-sm font-bold tracking-[0.18em] text-leaf uppercase">{s.label}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.3} className="sm:col-span-2 lg:col-span-1">
              <p className="rounded-3xl bg-white p-6 text-navy">
                <span className="block font-extrabold">{broker.deal}</span>
                <a href={contact.phoneHref} className="mt-1 block text-2xl font-extrabold whitespace-nowrap text-leaf-600">
                  {contact.phone}
                </a>
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

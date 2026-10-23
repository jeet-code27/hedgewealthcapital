"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import Reveal, { WordsReveal } from "@/components/Reveal";
import { glossary } from "@/lib/content";

const themes = [
  { card: "bg-gradient-to-br from-navy-700 via-navy to-navy-950 text-white", term: "text-white", name: "text-leaf", def: "text-white/70", ring: "border-white/15" },
  { card: "bg-white text-navy border border-navy/10", term: "text-navy", name: "text-leaf-600", def: "text-muted", ring: "border-navy/10" },
  { card: "bg-gradient-to-br from-[#93d863] via-leaf to-leaf-600 text-navy", term: "text-navy", name: "text-navy/80", def: "text-navy/75", ring: "border-navy/15" },
];

function useSpacing() {
  const [spacing, setSpacing] = useState(270);
  useEffect(() => {
    const update = () => setSpacing(window.innerWidth < 640 ? 190 : window.innerWidth < 1024 ? 240 : 280);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return spacing;
}

export default function GlossarySlider() {
  const items = glossary.terms;
  const n = items.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const spacing = useSpacing();
  const reduce = useReducedMotion();

  const go = useCallback((dir: number) => setActive((a) => (a + dir + n) % n), [n]);

  useEffect(() => {
    if (paused || reduce) return;
    const id = setInterval(() => go(1), 3800);
    return () => clearInterval(id);
  }, [paused, reduce, go]);

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute top-1/3 left-1/2 -z-10 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-navy/10 via-leaf/15 to-navy/10 blur-[110px]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Reveal>
              <span className="text-sm font-bold tracking-[0.2em] text-leaf-600 uppercase">{glossary.eyebrow}</span>
            </Reveal>
            <h2 className="mt-4 max-w-3xl text-[2.05rem] leading-[1.05] font-extrabold tracking-[-0.03em] text-navy sm:text-5xl">
              <WordsReveal text="Understand the Financing" />
              <WordsReveal text="Behind the Investment" className="font-serif font-normal italic tracking-normal" delay={0.15} />
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-md text-lg text-muted">{glossary.lead}</p>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="flex items-center gap-3">
            {[-1, 1].map((dir) => (
              <button
                key={dir}
                onClick={() => go(dir)}
                aria-label={dir < 0 ? "Previous term" : "Next term"}
                className="grid size-14 place-items-center rounded-full border border-navy/15 bg-white text-navy shadow-[0_6px_0_0_#e8ebf5,0_14px_30px_-12px_rgb(25_40_97/0.4)] transition hover:-translate-y-0.5 hover:border-navy hover:bg-navy hover:text-white active:translate-y-1 active:shadow-none"
              >
                <svg className={`size-5 ${dir < 0 ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </Reveal>
        </div>
      </div>

      {/* 3D coverflow stage */}
      <motion.div
        className="relative mt-14 h-[420px] cursor-grab touch-pan-y [perspective:1600px] active:cursor-grabbing sm:h-[460px]"
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        onDragEnd={(_, info) => {
          if (info.offset.x < -50) go(1);
          else if (info.offset.x > 50) go(-1);
        }}
        role="region"
        aria-roledescription="carousel"
        aria-label="Financing glossary"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
      >
        <div className="absolute inset-0 [transform-style:preserve-3d]">
          {items.map((item, i) => {
            let offset = i - active;
            if (offset > n / 2) offset -= n;
            if (offset < -n / 2) offset += n;
            const abs = Math.abs(offset);
            const theme = themes[i % themes.length];
            const isActive = offset === 0;

            return (
              <motion.article
                key={item.term}
                onClick={() => !isActive && setActive(i)}
                initial={false}
                animate={{
                  x: offset * spacing,
                  z: -abs * 220,
                  rotateY: offset * -34,
                  scale: isActive ? 1 : 0.92,
                  opacity: abs > 2 ? 0 : 1 - abs * 0.18,
                }}
                transition={{ type: "spring", stiffness: 120, damping: 20, mass: 0.9 }}
                style={{ zIndex: 20 - abs, pointerEvents: abs > 2 ? "none" : "auto" }}
                aria-hidden={!isActive}
                className={`absolute top-4 left-1/2 -ml-[135px] flex h-[380px] w-[270px] flex-col overflow-hidden rounded-[30px] p-7 select-none sm:-ml-[160px] sm:h-[420px] sm:w-[320px] sm:p-8 ${theme.card} ${
                  isActive ? "shadow-[0_50px_80px_-30px_rgb(25_40_97/0.65)]" : "shadow-[0_30px_60px_-35px_rgb(25_40_97/0.5)]"
                }`}
              >
                {/* Decorative rings */}
                <span className={`pointer-events-none absolute -top-16 -right-16 size-48 rounded-full border-[18px] ${theme.ring}`} />
                <span className={`pointer-events-none absolute -top-4 -right-4 size-24 rounded-full border-[10px] ${theme.ring}`} />
                {/* Glare */}
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-transparent" />

                <div className="relative flex items-center justify-between">
                  <span className={`text-xs font-bold tracking-[0.2em] uppercase ${theme.name}`}>
                    {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
                  </span>
                </div>

                <p className={`relative mt-auto font-serif text-6xl leading-none italic sm:text-7xl ${theme.term}`}>{item.term}</p>
                <p className={`relative mt-3 text-sm font-extrabold tracking-[0.14em] uppercase ${theme.name}`}>{item.name}</p>
                <p className={`relative mt-4 text-[15px] leading-relaxed ${theme.def}`}>{item.def}</p>
              </motion.article>
            );
          })}
        </div>
      </motion.div>

      {/* Progress dots */}
      <div className="mt-4 flex justify-center gap-2">
        {items.map((item, i) => (
          <button
            key={item.term}
            onClick={() => setActive(i)}
            aria-label={`Show ${item.term}`}
            className={`h-2 rounded-full transition-all duration-500 ${i === active ? "w-10 bg-leaf" : "w-2 bg-navy/20 hover:bg-navy/40"}`}
          />
        ))}
      </div>
    </section>
  );
}

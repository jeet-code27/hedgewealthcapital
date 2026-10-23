"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import Reveal, { WordsReveal } from "@/components/Reveal";
import { process } from "@/lib/content";

export default function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section id="how-it-works" className="relative scroll-mt-24 py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <span className="text-sm font-bold tracking-[0.2em] text-leaf-600 uppercase">{process.eyebrow}</span>
          </Reveal>
          <h2 className="mt-4 text-[2.05rem] leading-[1.05] font-extrabold tracking-[-0.03em] text-navy sm:text-5xl">
            <WordsReveal text="Apply Today and Close" />
            <WordsReveal text="in 5 to 10 Business Days" className="font-serif font-normal italic tracking-normal" delay={0.2} />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">{process.lead}</p>
            <a
              href="#prequalify"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-navy px-7 py-4 font-bold text-white transition hover:-translate-y-0.5 hover:bg-navy-700 sm:w-auto"
            >
              Start Your Application
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </Reveal>
        </div>

        <ol ref={ref} className="relative space-y-6 pl-14 sm:pl-20">
          <div className="absolute top-2 bottom-2 left-5 w-0.5 rounded bg-navy/10 sm:left-7" />
          <motion.div style={{ scaleY: fill }} className="absolute top-2 bottom-2 left-5 w-0.5 origin-top rounded bg-leaf sm:left-7" />

          {process.steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.05} y={40}>
              <li className="group relative list-none">
                <span className="absolute top-6 -left-14 grid size-10 place-items-center rounded-full border-4 border-white bg-navy text-sm font-extrabold text-white shadow-lg ring-1 ring-navy/10 transition-colors duration-300 group-hover:bg-leaf group-hover:text-navy sm:-left-[4.4rem] sm:size-12">
                  {i + 1}
                </span>
                <div className="rounded-3xl border border-navy/10 bg-white p-7 shadow-[0_20px_50px_-35px_rgb(25_40_97/0.5)] transition-all duration-500 group-hover:-translate-y-1 group-hover:border-leaf/50 group-hover:shadow-[0_30px_60px_-30px_rgb(25_40_97/0.45)] sm:p-8">
                  <span className="text-xs font-bold tracking-[0.2em] text-muted uppercase">Step 0{i + 1}</span>
                  <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-navy">{step.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{step.body}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

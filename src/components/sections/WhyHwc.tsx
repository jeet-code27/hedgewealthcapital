"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import Reveal, { WordsReveal } from "@/components/Reveal";
import { whyHwc } from "@/lib/content";

const icons: Record<string, React.ReactNode> = {
  phone: <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.4 1.8.7 2.7a2 2 0 01-.5 2.1L8 9.8a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.7.7a2 2 0 011.7 2z" />,
  bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7z" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  percent: (
    <>
      <path d="M19 5L5 19" />
      <circle cx="7" cy="7" r="2.5" />
      <circle cx="17" cy="17" r="2.5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
      <path d="M8.5 12l2.5 2.5 4.5-5" />
    </>
  ),
  doc: (
    <>
      <path d="M14 3H6v18h12V7z" />
      <path d="M14 3v4h4M9 13h6M9 17h4" />
    </>
  ),
  wallet: (
    <>
      <path d="M3 7h16a2 2 0 012 2v9a2 2 0 01-2 2H3z" />
      <path d="M3 7l12-4v4M16 13.5h2" />
    </>
  ),
  bank: <path d="M3 21h18M5 21V10M9.5 21V10M14.5 21V10M19 21V10M2 10l10-6 10 6z" />,
};

function BenefitCard({ icon, title, body, index }: { icon: string; title: string; body: string; index: number }) {
  const rx = useSpring(useMotionValue(0), { stiffness: 180, damping: 16 });
  const ry = useSpring(useMotionValue(0), { stiffness: 180, damping: 16 });

  return (
    <motion.div
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 14);
        rx.set((0.5 - (e.clientY - r.top) / r.height) * 14);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      className="group relative h-full rounded-[26px] border border-navy/10 bg-white p-6 shadow-[0_24px_50px_-35px_rgb(25_40_97/0.55)] transition-[box-shadow,border-color] duration-500 [transform-style:preserve-3d] hover:border-leaf/60 hover:shadow-[0_40px_70px_-35px_rgb(25_40_97/0.55)]"
    >
      <span className="absolute top-5 right-6 font-serif text-4xl text-navy/10 italic">{String(index + 1).padStart(2, "0")}</span>
      <span
        style={{ transform: "translateZ(40px)" }}
        className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-navy-700 to-navy text-leaf shadow-[0_12px_24px_-8px_rgb(25_40_97/0.7),inset_0_-4px_8px_rgb(0_0_0/0.3),inset_0_2px_4px_rgb(255_255_255/0.2)] transition-colors duration-300 group-hover:from-leaf group-hover:to-leaf-600 group-hover:text-navy"
      >
        <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          {icons[icon]}
        </svg>
      </span>
      <h3 style={{ transform: "translateZ(24px)" }} className="mt-6 text-lg font-extrabold tracking-tight text-navy">
        {title}
      </h3>
      <p style={{ transform: "translateZ(16px)" }} className="mt-2 text-[15px] leading-relaxed text-muted">
        {body}
      </p>
    </motion.div>
  );
}

export default function WhyHwc() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <Reveal>
              <span className="text-sm font-bold tracking-[0.2em] text-leaf-600 uppercase">{whyHwc.eyebrow}</span>
            </Reveal>
            <h2 className="mt-4 text-[2.05rem] leading-[1.05] font-extrabold tracking-[-0.03em] text-navy sm:text-5xl lg:text-6xl">
              <WordsReveal text="HWC Is Invested" />
              <WordsReveal text="in Your Success" className="font-serif font-normal italic tracking-normal" delay={0.15} />
            </h2>
          </div>
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-muted">{whyHwc.body}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyHwc.benefits.map((b, i) => (
            <Reveal key={b.title} delay={(i % 4) * 0.08} className="h-full">
              <BenefitCard {...b} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

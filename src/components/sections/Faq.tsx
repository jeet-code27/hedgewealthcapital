"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Reveal, { WordsReveal } from "@/components/Reveal";
import { contact, faqs } from "@/lib/content";

type FaqItem = { q: string; a: string };

export default function Faq({ items = faqs }: { items?: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-14 sm:py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Reveal>
            <span className="text-sm font-bold tracking-[0.2em] text-leaf-600 uppercase">FAQ</span>
          </Reveal>
          <h2 className="mt-4 text-[2.05rem] leading-[1.05] font-extrabold tracking-[-0.03em] text-navy sm:text-5xl">
            <WordsReveal text="Frequently Asked" />
            <WordsReveal text="Questions" className="font-serif font-normal italic tracking-normal" delay={0.15} />
          </h2>
          <Reveal delay={0.15}>
            <div className="mt-8 rounded-3xl bg-navy-50 p-6">
              <p className="font-bold text-navy">Still have a question?</p>
              <p className="mt-1 text-sm text-muted">Talk to our team about your property and timeline.</p>
              <a href={contact.phoneHref} className="mt-4 inline-flex items-center gap-2 text-lg font-extrabold text-navy">
                <svg className="size-5 text-leaf-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                  <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.4 1.8.7 2.7a2 2 0 01-.5 2.1L8 9.8a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.7.7a2 2 0 011.7 2z" />
                </svg>
                {contact.phone}
              </a>
            </div>
          </Reveal>
        </div>

        <div className="divide-y divide-navy/10 border-y border-navy/10">
          {items.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.06} y={16}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-7 text-left"
                >
                  <span className={`text-lg font-bold transition-colors sm:text-xl ${isOpen ? "text-navy" : "text-ink/80"}`}>{f.q}</span>
                  <span
                    className={`grid size-10 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                      isOpen ? "rotate-45 border-leaf bg-leaf text-navy" : "border-navy/15 text-navy"
                    }`}
                  >
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 leading-relaxed text-muted">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

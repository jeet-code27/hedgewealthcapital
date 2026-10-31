"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { goals } from "@/lib/loan-programs";
import type { ServicePage } from "@/lib/services";
import ServiceIcon from "./ServiceIcon";

type Program = Pick<ServicePage, "slug" | "path" | "name" | "tag" | "icon">;

/** "What do you want to do?" chips that surface the programs matching each goal. */
export default function GoalFinder({ programs }: { programs: Program[] }) {
  const [active, setActive] = useState(0);
  const goal = goals[active];

  return (
    <div>
      <div role="tablist" aria-label="Choose your goal" className="flex flex-wrap gap-2">
        {goals.map((g, i) => (
          <button
            key={g.label}
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            className={`rounded-full px-4 py-2.5 text-sm font-bold transition ${
              active === i ? "bg-navy text-white shadow-[0_4px_0_0_#0a1233]" : "border border-navy/12 bg-white text-navy hover:border-navy/30"
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={goal.label} role="tabpanel" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="mt-7">
          <p className="max-w-2xl text-lg leading-relaxed text-muted">{goal.text}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 [perspective:1400px]">
            {goal.programs.map((slug, i) => {
              const p = programs.find((x) => x.slug === slug);
              if (!p) return null;
              return (
                <Link
                  key={slug}
                  href={p.path}
                  className="group flex items-center gap-4 rounded-[24px] border border-navy/10 bg-white p-5 shadow-[0_24px_50px_-35px_rgb(25_40_97/0.7)] transition duration-500 [transform-style:preserve-3d] hover:[transform:rotateX(5deg)_rotateY(-5deg)_translateZ(8px)]"
                >
                  <span className={`grid size-14 shrink-0 place-items-center rounded-2xl ${i === 0 ? "bg-leaf text-navy shadow-[0_6px_0_0_#4d8c22]" : "bg-navy text-leaf shadow-[0_6px_0_0_#0a1233]"}`}>
                    <ServiceIcon icon={p.icon} />
                  </span>
                  <span className="min-w-0">
                    {i === 0 && <span className="block text-[11px] font-extrabold tracking-[0.14em] text-leaf-600 uppercase">Best starting point</span>}
                    <span className="block text-lg leading-snug font-extrabold text-navy">{p.name}</span>
                    <span className="block text-sm text-muted">{p.tag}</span>
                  </span>
                  <svg className="ml-auto size-5 shrink-0 text-navy/40 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </Link>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

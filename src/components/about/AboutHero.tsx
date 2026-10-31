"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { aboutHero } from "@/lib/about-content";
import PageTitle from "@/components/PageTitle";

const ease = [0.22, 1, 0.36, 1] as const;

// Each photo floats at its own depth so the stack separates as it tilts.
const cards = [
  { className: "left-[4%] top-[6%] w-[52%] rotate-[-6deg]", z: 40, delay: 0.3 },
  { className: "right-[2%] top-[16%] w-[48%] rotate-[5deg]", z: 90, delay: 0.45 },
  { className: "left-[22%] bottom-[2%] w-[50%] rotate-[2deg]", z: 140, delay: 0.6 },
];

export default function AboutHero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 90, damping: 18 });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 90, damping: 18 });
  const titleWords = aboutHero.title.split(" ");

  return (
    <section className="relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-24">
      <div className="bg-grid mask-fade-b absolute inset-0 -z-10" />
      <div className="absolute -top-40 -left-40 -z-10 size-[560px] rounded-full bg-navy/10 blur-[120px]" />
      <div className="absolute top-20 -right-32 -z-10 size-[520px] rounded-full bg-leaf/20 blur-[120px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <motion.nav
            aria-label="Breadcrumb"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="flex items-center gap-2 text-sm font-semibold text-muted"
          >
            <Link href="/" className="transition hover:text-navy">
              Home
            </Link>
            <span className="text-leaf-600">/</span>
            <span className="text-navy">About</span>
          </motion.nav>

          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white/80 py-1.5 pr-4 pl-1.5 text-[13px] font-semibold text-navy shadow-sm backdrop-blur"
          >
            <span className="rounded-full bg-leaf px-2.5 py-0.5 text-[11px] font-extrabold tracking-wide text-navy uppercase">Since 2010</span>
            {aboutHero.eyebrow}
          </motion.span>

          <PageTitle className="mt-6 text-[2.6rem] leading-[1.02] font-extrabold tracking-[-0.035em] text-navy sm:text-6xl xl:text-7xl">
            {titleWords.map((word, i) => {
              const accent = i >= 2;
              return (
                <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
                  <motion.span
                    className={`inline-block ${accent ? "font-serif font-normal italic tracking-normal text-leaf-600" : ""}`}
                    initial={{ y: "110%", rotate: 4 }}
                    animate={{ y: 0, rotate: 0 }}
                    transition={{ duration: 1, delay: 0.2 + i * 0.07, ease }}
                  >
                    {word}
                    {" "}
                  </motion.span>
                </span>
              );
            })}
          </PageTitle>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
          >
            {aboutHero.lead}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8, ease }}
            className="mt-3 max-w-xl leading-relaxed text-muted"
          >
            {aboutHero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              href="/#prequalify"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-navy px-7 py-4 font-bold text-white shadow-[0_6px_0_0_#0a1233] transition hover:-translate-y-0.5 active:translate-y-1 active:shadow-none sm:w-auto"
            >
              Find Out If You Prequalify
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
            <a
              href="#hedge-wealth-group"
              className="inline-flex w-full items-center justify-center rounded-2xl border border-navy/15 bg-white/70 px-7 py-4 font-bold text-navy backdrop-blur transition hover:border-navy/40 sm:w-auto"
            >
              Meet the Group
            </a>
          </motion.div>
        </div>

        {/* 3D photo stack */}
        <div
          className="relative h-[380px] [perspective:1200px] sm:h-[500px] lg:h-[560px]"
          onPointerMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            mx.set((e.clientX - r.left) / r.width - 0.5);
            my.set((e.clientY - r.top) / r.height - 0.5);
          }}
          onPointerLeave={() => {
            mx.set(0);
            my.set(0);
          }}
        >
          <div className="absolute inset-[12%] rounded-full bg-gradient-to-br from-navy-100 via-white to-leaf-100 blur-2xl" />
          <motion.div style={{ rotateX, rotateY }} className="absolute inset-0 [transform-style:preserve-3d]">
            {aboutHero.images.map((img, i) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.1, delay: cards[i].delay, ease }}
                style={{ z: cards[i].z }}
                className={`absolute ${cards[i].className}`}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[26px] border-[5px] border-white shadow-[0_40px_70px_-30px_rgb(25_40_97/0.65)]">
                  <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 320px, 50vw" className="object-cover" preload={i === 0} />
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.1, ease }}
              style={{ z: 190 }}
              className="absolute top-[4%] right-[6%]"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="rounded-2xl bg-navy px-4 py-3 text-white shadow-[0_24px_50px_-18px_rgb(25_40_97/0.9)]"
              >
                <p className="text-2xl font-extrabold tracking-tight">275+</p>
                <p className="text-[10px] font-bold tracking-[0.18em] text-leaf uppercase">Units managed</p>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.25, ease }}
              style={{ z: 170 }}
              className="absolute bottom-[12%] left-[0%]"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                className="flex items-center gap-3 rounded-2xl border border-white/60 bg-white/85 px-4 py-3 shadow-[0_20px_50px_-20px_rgb(25_40_97/0.5)] backdrop-blur-xl"
              >
                <span className="grid size-9 place-items-center rounded-xl bg-leaf text-navy">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
                  </svg>
                </span>
                <span>
                  <span className="block text-[13px] font-extrabold text-navy">50 States + DC</span>
                  <span className="block text-[11px] font-medium text-muted">Lending nationwide</span>
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

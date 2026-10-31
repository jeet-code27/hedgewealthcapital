"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { contact } from "@/lib/content";
import type { ServicePage } from "@/lib/services";
import ServiceIcon from "./ServiceIcon";
import PageTitle from "@/components/PageTitle";

const ease = [0.22, 1, 0.36, 1] as const;

export default function ServiceHero({ page }: { page: ServicePage }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 90, damping: 18 });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), { stiffness: 90, damping: 18 });
  const words = [...page.hero.title.split(" ").map((w) => ({ w, accent: false })), ...page.hero.accent.split(" ").map((w) => ({ w, accent: true }))];

  return (
    <section className="relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-24">
      <div className="bg-grid mask-fade-b absolute inset-0 -z-10" />
      <div className="absolute -top-40 -left-40 -z-10 size-[560px] rounded-full bg-navy/10 blur-[120px]" />
      <div className="absolute top-20 -right-32 -z-10 size-[520px] rounded-full bg-leaf/20 blur-[120px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <motion.nav
            aria-label="Breadcrumb"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="flex flex-wrap items-center gap-2 text-sm font-semibold text-muted"
          >
            <Link href="/" className="transition hover:text-navy">
              Home
            </Link>
            <span className="text-leaf-600">/</span>
            <Link href="/loan-programs" className="transition hover:text-navy">
              Loan Programs
            </Link>
            <span className="text-leaf-600">/</span>
            <span className="text-navy">{page.name}</span>
          </motion.nav>

          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white/80 py-1.5 pr-4 pl-1.5 text-[13px] font-semibold text-navy shadow-sm backdrop-blur"
          >
            <span className="grid size-6 place-items-center rounded-full bg-leaf text-navy">
              <ServiceIcon icon={page.icon} className="size-3.5" />
            </span>
            {page.hero.eyebrow}
          </motion.span>

          <PageTitle className="mt-6 text-[2.4rem] leading-[1.03] font-extrabold tracking-[-0.035em] text-navy sm:text-6xl xl:text-[4.2rem]">
            {words.map(({ w, accent }, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
                <motion.span
                  className={`inline-block ${accent ? "font-serif font-normal italic tracking-normal text-leaf-600" : ""}`}
                  initial={{ y: "110%", rotate: 4 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{ duration: 1, delay: 0.2 + i * 0.06, ease }}
                >
                  {w}
                  {" "}
                </motion.span>
              </span>
            ))}
          </PageTitle>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
          >
            {page.hero.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85, ease }}
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
              href={contact.phoneHref}
              className="inline-flex w-full items-center justify-center rounded-2xl border border-navy/15 bg-white/70 px-7 py-4 font-bold whitespace-nowrap text-navy backdrop-blur transition hover:border-navy/40 sm:w-auto"
            >
              Call {contact.phone}
            </a>
          </motion.div>
        </div>

        {/* 3D photo card with floating program snapshot */}
        <div
          className="relative h-[380px] [perspective:1200px] sm:h-[480px] lg:h-[540px]"
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
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.2, ease }}
            style={{ rotateX, rotateY }}
            className="absolute inset-0 [transform-style:preserve-3d]"
          >
            <div className="absolute inset-y-[4%] right-0 left-[8%] overflow-hidden rounded-[34px] border-[6px] border-white shadow-[0_50px_90px_-40px_rgb(25_40_97/0.7)]">
              <Image src={page.hero.image.src} alt={page.hero.image.alt} fill preload sizes="(min-width: 1024px) 560px, 92vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
            </div>

            {/* Program snapshot card */}
            <motion.div style={{ z: 110 }} className="absolute bottom-[2%] left-0 w-[64%] sm:w-[54%]">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="rounded-3xl border border-white/60 bg-white/90 p-4 shadow-[0_30px_60px_-25px_rgb(25_40_97/0.6)] backdrop-blur-xl sm:p-5"
              >
                <p className="text-[10px] font-extrabold tracking-[0.2em] text-leaf-600 uppercase">Program snapshot</p>
                <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3">
                  {page.stats.map((s) => (
                    <div key={s.label}>
                      <dt className="sr-only">{s.label}</dt>
                      <dd className="text-xl font-extrabold tracking-tight whitespace-nowrap text-navy sm:text-2xl">{s.value}</dd>
                      <dd className="text-[11px] leading-tight font-semibold text-muted">{s.label}</dd>
                    </div>
                  ))}
                </dl>
              </motion.div>
            </motion.div>

            {page.hero.chips.map((chip, i) => (
              <motion.div
                key={chip.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1 + i * 0.15, ease }}
                style={{ z: 150 - i * 30 }}
                className={`absolute ${i === 0 ? "top-[8%] right-[-2%]" : "top-[34%] left-[0%]"} hidden sm:block`}
              >
                <motion.div
                  animate={{ y: [0, -9, 0] }}
                  transition={{ duration: 4.5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 shadow-[0_24px_50px_-18px_rgb(25_40_97/0.8)] ${i === 0 ? "bg-navy text-white" : "bg-leaf text-navy"}`}
                >
                  <ServiceIcon icon={page.icon} className="size-5" />
                  <span>
                    <span className="block text-[13px] font-extrabold">{chip.label}</span>
                    <span className={`block text-[11px] font-medium ${i === 0 ? "text-white/70" : "text-navy/70"}`}>{chip.note}</span>
                  </span>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { contactChannels, contactHero } from "@/lib/contact-content";
import { contact } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

export const channelIcons: Record<string, React.ReactNode> = {
  phone: <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.4 1.8.7 2.7a2 2 0 01-.5 2.1L8 9.8a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.7.7a2 2 0 011.7 2z" />,
  email: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 6l-10 7L2 6" />
    </>
  ),
  office: (
    <>
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
};

/** Business card that tilts with the cursor and flips (hover or tap) to reveal contact details. */
function FlipCard() {
  const [flipped, setFlipped] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tiltY = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 120, damping: 16 });
  const tiltX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 120, damping: 16 });
  const flip = useSpring(0, { stiffness: 90, damping: 16 });

  const setFlip = (v: boolean) => {
    setFlipped(v);
    flip.set(v ? 180 : 0);
  };

  return (
    <div
      className="relative mx-auto aspect-[1.6/1] w-full max-w-[520px] cursor-pointer [perspective:1400px]"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerEnter={(e) => e.pointerType === "mouse" && setFlip(true)}
      onPointerLeave={(e) => {
        mx.set(0);
        my.set(0);
        if (e.pointerType === "mouse") setFlip(false);
      }}
      onPointerUp={(e) => e.pointerType !== "mouse" && setFlip(!flipped)}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label="Flip the card to see Hedge Wealth Capital contact details"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setFlip(!flipped);
        }
      }}
    >
      <motion.div style={{ rotateX: tiltX, rotateY: tiltY }} className="absolute inset-0 [transform-style:preserve-3d]">
        <motion.div style={{ rotateY: flip }} className="absolute inset-0 [transform-style:preserve-3d]">
          {/* Front */}
          <div className="absolute inset-0 overflow-hidden rounded-[28px] bg-gradient-to-br from-navy-700 via-navy to-navy-950 p-6 text-white shadow-[0_50px_90px_-35px_rgb(25_40_97/0.8)] [backface-visibility:hidden] sm:p-8">
            <div className="bg-grid-dark absolute inset-0" />
            <div className="absolute -top-16 -right-16 size-56 rounded-full bg-leaf/25 blur-3xl" />
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-start justify-between">
                <Image src="/images/hwc-logo-header.png" alt="Hedge Wealth Capital" width={1642} height={748} className="h-12 w-auto brightness-0 invert sm:h-14" />
                <span className="h-9 w-12 rounded-lg bg-gradient-to-br from-[#d9f7c4] to-leaf-600 shadow-inner" aria-hidden />
              </div>
              <div>
                <p className="text-xl font-extrabold tracking-tight sm:text-2xl">Private Money Lender</p>
                <p className="mt-1 text-sm text-white/60">Funding investors in all 50 states + DC since 2010</p>
              </div>
              <p className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-leaf uppercase">
                <span className="relative flex size-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-leaf" />
                  <span className="relative size-2 rounded-full bg-leaf" />
                </span>
                Hover or tap to flip
              </p>
            </div>
          </div>

          {/* Back */}
          <div className="absolute inset-0 overflow-hidden rounded-[28px] border border-navy/10 bg-white p-6 text-navy shadow-[0_50px_90px_-35px_rgb(25_40_97/0.6)] [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-8">
            <div className="bg-grid absolute inset-0 opacity-70" />
            <div className="relative flex h-full flex-col justify-center gap-3 sm:gap-4">
              {contactChannels.map((c) => (
                <a
                  key={c.key}
                  href={c.href}
                  target={c.key === "office" ? "_blank" : undefined}
                  rel={c.key === "office" ? "noopener noreferrer" : undefined}
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-3 rounded-2xl p-1.5 transition hover:bg-navy-50"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-navy text-leaf">
                    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      {channelIcons[c.key]}
                    </svg>
                  </span>
                  <span className="min-w-0 text-sm font-extrabold break-words sm:text-base">{c.value}</span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function ContactHero() {
  const words = [...contactHero.title.split(" ").map((w) => ({ w, a: false })), ...contactHero.accent.split(" ").map((w) => ({ w, a: true }))];

  return (
    <section className="relative overflow-hidden pt-32 pb-10 lg:pt-40 lg:pb-16">
      <div className="bg-grid mask-fade-b absolute inset-0 -z-10" />
      <div className="absolute -top-40 -left-40 -z-10 size-[560px] rounded-full bg-navy/10 blur-[120px]" />
      <div className="absolute top-20 -right-32 -z-10 size-[520px] rounded-full bg-leaf/20 blur-[120px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr]">
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
            <span className="text-navy">Contact</span>
          </motion.nav>

          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white/80 py-1.5 pr-4 pl-1.5 text-[13px] font-semibold text-navy shadow-sm backdrop-blur"
          >
            <span className="rounded-full bg-leaf px-2.5 py-0.5 text-[11px] font-extrabold tracking-wide text-navy uppercase">Open</span>
            {contactHero.eyebrow}
          </motion.span>

          <h1 className="mt-6 text-[2.5rem] leading-[1.03] font-extrabold tracking-[-0.035em] text-navy sm:text-6xl xl:text-7xl">
            {words.map(({ w, a }, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
                <motion.span
                  className={`inline-block ${a ? "font-serif font-normal italic tracking-normal text-leaf-600" : ""}`}
                  initial={{ y: "110%", rotate: 4 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{ duration: 1, delay: 0.2 + i * 0.07, ease }}
                >
                  {w}
                  {" "}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
          >
            {contactHero.lead}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85, ease }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href="#deal-inquiry"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-navy px-7 py-4 font-bold text-white shadow-[0_6px_0_0_#0a1233] transition hover:-translate-y-0.5 active:translate-y-1 active:shadow-none sm:w-auto"
            >
              Start Your Deal Inquiry
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href={contact.phoneHref}
              className="inline-flex w-full items-center justify-center rounded-2xl border border-navy/15 bg-white/70 px-7 py-4 font-bold whitespace-nowrap text-navy backdrop-blur transition hover:border-navy/40 sm:w-auto"
            >
              Call {contact.phone}
            </a>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 50, scale: 0.92 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1.1, delay: 0.3, ease }}>
          <FlipCard />
        </motion.div>
      </div>

      {/* Contact channels */}
      <div className="mx-auto mt-16 grid max-w-7xl gap-4 px-5 sm:px-8 md:grid-cols-3">
        {contactChannels.map((c, i) => (
          <motion.a
            key={c.key}
            href={c.href}
            target={c.key === "office" ? "_blank" : undefined}
            rel={c.key === "office" ? "noopener noreferrer" : undefined}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 + i * 0.1, ease }}
            className="group flex items-center gap-4 rounded-3xl border border-navy/10 bg-white p-5 shadow-[0_6px_0_0_#e8ebf5,0_24px_40px_-30px_rgb(25_40_97/0.6)] transition duration-300 hover:-translate-y-1 hover:border-leaf/60"
          >
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-navy-700 to-navy text-leaf shadow-[0_12px_24px_-8px_rgb(25_40_97/0.7),inset_0_-4px_8px_rgb(0_0_0/0.3)] transition-colors duration-300 group-hover:from-leaf group-hover:to-leaf-600 group-hover:text-navy">
              <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                {channelIcons[c.key]}
              </svg>
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-bold tracking-[0.16em] text-leaf-600 uppercase">{c.label}</span>
              <span className="mt-0.5 block font-extrabold break-words text-navy">{c.value}</span>
              <span className="mt-0.5 block text-sm text-muted">{c.note}</span>
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

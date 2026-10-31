"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { brokerHero } from "@/lib/broker-content";
import { contact } from "@/lib/content";
import PageTitle from "@/components/PageTitle";

const ease = [0.22, 1, 0.36, 1] as const;

const layerStyles = [
  "bg-gradient-to-br from-[#93d863] to-leaf-600 text-navy border-white/40",
  "bg-white text-navy border-navy/10",
  "bg-gradient-to-br from-navy-700 to-navy text-white border-white/15",
];

/** Client → brokerage → HWC as an isometric stack that fans open and follows the cursor. */
function DealFlow() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotZ = useSpring(useTransform(mx, [-0.5, 0.5], [-38, -22]), { stiffness: 80, damping: 18 });
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [50, 60]), { stiffness: 80, damping: 18 });

  return (
    <div
      className="relative mx-auto h-[400px] w-full max-w-[520px] [perspective:1400px] sm:h-[480px]"
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
      <div className="absolute inset-[15%] rounded-full bg-gradient-to-br from-navy-100 via-white to-leaf-100 blur-2xl" />
      <motion.div style={{ rotateX: rotX, rotateZ: rotZ }} className="absolute inset-x-[4%] top-[36%] h-36 sm:inset-x-[14%] [transform-style:preserve-3d] sm:h-44">
        {/* Vertical connector with a pulse travelling up the stack */}
        <div className="absolute top-1/2 left-1/2 h-[190px] w-1 origin-top -translate-x-1/2 [transform:rotateX(90deg)]" aria-hidden>
          <div className="absolute inset-0 rounded-full bg-leaf/40" />
          <motion.span
            className="absolute left-1/2 size-3 -translate-x-1/2 rounded-full bg-leaf shadow-[0_0_14px_4px_rgb(122_198_68/0.7)]"
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {brokerHero.flow.map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ z: 0, opacity: 0 }}
            animate={{ z: i * 95, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4 + i * 0.18, ease }}
            className={`absolute inset-0 flex items-center justify-between gap-3 rounded-[26px] border-2 px-5 sm:px-6 shadow-[0_30px_60px_-25px_rgb(25_40_97/0.55)] ${layerStyles[i]}`}
          >
            <div className="min-w-0">
              <p className={`text-[11px] font-extrabold tracking-[0.18em] uppercase ${i === 2 ? "text-leaf" : "text-navy/60"}`}>Step 0{i + 1}</p>
              <p className="mt-1 text-lg leading-tight font-extrabold tracking-tight whitespace-nowrap sm:text-2xl">{f.label}</p>
              <p className={`text-sm ${i === 2 ? "text-white/70" : "text-navy/70"}`}>{f.note}</p>
            </div>
            <span className={`grid size-10 shrink-0 place-items-center rounded-2xl sm:size-12 ${i === 2 ? "bg-leaf text-navy" : "bg-navy text-leaf"}`}>
              <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                {i === 0 && <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />}
                {i === 1 && <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 10h.01M15 10h.01" />}
                {i === 2 && <path d="M3 21h18M5 21V10M9.5 21V10M14.5 21V10M19 21V10M2 10l10-6 10 6z" />}
              </svg>
            </span>
          </motion.div>
        ))}
      </motion.div>

      {[
        { t: "White-label service", c: "left-0 top-[8%]", d: 1.3 },
        { t: "Price-Beat Guarantee", c: "right-0 bottom-[6%]", d: 1.5 },
      ].map((chip) => (
        <motion.div
          key={chip.t}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: chip.d, ease }}
          className={`absolute hidden sm:block ${chip.c}`}
        >
          <motion.span
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/60 bg-white/90 px-4 py-3 text-sm font-extrabold text-navy shadow-[0_20px_40px_-18px_rgb(25_40_97/0.5)] backdrop-blur"
          >
            <span className="grid size-6 place-items-center rounded-full bg-leaf text-navy">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
                <path d="M5 12l5 5L20 7" />
              </svg>
            </span>
            {chip.t}
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
}

export default function BrokerHero() {
  const words = [...brokerHero.title.split(" ").map((w) => ({ w, a: false })), ...brokerHero.accent.split(" ").map((w) => ({ w, a: true }))];

  return (
    <section className="relative overflow-hidden pt-32 pb-12 lg:pt-40 lg:pb-16">
      <div className="bg-grid mask-fade-b absolute inset-0 -z-10" />
      <div className="absolute -top-40 -left-40 -z-10 size-[560px] rounded-full bg-navy/10 blur-[120px]" />
      <div className="absolute top-20 -right-32 -z-10 size-[520px] rounded-full bg-leaf/20 blur-[120px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr]">
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
            <span className="text-navy">Brokers</span>
          </motion.nav>

          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white/80 py-1.5 pr-4 pl-1.5 text-[13px] font-semibold text-navy shadow-sm backdrop-blur"
          >
            <span className="rounded-full bg-leaf px-2.5 py-0.5 text-[11px] font-extrabold tracking-wide text-navy uppercase">Partners</span>
            {brokerHero.eyebrow}
          </motion.span>

          <PageTitle className="mt-6 text-[2.6rem] leading-[1.02] font-extrabold tracking-[-0.035em] text-navy sm:text-6xl xl:text-7xl">
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
          </PageTitle>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.7, ease }} className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {brokerHero.lead}
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.8, ease }} className="mt-3 max-w-xl leading-relaxed text-muted">
            {brokerHero.sub}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.9, ease }} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#broker-apply"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-navy px-7 py-4 font-bold text-white shadow-[0_6px_0_0_#0a1233] transition hover:-translate-y-0.5 active:translate-y-1 active:shadow-none sm:w-auto"
            >
              Become a Broker Partner
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href={contact.phoneHref}
              className="inline-flex w-full items-center justify-center rounded-2xl border border-navy/15 bg-white/70 px-7 py-4 font-bold whitespace-nowrap text-navy backdrop-blur transition hover:border-navy/40 sm:w-auto"
            >
              Price a Deal: {contact.phone}
            </a>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.2, ease }}>
          <DealFlow />
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { contact, nav } from "@/lib/content";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6"
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500 sm:px-5 ${
          scrolled
            ? "border border-navy/10 bg-white/75 shadow-[0_10px_40px_-12px_rgb(25_40_97/0.25)] backdrop-blur-xl"
            : "border border-transparent bg-transparent"
        }`}
      >
        <Link href="/" className="flex items-center gap-2.5" aria-label="Hedge Wealth Capital home">
          <Image src="/images/hwc-logo.png" alt="Hedge Wealth Capital" width={1536} height={760} className="h-14 w-auto sm:h-16" preload />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group relative rounded-lg px-3.5 py-2 text-[14px] font-semibold text-navy/80 transition-colors hover:text-navy"
            >
              {item.label}
              <span className="absolute inset-x-3.5 bottom-1 h-0.5 origin-left scale-x-0 rounded bg-leaf transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href={contact.phoneHref} className="hidden text-[14px] font-bold text-navy xl:block">
            {contact.phone}
          </a>
          <Link
            href="/#prequalify"
            className="hidden rounded-xl bg-navy px-4 py-2.5 text-[14px] font-bold text-white transition hover:bg-navy-700 sm:inline-flex"
          >
            Discuss Your Deal
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-xl border border-navy/15 text-navy lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <div className="relative h-3 w-5">
              <span className={`absolute left-0 h-0.5 w-5 bg-current transition ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-0.5 w-5 bg-current transition ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-auto mt-2 max-w-7xl rounded-2xl border border-navy/10 bg-white/95 p-3 shadow-xl backdrop-blur-xl lg:hidden"
          >
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 font-semibold text-navy hover:bg-navy-50"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#prequalify"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-xl bg-leaf px-3 py-3 text-center font-bold text-navy"
            >
              Discuss Your Deal
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

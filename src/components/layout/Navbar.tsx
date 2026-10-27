"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { contact, nav } from "@/lib/content";
import { services } from "@/lib/services";
import ServiceIcon from "@/components/service/ServiceIcon";

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
          <Image src="/images/hwc-logo-header.png" alt="Hedge Wealth Capital" width={1642} height={748} className="h-14 w-auto sm:h-16" preload />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) =>
            item.label === "Loan Programs" ? (
              // Hover/focus dropdown listing every service page.
              <div key={item.label} className="group/menu relative">
                <Link
                  href={item.href}
                  className="group relative inline-flex items-center gap-1 rounded-lg px-3.5 py-2 text-[14px] font-bold text-navy transition-colors hover:text-navy"
                >
                  {item.label}
                  <svg className="size-3.5 transition-transform duration-300 group-hover/menu:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </Link>
                <div className="invisible absolute top-full -left-4 w-[560px] translate-y-2 pt-3 opacity-0 transition-all duration-300 group-focus-within/menu:visible group-focus-within/menu:translate-y-0 group-focus-within/menu:opacity-100 group-hover/menu:visible group-hover/menu:translate-y-0 group-hover/menu:opacity-100">
                  <div className="grid grid-cols-2 gap-1 rounded-3xl border border-navy/10 bg-white/95 p-3 shadow-[0_30px_60px_-20px_rgb(25_40_97/0.35)] backdrop-blur-xl">
                    {services.map((s) => (
                      <Link key={s.slug} href={s.path} className="group/item flex items-center gap-3 rounded-2xl p-3 transition hover:bg-navy-50">
                        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-navy text-leaf transition-colors group-hover/item:bg-leaf group-hover/item:text-navy">
                          <ServiceIcon icon={s.icon} className="size-5" />
                        </span>
                        <span>
                          <span className="block text-[14px] font-extrabold text-navy">{s.name}</span>
                          <span className="block text-xs font-medium text-muted">{s.tag}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="group relative rounded-lg px-3.5 py-2 text-[14px] font-bold text-navy transition-colors hover:text-navy"
              >
                {item.label}
                <span className="absolute inset-x-3.5 bottom-1 h-0.5 origin-left scale-x-0 rounded bg-leaf transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ),
          )}
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
            data-lenis-prevent
            className="mx-auto mt-2 max-h-[78vh] max-w-7xl overflow-y-auto rounded-2xl border border-navy/10 bg-white/95 p-3 shadow-xl backdrop-blur-xl lg:hidden"
          >
            {nav.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 font-bold text-navy hover:bg-navy-50"
                >
                  {item.label}
                </Link>
                {item.label === "Loan Programs" && (
                  <div className="mb-2 ml-3 grid gap-0.5 border-l-2 border-leaf/40 pl-3">
                    {services.map((s) => (
                      <Link
                        key={s.slug}
                        href={s.path}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2 rounded-lg px-2 py-2 text-[15px] font-bold text-navy/85 hover:bg-navy-50"
                      >
                        <ServiceIcon icon={s.icon} className="size-4 text-leaf-600" />
                        {s.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
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

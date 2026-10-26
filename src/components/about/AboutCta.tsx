import Link from "next/link";
import Reveal, { WordsReveal } from "@/components/Reveal";
import { aboutCta } from "@/lib/about-content";
import { contact } from "@/lib/content";

export default function AboutCta() {
  return (
    <section className="px-4 pb-24 sm:px-6">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[36px] bg-gradient-to-br from-navy via-navy to-navy-950 px-6 py-16 text-white sm:px-12 lg:py-20">
        <div className="bg-grid-dark absolute inset-0" />
        <div className="absolute -right-24 -bottom-24 size-[420px] rounded-full bg-leaf/25 blur-[110px]" />
        <div className="animate-spin-slow absolute top-1/2 -right-40 hidden size-[560px] -translate-y-1/2 rounded-full border border-dashed border-white/15 md:block" />
        <div className="absolute top-1/2 -right-16 hidden size-[320px] -translate-y-1/2 rounded-full border-[18px] border-leaf/20 md:block" />

        <div className="relative max-w-2xl">
          <h2 className="text-[2.05rem] leading-[1.05] font-extrabold tracking-[-0.03em] sm:text-6xl">
            <WordsReveal text="Talk With" />
            <WordsReveal text="HWC" className="font-serif font-normal italic tracking-normal text-leaf" delay={0.1} />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-white/75">{aboutCta.body}</p>
          </Reveal>
          <Reveal delay={0.15} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/#prequalify"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-leaf px-7 py-4 font-extrabold text-navy shadow-[0_6px_0_0_#4d8c22] transition hover:-translate-y-0.5 hover:bg-white active:translate-y-1 active:shadow-none sm:w-auto"
            >
              Find Out If You Prequalify
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
            <a
              href={contact.phoneHref}
              className="inline-flex w-full items-center justify-center rounded-2xl border border-white/25 px-7 py-4 font-bold whitespace-nowrap transition hover:bg-white/10 sm:w-auto"
            >
              Call {contact.phone}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

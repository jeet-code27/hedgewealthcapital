import Link from "next/link";
import Reveal, { WordsReveal } from "@/components/Reveal";
import ServiceIcon from "@/components/service/ServiceIcon";
import { services } from "@/lib/services";

/** Quick links into each program page, for visitors who know what they need. */
export default function ContactPrograms() {
  return (
    <section className="relative overflow-hidden bg-navy py-20 text-white lg:py-24">
      <div className="bg-grid-dark absolute inset-0" />
      <div className="absolute -bottom-40 -left-20 size-[480px] rounded-full bg-leaf/20 blur-[130px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <Reveal>
              <span className="text-sm font-bold tracking-[0.2em] text-leaf uppercase">Know What You Need?</span>
            </Reveal>
            <h2 className="mt-4 text-[2.05rem] leading-[1.05] font-extrabold tracking-[-0.03em] sm:text-5xl">
              <WordsReveal text="Explore a Specific" />
              <WordsReveal text="Loan Program" className="font-serif font-normal italic tracking-normal text-leaf" delay={0.12} />
            </h2>
          </div>
          <Reveal delay={0.1} className="max-w-sm text-white/70">
            Read the details for your strategy, then send us the deal when you are ready.
          </Reveal>
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 4) * 0.06} y={20} className="h-full">
              <Link
                href={s.path}
                className="group flex h-full items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.05] p-5 transition duration-300 hover:-translate-y-1 hover:border-leaf/60 hover:bg-white/[0.09]"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-leaf text-navy shadow-[0_6px_0_0_#4d8c22] transition-transform duration-300 group-hover:-rotate-6">
                  <ServiceIcon icon={s.icon} className="size-6" />
                </span>
                <span className="min-w-0">
                  <span className="block font-extrabold">{s.name}</span>
                  <span className="block text-sm text-white/60">{s.tag}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

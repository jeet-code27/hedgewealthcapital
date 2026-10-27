import Reveal, { WordsReveal } from "@/components/Reveal";
import type { ServicePage } from "@/lib/services";
import RichText from "./RichText";

export default function ServiceCompare({ compare }: { compare: NonNullable<ServicePage["compare"]> }) {
  const [, ours, theirs] = compare.columns;

  return (
    <section id="compare" className="relative scroll-mt-24 pt-16 pb-6 sm:pt-20 sm:pb-10 lg:pt-28 lg:pb-12">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="text-center">
          <Reveal>
            <span className="text-sm font-bold tracking-[0.2em] text-leaf-600 uppercase">Compare</span>
          </Reveal>
          <h2 className="mt-4 text-[2.05rem] leading-[1.05] font-extrabold tracking-[-0.03em] text-navy sm:text-5xl">
            <WordsReveal text={compare.heading} />
          </h2>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted">{compare.intro}</p>
          </Reveal>
        </div>

        {/* Desktop table */}
        <Reveal delay={0.15} className="mt-12 hidden overflow-hidden rounded-[28px] border border-navy/10 bg-white shadow-[0_40px_80px_-50px_rgb(25_40_97/0.6)] md:block">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-navy text-xs tracking-[0.16em] text-white/70 uppercase">
                <th scope="col" className="px-7 py-5 font-bold">
                  <span className="sr-only">Feature</span>
                </th>
                <th scope="col" className="px-7 py-5 font-bold text-leaf">
                  {ours}
                </th>
                <th scope="col" className="px-7 py-5 font-bold">
                  {theirs}
                </th>
              </tr>
            </thead>
            <tbody>
              {compare.rows.map(([label, a, b]) => (
                <tr key={label} className="border-t border-navy/10 transition-colors hover:bg-leaf-100/50">
                  <th scope="row" className="px-7 py-5 font-extrabold text-navy">
                    {label}
                  </th>
                  <td className="px-7 py-5 font-semibold text-ink">
                    <span className="inline-flex items-start gap-2">
                      <span className="mt-1.5 size-2 shrink-0 rounded-full bg-leaf" />
                      <span>
                        <RichText text={a} />
                      </span>
                    </span>
                  </td>
                  <td className="px-7 py-5 text-muted">
                    <RichText text={b} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        {/* Mobile cards */}
        <div className="mt-10 space-y-3 md:hidden">
          {compare.rows.map(([label, a, b]) => (
            <Reveal key={label} y={16}>
              <div className="rounded-3xl border border-navy/10 bg-white p-5 shadow-[0_6px_0_0_#e8ebf5]">
                <p className="text-xs font-bold tracking-[0.16em] text-leaf-600 uppercase">{label}</p>
                <p className="mt-2 font-extrabold text-navy">
                  <span className="mr-1 text-xs font-bold text-muted">{ours}:</span> <RichText text={a} />
                </p>
                <p className="mt-1 text-sm text-muted">
                  <span className="mr-1 text-xs font-bold">{theirs}:</span> <RichText text={b} />
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

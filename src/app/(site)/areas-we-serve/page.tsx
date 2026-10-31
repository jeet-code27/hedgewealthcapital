import type { Metadata } from "next";
import Link from "next/link";
import Reveal, { WordsReveal } from "@/components/Reveal";
import AboutCta from "@/components/about/AboutCta";
import { MapSilhouette } from "@/components/area/AreaMap";
import { areas } from "@/lib/areas";
import PageTitle from "@/components/PageTitle";

export const metadata: Metadata = {
  title: "Areas We Serve | Hard Money & DSCR Lending by Market",
  description:
    "Hedge Wealth Capital lends in all 50 states and D.C. Explore local hard money and DSCR loan pages for New York City, Connecticut, Worcester County, Texas, Florida, Georgia, North Carolina and Colorado.",
  alternates: { canonical: "/areas-we-serve" },
};

/** Hub page linking every local area page, grouped by region. */
export default function AreasPage() {
  const groups = Object.values(
    areas.reduce<Record<string, typeof areas>>((acc, a) => {
      (acc[a.region] ??= []).push(a);
      return acc;
    }, {}),
  );

  return (
    <>
      <section data-dark-hero className="relative overflow-hidden bg-navy pt-36 pb-20 text-white lg:pt-44">
        <div className="bg-grid-dark absolute inset-0" />
        <div className="absolute -top-40 right-0 size-[600px] rounded-full bg-leaf/20 blur-[140px]" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm font-semibold text-white/60">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="text-leaf">/</span>
            <span className="text-white">Areas We Serve</span>
          </nav>
          <PageTitle className="mt-6 max-w-4xl text-[2.5rem] leading-[1.03] font-extrabold tracking-[-0.035em] sm:text-6xl">
            <WordsReveal text="Local Lending," />
            <WordsReveal text="Nationwide Capital" className="font-serif font-normal italic tracking-normal text-leaf" delay={0.15} />
          </PageTitle>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
              We lend in all 50 states and Washington, D.C. These pages go deeper on the markets where our investors are most active.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-8 md:grid-cols-2 lg:grid-cols-4">
          {groups.map((pages, i) => {
            const first = pages[0];
            return (
              <Reveal key={first.region} delay={(i % 4) * 0.06} className="h-full">
                <div className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-navy/10 bg-white shadow-[0_6px_0_0_#e8ebf5,0_30px_50px_-40px_rgb(25_40_97/0.6)] transition duration-300 hover:-translate-y-1.5 hover:border-leaf/60">
                  <div className="relative grid h-44 place-items-center bg-navy p-6 [perspective:600px]">
                    <div className="bg-grid-dark absolute inset-0" />
                    <MapSilhouette map={first.map} className="relative h-full w-auto text-leaf drop-shadow-[0_10px_0_#0a1233] transition-transform duration-700 group-hover:[transform:rotateX(25deg)_rotateZ(-6deg)]" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="text-xl font-extrabold text-navy">{first.region}</h2>
                    <ul className="mt-4 space-y-2">
                      {pages.map((p) => (
                        <li key={p.slug}>
                          <Link href={p.path} className="flex items-center justify-between gap-3 rounded-xl bg-navy-50 px-4 py-3 text-sm font-bold text-navy transition hover:bg-leaf">
                            {p.kind} Loans
                            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                              <path d="M5 12h14M13 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <AboutCta />
    </>
  );
}

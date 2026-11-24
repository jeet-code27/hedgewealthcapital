import type { Metadata } from "next";
import Link from "next/link";
import Reveal, { WordsReveal } from "@/components/Reveal";
import AboutCta from "@/components/about/AboutCta";
import { MapSilhouette } from "@/components/area/AreaMap";
import RichText from "@/components/service/RichText";
import { areas } from "@/lib/areas";
import { areasHubHero, areasHubMeta, hubElsewhere, hubPrograms, hubRegions, hubWho } from "@/lib/areas-hub-content";
import { contact } from "@/lib/content";
import PageTitle from "@/components/PageTitle";

export const metadata: Metadata = {
  title: areasHubMeta.title,
  description: areasHubMeta.description,
  alternates: { canonical: "/areas-we-serve" },
};

const Arrow = () => (
  <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

/** Hub page for every local area page: state-by-state lending notes, then the programs offered everywhere. */
export default function AreasPage() {
  const bySlug = new Map(areas.map((a) => [a.slug, a]));

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
          <PageTitle className="mt-6 max-w-5xl text-[2.4rem] leading-[1.04] font-extrabold tracking-[-0.035em] sm:text-6xl">
            <WordsReveal text={areasHubHero.title} />
            <WordsReveal text={areasHubHero.accent} className="font-serif font-normal italic tracking-normal text-leaf" delay={0.15} />
          </PageTitle>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/75">{areasHubHero.intro}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {hubRegions.map((r) => (
                <a key={r.title} href={`#${r.title.toLowerCase().replace(/[^a-z]+/g, "-")}`} className="rounded-full border border-white/20 px-4 py-2 text-sm font-bold text-white transition hover:border-leaf hover:text-leaf">
                  {r.title}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {hubRegions.map((region, ri) => (
        <section key={region.title} id={region.title.toLowerCase().replace(/[^a-z]+/g, "-")} className={`scroll-mt-24 py-16 lg:py-20 ${ri % 2 ? "bg-navy-50/60" : ""}`}>
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <h2 className="text-[2rem] leading-[1.05] font-extrabold tracking-[-0.03em] text-navy sm:text-4xl">
              <WordsReveal text={region.title} />
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {region.states.map((st, i) => {
                const pages = st.pages.map((s) => bySlug.get(s)!).filter(Boolean);
                return (
                  <Reveal key={st.name} delay={(i % 2) * 0.08} className="h-full">
                    <article className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-navy/10 bg-white shadow-[0_6px_0_0_#e8ebf5,0_30px_50px_-40px_rgb(25_40_97/0.6)] transition duration-300 hover:-translate-y-1 hover:border-leaf/60 sm:flex-row">
                      <div className="relative grid h-40 shrink-0 place-items-center bg-navy p-6 [perspective:600px] sm:h-auto sm:w-44">
                        <div className="bg-grid-dark absolute inset-0" />
                        <MapSilhouette map={pages[0].map} className="relative h-24 w-auto text-leaf drop-shadow-[0_8px_0_#0a1233] transition-transform duration-700 group-hover:[transform:rotateX(25deg)_rotateZ(-6deg)] sm:h-28" />
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <h3 className="text-xl font-extrabold text-navy">{st.name}</h3>
                        <p className="mt-2 flex-1 leading-relaxed text-navy/75">{st.text}</p>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {pages.map((p) => (
                            <Link key={p.slug} href={p.path} className="inline-flex items-center gap-2 rounded-xl bg-navy-50 px-4 py-2.5 text-sm font-bold text-navy transition hover:bg-leaf">
                              {st.name.replace(", MA", "")} {p.kind === "Hard Money & DSCR" ? "hard money & DSCR loans" : p.kind === "DSCR" ? "DSCR loans" : "hard money lenders"}
                              <Arrow />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      <section className="relative overflow-hidden bg-navy py-16 text-white lg:py-24">
        <div className="bg-grid-dark absolute inset-0" />
        <div className="absolute -bottom-40 left-1/3 size-[520px] rounded-full bg-leaf/15 blur-[130px]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <h2 className="text-[2rem] leading-[1.05] font-extrabold tracking-[-0.03em] sm:text-4xl">
              <WordsReveal text="Loan programs available in every state we serve" />
            </h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {hubPrograms.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="group flex h-full gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-4 transition hover:border-leaf/60 hover:bg-white/[0.08]">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-leaf text-navy">
                      <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                    </span>
                    <span className="text-[15px] leading-snug text-white/75">
                      <span className="font-extrabold text-white group-hover:text-leaf">{p.label}</span> {p.note}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.05] p-7">
              <h2 className="text-2xl font-extrabold">Who we lend to</h2>
              <p className="mt-3 leading-relaxed text-white/75">
                <RichText text={hubWho} linkClassName="font-bold text-leaf underline decoration-2 underline-offset-4" />
              </p>
            </div>
            <div className="rounded-[24px] bg-leaf p-7 text-navy">
              <h2 className="text-2xl font-extrabold">Investing in another state?</h2>
              <p className="mt-3 leading-relaxed text-navy/80">{hubElsewhere}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/contact-us" className="inline-flex items-center gap-2 rounded-xl bg-navy px-5 py-3 text-sm font-extrabold text-white shadow-[0_4px_0_0_#0a1233] transition hover:-translate-y-0.5">
                  Send us your deal <Arrow />
                </Link>
                <a href={contact.phoneHref} className="inline-flex items-center rounded-xl border border-navy/20 px-5 py-3 text-sm font-extrabold text-navy">
                  {contact.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="pt-24">
        <AboutCta />
      </div>
    </>
  );
}

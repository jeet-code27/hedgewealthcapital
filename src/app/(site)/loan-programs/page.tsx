import type { Metadata } from "next";
import Link from "next/link";
import AboutCta from "@/components/about/AboutCta";
import Reveal, { WordsReveal } from "@/components/Reveal";
import Faq from "@/components/sections/Faq";
import GoalFinder from "@/components/service/GoalFinder";
import ServiceIcon from "@/components/service/ServiceIcon";
import { compareRows, hubFaqs, hubHero, hubMeta } from "@/lib/loan-programs";
import { getService, services } from "@/lib/services";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: hubMeta.title,
  description: hubMeta.description,
  alternates: { canonical: "/loan-programs" },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: hubMeta.title,
    url: `${site.url}/loan-programs`,
    description: hubMeta.description,
    publisher: { "@id": `${site.url}/#organization` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: compareRows.map((r, i) => {
        const s = getService(r.slug);
        return { "@type": "ListItem", position: i + 1, name: s.name, url: `${site.url}${s.path}` };
      }),
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Loan Programs", item: `${site.url}/loan-programs` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: hubFaqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  },
];

const programs = services.map(({ slug, path, name, tag, icon }) => ({ slug, path, name, tag, icon }));

export default function LoanProgramsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <section className="relative overflow-hidden pt-32 pb-14 lg:pt-40 lg:pb-20">
        <div className="bg-grid mask-fade-b absolute inset-0 -z-10" />
        <div className="absolute -top-40 -left-40 -z-10 size-[560px] rounded-full bg-navy/10 blur-[120px]" />
        <div className="absolute top-20 -right-32 -z-10 size-[520px] rounded-full bg-leaf/20 blur-[120px]" />
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm font-semibold text-muted">
            <Link href="/" className="transition hover:text-navy">
              Home
            </Link>
            <span className="text-leaf-600">/</span>
            <span className="text-navy">Loan Programs</span>
          </nav>
          <Reveal>
            <span className="mt-6 inline-block text-sm font-bold tracking-[0.2em] text-leaf-600 uppercase">{hubHero.eyebrow}</span>
          </Reveal>
          <h1 className="mt-4 max-w-4xl text-[2.6rem] leading-[1.02] font-extrabold tracking-[-0.035em] text-navy sm:text-6xl xl:text-7xl">
            <WordsReveal text={hubHero.title} />
            <WordsReveal text={hubHero.accent} className="font-serif font-normal italic tracking-normal text-leaf-600" delay={0.12} />
          </h1>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{hubHero.intro}</p>
          </Reveal>

          <Reveal delay={0.2} y={36}>
            <div className="mt-12 rounded-[32px] border border-navy/10 bg-white/80 p-6 shadow-[0_40px_80px_-50px_rgb(25_40_97/0.7)] backdrop-blur sm:p-9">
              <h2 className="text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">What do you want to do?</h2>
              <div className="mt-6">
                <GoalFinder programs={programs} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy-50 py-16 lg:py-24">
        <div className="bg-grid absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-3xl">
            <Reveal>
              <span className="text-sm font-bold tracking-[0.2em] text-leaf-600 uppercase">Side by Side</span>
            </Reveal>
            <h2 className="mt-4 text-[2.05rem] leading-[1.05] font-extrabold tracking-[-0.03em] text-navy sm:text-5xl">
              <WordsReveal text="Every Program" />
              <WordsReveal text="at a Glance" className="font-serif font-normal italic tracking-normal" delay={0.12} />
            </h2>
          </div>

          {/* Desktop: table. Mobile: stacked cards, since five columns don't fit a phone. */}
          <Reveal delay={0.1} y={30}>
            <div className="mt-10 hidden overflow-hidden rounded-[28px] border border-navy/10 bg-white shadow-[0_30px_60px_-45px_rgb(25_40_97/0.7)] lg:block">
              <table className="w-full text-left">
                <thead className="bg-navy text-xs font-extrabold tracking-[0.12em] text-white/80 uppercase">
                  <tr>
                    <th scope="col" className="px-6 py-4">Program</th>
                    <th scope="col" className="px-5 py-4">Best for</th>
                    <th scope="col" className="px-5 py-4">Term</th>
                    <th scope="col" className="px-5 py-4">Maximum leverage</th>
                    <th scope="col" className="px-5 py-4">Mainly based on</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy/8 text-[15px]">
                  {compareRows.map((r) => {
                    const s = getService(r.slug);
                    return (
                      <tr key={r.slug} className="transition hover:bg-leaf-100/40">
                        <th scope="row" className="px-6 py-4 text-left font-normal">
                          <Link href={s.path} className="group flex items-center gap-3 font-extrabold text-navy">
                            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-navy text-leaf">
                              <ServiceIcon icon={s.icon} className="size-5" />
                            </span>
                            <span className="group-hover:text-leaf-600">{s.name}</span>
                          </Link>
                        </th>
                        <td className="px-5 py-4 text-navy/80">{r.bestFor}</td>
                        <td className="px-5 py-4 whitespace-nowrap text-navy/80">{r.term}</td>
                        <td className="px-5 py-4 font-semibold text-navy">{r.leverage}</td>
                        <td className="px-5 py-4 text-navy/80">{r.basis}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:hidden">
            {compareRows.map((r) => {
              const s = getService(r.slug);
              return (
                <Link key={r.slug} href={s.path} className="block rounded-[24px] border border-navy/10 bg-white p-5 shadow-[0_20px_40px_-32px_rgb(25_40_97/0.7)]">
                  <span className="flex items-center gap-3">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-navy text-leaf">
                      <ServiceIcon icon={s.icon} className="size-5" />
                    </span>
                    <span className="text-lg leading-snug font-extrabold text-navy">{s.name}</span>
                  </span>
                  <dl className="mt-4 space-y-2 text-sm">
                    {[
                      ["Best for", r.bestFor],
                      ["Term", r.term],
                      ["Maximum leverage", r.leverage],
                      ["Mainly based on", r.basis],
                    ].map(([k, v]) => (
                      <div key={k} className="grid grid-cols-[42%_1fr] gap-2">
                        <dt className="text-muted">{k}</dt>
                        <dd className="font-semibold text-navy">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </Link>
              );
            })}
          </div>

          <p className="mt-6 max-w-4xl text-xs leading-relaxed text-muted">
            Figures are program maximums, not offers. Closing costs, reserves and interest are paid separately where they apply, and all financing is subject to underwriting, property eligibility and final loan terms.
          </p>
        </div>
      </section>

      <Faq items={hubFaqs} />
      <div className="pb-4">
        <AboutCta />
      </div>
    </>
  );
}

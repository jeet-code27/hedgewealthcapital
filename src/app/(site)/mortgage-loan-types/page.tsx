import type { Metadata } from "next";
import Link from "next/link";
import AboutCta from "@/components/about/AboutCta";
import PageTitle from "@/components/PageTitle";
import Reveal, { WordsReveal } from "@/components/Reveal";
import { allLoanTypes, keyTerms, loanGroups, type LoanStatus, type LoanType } from "@/lib/loan-types";
import { schemaPublisher, site } from "@/lib/site";

const PATH = "/mortgage-loan-types";
const TITLE = "31 Mortgage and Loan Types Explained | Hedge Wealth Capital";
const DESCRIPTION =
  "What 31 mortgage and loan types are, what each is used for and who uses it, from fix and flip and DSCR loans to FHA, VA, HELOC and SBA loans.";
const UPDATED = "2026-11-10";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { type: "article", title: TITLE, description: DESCRIPTION, url: PATH, modifiedTime: UPDATED },
};

const url = `${site.url}${PATH}`;
const hwcCount = loanGroups[0].items.length;

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Mortgage and Loan Types Explained",
    description: DESCRIPTION,
    url,
    mainEntityOfPage: url,
    datePublished: UPDATED,
    dateModified: UPDATED,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: schemaPublisher,
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Loan Programs", item: `${site.url}/loan-programs` },
      { "@type": "ListItem", position: 3, name: "Mortgage and Loan Types", item: url },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": `${url}#loan-types`,
    name: "Mortgage and loan types",
    hasDefinedTerm: allLoanTypes.map((l) => ({ "@type": "DefinedTerm", name: l.name, description: l.definition, url: `${url}#${l.slug}`, inDefinedTermSet: `${url}#loan-types` })),
  },
  {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": `${url}#key-terms`,
    name: "Real estate lending terms",
    hasDefinedTerm: keyTerms.map((t) => ({ "@type": "DefinedTerm", name: t.term, description: t.definition, inDefinedTermSet: `${url}#key-terms` })),
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allLoanTypes.map((l) => ({ "@type": "Question", name: l.question, acceptedAnswer: { "@type": "Answer", text: l.definition } })),
  },
];

const badge: Record<LoanStatus, { label: string; cls: string }> = {
  hwc: { label: "HWC program", cls: "bg-leaf text-navy" },
  through: { label: "Available at HWC", cls: "bg-leaf-100 text-leaf-600" },
  related: { label: "Related HWC program", cls: "bg-navy-100 text-navy" },
  ask: { label: "Ask our team", cls: "bg-amber-50 text-amber-700" },
  none: { label: "Not offered by HWC", cls: "bg-navy-50 text-muted" },
};

function Badge({ status }: { status: LoanStatus }) {
  const b = badge[status];
  return <span className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-[11px] font-extrabold whitespace-nowrap ${b.cls}`}>{b.label}</span>;
}

/** Splits off the first sentence so the definition leads in bold, the line AI and voice answers lift. */
function Definition({ text }: { text: string }) {
  const i = text.search(/\.\s/);
  if (i < 0) return <p className="text-[17px] leading-relaxed text-navy">{text}</p>;
  return (
    <p className="text-[17px] leading-relaxed text-navy/80">
      <strong className="font-bold text-navy">{text.slice(0, i + 1)}</strong>
      {text.slice(i + 1)}
    </p>
  );
}

function LoanCard({ loan }: { loan: LoanType }) {
  const ours = loan.status === "hwc";
  return (
    <article
      id={loan.slug}
      className={`group relative scroll-mt-28 overflow-hidden rounded-[28px] border bg-white p-6 shadow-[0_24px_50px_-40px_rgb(25_40_97/0.7)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_34px_60px_-40px_rgb(25_40_97/0.8)] sm:p-8 ${
        ours ? "border-leaf/50" : "border-navy/10"
      }`}
    >
      {ours && <span aria-hidden className="absolute inset-y-0 left-0 w-1.5 bg-leaf" />}
      <div className="flex items-start gap-4 sm:gap-6">
        <span
          aria-hidden
          className={`grid size-14 shrink-0 place-items-center rounded-2xl font-serif text-2xl italic sm:size-16 sm:text-3xl ${
            ours ? "bg-leaf text-navy shadow-[0_6px_0_0_#4d8c22]" : "bg-navy text-leaf shadow-[0_6px_0_0_#0a1233]"
          }`}
        >
          {loan.n}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-extrabold tracking-wide text-leaf-600 uppercase">{loan.name}</span>
            <Badge status={loan.status} />
          </div>
          <h3 className="mt-2 text-xl leading-snug font-extrabold tracking-tight text-navy sm:text-2xl">{loan.question}</h3>
        </div>
      </div>

      <div className="mt-5">
        <Definition text={loan.definition} />
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <div>
          <p className="text-xs font-extrabold tracking-[0.14em] text-muted uppercase">Common uses</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {loan.uses.map((u) => (
              <li key={u} className="rounded-full bg-navy-50 px-3 py-1.5 text-[13px] font-semibold text-navy">
                {u}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-extrabold tracking-[0.14em] text-muted uppercase">Who uses it</p>
          <p className="mt-2 text-[15px] leading-relaxed text-navy/80">{loan.who}</p>
        </div>
        <div>
          <p className="text-xs font-extrabold tracking-[0.14em] text-muted uppercase">Typical structure</p>
          <p className="mt-2 text-[15px] leading-relaxed text-navy/80">{loan.structure}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-navy/8 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted">
          <span className="font-bold text-navy">{loan.category}</span>
          {loan.status === "none" && " · Hedge Wealth Capital does not offer this loan."}
        </p>
        {loan.link && (
          <Link href={loan.link.href} className="group/link inline-flex items-center gap-2 text-sm font-bold text-navy">
            <span className="border-b-2 border-leaf pb-0.5">{loan.link.label}</span>
            <svg className="size-4 shrink-0 transition-transform group-hover/link:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>
    </article>
  );
}

export default function MortgageLoanTypesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <section className="relative overflow-hidden pt-32 pb-14 lg:pt-40 lg:pb-20">
        <div className="bg-grid mask-fade-b absolute inset-0 -z-10" />
        <div className="absolute -top-40 -left-40 -z-10 size-[560px] rounded-full bg-navy/10 blur-[120px]" />
        <div className="absolute top-20 -right-32 -z-10 size-[520px] rounded-full bg-leaf/20 blur-[120px]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm font-semibold text-muted">
              <Link href="/" className="transition hover:text-navy">
                Home
              </Link>
              <span className="text-leaf-600">/</span>
              <Link href="/loan-programs" className="transition hover:text-navy">
                Loan Programs
              </Link>
              <span className="text-leaf-600">/</span>
              <span className="text-navy">Mortgage and Loan Types</span>
            </nav>
            <Reveal>
              <span className="mt-6 inline-block text-sm font-bold tracking-[0.2em] text-leaf-600 uppercase">The Complete Guide</span>
            </Reveal>
            <PageTitle className="mt-4 text-[2.6rem] leading-[1.02] font-extrabold tracking-[-0.035em] text-navy sm:text-6xl">
              <WordsReveal text="Mortgage and Loan" />
              <WordsReveal text="Types Explained" className="font-serif font-normal italic tracking-normal text-leaf-600" delay={0.12} />
            </PageTitle>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
                What each of {allLoanTypes.length} common loan types is, what it&apos;s used for and who uses it, from investor financing like fix and flip and DSCR loans to FHA, VA, home equity and SBA loans. Hedge Wealth Capital is a private lender for real estate investors, based in Canton, MA and lending in all 50 states and D.C.
              </p>
              <p className="mt-4 text-sm font-semibold text-muted">
                Updated November 2026 · Typical structures describe the general market and vary by lender.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2} y={40}>
            <div className="grid grid-cols-2 gap-4 [perspective:1400px]">
              {[
                { v: String(allLoanTypes.length), l: "Loan types explained", dark: true },
                { v: String(hwcCount), l: "Hedge Wealth Capital programs", dark: false },
                { v: String(keyTerms.length), l: "Key lending terms", dark: false },
                { v: "50 + DC", l: "States we lend in", dark: true },
              ].map((s, i) => (
                <div
                  key={s.l}
                  className={`rounded-[26px] p-6 transition duration-500 [transform-style:preserve-3d] hover:[transform:rotateX(6deg)_rotateY(-6deg)_translateZ(10px)] ${
                    s.dark ? "bg-navy text-white shadow-[0_8px_0_0_#0a1233,0_30px_50px_-30px_rgb(25_40_97/0.8)]" : "border border-navy/10 bg-white text-navy shadow-[0_30px_50px_-35px_rgb(25_40_97/0.7)]"
                  } ${i % 2 ? "translate-y-6" : ""}`}
                >
                  <p className={`font-serif text-5xl italic ${s.dark ? "text-leaf" : "text-leaf-600"}`}>{s.v}</p>
                  <p className={`mt-2 text-sm font-bold ${s.dark ? "text-white/80" : "text-navy/80"}`}>{s.l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative bg-navy-50 py-14 lg:py-20">
        <div className="bg-grid absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="text-[2rem] leading-[1.05] font-extrabold tracking-[-0.03em] text-navy sm:text-4xl">
              All {allLoanTypes.length} Loan Types <span className="font-serif font-normal tracking-normal italic">at a Glance</span>
            </h2>
            <nav aria-label="Jump to section" className="flex flex-wrap gap-2">
              {[...loanGroups.map((g) => ({ href: `#${g.id}`, label: g.title.replace("Hedge Wealth Capital ", "HWC ") })), { href: "#key-terms", label: "Key terms" }].map((j) => (
                <a key={j.href} href={j.href} className="rounded-full border border-navy/12 bg-white px-4 py-2 text-sm font-bold text-navy transition hover:border-navy/40">
                  {j.label}
                </a>
              ))}
            </nav>
          </div>

          <Reveal delay={0.05} y={24}>
            <div className="mt-8 overflow-hidden rounded-[24px] border border-navy/10 bg-white shadow-[0_30px_60px_-45px_rgb(25_40_97/0.7)]">
              <table className="w-full text-left text-[15px]">
                <thead className="bg-navy text-xs font-extrabold tracking-[0.12em] text-white/80 uppercase">
                  <tr>
                    <th scope="col" className="w-12 px-4 py-3.5 sm:px-5">#</th>
                    <th scope="col" className="px-3 py-3.5">Loan type</th>
                    <th scope="col" className="hidden px-3 py-3.5 md:table-cell">Category</th>
                    <th scope="col" className="px-4 py-3.5 text-right sm:px-5">At HWC</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy/6">
                  {allLoanTypes.map((l) => (
                    <tr key={l.slug} className="transition hover:bg-leaf-100/40">
                      <td className="px-4 py-3 font-serif text-lg text-leaf-600 italic sm:px-5">{l.n}</td>
                      <td className="px-3 py-3">
                        <a href={`#${l.slug}`} className="font-bold text-navy hover:text-leaf-600">
                          {l.name}
                        </a>
                      </td>
                      <td className="hidden px-3 py-3 text-navy/70 md:table-cell">{l.category}</td>
                      <td className="px-4 py-3 text-right sm:px-5">
                        <Badge status={l.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {loanGroups.map((g, gi) => (
        <section key={g.id} id={g.id} className={`relative scroll-mt-24 py-16 lg:py-24 ${gi === 1 ? "bg-navy-50/50" : ""}`}>
          <div className="mx-auto max-w-5xl px-5 sm:px-8">
            <Reveal>
              <span className="text-sm font-bold tracking-[0.2em] text-leaf-600 uppercase">
                Part {gi + 1} · {g.items.length} types
              </span>
            </Reveal>
            <h2 className="mt-3 text-[2rem] leading-[1.05] font-extrabold tracking-[-0.03em] text-navy sm:text-5xl">
              <WordsReveal text={g.title} />
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{g.intro}</p>
            </Reveal>
            <div className="mt-10 space-y-6">
              {g.items.map((l) => (
                <LoanCard key={l.slug} loan={l} />
              ))}
            </div>
            {gi === 0 && (
              <div className="mt-8 flex flex-col gap-4 rounded-[24px] bg-navy p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
                <p className="text-lg font-extrabold">Not sure which program fits your deal?</p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/loan-programs" className="rounded-xl border border-white/20 px-5 py-3 text-sm font-bold transition hover:bg-white/10">
                    Compare our programs
                  </Link>
                  <Link href="/#prequalify" className="rounded-xl bg-leaf px-5 py-3 text-sm font-extrabold text-navy shadow-[0_4px_0_0_#4d8c22] transition hover:-translate-y-0.5">
                    See if you prequalify
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>
      ))}

      <section id="key-terms" className="relative scroll-mt-24 overflow-hidden bg-navy py-16 text-white lg:py-24">
        <div className="bg-grid-dark absolute inset-0" />
        <div className="absolute -top-40 left-1/3 size-[520px] rounded-full bg-leaf/15 blur-[130px]" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <span className="text-sm font-bold tracking-[0.2em] text-leaf uppercase">Glossary</span>
          </Reveal>
          <h2 className="mt-3 text-[2rem] leading-[1.05] font-extrabold tracking-[-0.03em] sm:text-5xl">
            <WordsReveal text="Key Lending Terms" />
          </h2>
          <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {keyTerms.map((t, i) => (
              <Reveal key={t.term} delay={(i % 3) * 0.06} y={16} className="h-full">
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                  <dt className="font-extrabold text-leaf">{t.term}</dt>
                  <dd className="mt-2 text-[15px] leading-relaxed text-white/75">{t.definition}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-5 pt-10 sm:px-8">
        <p className="text-xs leading-relaxed text-muted">
          This guide is general information, not a commitment to lend. Typical structures describe the broader market and vary by lender; government program rules and loan limits change, so confirm current terms with the lender. Hedge Wealth Capital makes business-purpose loans on non-owner-occupied investment property only.
        </p>
      </div>
      <div className="pt-16">
        <AboutCta />
      </div>
    </>
  );
}

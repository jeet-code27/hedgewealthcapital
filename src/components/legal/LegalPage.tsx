import type { Metadata } from "next";
import Link from "next/link";
import PageTitle from "@/components/PageTitle";
import RichText from "@/components/service/RichText";
import { legalDocs, type LegalDoc } from "@/lib/legal-content";
import { schemaPublisher, site } from "@/lib/site";

export function legalMetadata(doc: LegalDoc): Metadata {
  return { title: doc.metaTitle, description: doc.description, alternates: { canonical: `/${doc.slug}` } };
}

/** Shared layout for the Privacy Policy, Terms of Use and Licensing Disclosures pages. */
export default function LegalPage({ doc }: { doc: LegalDoc }) {
  const url = `${site.url}/${doc.slug}`;
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "WebPage", name: doc.metaTitle, url, description: doc.description, publisher: schemaPublisher },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: doc.title, item: url },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <section className="relative overflow-hidden pt-32 pb-10 lg:pt-40">
        <div className="bg-grid mask-fade-b absolute inset-0 -z-10" />
        <div className="absolute top-10 -right-32 -z-10 size-[520px] rounded-full bg-leaf/15 blur-[120px]" />
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm font-semibold text-muted">
            <Link href="/" className="transition hover:text-navy">
              Home
            </Link>
            <span className="text-leaf-600">/</span>
            <span className="text-navy">{doc.title}</span>
          </nav>
          <PageTitle className="mt-6 text-[2.4rem] leading-[1.05] font-extrabold tracking-[-0.035em] text-navy sm:text-6xl">{doc.title}</PageTitle>
          <p className="mt-4 text-sm font-semibold text-muted">Last updated {doc.updated}</p>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted">{doc.intro}</p>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-20 sm:px-8 lg:grid-cols-[1fr_250px] lg:gap-14">
        <div className="min-w-0 space-y-10">
          {doc.sections.map((s, i) => (
            <section key={s.id} id={s.id} className="scroll-mt-28">
              <h2 className="flex items-baseline gap-3 text-2xl font-extrabold tracking-tight text-navy">
                <span className="font-serif text-xl font-normal text-leaf-600 italic">{String(i + 1).padStart(2, "0")}</span>
                {s.heading}
              </h2>
              {s.paragraphs.map((p) => (
                <p key={p} className="mt-4 text-[17px] leading-relaxed text-navy/80">
                  <RichText text={p} />
                </p>
              ))}
              {s.list && (
                <ul className="mt-4 space-y-2.5">
                  {s.list.map((li) => (
                    <li key={li} className="flex gap-3 text-[17px] leading-relaxed text-navy/80">
                      <span aria-hidden className="mt-2.5 size-2 shrink-0 rounded-full bg-leaf" />
                      <span>
                        <RichText text={li} />
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-5">
            <nav aria-label="On this page" className="rounded-[24px] border border-navy/10 bg-white p-5 shadow-[0_20px_40px_-35px_rgb(25_40_97/0.6)]">
              <p className="text-xs font-extrabold tracking-[0.18em] text-leaf-600 uppercase">On this page</p>
              <ol className="mt-3 space-y-1.5">
                {doc.sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="block text-sm font-medium text-muted transition hover:text-navy">
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            <nav aria-label="Legal pages" className="rounded-[24px] bg-navy-50 p-5">
              <p className="text-xs font-extrabold tracking-[0.18em] text-muted uppercase">Legal</p>
              <ul className="mt-3 space-y-1.5">
                {legalDocs.map((d) => (
                  <li key={d.slug}>
                    <Link href={`/${d.slug}`} className={`text-sm font-bold ${d.slug === doc.slug ? "text-leaf-600" : "text-navy hover:text-leaf-600"}`}>
                      {d.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>
      </div>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Reveal, { WordsReveal } from "@/components/Reveal";
import BlogGrid from "@/components/blog/BlogGrid";
import { blogMeta } from "@/lib/blog";
import { getPublishedPosts } from "@/lib/posts";
import { schemaPublisher, site } from "@/lib/site";
import PageTitle from "@/components/PageTitle";
import RichText from "@/components/service/RichText";

export const metadata: Metadata = {
  title: blogMeta.title,
  description: blogMeta.description,
  alternates: { canonical: "/blog" },
};

const buildJsonLd = (sorted: Awaited<ReturnType<typeof getPublishedPosts>>) => [
  {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: blogMeta.title,
    url: `${site.url}/blog`,
    description: blogMeta.description,
    publisher: schemaPublisher,
    blogPost: sorted.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: `${site.url}/blog/${p.slug}`, datePublished: p.date })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
    ],
  },
];

export default async function BlogPage() {
  const posts = await getPublishedPosts();
  const jsonLd = buildJsonLd(posts);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <section className="relative overflow-hidden pt-32 pb-10 lg:pt-40">
        <div className="bg-grid mask-fade-b absolute inset-0 -z-10" />
        <div className="absolute -top-40 -left-40 -z-10 size-[560px] rounded-full bg-navy/10 blur-[120px]" />
        <div className="absolute top-20 -right-32 -z-10 size-[520px] rounded-full bg-leaf/20 blur-[120px]" />
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm font-semibold text-muted">
            <Link href="/" className="transition hover:text-navy">
              Home
            </Link>
            <span className="text-leaf-600">/</span>
            <span className="text-navy">Blog</span>
          </nav>
          <PageTitle className="mt-6 max-w-4xl text-[2.6rem] leading-[1.02] font-extrabold tracking-[-0.035em] text-navy sm:text-6xl xl:text-7xl">
            <WordsReveal text="Real Estate Investor" />
            <WordsReveal text="Loan Blog" className="font-serif font-normal italic tracking-normal text-leaf-600" delay={0.12} />
          </PageTitle>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted">{blogMeta.intro}</p>
            <p className="mt-4 max-w-3xl rounded-2xl border border-leaf/30 bg-leaf-100/50 px-5 py-4 leading-relaxed text-navy">
              <RichText text={blogMeta.newHere} />
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative pt-6 pb-20 lg:pb-28">
        <BlogGrid posts={posts} />
      </section>

      <section className="relative overflow-hidden bg-navy-50 py-16 lg:py-24">
        <div className="bg-grid absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="text-[2rem] leading-[1.05] font-extrabold tracking-[-0.03em] text-navy sm:text-4xl">
            <WordsReveal text="Browse by topic" />
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {blogMeta.topics.map((t, i) => (
              <Reveal key={t.title} delay={(i % 2) * 0.08} className="h-full">
                <div className="h-full rounded-[24px] border border-navy/10 bg-white p-6 shadow-[0_24px_50px_-40px_rgb(25_40_97/0.7)] sm:p-7">
                  <h3 className="text-xl font-extrabold text-navy">{t.title}</h3>
                  <p className="mt-2 leading-relaxed text-navy/75">{t.text}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="self-center text-xs font-extrabold tracking-[0.14em] text-muted uppercase">Related:</span>
                    {t.links.map((l) => (
                      <Link key={l.href} href={l.href} className="rounded-full bg-navy-50 px-3.5 py-1.5 text-sm font-bold text-navy transition hover:bg-leaf">
                        {l.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-5 rounded-[28px] bg-navy p-7 text-white sm:flex-row sm:items-center sm:justify-between sm:p-9">
            <div>
              <h2 className="text-2xl font-extrabold">Have a deal to run by us?</h2>
              <p className="mt-2 max-w-xl text-white/75">{blogMeta.dealCta}</p>
            </div>
            <Link href="/contact-us" className="inline-flex shrink-0 items-center justify-center rounded-xl bg-leaf px-6 py-3.5 font-extrabold text-navy shadow-[0_4px_0_0_#4d8c22] transition hover:-translate-y-0.5">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

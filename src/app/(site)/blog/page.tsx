import type { Metadata } from "next";
import Link from "next/link";
import Reveal, { WordsReveal } from "@/components/Reveal";
import BlogGrid from "@/components/blog/BlogGrid";
import { blogMeta } from "@/lib/blog";
import { getPublishedPosts } from "@/lib/posts";
import { schemaPublisher, site } from "@/lib/site";
import PageTitle from "@/components/PageTitle";

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
            <WordsReveal text="News & Insights" />
            <WordsReveal text="for Real Estate Investors" className="font-serif font-normal italic tracking-normal text-leaf-600" delay={0.12} />
          </PageTitle>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{blogMeta.intro}</p>
          </Reveal>
        </div>
      </section>

      <section className="relative pt-6 pb-20 lg:pb-28">
        <BlogGrid posts={posts} />
      </section>
    </>
  );
}

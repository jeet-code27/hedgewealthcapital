import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PostCard from "@/components/blog/PostCard";
import PostToc from "@/components/blog/PostToc";
import ShareButtons from "@/components/blog/ShareButtons";
import Reveal from "@/components/Reveal";
import Faq from "@/components/sections/Faq";
import { contact } from "@/lib/content";
import { formatDate, getPostBySlug, getPublishedPosts } from "@/lib/posts";
import { posts as legacyPosts } from "@/lib/blog";
import { schemaPublisher, site } from "@/lib/site";
import PageTitle from "@/components/PageTitle";

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  // Cache Components needs at least one param; fall back to the migrated posts.
  return (posts.length ? posts : legacyPosts).map((p) => ({ slug: p.slug }));
}

const abs = (src: string) => (src.startsWith("http") ? src : `${site.url}${src}`);

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = await getPostBySlug((await params).slug);
  if (!post) return {};
  const { seo } = post;
  const description = seo.metaDescription || post.excerpt;
  const ogImage = seo.ogImage || post.image.src;
  return {
    title: seo.metaTitle || `${post.title} | Hedge Wealth Capital`,
    description,
    keywords: seo.focusKeyword ? [seo.focusKeyword, ...post.tags.map((t) => t.name)] : post.tags.map((t) => t.name),
    alternates: { canonical: seo.canonicalUrl || `/blog/${post.slug}` },
    ...(seo.noIndex ? { robots: { index: false, follow: true } } : {}),
    authors: post.author ? [{ name: post.author.name }] : [{ name: site.name }],
    openGraph: {
      type: "article",
      title: seo.ogTitle || post.title,
      description: seo.ogDescription || description,
      publishedTime: post.date,
      modifiedTime: post.updated,
      section: post.category,
      tags: post.tags.map((t) => t.name),
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title: seo.ogTitle || post.title, description: seo.ogDescription || description, images: [ogImage] },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const post = await getPostBySlug((await params).slug);
  if (!post) notFound();
  const url = `${site.url}/blog/${post.slug}`;

  const jsonLd: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.seo.metaDescription || post.excerpt,
      image: abs(post.image.src),
      datePublished: post.date,
      dateModified: post.updated,
      url,
      mainEntityOfPage: url,
      articleSection: post.category,
      keywords: [post.seo.focusKeyword, ...post.tags.map((t) => t.name)].filter(Boolean).join(", ") || undefined,
      timeRequired: `PT${post.readingMinutes}M`,
      author: post.author ? { "@type": "Person", name: post.author.name, jobTitle: post.author.role || undefined } : { "@type": "Organization", name: site.name, url: site.url },
      publisher: schemaPublisher,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];
  if (post.faqs.length) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
    });
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <article>
        <header className="relative overflow-hidden pt-32 pb-12 lg:pt-40">
          <div className="bg-grid mask-fade-b absolute inset-0 -z-10" />
          <div className="absolute top-10 -right-32 -z-10 size-[520px] rounded-full bg-leaf/20 blur-[120px]" />
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm font-semibold text-muted">
              <Link href="/" className="transition hover:text-navy">
                Home
              </Link>
              <span className="text-leaf-600">/</span>
              <Link href="/blog" className="transition hover:text-navy">
                Blog
              </Link>
              <span className="text-leaf-600">/</span>
              <span className="text-navy">{post.category}</span>
            </nav>
            <Reveal>
              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm font-semibold">
                <span className="rounded-full bg-leaf px-3 py-1 text-[11px] font-extrabold tracking-wide text-navy uppercase">{post.category}</span>
                <time dateTime={post.date} className="text-muted">
                  {formatDate(post.date)}
                </time>
                <span className="text-navy/25">•</span>
                <span className="text-muted">{post.readingMinutes} min read</span>
              </div>
              <PageTitle className="mt-5 text-[2rem] leading-[1.08] font-extrabold tracking-[-0.03em] text-navy sm:text-5xl">{post.title}</PageTitle>
              {post.excerpt && <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">{post.excerpt}</p>}
            </Reveal>
          </div>
        </header>

        <div className="mx-auto max-w-5xl px-5 sm:px-8 [perspective:1600px]">
          <Reveal y={40}>
            <div className="relative aspect-[16/9] overflow-hidden rounded-[32px] shadow-[0_50px_90px_-50px_rgb(25_40_97/0.9)] [transform:rotateX(4deg)] transition duration-700 hover:[transform:rotateX(0deg)]">
              <Image src={post.image.src} alt={post.image.alt} fill preload sizes="(min-width: 1024px) 960px, 100vw" className="object-cover" />
            </div>
          </Reveal>
        </div>

        <div className="mx-auto grid max-w-6xl gap-10 px-5 pt-12 pb-16 sm:px-8 lg:grid-cols-[1fr_260px] lg:gap-14">
          <div className="min-w-0">
            {post.toc.length > 1 && (
              <details className="mb-8 rounded-[20px] border border-navy/10 bg-white p-5 lg:hidden">
                <summary className="cursor-pointer text-sm font-extrabold text-navy">On this page</summary>
                <ol className="mt-3 space-y-2">
                  {post.toc.map((t) => (
                    <li key={t.id} className={t.level === 3 ? "pl-4" : ""}>
                      <a href={`#${t.id}`} className="text-sm font-semibold text-muted hover:text-navy">
                        {t.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </details>
            )}

            <div className="post-body" dangerouslySetInnerHTML={{ __html: post.html }} />

            {post.tags.length > 0 && (
              <div className="mt-12 flex flex-wrap items-center gap-2">
                <span className="mr-1 text-sm font-bold text-navy">Tags</span>
                {post.tags.map((t) => (
                  <span key={t.slug} className="rounded-full bg-navy-50 px-3 py-1.5 text-xs font-bold text-navy">
                    #{t.name}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-8 border-t border-navy/10 pt-8">
              <ShareButtons url={url} title={post.title} />
            </div>

            {post.author && (
              <div className="mt-10 flex gap-5 rounded-[28px] border border-navy/10 bg-white p-6 shadow-[0_20px_50px_-40px_rgb(25_40_97/0.7)]">
                {post.author.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={post.author.avatar} alt={post.author.name} className="size-16 shrink-0 rounded-2xl object-cover" />
                ) : (
                  <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-navy text-xl font-extrabold text-leaf">{post.author.name.slice(0, 1)}</span>
                )}
                <div>
                  <p className="text-xs font-extrabold tracking-[0.16em] text-leaf-600 uppercase">Written by</p>
                  <p className="mt-1 text-lg font-extrabold text-navy">{post.author.name}</p>
                  {post.author.role && <p className="text-sm font-semibold text-muted">{post.author.role}</p>}
                  {post.author.bio && <p className="mt-2 text-sm leading-relaxed text-muted">{post.author.bio}</p>}
                </div>
              </div>
            )}

            <div className="mt-10 flex flex-col gap-5 rounded-[28px] border border-navy/10 bg-navy-50 p-7 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-lg font-extrabold text-navy">Have a deal to finance?</p>
                <p className="mt-1 text-muted">
                  Explore our{" "}
                  <Link href="/dscr-loans" className="font-semibold text-navy underline decoration-leaf decoration-2 underline-offset-4">
                    DSCR loans
                  </Link>{" "}
                  and{" "}
                  <Link href="/hard-money-loans" className="font-semibold text-navy underline decoration-leaf decoration-2 underline-offset-4">
                    fix and flip loans
                  </Link>
                  , or call us.
                </p>
              </div>
              <a
                href={contact.phoneHref}
                className="inline-flex shrink-0 items-center justify-center rounded-2xl bg-navy px-6 py-4 font-bold whitespace-nowrap text-white shadow-[0_6px_0_0_#0a1233] transition hover:-translate-y-0.5 active:translate-y-1 active:shadow-none"
              >
                {contact.phone}
              </a>
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-5">
              <PostToc items={post.toc} />
              <Link href="/contact-us" className="group block overflow-hidden rounded-[24px] bg-navy p-6 text-white shadow-[0_8px_0_0_#0a1233]">
                <p className="text-xs font-extrabold tracking-[0.18em] text-leaf uppercase">Get funded</p>
                <p className="mt-2 text-lg leading-snug font-extrabold">Same-day approvals. Close in 5–10 days.</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-leaf">
                  Start a deal inquiry
                  <svg className="size-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </div>
          </aside>
        </div>
      </article>

      {post.faqs.length > 0 && <Faq items={post.faqs.map((f) => ({ q: f.question, a: f.answer }))} />}

      {post.related.length > 0 && (
        <section className="border-t border-navy/10 bg-navy-50/50 py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-navy">Related articles</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {post.related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PostCard from "@/components/blog/PostCard";
import Reveal from "@/components/Reveal";
import { contact } from "@/lib/content";
import { formatDate, getPost, posts, type BlogBlock } from "@/lib/blog";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: `${post.title} | Hedge Wealth Capital`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.excerpt, publishedTime: post.date, images: [post.image.src] },
  };
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "h2":
      return <h2 className="mt-12 text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">{block.text}</h2>;
    case "list":
      return (
        <ul className="mt-6 space-y-3">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-lg leading-relaxed text-navy/80">
              <span className="mt-1.5 grid size-5 shrink-0 place-items-center rounded-full bg-leaf text-navy">
                <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" aria-hidden>
                  <path d="M5 12l5 5L20 7" />
                </svg>
              </span>
              {item}
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <figure className="relative my-10 overflow-hidden rounded-[28px] bg-navy p-7 text-white shadow-[0_8px_0_0_#0a1233,0_30px_50px_-30px_rgb(25_40_97/0.8)] sm:p-9">
          <div className="bg-grid-dark absolute inset-0" />
          <span className="absolute -top-6 right-6 font-serif text-[9rem] leading-none text-leaf/30" aria-hidden>
            &ldquo;
          </span>
          <blockquote className="relative font-serif text-2xl leading-snug italic sm:text-[1.7rem]">{block.text}</blockquote>
          <figcaption className="relative mt-5 text-sm font-bold tracking-wide text-leaf">— {block.by}</figcaption>
        </figure>
      );
    default:
      return <p className="mt-6 text-lg leading-relaxed text-navy/80">{block.text}</p>;
  }
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const more = posts.filter((p) => p.slug !== post.slug);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      image: `${site.url}${post.image.src}`,
      datePublished: post.date,
      url: `${site.url}/blog/${post.slug}`,
      mainEntityOfPage: `${site.url}/blog/${post.slug}`,
      author: { "@type": "Organization", name: site.name, url: site.url },
      publisher: { "@id": `${site.url}/#organization` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: `${site.url}/blog/${post.slug}` },
      ],
    },
  ];

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
              </div>
              <h1 className="mt-5 text-[2rem] leading-[1.08] font-extrabold tracking-[-0.03em] text-navy sm:text-5xl">{post.title}</h1>
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

        <div className="mx-auto max-w-3xl px-5 pt-6 pb-16 sm:px-8">
          {post.body.map((b, i) => (
            <Block key={i} block={b} />
          ))}

          <div className="mt-14 flex flex-col gap-5 rounded-[28px] border border-navy/10 bg-navy-50 p-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-lg font-extrabold text-navy">Have a deal to finance?</p>
              <p className="mt-1 text-muted">
                Explore our <Link href="/dscr-loans" className="font-semibold text-navy underline decoration-leaf decoration-2 underline-offset-4">DSCR loans</Link> and{" "}
                <Link href="/hard-money-loans" className="font-semibold text-navy underline decoration-leaf decoration-2 underline-offset-4">fix and flip loans</Link>, or call us.
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
      </article>

      {more.length > 0 && (
        <section className="border-t border-navy/10 bg-navy-50/50 py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-navy">More from the blog</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {more.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

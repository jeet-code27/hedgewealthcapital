import Image from "next/image";
import Link from "next/link";
import { formatDate, type ListPost } from "@/lib/post-types";

/** Post tile with a tilting 3D image card. `featured` spans wide with a side-by-side layout. */
export default function PostCard({ post, featured = false, preload = false }: { post: ListPost; featured?: boolean; preload?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block h-full [perspective:1400px]"
      aria-label={post.title}
    >
      <article
        className={`relative h-full overflow-hidden rounded-[30px] border border-navy/10 bg-white shadow-[0_30px_60px_-40px_rgb(25_40_97/0.7)] transition duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateX(4deg)_rotateY(-4deg)_translateZ(8px)] group-hover:shadow-[0_40px_80px_-40px_rgb(25_40_97/0.8)] ${
          featured ? "grid lg:grid-cols-[1.15fr_1fr]" : "flex flex-col"
        }`}
      >
        <div className={`relative overflow-hidden ${featured ? "aspect-[16/10] lg:aspect-auto lg:min-h-[380px]" : "aspect-[16/10]"}`}>
          <Image
            src={post.image.src}
            alt={post.image.alt}
            fill
            preload={preload}
            sizes={featured ? "(min-width: 1024px) 640px, 100vw" : "(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"}
            className="object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />
          <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-extrabold tracking-wide text-navy uppercase backdrop-blur">
            {post.category}
          </span>
        </div>
        <div className={`flex flex-1 flex-col ${featured ? "justify-center p-7 sm:p-10" : "p-6 sm:p-7"}`}>
          <p className="flex items-center gap-2 text-sm font-semibold text-leaf-600">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="text-navy/25">•</span>
            <span className="text-muted">{post.readingMinutes} min read</span>
          </p>
          <h3 className={`mt-3 font-extrabold tracking-tight text-navy ${featured ? "text-2xl leading-tight sm:text-3xl" : "text-lg leading-snug"}`}>{post.title}</h3>
          <p className="mt-3 leading-relaxed text-muted">{post.excerpt}</p>
          <span className="mt-auto inline-flex items-center gap-2 pt-6 font-bold text-navy">
            <span className="border-b-2 border-leaf pb-0.5">Read article</span>
            <svg className="size-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </article>
    </Link>
  );
}

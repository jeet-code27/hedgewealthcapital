import Image from "next/image";
import Link from "next/link";
import Reveal, { WordsReveal } from "@/components/Reveal";
import { getService, type ServicePage } from "@/lib/services";
import ServiceIcon from "./ServiceIcon";

export default function RelatedServices({ page }: { page: ServicePage }) {
  const related = page.related.map(getService);

  return (
    <section className="relative bg-navy-50 py-24 lg:py-28">
      <div className="bg-grid absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <span className="text-sm font-bold tracking-[0.2em] text-leaf-600 uppercase">Related Programs</span>
        </Reveal>
        <h2 className="mt-4 text-[2.05rem] leading-[1.05] font-extrabold tracking-[-0.03em] text-navy sm:text-5xl">
          <WordsReveal text="Keep Exploring" />
          <WordsReveal text="Financing Options" className="font-serif font-normal italic tracking-normal" delay={0.12} />
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {related.map((r, i) => (
            <Reveal key={r.slug} delay={i * 0.08} className="h-full">
              <Link
                href={r.path}
                className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-navy/10 bg-white shadow-[0_30px_60px_-40px_rgb(25_40_97/0.5)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_40px_80px_-35px_rgb(25_40_97/0.55)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={r.hero.image.src} alt={r.hero.image.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-navy backdrop-blur">
                    <ServiceIcon icon={r.icon} className="size-3.5" />
                    {r.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-extrabold text-navy">{r.name}</h3>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">{r.meta.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-navy">
                    Explore {r.name}
                    <span className="grid size-7 place-items-center rounded-full bg-navy-50 transition-colors group-hover:bg-leaf">
                      <svg className="size-3.5 -rotate-45 transition-transform duration-300 group-hover:rotate-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

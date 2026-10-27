import Image from "next/image";
import Reveal from "@/components/Reveal";
import type { ServicePage } from "@/lib/services";
import RichText from "./RichText";
import ServiceWidget from "./ServiceWidget";

/** Long-form SEO content with a sticky "on this page" index on desktop. */
export default function ServiceSections({ page }: { page: ServicePage }) {
  const toc = [
    ...page.sections.map((s) => ({ id: s.id, label: s.heading })),
    { id: "process", label: page.steps.heading },
    ...(page.compare ? [{ id: "compare", label: page.compare.heading }] : []),
    { id: "faq", label: "Frequently Asked Questions" },
  ];

  return (
    <section className="relative py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[260px_1fr] lg:gap-16">
        <aside className="hidden lg:block">
          <nav aria-label="On this page" className="sticky top-32 rounded-3xl border border-navy/10 bg-navy-50/70 p-6">
            <p className="text-xs font-bold tracking-[0.2em] text-leaf-600 uppercase">On this page</p>
            <ol className="mt-4 space-y-1">
              {toc.map((t, i) => (
                <li key={t.id}>
                  <a href={`#${t.id}`} className="group flex gap-3 rounded-xl px-2 py-2 text-sm font-semibold text-muted transition hover:bg-white hover:text-navy">
                    <span className="text-xs text-leaf-600">{String(i + 1).padStart(2, "0")}</span>
                    {t.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <div className="min-w-0 space-y-20 lg:space-y-24">
          {page.sections.map((s, i) => (
            <article key={s.id} id={s.id} className="scroll-mt-28">
              <div className={`grid items-center gap-10 ${s.image ? "xl:grid-cols-[1.1fr_0.9fr]" : ""}`}>
                <div className={s.image && i % 2 === 1 ? "xl:order-2" : ""}>
                  <Reveal>
                    <h2 className="text-[1.9rem] leading-[1.1] font-extrabold tracking-[-0.025em] text-navy sm:text-4xl">{s.heading}</h2>
                  </Reveal>
                  <Reveal delay={0.05} className="mt-5 space-y-4 text-[17px] leading-relaxed text-muted">
                    {s.paragraphs.map((p) => (
                      <p key={p}>
                        <RichText text={p} />
                      </p>
                    ))}
                  </Reveal>
                </div>
                {s.image && (
                  <Reveal delay={0.1} y={40} className={i % 2 === 1 ? "xl:order-1" : ""}>
                    <div className="group relative aspect-[4/3] overflow-hidden rounded-[28px] shadow-[0_40px_70px_-40px_rgb(25_40_97/0.7)] [perspective:1000px]">
                      <Image
                        src={s.image.src}
                        alt={s.image.alt}
                        fill
                        sizes="(min-width: 1280px) 420px, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-navy/40 via-transparent to-leaf/20" />
                    </div>
                  </Reveal>
                )}
              </div>

              {s.points && (
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {s.points.map((pt, j) => (
                    <Reveal key={pt.title} delay={(j % 2) * 0.06} y={20} className="h-full">
                      <div className="group h-full rounded-3xl border border-navy/10 bg-white p-6 shadow-[0_6px_0_0_#e8ebf5,0_24px_40px_-32px_rgb(25_40_97/0.6)] transition duration-300 hover:-translate-y-1 hover:border-leaf/60">
                        <div className="flex items-center gap-3">
                          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-navy text-leaf transition-colors duration-300 group-hover:bg-leaf group-hover:text-navy">
                            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
                              <path d="M5 12l5 5L20 7" />
                            </svg>
                          </span>
                          <h3 className="font-extrabold text-navy">{pt.title}</h3>
                        </div>
                        <p className="mt-3 text-[15px] leading-relaxed text-muted">
                          <RichText text={pt.text} />
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              )}

              {/* The interactive tool sits right after the first section it explains. */}
              {i === 0 && page.widget && (
                <div className="mt-14">
                  <ServiceWidget widget={page.widget} />
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

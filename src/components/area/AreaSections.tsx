import Link from "next/link";
import Reveal, { WordsReveal } from "@/components/Reveal";
import RichText from "@/components/service/RichText";
import ServiceIcon from "@/components/service/ServiceIcon";
import { getService } from "@/lib/services";
import { getArea, type AreaPage } from "@/lib/areas";
import { MapSilhouette } from "./AreaMap";

const Eyebrow = ({ children, dark }: { children: React.ReactNode; dark?: boolean }) => (
  <Reveal>
    <span className={`text-sm font-bold tracking-[0.2em] uppercase ${dark ? "text-leaf" : "text-leaf-600"}`}>{children}</span>
  </Reveal>
);

/** City-by-city market cards, numbered like map pins. */
export function AreaMarkets({ page }: { page: AreaPage }) {
  return (
    <section className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <Eyebrow>Local Markets</Eyebrow>
            <h2 className="mt-4 max-w-3xl text-[2.05rem] leading-[1.05] font-extrabold tracking-[-0.03em] text-navy sm:text-5xl">
              <WordsReveal text={page.markets.heading} />
            </h2>
          </div>
          <Reveal delay={0.1} className="max-w-md text-lg text-muted">
            {page.markets.intro}
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {page.markets.items.map((m, i) => (
            <Reveal key={m.name} delay={(i % 3) * 0.08} className="h-full">
              <article className="group relative h-full overflow-hidden rounded-[26px] border border-navy/10 bg-white p-6 shadow-[0_6px_0_0_#e8ebf5,0_30px_50px_-40px_rgb(25_40_97/0.6)] transition duration-300 hover:-translate-y-1.5 hover:border-leaf/60">
                <span className="absolute -top-6 -right-4 font-serif text-[7rem] leading-none text-navy/[0.04] italic">{i + 1}</span>
                <div className="flex items-center gap-3">
                  <span className="relative grid size-11 place-items-center rounded-2xl bg-navy text-leaf transition-colors duration-300 group-hover:bg-leaf group-hover:text-navy">
                    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </span>
                  <h3 className="text-xl font-extrabold text-navy">{m.name}</h3>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">
                  <RichText text={m.note} />
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {m.spots.map((s) => (
                    <li key={s} className="rounded-full bg-navy-50 px-3 py-1 text-xs font-bold text-navy/80">
                      {s}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Programs available locally, linking into the core service pages. */
export function AreaPrograms({ page }: { page: AreaPage }) {
  return (
    <section className="relative overflow-hidden bg-navy-50 py-20 lg:py-28">
      <div className="bg-grid absolute inset-0 opacity-60" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Eyebrow>Available in {page.region}</Eyebrow>
          <h2 className="mt-4 text-[2.05rem] leading-[1.05] font-extrabold tracking-[-0.03em] text-navy sm:text-5xl">
            <WordsReveal text={page.programs.heading} />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-sm text-lg text-muted">{page.programs.intro}</p>
          </Reveal>
        </div>

        <div className="space-y-4">
          {page.programs.items.map((p, i) => {
            const s = getService(p.service);
            return (
              <Reveal key={p.service} delay={i * 0.06} y={20}>
                <div className="group relative flex flex-col gap-4 rounded-[26px] border border-navy/10 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-leaf/60 hover:shadow-[0_30px_50px_-35px_rgb(25_40_97/0.6)] sm:flex-row sm:items-center sm:gap-6">
                  <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-navy-700 to-navy text-leaf shadow-[0_10px_20px_-8px_rgb(25_40_97/0.7),inset_0_-4px_8px_rgb(0_0_0/0.3)]">
                    <ServiceIcon icon={s.icon} className="size-6" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <Link href={s.path} className="text-xl font-extrabold text-navy after:absolute after:inset-0 hover:text-leaf-600">
                      {s.name}
                    </Link>
                    <p className="relative z-10 mt-1 text-[15px] leading-relaxed text-muted">
                      <RichText text={p.text} />
                    </p>
                  </div>
                  <span className="hidden size-11 shrink-0 place-items-center rounded-full border border-navy/10 text-navy transition group-hover:border-navy group-hover:bg-navy group-hover:text-white sm:grid">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Local lending notes, written per state. */
export function AreaLocal({ page }: { page: AreaPage }) {
  return (
    <section className="relative py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <Eyebrow>Local Insight</Eyebrow>
          <h2 className="mt-4 text-[2.05rem] leading-[1.05] font-extrabold tracking-[-0.03em] text-navy sm:text-5xl">
            <WordsReveal text={page.local.heading} />
          </h2>
          <Reveal delay={0.1} className="mt-6 space-y-4 text-[17px] leading-relaxed text-muted">
            {page.local.paragraphs.map((p) => (
              <p key={p}>
                <RichText text={p} />
              </p>
            ))}
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 rounded-2xl border border-navy/10 bg-navy-50/70 px-4 py-3 text-xs leading-relaxed text-muted">
              General information only, not legal advice. Confirm local rules with your closing attorney or title company.
            </p>
          </Reveal>
        </div>

        <div className="space-y-4 [perspective:1200px]">
          {page.local.notes.map((n, i) => (
            <Reveal key={n.title} delay={0.1 + i * 0.08} y={30}>
              <div
                className="rounded-[24px] border-l-[6px] border-leaf bg-navy p-6 text-white shadow-[0_30px_50px_-30px_rgb(25_40_97/0.8)] transition duration-500 hover:[transform:rotateY(-6deg)_translateX(6px)]"
                style={{ marginLeft: `${i * 18}px` }}
              >
                <p className="text-xs font-bold tracking-[0.18em] text-leaf uppercase">0{i + 1}</p>
                <h3 className="mt-1 text-lg font-extrabold">{n.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/70">{n.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Steps drawn as stops along a road. */
export function AreaRoad({ page }: { page: AreaPage }) {
  return (
    <section className="relative overflow-hidden bg-navy py-20 text-white lg:py-24">
      <div className="bg-grid-dark absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Eyebrow dark>Your Route to Closing</Eyebrow>
        <h2 className="mt-4 text-[2.05rem] leading-[1.05] font-extrabold tracking-[-0.03em] sm:text-5xl">
          <WordsReveal text={`How We Fund ${page.region} Deals`} />
        </h2>

        <ol className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
          {/* Road: vertical on phones, horizontal from md */}
          <div className="absolute top-0 bottom-0 left-[12px] w-3 rounded-full bg-[#0a1233] md:top-[12px] md:right-[6%] md:bottom-auto md:left-[6%] md:h-3 md:w-auto" aria-hidden>
            <div className="absolute inset-y-0 left-1/2 w-0 border-l-2 border-dashed border-leaf/70 md:inset-x-0 md:top-1/2 md:left-0 md:h-0 md:w-auto md:border-t-2 md:border-l-0" />
          </div>
          {page.steps.map((s, i) => (
            <li key={s.title} className="relative list-none pl-14 md:pl-0">
              <Reveal delay={i * 0.12} y={20}>
                <span className="absolute top-0 left-0 grid size-9 place-items-center rounded-full border-4 border-navy bg-leaf text-sm font-extrabold text-navy shadow-[0_0_0_6px_rgb(122_198_68/0.2)] md:relative md:mx-auto md:mb-6 md:size-9">
                  {i + 1}
                </span>
                <div className="md:text-center">
                  <h3 className="text-lg font-extrabold">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-white/70">{s.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Links to other area pages, each with its own map silhouette. */
export function NearbyAreas({ page }: { page: AreaPage }) {
  const nearby = page.nearby.map(getArea);
  return (
    <section className="relative py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <Eyebrow>More Areas We Serve</Eyebrow>
            <h2 className="mt-4 text-[2.05rem] leading-[1.05] font-extrabold tracking-[-0.03em] text-navy sm:text-5xl">
              <WordsReveal text="Investing in More Than One Market?" />
            </h2>
          </div>
          <Link href="/areas-we-serve" className="shrink-0 font-bold text-navy underline decoration-leaf decoration-2 underline-offset-4">
            View all areas
          </Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {nearby.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.08} className="h-full">
              <Link
                href={a.path}
                className="group relative flex h-full items-center gap-5 overflow-hidden rounded-[26px] border border-navy/10 bg-white p-5 shadow-[0_6px_0_0_#e8ebf5] transition duration-300 hover:-translate-y-1 hover:border-leaf/60"
              >
                <span className="grid size-20 shrink-0 place-items-center rounded-2xl bg-navy p-3 text-leaf transition-transform duration-500 group-hover:-rotate-6">
                  <MapSilhouette map={a.map} className="size-full" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-bold tracking-[0.16em] text-leaf-600 uppercase">{a.kind}</span>
                  <span className="mt-0.5 block text-lg font-extrabold text-navy">{a.region}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

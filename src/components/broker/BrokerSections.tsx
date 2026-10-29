import Link from "next/link";
import Reveal, { WordsReveal } from "@/components/Reveal";
import { brokerDscr, brokerPerks, brokerPillars, brokerSubmission } from "@/lib/broker-content";
import { contact } from "@/lib/content";

const Check = () => (
  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-leaf text-navy">
    <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
      <path d="M5 12l5 5L20 7" />
    </svg>
  </span>
);

const pillarIcons: Record<string, React.ReactNode> = {
  fast: <path d="M13 2L4 14h7l-1 8 9-12h-7z" />,
  simple: (
    <>
      <path d="M4 12h16M4 6h16M4 18h10" />
    </>
  ),
  reliable: (
    <>
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
      <path d="M8.5 12l2.5 2.5 4.5-5" />
    </>
  ),
};

/** Program perks for brokers (client copy). */
export function BrokerPerks() {
  return (
    <section className="relative py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {brokerPerks.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} className="h-full">
              <div className="group relative h-full overflow-hidden rounded-[28px] bg-navy p-7 text-white shadow-[0_8px_0_0_#0a1233,0_30px_50px_-30px_rgb(25_40_97/0.8)] transition duration-300 hover:-translate-y-1.5">
                <div className="bg-grid-dark absolute inset-0" />
                <span className="absolute -top-10 -right-10 size-32 rounded-full bg-leaf/25 blur-2xl transition-transform duration-500 group-hover:scale-150" />
                <span className="relative font-serif text-5xl text-leaf italic">0{i + 1}</span>
                <h3 className="relative mt-4 text-xl font-extrabold">{p.title}</h3>
                <p className="relative mt-2 leading-relaxed text-white/70">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Fast / Simple / Reliable, shown as tilted 3D cards. */
export function BrokerPillars() {
  return (
    <section className="relative overflow-hidden bg-navy-50 py-20 lg:py-28">
      <div className="bg-grid absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <span className="text-sm font-bold tracking-[0.2em] text-leaf-600 uppercase">Why Partner With HWC?</span>
          </Reveal>
          <h2 className="mt-4 text-[2.05rem] leading-[1.05] font-extrabold tracking-[-0.03em] text-navy sm:text-5xl">
            <WordsReveal text="Built Around What" />
            <WordsReveal text="Brokers Need" className="font-serif font-normal italic tracking-normal" delay={0.12} />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              We understand the unique needs of brokers and investors. Our streamlined process delivers faster closings, competitive rates and financing solutions without unnecessary complexity.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 [perspective:1400px] md:grid-cols-3">
          {brokerPillars.map((p, i) => (
            <Reveal key={p.key} delay={i * 0.1} y={40} className="h-full">
              <article className="group h-full rounded-[28px] border border-navy/10 bg-white p-7 shadow-[0_30px_60px_-40px_rgb(25_40_97/0.7)] transition duration-500 [transform-style:preserve-3d] hover:[transform:rotateX(6deg)_rotateY(-6deg)_translateZ(10px)]">
                <span className="grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-leaf to-leaf-600 text-navy shadow-[0_8px_0_0_#4d8c22] transition-transform duration-500 group-hover:[transform:translateZ(40px)]">
                  <svg className="size-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    {pillarIcons[p.key]}
                  </svg>
                </span>
                <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-navy">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{p.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** DSCR program summary brokers can offer, linking to the DSCR page. */
export function BrokerDscr() {
  return (
    <section className="relative py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <span className="text-sm font-bold tracking-[0.2em] text-leaf-600 uppercase">For Your Rental Clients</span>
          </Reveal>
          <h2 className="mt-4 text-[2.05rem] leading-[1.05] font-extrabold tracking-[-0.03em] text-navy sm:text-5xl">
            <WordsReveal text="Long-Term Rental Loans" />
            <WordsReveal text="for Your Clients" className="font-serif font-normal italic tracking-normal" delay={0.12} />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-muted">{brokerDscr.body}</p>
            <Link href="/dscr-loans" className="mt-6 inline-flex items-center gap-2 font-bold text-navy">
              <span className="border-b-2 border-leaf pb-0.5">See the full DSCR loan program</span>
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </Reveal>
        </div>
        <Reveal delay={0.1} y={40}>
          <div className="relative overflow-hidden rounded-[32px] bg-navy p-7 text-white shadow-[0_40px_80px_-40px_rgb(25_40_97/0.8)] sm:p-9">
            <div className="bg-grid-dark absolute inset-0" />
            <div className="absolute -right-16 -bottom-16 size-56 rounded-full bg-leaf/25 blur-3xl" />
            <p className="relative text-xs font-bold tracking-[0.2em] text-leaf uppercase">DSCR program highlights</p>
            <ul className="relative mt-6 space-y-4">
              {brokerDscr.points.map((p) => (
                <li key={p} className="flex items-center gap-3 font-semibold text-white/90">
                  <Check />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** What to send with a broker submission (content doc, section 11). */
export function BrokerSubmission() {
  return (
    <section className="relative overflow-hidden bg-navy py-20 text-white lg:py-24">
      <div className="bg-grid-dark absolute inset-0" />
      <div className="absolute -top-40 left-1/3 size-[520px] rounded-full bg-leaf/15 blur-[130px]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div>
          <Reveal>
            <span className="text-sm font-bold tracking-[0.2em] text-leaf uppercase">Submitting a Deal</span>
          </Reveal>
          <h2 className="mt-4 text-[2.05rem] leading-[1.05] font-extrabold tracking-[-0.03em] sm:text-5xl">
            <WordsReveal text={brokerSubmission.title} />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-lg leading-relaxed text-white/70">{brokerSubmission.roles}</p>
            <a href={contact.phoneHref} className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-4 transition hover:bg-white/15">
              <span className="text-sm text-white/70">Have a specific deal in mind?</span>
              <span className="font-extrabold whitespace-nowrap text-leaf">{contact.phone}</span>
            </a>
          </Reveal>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {brokerSubmission.items.map((item, i) => (
            <Reveal key={item} delay={(i % 4) * 0.06} y={16} className={i === brokerSubmission.items.length - 1 && i % 2 === 0 ? "sm:col-span-2" : ""}>
              <div className="flex h-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-leaf text-xs font-extrabold text-navy">{i + 1}</span>
                <span className="text-[15px] font-semibold text-white/90">{item}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

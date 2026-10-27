import Reveal, { WordsReveal } from "@/components/Reveal";
import type { ServicePage } from "@/lib/services";
import RichText from "./RichText";

export default function ServiceSteps({ page }: { page: ServicePage }) {
  return (
    <section id="process" className="relative scroll-mt-24 overflow-hidden bg-navy py-24 text-white lg:py-28">
      <div className="bg-grid-dark absolute inset-0" />
      <div className="absolute -top-32 right-0 size-[520px] rounded-full bg-leaf/20 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <span className="text-sm font-bold tracking-[0.2em] text-leaf uppercase">Step by Step</span>
        </Reveal>
        <h2 className="mt-4 max-w-3xl text-[2.05rem] leading-[1.05] font-extrabold tracking-[-0.03em] sm:text-5xl">
          <WordsReveal text={page.steps.heading} />
        </h2>

        <div role="list" className="relative mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div
            className="absolute top-[56px] left-[56px] hidden h-0.5 bg-gradient-to-r from-leaf via-leaf/50 to-leaf lg:block"
            style={{ right: "calc((100% - 60px) / 4 - 56px)" }}
            aria-hidden
          />
          {page.steps.items.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.1} y={30} className="h-full">
              <div role="listitem" className="relative h-full rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-leaf/60 hover:bg-white/[0.08]">
                <span className="relative z-10 grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-leaf to-leaf-600 text-2xl font-extrabold text-navy shadow-[0_8px_0_0_#4d8c22,0_20px_30px_-10px_rgb(0_0_0/0.5)]">
                  {i + 1}
                </span>
                <h3 className="mt-6 text-lg font-extrabold">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/70">
                  <RichText text={step.text} linkClassName="font-semibold text-leaf underline decoration-leaf/50 underline-offset-4 hover:text-white" />
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

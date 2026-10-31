import Link from "next/link";
import SiteLayout from "./(site)/layout";
import ServiceIcon from "@/components/service/ServiceIcon";
import { services } from "@/lib/services";

// Stacked offsets give the numerals a solid extruded edge in brand green (same treatment as the LTC promo).
const extrude = Array.from(
  { length: 14 },
  (_, i) => `${i + 1}px ${i + 1}px 0 ${i < 11 ? "#6bb83a" : "#4d8c22"}`,
)
  .concat("20px 30px 40px rgb(0 0 0 / 0.45)")
  .join(", ");

/** Site-wide 404, copy from the content doc. */
export default function NotFound() {
  // The root 404 sits outside the (site) group, so it brings the site chrome with it.
  return (
    <SiteLayout>
      <section
        data-dark-hero
        className="relative min-h-[80vh] overflow-hidden bg-navy pt-36 pb-20 text-white lg:pt-44"
      >
        <div className="bg-grid-dark absolute inset-0" />
        <div className="absolute -top-40 right-0 size-[600px] rounded-full bg-leaf/20 blur-[140px]" />
        <div className="absolute -bottom-60 -left-40 size-[560px] rounded-full bg-navy-700 blur-[140px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1fr]">
          <div className="order-2 lg:order-1">
            <span className="inline-flex items-center gap-2 rounded-full border border-leaf/40 bg-leaf/10 px-3.5 py-1.5 text-xs font-extrabold tracking-[0.16em] text-leaf uppercase">
              Error 404
            </span>
            <h1 className="mt-6 text-[2.4rem] leading-[1.05] font-extrabold tracking-[-0.035em] sm:text-6xl">
              We Couldn&apos;t Find{" "}
              <span className="font-serif font-normal italic tracking-normal text-leaf">
                That Page
              </span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/75">
              Explore our loan programs or contact HWC to discuss your financing
              questions.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/loan-programs"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-leaf px-7 py-4 font-extrabold text-navy shadow-[0_6px_0_0_#4d8c22] transition hover:-translate-y-0.5 hover:bg-white active:translate-y-1 active:shadow-none sm:w-auto"
              >
                Explore Loan Programs
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex w-full items-center justify-center rounded-2xl border border-white/25 px-7 py-4 font-bold transition hover:bg-white/10 sm:w-auto"
              >
                Contact HWC
              </Link>
            </div>

            <p className="mt-12 text-xs font-bold tracking-[0.2em] text-leaf uppercase">
              Popular pages
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={s.path}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 font-bold transition hover:border-leaf/60 hover:bg-white/[0.09]"
                  >
                    <ServiceIcon icon={s.icon} className="size-4 text-leaf" />
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="order-1 flex justify-center [perspective:900px] lg:order-2">
            <p
              aria-hidden
              className="text-[7.5rem] leading-none font-extrabold tracking-[-0.06em] text-white [transform:rotateX(18deg)_rotateY(-16deg)] sm:text-[12rem] lg:text-[14rem]"
              style={{ textShadow: extrude }}
            >
              404
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

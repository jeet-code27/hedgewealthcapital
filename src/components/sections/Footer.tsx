import Image from "next/image";
import Link from "next/link";
import { certifications, contact, footer, nav, strategies } from "@/lib/content";

async function CopyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-950 pt-20 pb-10 text-white">
      <div className="bg-grid-dark absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <Image
              src="/images/hwc-logo.png"
              alt="Hedge Wealth Capital"
              width={1536}
              height={760}
              className="h-16 w-auto brightness-0 invert"
            />
            <p className="mt-6 max-w-xs leading-relaxed text-white/60">{footer.brand}</p>
          </div>

          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-leaf uppercase">Loan Programs</p>
            <ul className="mt-5 space-y-3">
              {strategies.map((s) => (
                <li key={s.key}>
                  <Link href={s.link.href} className="text-white/70 transition hover:text-white">
                    {s.tag}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-leaf uppercase">Company</p>
            <ul className="mt-5 space-y-3">
              {nav.slice(1).map((n) => (
                <li key={n.label}>
                  <Link href={n.href} className="text-white/70 transition hover:text-white">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-leaf uppercase">Contact</p>
            <ul className="mt-5 space-y-3 text-white/70">
              <li>
                <a href={contact.phoneHref} className="text-xl font-extrabold text-white">
                  {contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="transition hover:text-white">
                  {contact.email}
                </a>
              </li>
              <li className="leading-relaxed">{contact.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-10 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-leaf uppercase">Memberships &amp; Recognition</p>
            <p className="mt-2 max-w-xs text-sm text-white/50">Industry memberships and workplace certification held by Hedge Wealth Capital.</p>
          </div>
          <ul className="flex flex-wrap items-center gap-3 sm:gap-4">
            {certifications.map((c) => (
              <li
                key={c.src}
                className="grid h-24 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] px-4 sm:h-28 sm:px-5 transition duration-300 hover:-translate-y-1 hover:border-leaf/50 hover:bg-white/[0.08]"
              >
                <Image src={c.src} alt={c.alt} width={c.width} height={c.height} className="h-16 w-auto sm:h-20" />
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-10 border-t border-white/10 pt-8 text-xs leading-relaxed text-white/40">{footer.disclosure}</p>

        <div className="mt-6 flex flex-col justify-between gap-4 text-sm text-white/50 sm:flex-row">
          <p>© <CopyrightYear /> Hedge Wealth Capital. All rights reserved.</p>
          <div className="flex flex-wrap gap-6">
            {footer.legal.map((l) => (
              <Link key={l.label} href={l.href} className="transition hover:text-white">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <p
          aria-hidden
          className="pointer-events-none mt-12 text-center text-[10.5vw] leading-none whitespace-nowrap font-extrabold tracking-[-0.05em] text-white/[0.04] select-none"
        >
          HEDGE WEALTH
        </p>
      </div>
    </footer>
  );
}

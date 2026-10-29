"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Reveal, { WordsReveal } from "@/components/Reveal";
import { brokerForm } from "@/lib/broker-content";

type Key =
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "company"
  | "state"
  | "nmls"
  | "volBusiness"
  | "volDscr"
  | "volConsumer"
  | "referralSource"
  | "details";
type Fields = Record<Key, string>;

const empty: Fields = { firstName: "", lastName: "", email: "", phone: "", company: "", state: "", nmls: "", volBusiness: "", volDscr: "", volConsumer: "", referralSource: "", details: "" };

const formatPhone = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 10);
  if (d.length < 4) return d;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
};
const formatMoney = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 11);
  return d ? `$${Number(d).toLocaleString("en-US")}` : "";
};

const cls = (err?: string) =>
  `w-full rounded-2xl border bg-navy-50/60 px-4 py-3.5 text-[15px] font-semibold text-navy outline-none transition placeholder:font-medium placeholder:text-muted/70 focus:bg-white focus:ring-4 focus:ring-leaf/20 ${
    err ? "border-red-400" : "border-navy/10 focus:border-leaf"
  }`;

function Field({ id, label, error, optional, children }: { id: string; label: string; error?: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[13px] font-bold text-navy">
        {label}
        {optional && <span className="ml-1 font-medium text-muted">(optional)</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 pl-1 text-xs font-semibold text-red-600">{error}</p>}
    </div>
  );
}

/** Broker partner application (fields from the current site's broker form). */
export default function BrokerApply() {
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<Key, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const set = (k: Key) => (v: string) => {
    setF((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/broker", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) setStatus("success");
      else if (res.status === 422 && data.errors) {
        setErrors(data.errors);
        setStatus("idle");
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="broker-apply" className="relative scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <div className="text-center">
          <Reveal>
            <span className="text-sm font-bold tracking-[0.2em] text-leaf-600 uppercase">Apply Now</span>
          </Reveal>
          <h2 className="mt-4 text-[2.05rem] leading-[1.05] font-extrabold tracking-[-0.03em] text-navy sm:text-5xl">
            <WordsReveal text="Become a Broker" />
            <WordsReveal text="Partner Today" className="font-serif font-normal italic tracking-normal" delay={0.12} />
          </h2>
        </div>

        <Reveal delay={0.1} y={40}>
          <div className="relative mt-12 overflow-hidden rounded-[32px] border border-navy/10 bg-white p-6 shadow-[0_40px_80px_-45px_rgb(25_40_97/0.6)] sm:p-10">
            <div className="absolute -top-24 -left-24 size-64 rounded-full bg-leaf/15 blur-3xl" />
            {status === "success" ? (
              <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} className="relative flex min-h-[360px] flex-col items-center justify-center text-center">
                <motion.span
                  initial={{ rotateY: 180, scale: 0.4 }}
                  animate={{ rotateY: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 160, damping: 12 }}
                  className="grid size-24 place-items-center rounded-full bg-gradient-to-br from-leaf to-leaf-600 text-white shadow-[0_20px_40px_-10px_rgb(122_198_68/0.8)]"
                >
                  <svg className="size-11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
                    <motion.path d="M5 12l5 5L20 7" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3, duration: 0.5 }} />
                  </svg>
                </motion.span>
                <h3 className="mt-8 text-2xl font-extrabold text-navy">Application Submitted</h3>
                <p className="mt-3 max-w-md leading-relaxed text-muted">{brokerForm.success}</p>
              </motion.div>
            ) : (
              <form onSubmit={submit} noValidate className="relative space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="b-first" label="First name" error={errors.firstName}>
                    <input id="b-first" autoComplete="given-name" value={f.firstName} onChange={(e) => set("firstName")(e.target.value)} className={cls(errors.firstName)} />
                  </Field>
                  <Field id="b-last" label="Last name" error={errors.lastName}>
                    <input id="b-last" autoComplete="family-name" value={f.lastName} onChange={(e) => set("lastName")(e.target.value)} className={cls(errors.lastName)} />
                  </Field>
                  <Field id="b-email" label="Email" error={errors.email}>
                    <input id="b-email" type="email" autoComplete="email" value={f.email} onChange={(e) => set("email")(e.target.value)} className={cls(errors.email)} />
                  </Field>
                  <Field id="b-phone" label="Phone" error={errors.phone}>
                    <input id="b-phone" type="tel" inputMode="tel" autoComplete="tel-national" placeholder="(555) 555-0123" value={f.phone} onChange={(e) => set("phone")(formatPhone(e.target.value))} className={cls(errors.phone)} />
                  </Field>
                  <Field id="b-company" label="Your company or brokerage" error={errors.company}>
                    <input id="b-company" autoComplete="organization" value={f.company} onChange={(e) => set("company")(e.target.value)} className={cls(errors.company)} />
                  </Field>
                  <Field id="b-state" label="What state are you located in?" error={errors.state}>
                    <select id="b-state" value={f.state} onChange={(e) => set("state")(e.target.value)} className={`${cls(errors.state)} appearance-none ${f.state ? "" : "text-muted"}`}>
                      <option value="" disabled>
                        Please select...
                      </option>
                      {brokerForm.states.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </Field>
                </div>

                <div>
                  <p className="mb-2 text-[13px] font-bold text-navy">Are you an approved NMLS broker?</p>
                  <div role="radiogroup" aria-label="Approved NMLS broker" className="flex gap-2">
                    {brokerForm.nmls.map((o) => (
                      <button
                        key={o}
                        type="button"
                        role="radio"
                        aria-checked={f.nmls === o}
                        onClick={() => set("nmls")(o)}
                        className={`rounded-full border px-6 py-2.5 text-sm font-bold transition ${
                          f.nmls === o ? "border-navy bg-navy text-white shadow-[0_4px_0_0_#0a1233]" : `${errors.nmls ? "border-red-300" : "border-navy/15"} bg-white text-navy hover:border-navy/40`
                        }`}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                  {errors.nmls && <p className="mt-1.5 pl-1 text-xs font-semibold text-red-600">{errors.nmls}</p>}
                </div>

                <fieldset className="rounded-3xl border border-navy/10 bg-navy-50/50 p-5">
                  <legend className="px-2 text-[13px] font-bold text-navy">Origination volume, past 12 months (optional)</legend>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {brokerForm.volumes.map((v) => (
                      <Field key={v.key} id={`b-${v.key}`} label={v.label}>
                        <input
                          id={`b-${v.key}`}
                          inputMode="numeric"
                          placeholder="$0"
                          value={f[v.key as Key]}
                          onChange={(e) => set(v.key as Key)(formatMoney(e.target.value))}
                          className={cls()}
                        />
                      </Field>
                    ))}
                  </div>
                </fieldset>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="b-ref" label="How did you hear about us?" error={errors.referralSource}>
                    <select id="b-ref" value={f.referralSource} onChange={(e) => set("referralSource")(e.target.value)} className={`${cls(errors.referralSource)} appearance-none ${f.referralSource ? "" : "text-muted"}`}>
                      <option value="" disabled>
                        Please select...
                      </option>
                      {brokerForm.referralSources.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </Field>
                  <Field id="b-details" label="Additional details" optional error={errors.details}>
                    <input id="b-details" maxLength={2000} value={f.details} onChange={(e) => set("details")(e.target.value)} className={cls(errors.details)} />
                  </Field>
                </div>

                {status === "error" && (
                  <p role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                    {brokerForm.error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group relative w-full overflow-hidden rounded-2xl bg-navy py-4 text-lg font-extrabold text-white shadow-[0_6px_0_0_#0a1233] transition hover:-translate-y-0.5 active:translate-y-1 active:shadow-none disabled:opacity-70"
                >
                  <span className="absolute inset-0 -translate-x-full bg-leaf transition-transform duration-500 ease-out group-hover:translate-x-0" />
                  <span className="relative transition-colors duration-500 group-hover:text-navy">{status === "sending" ? "Sending..." : "Submit Application"}</span>
                </button>
                <p className="text-[11px] leading-relaxed text-muted">
                  {brokerForm.consent} View <a href="/terms-of-use" className="font-semibold text-navy underline">Terms of Service</a> and{" "}
                  <a href="/privacy-policy" className="font-semibold text-navy underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

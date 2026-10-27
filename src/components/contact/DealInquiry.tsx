"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Reveal, { WordsReveal } from "@/components/Reveal";
import { inquiryCopy, inquiryOptions } from "@/lib/contact-content";
import { contact } from "@/lib/content";

type Fields = {
  name: string;
  email: string;
  phone: string;
  contactMethod: string;
  purpose: string;
  city: string;
  state: string;
  address: string;
  amount: string;
  timing: string;
  description: string;
};
type Key = keyof Fields;

const empty: Fields = { name: "", email: "", phone: "", contactMethod: "Phone", purpose: "", city: "", state: "", address: "", amount: "", timing: "", description: "" };

const steps: { title: string; fields: Key[] }[] = [
  { title: "About you", fields: ["name", "email", "phone", "contactMethod"] },
  { title: "The property", fields: ["purpose", "city", "state", "address"] },
  { title: "The deal", fields: ["amount", "timing", "description"] },
];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function checkStep(i: number, f: Fields): Partial<Record<Key, string>> {
  const e: Partial<Record<Key, string>> = {};
  if (i === 0) {
    if (!f.name.trim()) e.name = "Enter your name.";
    if (!EMAIL.test(f.email)) e.email = "Enter a valid email address.";
    if (f.phone.replace(/\D/g, "").length !== 10) e.phone = "Enter a 10-digit US phone number.";
  }
  if (i === 1) {
    if (!f.purpose) e.purpose = "Select a financing purpose.";
    if (!f.city.trim()) e.city = "Enter the property city.";
    if (!f.state) e.state = "Select a state.";
  }
  if (i === 2 && !f.timing) e.timing = "Select your timing.";
  return e;
}

const formatPhone = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 10);
  if (d.length < 4) return d;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
};
const formatMoney = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 10);
  return d ? `$${Number(d).toLocaleString("en-US")}` : "";
};

const inputCls = (err?: string) =>
  `w-full rounded-2xl border bg-navy-50/60 px-4 py-3.5 text-[15px] font-semibold text-navy outline-none transition placeholder:font-medium placeholder:text-muted/70 focus:bg-white focus:ring-4 focus:ring-leaf/20 ${
    err ? "border-red-400" : "border-navy/10 focus:border-leaf"
  }`;

function Label({ htmlFor, children, optional }: { htmlFor?: string; children: React.ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-[13px] font-bold text-navy">
      {children}
      {optional && <span className="ml-1 font-medium text-muted">(optional)</span>}
    </label>
  );
}

const Err = ({ msg }: { msg?: string }) => (msg ? <p className="mt-1.5 pl-1 text-xs font-semibold text-red-600">{msg}</p> : null);

function Pills({ name, options, value, onChange, error }: { name: string; options: string[]; value: string; onChange: (v: string) => void; error?: string }) {
  return (
    <div role="radiogroup" aria-label={name} className="flex flex-wrap gap-2">
      {options.map((o) => {
        const on = value === o;
        return (
          <button
            key={o}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(o)}
            className={`rounded-full border px-4 py-2.5 text-sm font-bold transition ${
              on
                ? "border-navy bg-navy text-white shadow-[0_4px_0_0_#0a1233]"
                : `${error ? "border-red-300" : "border-navy/15"} bg-white text-navy hover:border-navy/40`
            }`}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

export default function DealInquiry() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<Key, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const set = (k: Key) => (v: string) => {
    setF((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const go = (to: number) => {
    setDir(to > step ? 1 : -1);
    setStep(to);
  };

  const next = () => {
    const e = checkStep(step, f);
    setErrors(e);
    if (!Object.keys(e).length) go(step + 1);
  };

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    if (step < steps.length - 1) return next();
    const e = checkStep(step, f);
    setErrors(e);
    if (Object.keys(e).length) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("success");
      } else if (res.status === 422 && data.errors) {
        setErrors(data.errors);
        const firstBad = steps.findIndex((s) => s.fields.some((k) => data.errors[k]));
        if (firstBad >= 0) go(firstBad);
        setStatus("idle");
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  const reset = () => {
    setF(empty);
    setErrors({});
    setStep(0);
    setStatus("idle");
  };

  return (
    <section id="deal-inquiry" className="relative scroll-mt-24 py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12">
        <Reveal y={40}>
          <div className="relative overflow-hidden rounded-[32px] border border-navy/10 bg-white p-6 shadow-[0_40px_80px_-45px_rgb(25_40_97/0.6)] sm:p-10">
            <div className="absolute -top-24 -right-24 size-64 rounded-full bg-leaf/15 blur-3xl" />
            <div className="relative">
              <h2 className="text-[1.9rem] leading-tight font-extrabold tracking-[-0.025em] text-navy sm:text-4xl">
                <WordsReveal text={inquiryCopy.title} />
              </h2>

              {status === "success" ? (
                <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} className="flex min-h-[420px] flex-col items-center justify-center text-center">
                  <motion.span
                    initial={{ rotateY: 180, scale: 0.4 }}
                    animate={{ rotateY: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 160, damping: 12 }}
                    className="grid size-24 place-items-center rounded-full bg-gradient-to-br from-leaf to-leaf-600 text-white shadow-[0_20px_40px_-10px_rgb(122_198_68/0.8),inset_0_-6px_12px_rgb(0_0_0/0.15)]"
                  >
                    <svg className="size-11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
                      <motion.path d="M5 12l5 5L20 7" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3, duration: 0.5 }} />
                    </svg>
                  </motion.span>
                  <h3 className="mt-8 text-2xl font-extrabold text-navy">Inquiry Submitted</h3>
                  <p className="mt-3 max-w-md leading-relaxed text-muted">{inquiryCopy.success}</p>
                  <button onClick={reset} className="mt-8 text-sm font-bold text-navy underline decoration-leaf decoration-2 underline-offset-4">
                    Send another inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={submit} noValidate className="mt-8">
                  {/* Progress */}
                  <ol className="mb-8 grid grid-cols-3 gap-2 sm:gap-3">
                    {steps.map((s, i) => {
                      const done = i < step;
                      const active = i === step;
                      return (
                        <li key={s.title}>
                          <button
                            type="button"
                            disabled={i > step}
                            onClick={() => i < step && go(i)}
                            className="flex w-full flex-col items-start gap-2 text-left disabled:cursor-default"
                          >
                            <span className="h-1.5 w-full overflow-hidden rounded-full bg-navy-50">
                              <motion.span className="block h-full rounded-full bg-leaf" animate={{ width: done || active ? "100%" : "0%" }} transition={{ duration: 0.5 }} />
                            </span>
                            <span className="flex items-center gap-2">
                              <span
                                className={`grid size-6 shrink-0 place-items-center rounded-lg text-xs font-extrabold transition ${
                                  done ? "bg-leaf text-navy" : active ? "bg-navy text-white" : "bg-navy-50 text-muted"
                                }`}
                              >
                                {done ? "✓" : i + 1}
                              </span>
                              <span className={`text-xs font-bold sm:text-sm ${active ? "text-navy" : "text-muted"}`}>{s.title}</span>
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ol>

                  <div className="relative min-h-[360px]">
                    <AnimatePresence mode="wait" custom={dir}>
                      <motion.div
                        key={step}
                        custom={dir}
                        initial={{ opacity: 0, x: 40 * dir }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 * dir }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="space-y-5"
                      >
                        {step === 0 && (
                          <>
                            <div>
                              <Label htmlFor="c-name">Full name</Label>
                              <input id="c-name" autoComplete="name" placeholder="Jane Investor" value={f.name} onChange={(e) => set("name")(e.target.value)} className={inputCls(errors.name)} />
                              <Err msg={errors.name} />
                            </div>
                            <div className="grid gap-5 sm:grid-cols-2">
                              <div>
                                <Label htmlFor="c-email">Email</Label>
                                <input id="c-email" type="email" autoComplete="email" placeholder="you@company.com" value={f.email} onChange={(e) => set("email")(e.target.value)} className={inputCls(errors.email)} />
                                <Err msg={errors.email} />
                              </div>
                              <div>
                                <Label htmlFor="c-phone">Phone</Label>
                                <input
                                  id="c-phone"
                                  type="tel"
                                  inputMode="tel"
                                  autoComplete="tel-national"
                                  placeholder="(555) 555-0123"
                                  value={f.phone}
                                  onChange={(e) => set("phone")(formatPhone(e.target.value))}
                                  className={inputCls(errors.phone)}
                                />
                                <Err msg={errors.phone} />
                              </div>
                            </div>
                            <div>
                              <Label>Preferred contact method</Label>
                              <Pills name="Preferred contact method" options={inquiryOptions.contactMethods} value={f.contactMethod} onChange={set("contactMethod")} />
                            </div>
                          </>
                        )}

                        {step === 1 && (
                          <>
                            <div>
                              <Label>Financing purpose</Label>
                              <Pills name="Financing purpose" options={inquiryOptions.purposes} value={f.purpose} onChange={set("purpose")} error={errors.purpose} />
                              <Err msg={errors.purpose} />
                            </div>
                            <div className="grid gap-5 sm:grid-cols-[1fr_140px]">
                              <div>
                                <Label htmlFor="c-city">Property city</Label>
                                <input id="c-city" autoComplete="address-level2" placeholder="Worcester" value={f.city} onChange={(e) => set("city")(e.target.value)} className={inputCls(errors.city)} />
                                <Err msg={errors.city} />
                              </div>
                              <div>
                                <Label htmlFor="c-state">State</Label>
                                <select id="c-state" value={f.state} onChange={(e) => set("state")(e.target.value)} className={`${inputCls(errors.state)} appearance-none ${f.state ? "" : "text-muted"}`}>
                                  <option value="" disabled>
                                    Select
                                  </option>
                                  {inquiryOptions.states.map((s) => (
                                    <option key={s} value={s}>
                                      {s}
                                    </option>
                                  ))}
                                </select>
                                <Err msg={errors.state} />
                              </div>
                            </div>
                            <div>
                              <Label htmlFor="c-address" optional>
                                Property address, if known
                              </Label>
                              <input id="c-address" autoComplete="street-address" placeholder="123 Main St" value={f.address} onChange={(e) => set("address")(e.target.value)} className={inputCls()} />
                            </div>
                          </>
                        )}

                        {step === 2 && (
                          <>
                            <div>
                              <Label htmlFor="c-amount" optional>
                                Estimated financing need
                              </Label>
                              <input id="c-amount" inputMode="numeric" placeholder="$250,000" value={f.amount} onChange={(e) => set("amount")(formatMoney(e.target.value))} className={inputCls()} />
                            </div>
                            <div>
                              <Label>Target timing</Label>
                              <Pills name="Target timing" options={inquiryOptions.timings} value={f.timing} onChange={set("timing")} error={errors.timing} />
                              <Err msg={errors.timing} />
                            </div>
                            <div>
                              <Label htmlFor="c-desc" optional>
                                Short project description
                              </Label>
                              <textarea
                                id="c-desc"
                                rows={4}
                                maxLength={2000}
                                placeholder="Purchase price, rehab scope, current status, what you need from us…"
                                value={f.description}
                                onChange={(e) => set("description")(e.target.value)}
                                className={`${inputCls(errors.description)} resize-none`}
                              />
                              <p className="mt-1 text-right text-xs text-muted">{f.description.length}/2000</p>
                            </div>
                            <p className="rounded-2xl bg-leaf-100/70 px-4 py-3 text-xs leading-relaxed text-navy/80">{inquiryCopy.helper}</p>
                          </>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {status === "error" && (
                    <p role="alert" className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                      {inquiryCopy.error}
                    </p>
                  )}

                  <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                    {step > 0 ? (
                      <button type="button" onClick={() => go(step - 1)} className="rounded-2xl border border-navy/15 px-6 py-3.5 font-bold text-navy transition hover:border-navy/40">
                        Back
                      </button>
                    ) : (
                      <span className="hidden sm:block" />
                    )}
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-navy px-8 py-4 font-extrabold whitespace-nowrap text-white shadow-[0_6px_0_0_#0a1233] transition hover:-translate-y-0.5 active:translate-y-1 active:shadow-none disabled:opacity-70"
                    >
                      <span className="absolute inset-0 -translate-x-full bg-leaf transition-transform duration-500 ease-out group-hover:translate-x-0" />
                      <span className="relative transition-colors duration-500 group-hover:text-navy">
                        {step < steps.length - 1 ? "Continue" : status === "sending" ? "Sending..." : inquiryCopy.button}
                      </span>
                      <svg className="relative size-4 transition-colors duration-500 group-hover:text-navy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  <p className="mt-5 text-xs leading-relaxed text-muted/90">{inquiryCopy.note}</p>
                </form>
              )}
            </div>
          </div>
        </Reveal>

        {/* Sidebar: office map + what to include */}
        <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-[28px] border border-navy/10 bg-white shadow-[0_30px_60px_-40px_rgb(25_40_97/0.6)]">
              <div className="relative aspect-[4/3]">
                <iframe
                  title="Hedge Wealth Capital office map"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(contact.address)}&output=embed`}
                  className="absolute inset-0 size-full [filter:saturate(0.7)_contrast(1.05)]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="p-5">
                <p className="text-xs font-bold tracking-[0.16em] text-leaf-600 uppercase">Office</p>
                <p className="mt-1 font-extrabold text-navy">{contact.address}</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-navy underline decoration-leaf decoration-2 underline-offset-4"
                >
                  Get directions
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative overflow-hidden rounded-[28px] bg-navy p-6 text-white">
              <div className="bg-grid-dark absolute inset-0" />
              <div className="relative">
                <p className="text-xs font-bold tracking-[0.16em] text-leaf uppercase">Helpful to include</p>
                <ul className="mt-4 space-y-3">
                  {["Property location and type", "What you plan to do with it", "Purchase price or current value", "Rehab budget, if any", "When you need to close"].map((t) => (
                    <li key={t} className="flex items-center gap-3 text-[15px] font-semibold text-white/90">
                      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-leaf text-navy">
                        <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" aria-hidden>
                          <path d="M5 12l5 5L20 7" />
                        </svg>
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
                <a href={contact.phoneHref} className="mt-6 flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3 transition hover:bg-white/15">
                  <span className="text-sm text-white/70">Time-sensitive deal?</span>
                  <span className="font-extrabold whitespace-nowrap text-leaf">{contact.phone}</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

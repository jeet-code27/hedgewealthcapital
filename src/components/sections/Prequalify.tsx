"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import ImageSlot from "@/components/ImageSlot";
import Reveal, { WordsReveal } from "@/components/Reveal";
import { contact, images, prequalify } from "@/lib/content";

const PrequalifyScene = dynamic(() => import("@/components/three/PrequalifyScene"), { ssr: false });

type Fields = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  loanProduct: string;
  referralSource: string;
};

const empty: Fields = { firstName: "", lastName: "", email: "", phone: "", loanProduct: "", referralSource: "" };

function formatPhone(value: string) {
  const d = value.replace(/\D/g, "").slice(0, 10);
  if (d.length < 4) return d;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

const inputBase =
  "peer w-full rounded-2xl border bg-navy-50/60 px-4 pt-6 pb-2.5 text-[15px] font-semibold text-navy outline-none transition placeholder:text-transparent focus:bg-white focus:ring-4 focus:ring-leaf/20";

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      {children}
      <label
        htmlFor={id}
        className="pointer-events-none absolute top-2 left-4 text-[11px] font-bold tracking-wide text-muted uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-[14px] peer-placeholder-shown:font-semibold peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-2 peer-focus:text-[11px] peer-focus:font-bold peer-focus:tracking-wide peer-focus:text-leaf-600 peer-focus:uppercase"
      >
        {label}
      </label>
      {error && <p className="mt-1.5 pl-1 text-xs font-semibold text-red-600">{error}</p>}
    </div>
  );
}

function SelectField({
  id,
  label,
  value,
  options,
  error,
  onChange,
}: {
  id: keyof Fields;
  label: string;
  value: string;
  options: string[];
  error?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[13px] font-bold text-navy">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          name={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full appearance-none rounded-2xl border bg-navy-50/60 px-4 py-3.5 pr-10 text-[15px] font-semibold outline-none transition focus:bg-white focus:ring-4 focus:ring-leaf/20 ${
            value ? "text-navy" : "text-muted"
          } ${error ? "border-red-400" : "border-navy/10 focus:border-leaf"}`}
        >
          <option value="" disabled>
            Please select...
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <svg className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-navy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
      {error && <p className="mt-1.5 pl-1 text-xs font-semibold text-red-600">{error}</p>}
    </div>
  );
}

function PrequalifyForm() {
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const set = (key: keyof Fields) => (value: string) => {
    setFields((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/prequalify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("success");
        setFields(empty);
      } else if (res.status === 422 && data.errors) {
        setErrors(data.errors);
        setStatus("idle");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const borderFor = (k: keyof Fields) => (errors[k] ? "border-red-400" : "border-navy/10 focus:border-leaf");

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.div
          key="done"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex min-h-[520px] flex-col items-center justify-center text-center"
        >
          <motion.span
            initial={{ rotateY: 180, scale: 0.4 }}
            animate={{ rotateY: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 160, damping: 12 }}
            className="grid size-24 place-items-center rounded-full bg-gradient-to-br from-leaf to-leaf-600 text-white shadow-[0_20px_40px_-10px_rgb(122_198_68/0.8),inset_0_-6px_12px_rgb(0_0_0/0.15),inset_0_4px_8px_rgb(255_255_255/0.4)]"
          >
            <svg className="size-11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
              <motion.path d="M5 12l5 5L20 7" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3, duration: 0.5 }} />
            </svg>
          </motion.span>
          <h3 className="mt-8 text-2xl font-extrabold text-navy">Inquiry Submitted</h3>
          <p className="mt-3 max-w-sm leading-relaxed text-muted">{prequalify.success}</p>
          <button onClick={() => setStatus("idle")} className="mt-8 text-sm font-bold text-navy underline decoration-leaf decoration-2 underline-offset-4">
            Submit another inquiry
          </button>
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={onSubmit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="firstName" label="First Name" error={errors.firstName}>
              <input id="firstName" name="firstName" autoComplete="given-name" placeholder="First Name" value={fields.firstName} onChange={(e) => set("firstName")(e.target.value)} className={`${inputBase} ${borderFor("firstName")}`} />
            </Field>
            <Field id="lastName" label="Last Name" error={errors.lastName}>
              <input id="lastName" name="lastName" autoComplete="family-name" placeholder="Last Name" value={fields.lastName} onChange={(e) => set("lastName")(e.target.value)} className={`${inputBase} ${borderFor("lastName")}`} />
            </Field>
          </div>

          <Field id="email" label="Email" error={errors.email}>
            <input id="email" name="email" type="email" autoComplete="email" placeholder="Email" value={fields.email} onChange={(e) => set("email")(e.target.value)} className={`${inputBase} ${borderFor("email")}`} />
          </Field>

          <div>
            <div className="flex gap-2">
              <div className="flex shrink-0 items-center gap-2 rounded-2xl border border-navy/10 bg-navy-50/60 px-3.5 text-[14px] font-bold text-navy" title="United States +1">
                <svg aria-hidden viewBox="0 0 19 10" className="h-3.5 w-auto rounded-[2px] shadow-sm">
                  <rect width="19" height="10" fill="#b22234" />
                  {[1, 3, 5, 7, 9].map((y) => (
                    <rect key={y} y={(y * 10) / 13} width="19" height={10 / 13} fill="#fff" />
                  ))}
                  <rect width="7.6" height={(10 * 7) / 13} fill="#3c3b6e" />
                </svg>
                +1
              </div>
              <div className="flex-1">
                <Field id="phone" label="Phone Number">
                  <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel-national" placeholder="Phone Number" value={fields.phone} onChange={(e) => set("phone")(formatPhone(e.target.value))} className={`${inputBase} ${borderFor("phone")}`} />
                </Field>
              </div>
            </div>
            {errors.phone && <p className="mt-1.5 pl-1 text-xs font-semibold text-red-600">{errors.phone}</p>}
          </div>

          <SelectField id="loanProduct" label="Which loan product are you inquiring about?" value={fields.loanProduct} options={prequalify.loanProducts} error={errors.loanProduct} onChange={set("loanProduct")} />
          <SelectField id="referralSource" label="How did you hear about us?" value={fields.referralSource} options={prequalify.referralSources} error={errors.referralSource} onChange={set("referralSource")} />

          <p className="rounded-2xl bg-leaf-100/70 px-4 py-3 text-xs leading-relaxed text-navy/80">{prequalify.helper}</p>

          {status === "error" && (
            <p role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {prequalify.error}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="group relative w-full overflow-hidden rounded-2xl bg-navy px-4 py-4 text-[15px] font-extrabold whitespace-nowrap sm:text-lg text-white shadow-[0_6px_0_0_#0a1233,0_20px_40px_-12px_rgb(25_40_97/0.7)] transition-all hover:-translate-y-0.5 active:translate-y-1 active:shadow-[0_2px_0_0_#0a1233] disabled:opacity-70"
          >
            <span className="absolute inset-0 -translate-x-full bg-leaf transition-transform duration-500 ease-out group-hover:translate-x-0" />
            <span className="relative flex items-center justify-center gap-2 transition-colors duration-500 group-hover:text-navy">
              {status === "sending" ? "Sending..." : "See If You Prequalify"}
              <svg className="size-5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </span>
          </button>

          <p className="text-[11px] leading-relaxed text-muted">
            {prequalify.consent} View{" "}
            <a href="/terms-of-use" className="font-semibold text-navy underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy-policy" className="font-semibold text-navy underline">
              Privacy Policy
            </a>
            .
          </p>
          <p className="text-[11px] leading-relaxed text-muted/80">{prequalify.note}</p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

export default function Prequalify() {
  const rx = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 });

  return (
    <section id="prequalify" className="relative scroll-mt-20 px-4 pb-24 sm:px-6">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[36px] bg-navy text-white">
        <ImageSlot src={images.cta} alt="" hint="cta.jpg" dark className="absolute inset-0 opacity-30" sizes="(min-width: 1280px) 1280px, 100vw" />
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/90 to-navy-950/80" />
        <div className="bg-grid-dark absolute inset-0" />
        <div className="absolute -top-32 -left-32 size-[460px] rounded-full bg-leaf/20 blur-[120px]" />

        <div className="relative grid gap-10 px-6 py-16 sm:px-12 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:py-20">
          <div className="flex flex-col">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-leaf/40 bg-leaf/10 px-3.5 py-1.5 text-xs font-bold tracking-[0.18em] text-leaf uppercase">
                <span className="size-1.5 rounded-full bg-leaf" />
                {prequalify.eyebrow}
              </span>
            </Reveal>
            <h2 className="mt-6 text-4xl leading-[1.02] font-extrabold tracking-[-0.03em] sm:text-6xl">
              <WordsReveal text="Have a Property" />
              <WordsReveal text="in Mind?" className="font-serif font-normal italic tracking-normal text-leaf" delay={0.15} />
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-white/75">{prequalify.body}</p>
              <ul className="mt-8 space-y-3">
                {prequalify.points.map((p) => (
                  <li key={p} className="flex items-center gap-3 font-semibold text-white/90">
                    <span className="grid size-6 place-items-center rounded-full bg-leaf text-navy">
                      <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>

            <div className="relative mt-6 h-[300px] flex-1 sm:h-[340px] lg:min-h-[340px]">
              <PrequalifyScene />
            </div>

            <a href={contact.phoneHref} className="mt-2 inline-flex w-full items-center justify-center gap-3 rounded-2xl sm:w-auto sm:self-start border border-white/15 bg-white/5 px-5 py-3 backdrop-blur transition hover:bg-white/10">
              <span className="text-sm text-white/60">Prefer to talk?</span>
              <span className="font-extrabold">{contact.phone}</span>
            </a>
          </div>

          <Reveal delay={0.15} y={50}>
            <motion.div
              style={{ rotateX: rx, rotateY: ry, transformPerspective: 1400 }}
              onPointerMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                ry.set(((e.clientX - r.left) / r.width - 0.5) * 4);
                rx.set((0.5 - (e.clientY - r.top) / r.height) * 4);
              }}
              onPointerLeave={() => {
                rx.set(0);
                ry.set(0);
              }}
              className="relative"
            >
              <div className="absolute -inset-3 rounded-[38px] bg-gradient-to-br from-leaf/50 via-white/10 to-transparent blur-xl" />
              <div className="relative rounded-[32px] bg-white p-6 text-ink shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)] sm:p-9">
                <div className="mb-7 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-2xl font-extrabold tracking-tight text-navy">Start Your Deal Inquiry</p>
                    <p className="mt-1 text-sm text-muted">Takes about a minute. No commitment.</p>
                  </div>
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-navy text-leaf shadow-[inset_0_-4px_8px_rgb(0_0_0/0.35)]">
                    <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                      <path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6" />
                    </svg>
                  </span>
                </div>
                <PrequalifyForm />
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import type { ServiceWidget as Widget } from "@/lib/services";

const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format = usd,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format?: (n: number) => string;
}) {
  const id = useId();
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-bold text-navy">
          {label}
        </label>
        <span className="text-lg font-extrabold tracking-tight text-navy">{format(value)}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full accent-[#7AC644]"
        style={{ background: `linear-gradient(to right, #7AC644 ${pct}%, #e8ebf5 ${pct}%)` }}
      />
    </div>
  );
}

function Shell({ eyebrow, title, children, note }: { eyebrow: string; title: string; children: React.ReactNode; note: string }) {
  return (
    <div className="relative overflow-hidden rounded-[32px] border border-navy/10 bg-gradient-to-br from-white via-navy-50 to-leaf-100 p-6 shadow-[0_40px_80px_-50px_rgb(25_40_97/0.7)] sm:p-9">
      <div className="bg-grid absolute inset-0 opacity-60" />
      <div className="relative">
        <span className="inline-flex items-center gap-2 rounded-full bg-navy px-3 py-1 text-[11px] font-extrabold tracking-[0.18em] text-leaf uppercase">
          <span className="size-1.5 rounded-full bg-leaf" />
          {eyebrow}
        </span>
        <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">{title}</h3>
        {children}
        <p className="mt-6 text-xs leading-relaxed text-muted">{note}</p>
      </div>
    </div>
  );
}

/** Purchase + rehab vs. an ARV cap, shown as stacked 3D bars. */
function LtcCalculator() {
  const [purchase, setPurchase] = useState(220000);
  const [rehab, setRehab] = useState(60000);
  const [arv, setArv] = useState(420000);
  const cost = purchase + rehab;
  const arvCap = Math.round(arv * 0.7);
  const loan = Math.min(cost, arvCap);
  const gap = cost - loan;
  const scale = Math.max(cost, arvCap, 1);

  const bars = [
    { label: "Project cost", value: cost, color: "from-navy-700 to-navy" },
    { label: "ARV cap (70%)", value: arvCap, color: "from-[#9fd97a] to-leaf-600" },
    { label: "Estimated loan", value: loan, color: "from-leaf to-leaf-600" },
  ];

  return (
    <Shell
      eyebrow="Interactive Estimate"
      title="How Much Could You Borrow?"
      note="Illustrative only. Uses up to 100% of purchase and rehab with a 70% ARV cap, and excludes closing costs, reserves and interest, which you pay separately. Your actual loan amount and ARV cap are set by underwriting and final loan terms."
    >
      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <Slider label="Purchase price" value={purchase} min={50000} max={1500000} step={5000} onChange={setPurchase} />
          <Slider label="Rehab budget" value={rehab} min={0} max={600000} step={5000} onChange={setRehab} />
          <Slider label="After-repair value (ARV)" value={arv} min={75000} max={2500000} step={5000} onChange={setArv} />
        </div>

        <div className="flex flex-col justify-end">
          <div className="flex h-56 items-end justify-around gap-2 [perspective:800px] sm:gap-4">
            {bars.map((b) => (
              <div key={b.label} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-[11px] font-extrabold whitespace-nowrap text-navy sm:text-sm">{usd(b.value)}</span>
                <motion.div
                  className={`w-full max-w-20 rounded-t-xl bg-gradient-to-b ${b.color} shadow-[6px_6px_0_0_rgb(25_40_97/0.18)] [transform:rotateX(8deg)]`}
                  animate={{ height: `${Math.max((b.value / scale) * 170, 6)}px` }}
                  transition={{ type: "spring", stiffness: 140, damping: 18 }}
                />
                <span className="text-center text-[11px] leading-tight font-bold text-muted">{b.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2">
            <div className="min-w-0 rounded-2xl bg-navy p-4 text-white">
              <p className="text-[11px] font-bold tracking-[0.14em] text-leaf uppercase">Estimated loan</p>
              <p className="mt-1 text-xl font-extrabold tracking-tight break-all sm:text-2xl">{usd(loan)}</p>
            </div>
            <div className="min-w-0 rounded-2xl border border-navy/10 bg-white p-4">
              <p className="text-[11px] font-bold tracking-[0.14em] text-muted uppercase">Gap above the loan</p>
              <p className="mt-1 text-xl font-extrabold tracking-tight break-all text-navy sm:text-2xl">{usd(gap)}</p>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/** Rent ÷ monthly payment, with a needle gauge. */
function DscrCalculator() {
  const [rent, setRent] = useState(2400);
  const [pitia, setPitia] = useState(1850);
  const ratio = pitia > 0 ? rent / pitia : 0;
  const clamped = Math.min(Math.max(ratio, 0.5), 1.5);
  const angle = ((clamped - 0.5) / 1) * 180 - 90;
  const covers = ratio >= 1;

  return (
    <Shell
      eyebrow="DSCR Calculator"
      title="Does the Rent Cover the Payment?"
      note="Illustrative only. DSCR = monthly rent ÷ monthly principal, interest, taxes, insurance and association dues (PITIA). Qualification, rate and leverage depend on the full loan review."
    >
      <div className="mt-8 grid items-center gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <Slider label="Monthly rent" value={rent} min={500} max={15000} step={50} onChange={setRent} />
          <Slider label="Monthly payment (PITIA)" value={pitia} min={300} max={12000} step={50} onChange={setPitia} />
        </div>
        <div className="flex flex-col items-center">
          <div className="relative h-36 w-64 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-64 rounded-full bg-[conic-gradient(from_270deg,#f2c4c4_0deg,#f6e3b4_90deg,#cdeeb7_120deg,#7AC644_180deg,transparent_180deg)]" />
            <div className="absolute inset-x-6 top-6 h-52 rounded-full bg-white" />
            <motion.div
              className="absolute bottom-0 left-1/2 h-28 w-1.5 origin-bottom -translate-x-1/2 rounded-full bg-navy"
              animate={{ rotate: angle }}
              transition={{ type: "spring", stiffness: 120, damping: 14 }}
            />
            <div className="absolute bottom-0 left-1/2 size-5 -translate-x-1/2 translate-y-1/2 rounded-full bg-navy" />
          </div>
          <p className="mt-4 text-5xl font-extrabold tracking-tight text-navy">{ratio.toFixed(2)}</p>
          <p className={`mt-2 rounded-full px-4 py-1.5 text-sm font-bold ${covers ? "bg-leaf-100 text-leaf-600" : "bg-red-50 text-red-600"}`}>
            {covers ? "Rent covers the payment" : "Rent falls short of the payment"}
          </p>
        </div>
      </div>
    </Shell>
  );
}

/** Drag to compare a property mid-renovation with the finished result. */
function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const move = (clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (r) setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <Shell
      eyebrow="Before & After"
      title="See the Value You Are Financing"
      note="An ARV loan is sized on the finished property, not the one you buy. Drag the handle to compare. Photos are illustrative."
    >
      <div
        ref={box}
        className="relative mt-8 aspect-[16/10] touch-pan-y overflow-hidden rounded-[24px] select-none"
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          move(e.clientX);
        }}
        onPointerMove={(e) => e.buttons === 1 && move(e.clientX)}
      >
        <Image src="/images/services/arv-after.jpg" alt="Kitchen after renovation" fill sizes="(min-width: 1024px) 800px, 100vw" className="object-cover" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image src="/images/services/arv-before.jpg" alt="Kitchen during renovation" fill sizes="(min-width: 1024px) 800px, 100vw" className="object-cover" />
        </div>
        <span className="absolute top-4 left-4 rounded-full bg-navy px-3 py-1 text-xs font-extrabold tracking-wide text-white uppercase">As-is value</span>
        <span className="absolute top-4 right-4 rounded-full bg-leaf px-3 py-1 text-xs font-extrabold tracking-wide text-navy uppercase">After-repair value</span>
        <div className="absolute inset-y-0 w-1 -translate-x-1/2 bg-white shadow-[0_0_20px_rgb(0_0_0/0.4)]" style={{ left: `${pos}%` }}>
          <span className="absolute top-1/2 left-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full bg-white text-navy shadow-xl">
            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
              <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
            </svg>
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Compare before and after renovation"
          className="sr-only"
        />
      </div>
    </Shell>
  );
}

export default function ServiceWidget({ widget }: { widget: Widget }) {
  if (widget === "ltc-calculator") return <LtcCalculator />;
  if (widget === "dscr-calculator") return <DscrCalculator />;
  return <BeforeAfter />;
}

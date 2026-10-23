"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

type CountUpProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  /** Skip thousands separators (e.g. a year like 2010). */
  plain?: boolean;
  duration?: number;
  className?: string;
};

/** Counts from 0 to `value` the first time it scrolls into view. */
export default function CountUp({ value, prefix = "", suffix = "", plain, duration = 2, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const format = (n: number) => `${prefix}${plain ? Math.round(n) : Math.round(n).toLocaleString("en-US")}${suffix}`;

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    if (reduce) {
      el.textContent = format(value);
      return;
    }
    const from = plain ? Math.max(0, value - 40) : 0;
    const controls = animate(from, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (n) => (el.textContent = format(n)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  // Server/first render shows the final value so the number is never wrong without JS.
  return (
    <span ref={ref} className={className}>
      {format(value)}
    </span>
  );
}

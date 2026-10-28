"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import maps from "@/lib/area-maps.json";
import type { AreaPage, MapKey } from "@/lib/areas";

type MapData = { viewBox: string; paths: string[]; cities: Record<string, [number, number]> };
const mapData = maps as unknown as Record<MapKey, MapData>;

/** Outline only, for small thumbnails (no pins, no interaction). */
export function MapSilhouette({ map, className = "" }: { map: MapKey; className?: string }) {
  const data = mapData[map];
  return (
    <svg viewBox={data.viewBox} className={className} aria-hidden>
      {data.paths.map((d, i) => (
        <path key={i} d={d} fill="currentColor" />
      ))}
    </svg>
  );
}

/**
 * The area outline drawn as a tilted, extruded 3D slab with pulsing city pins.
 * Tilts toward the cursor; hover or tap a pin to see that market.
 */
export default function AreaMap({ page }: { page: AreaPage }) {
  const data = mapData[page.map];
  const gid = useId().replace(/:/g, "");
  const [active, setActive] = useState<string | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotZ = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 2]), { stiffness: 80, damping: 18 });
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [40, 54]), { stiffness: 80, damping: 18 });

  const [vx, vy, vw, vh] = data.viewBox.split(" ").map(Number);
  const pinned = page.markets.items.filter((m) => data.cities[m.pin]);
  const activeMarket = pinned.find((m) => m.pin === active);
  const layers = [7, 6, 5, 4, 3, 2, 1];

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[560px] [perspective:1300px]"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <div className="absolute inset-[12%] rounded-full bg-leaf/25 blur-[70px]" />
      <motion.div style={{ rotateX: rotX, rotateZ: rotZ }} className="absolute inset-[6%] [transform-style:preserve-3d]">
        {/* Extruded edge: stacked copies stepping down in depth */}
        {layers.map((l) => (
          <svg key={l} viewBox={data.viewBox} className="absolute inset-0 size-full" style={{ transform: `translateZ(${-l * 3}px)` }} aria-hidden>
            {data.paths.map((d, i) => (
              <path key={i} d={d} fill={l > 5 ? "#050b24" : "#0a1233"} />
            ))}
          </svg>
        ))}

        {/* Top face */}
        <svg viewBox={data.viewBox} className="absolute inset-0 size-full overflow-visible" role="img" aria-label={`Map of ${page.region} showing featured markets`}>
          <defs>
            <linearGradient id={`face-${gid}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3550b3" />
              <stop offset="55%" stopColor="#1f3080" />
              <stop offset="100%" stopColor="#192861" />
            </linearGradient>
            <pattern id={`grid-${gid}`} width="28" height="28" patternUnits="userSpaceOnUse">
              <path d="M28 0H0V28" fill="none" stroke="rgb(255 255 255 / 0.08)" strokeWidth="1" />
            </pattern>
            <clipPath id={`clip-${gid}`}>
              {data.paths.map((d, i) => (
                <path key={i} d={d} />
              ))}
            </clipPath>
          </defs>
          {data.paths.map((d, i) => (
            <path key={i} d={d} fill={`url(#face-${gid})`} stroke="#7AC644" strokeWidth={Math.max(vw, vh) / 260} strokeLinejoin="round" />
          ))}
          <rect x={vx} y={vy} width={vw} height={vh} fill={`url(#grid-${gid})`} clipPath={`url(#clip-${gid})`} />

          {pinned.map((m, i) => {
            const [x, y] = data.cities[m.pin];
            const on = active === m.pin;
            const r = Math.max(vw, vh) / 70;
            return (
              <g
                key={m.pin}
                className="cursor-pointer"
                onPointerEnter={() => setActive(m.pin)}
                onPointerLeave={() => setActive(null)}
                onClick={() => setActive(on ? null : m.pin)}
              >
                <circle cx={x} cy={y} r={r * 3.2} fill="transparent" />
                <circle cx={x} cy={y} r={r} fill="#7AC644" opacity="0.35">
                  <animate attributeName="r" values={`${r};${r * 3};${r}`} dur="2.6s" begin={`${i * 0.35}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.5;0;0.5" dur="2.6s" begin={`${i * 0.35}s`} repeatCount="indefinite" />
                </circle>
                <circle cx={x} cy={y} r={on ? r * 1.4 : r} fill={on ? "#ffffff" : "#7AC644"} stroke="#0a1233" strokeWidth={r / 3} />
              </g>
            );
          })}
        </svg>
      </motion.div>

      {/* Market detail for the active pin (kept flat so it stays readable) */}
      <AnimatePresence>
        {activeMarket ? (
          <motion.div
            key={activeMarket.pin}
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-none absolute right-0 bottom-0 left-0 mx-auto max-w-sm rounded-2xl border border-white/15 bg-white/95 p-4 text-navy shadow-[0_24px_50px_-20px_rgb(0_0_0/0.6)] backdrop-blur"
          >
            <p className="text-xs font-bold tracking-[0.16em] text-leaf-600 uppercase">Featured market</p>
            <p className="mt-0.5 text-lg font-extrabold">{activeMarket.name}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{activeMarket.note}</p>
          </motion.div>
        ) : (
          <motion.p
            key="hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute right-0 bottom-2 left-0 text-center text-xs font-semibold tracking-wide text-white/60"
          >
            Hover or tap a pin to explore markets
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

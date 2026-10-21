"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { contact } from "@/lib/content";

/**
 * Floating call button: a glossy 3D orb with an orbiting ring that tilts toward the
 * cursor, pulses for attention, and expands into a "call us" card on hover.
 */
export default function CallButton() {
  const [hover, setHover] = useState(false);
  const [nudge, setNudge] = useState(false);
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });

  // Show the label briefly after a few seconds so visitors notice the button.
  useEffect(() => {
    const show = setTimeout(() => setNudge(true), 4500);
    const hide = setTimeout(() => setNudge(false), 10500);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  const open = hover || nudge;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.4, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.8, type: "spring", stiffness: 180, damping: 14 }}
      className="fixed right-4 bottom-4 z-[60] flex items-center gap-3 sm:right-6 sm:bottom-6"
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => {
        setHover(false);
        rx.set(0);
        ry.set(0);
      }}
    >
      <AnimatePresence>
        {open && (
          <motion.a
            href={contact.phoneHref}
            initial={{ opacity: 0, x: 24, scale: 0.9, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: 24, scale: 0.9, filter: "blur(4px)" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="hidden rounded-2xl border border-navy/10 bg-white/90 py-2.5 pr-5 pl-4 shadow-[0_20px_50px_-15px_rgb(25_40_97/0.45)] backdrop-blur-xl sm:block"
          >
            <span className="flex items-center gap-2 text-[11px] font-bold tracking-[0.16em] text-leaf-600 uppercase">
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-leaf" />
                <span className="relative size-2 rounded-full bg-leaf" />
              </span>
              Talk to our team
            </span>
            <span className="mt-0.5 block text-lg font-extrabold tracking-tight text-navy">{contact.phone}</span>
          </motion.a>
        )}
      </AnimatePresence>

      <motion.a
        href={contact.phoneHref}
        aria-label={`Call Hedge Wealth Capital at ${contact.phone}`}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          ry.set(((e.clientX - r.left) / r.width - 0.5) * 40);
          rx.set((0.5 - (e.clientY - r.top) / r.height) * 40);
        }}
        whileTap={{ scale: 0.9 }}
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 500 }}
        className="relative grid size-14 place-items-center [transform-style:preserve-3d] sm:size-[72px]"
      >
        {/* Pulse rings */}
        <span className="absolute inset-0 animate-ping rounded-full bg-leaf/40 [animation-duration:2.2s]" />
        <span className="absolute -inset-2 rounded-full bg-leaf/15 blur-md" />

        {/* Orbiting 3D ring */}
        <span className="absolute -inset-3 [transform:rotateX(68deg)] [transform-style:preserve-3d]">
          <span className="animate-spin-slow absolute inset-0 rounded-full border-2 border-dashed border-leaf/70 [animation-duration:6s]">
            <span className="absolute -top-1.5 left-1/2 size-3 -translate-x-1/2 rounded-full bg-leaf shadow-[0_0_12px_3px_rgb(122_198_68/0.8)]" />
          </span>
        </span>

        {/* Glossy orb */}
        <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_25%,#4a63c4_0%,#192861_45%,#0a1233_100%)] shadow-[0_18px_35px_-8px_rgb(25_40_97/0.8),inset_0_-6px_14px_rgb(0_0_0/0.45),inset_0_4px_10px_rgb(255_255_255/0.25)]" />
        <span className="absolute top-[10%] left-[22%] h-[30%] w-[45%] rounded-full bg-gradient-to-b from-white/60 to-transparent blur-[1px]" />

        {/* Phone icon, wiggling */}
        <motion.svg
          animate={{ rotate: [0, -16, 14, -10, 8, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 2.4 }}
          style={{ translateZ: 24 }}
          className="relative size-6 text-leaf sm:size-7 drop-shadow-[0_4px_6px_rgb(0_0_0/0.5)]"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2a1 1 0 011-.25 11.4 11.4 0 003.6.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1z" />
        </motion.svg>
      </motion.a>
    </motion.div>
  );
}

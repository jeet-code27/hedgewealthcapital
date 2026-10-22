"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";

/** Vertical tab pinned to the left edge that jumps to the homepage prequalify form; hides while the form is on screen. */
export default function PrequalifyTab() {
  const pathname = usePathname();
  // Visibility is recorded per page, so a stale value never carries over after navigating.
  const [seen, setSeen] = useState({ path: pathname, visible: false });
  const formVisible = seen.path === pathname && seen.visible;

  // Re-check on every route change: the form only exists on pages that render it.
  useEffect(() => {
    const form = document.getElementById("prequalify");
    if (!form) return;
    const io = new IntersectionObserver(([e]) => setSeen({ path: pathname, visible: e.isIntersecting }), { threshold: 0.2 });
    io.observe(form);
    return () => io.disconnect();
  }, [pathname]);

  return (
    <AnimatePresence>
      {!formVisible && (
        <motion.a
          href="/#prequalify"
          initial={{ x: -80 }}
          animate={{ x: 0 }}
          exit={{ x: -80 }}
          transition={{ type: "spring", stiffness: 160, damping: 18, delay: 0.4 }}
          whileHover={{ x: 6 }}
          className="group fixed top-1/2 left-0 z-[55] hidden -translate-y-1/2 [perspective:600px] md:block"
          aria-label="Find out if you prequalify"
        >
          <span className="relative flex flex-col items-center gap-2 overflow-hidden rounded-r-xl bg-gradient-to-b from-[#8fd65a] via-leaf to-leaf-600 px-1.5 py-3.5 shadow-[4px_0_0_0_#4d8c22,8px_10px_24px_-6px_rgb(25_40_97/0.45),inset_0_2px_0_rgb(255_255_255/0.45)] transition-transform duration-300 [transform-origin:left_center] group-hover:[transform:rotateY(-14deg)] sm:px-2 sm:py-4">
            {/* Shine sweep */}
            <span className="absolute inset-x-0 -top-1/2 h-1/3 animate-[shine_3.5s_ease-in-out_infinite] bg-gradient-to-b from-transparent via-white/55 to-transparent" />
            <span className="relative grid size-5 place-items-center rounded-full bg-navy text-leaf shadow-inner">
              <svg className="size-2.5 transition-transform duration-300 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </span>
            <span className="relative text-[10.5px] font-extrabold tracking-[0.12em] whitespace-nowrap text-navy uppercase [writing-mode:vertical-rl] rotate-180">
              Find Out If You Prequalify
            </span>
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

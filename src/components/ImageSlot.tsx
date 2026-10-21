import Image from "next/image";

type ImageSlotProps = {
  src?: string;
  alt: string;
  /** Shown on the placeholder so it's clear which image goes where. */
  hint: string;
  className?: string;
  sizes?: string;
  preload?: boolean;
  dark?: boolean;
};

/**
 * Renders the image when `src` is set; otherwise a branded placeholder
 * telling you which file to add. Set paths in src/lib/content.ts → `images`.
 */
export default function ImageSlot({ src, alt, hint, className = "", sizes = "100vw", preload, dark }: ImageSlotProps) {
  // Callers may position the slot themselves (e.g. as an absolute background).
  const position = /\b(absolute|fixed)\b/.test(className) ? "" : "relative";

  if (src) {
    return (
      <div className={`${position} overflow-hidden ${className}`}>
        <Image src={src} alt={alt} fill sizes={sizes} preload={preload} className="object-cover" />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={`${position} overflow-hidden ${
        dark
          ? "bg-gradient-to-br from-navy-700 via-navy to-navy-950 text-white/70"
          : "bg-gradient-to-br from-navy-50 via-white to-leaf-100 text-navy/60"
      } ${className}`}
    >
      <div className={`absolute inset-0 ${dark ? "bg-grid-dark" : "bg-grid"} opacity-80`} />
      <svg
        className={`absolute -right-6 -bottom-4 h-[85%] w-auto ${dark ? "text-white/10" : "text-navy/10"}`}
        viewBox="0 0 120 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        aria-hidden
      >
        <path d="M20 95V35l22-9v69M42 95V8l50 16v71M92 95V30l18 11v54" />
        <path d="M92 52l18 13" />
      </svg>
      <div className="absolute left-4 bottom-4 flex items-center gap-2 rounded-full border border-current/20 bg-white/10 px-3 py-1.5 text-[11px] font-semibold tracking-wide uppercase backdrop-blur-sm">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
        {hint}
      </div>
    </div>
  );
}

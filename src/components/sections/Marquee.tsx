const items = [
  "Fix & Flip Loans",
  "DSCR Rental Loans",
  "Ground-Up Construction",
  "Multifamily Bridge",
  "Purchase",
  "Renovation",
  "Refinance",
  "Rental Ownership",
];

export default function Marquee() {
  return (
    <div className="relative -rotate-1 border-y border-navy/10 bg-navy py-5 text-white">
      <div className="mask-fade-x flex overflow-hidden">
        <div className="animate-marquee flex shrink-0 items-center gap-10 pr-10 whitespace-nowrap">
          {[...items, ...items].map((item, i) => (
            <span key={i} className="flex items-center gap-10 text-lg font-bold tracking-tight sm:text-2xl">
              {item}
              <svg className="size-5 text-leaf" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" />
              </svg>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

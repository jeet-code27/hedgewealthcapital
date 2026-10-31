import type { ServicePage } from "@/lib/services";

const paths: Record<ServicePage["icon"], React.ReactNode> = {
  hammer: <path d="M14 6l4 4M3 21l9-9M12 4l8 8-3 3-8-8z" />,
  handshake: <path d="M11 17l2 2a1.5 1.5 0 002-2l-3-3M14 14l2.5 2.5a1.5 1.5 0 002-2L13 9l-2 2a2 2 0 01-3-3l3-3h4l5 5M2 12l5-5h3" />,
  home: <path d="M3 21h18M5 21V10l7-6 7 6v11M9 21v-6h6v6" />,
  trend: <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />,
  cash: (
    <>
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M6 12h.01M18 12h.01" />
    </>
  ),
  grid: <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />,
  bridge: <path d="M2 18h20M4 18V9M20 18V9M4 9c3 4 13 4 16 0M8 18v-5M12 18v-4M16 18v-5" />,
  crane: <path d="M6 21V5M3 21h6M6 5h15M6 5l-3 3M6 5l4-3 4 3M18 5v4M16 9h4v3h-4zM6 9l4-4M6 13l4-4" />,
  building: <path d="M4 21V5a2 2 0 012-2h8a2 2 0 012 2v16M16 9h3a1 1 0 011 1v11M2 21h20M8 7h1M11 7h1M8 11h1M11 11h1M8 15h1M11 15h1" />,
};

export default function ServiceIcon({ icon, className = "size-6" }: { icon: ServicePage["icon"]; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {paths[icon]}
    </svg>
  );
}

"use client";

import { useLayoutEffect, useState } from "react";

/**
 * The page's single H1. Next.js keeps recently visited routes mounted but hidden (React Activity),
 * which would leave their headings in the DOM. A hidden route's title drops to a plain div, so the
 * document only ever holds the H1 of the page on screen. Effects run on show and clean up on hide.
 */
export default function PageTitle({ className, children }: { className?: string; children: React.ReactNode }) {
  const [hidden, setHidden] = useState(false);

  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- restores the heading when the route is shown again
    setHidden(false);
    return () => setHidden(true);
  }, []);

  const Tag = hidden ? "div" : "h1";
  return <Tag className={className}>{children}</Tag>;
}

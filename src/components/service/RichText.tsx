import Link from "next/link";

const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

/** Renders copy where `[anchor](/path)` becomes an internal link, so keyword links live in the content data. */
export default function RichText({ text, linkClassName }: { text: string; linkClassName?: string }) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK)) {
    const at = m.index ?? 0;
    if (at > last) parts.push(text.slice(last, at));
    parts.push(
      <Link
        key={at}
        href={m[2]}
        className={
          linkClassName ??
          "font-semibold text-navy underline decoration-leaf decoration-2 underline-offset-4 transition hover:text-leaf-600"
        }
      >
        {m[1]}
      </Link>,
    );
    last = at + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

/** Plain-text version (links stripped) for metadata and structured data. */
export const plainText = (text: string) => text.replace(LINK, "$1");

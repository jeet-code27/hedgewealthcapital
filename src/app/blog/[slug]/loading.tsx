/** Instant shell while a post's params resolve on client navigation. */
export default function Loading() {
  return (
    <div className="mx-auto max-w-4xl animate-pulse px-5 pt-32 pb-24 sm:px-8 lg:pt-40" aria-busy>
      <div className="h-4 w-48 rounded-full bg-navy/10" />
      <div className="mt-8 h-10 w-full rounded-2xl bg-navy/10" />
      <div className="mt-3 h-10 w-2/3 rounded-2xl bg-navy/10" />
      <div className="mt-10 aspect-[16/9] rounded-[32px] bg-navy/10" />
    </div>
  );
}

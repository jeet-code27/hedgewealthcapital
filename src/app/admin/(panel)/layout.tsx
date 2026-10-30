import { Suspense } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { Spinner } from "@/components/admin/ui";

// The admin panel is runtime-only (behind login), so the prerendered shell is just a loader.
export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Spinner />}>
      <AdminShell>{children}</AdminShell>
    </Suspense>
  );
}

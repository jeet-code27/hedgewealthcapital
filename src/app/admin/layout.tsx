import type { Metadata } from "next";
import { ToastProvider } from "@/components/admin/ui";

export const metadata: Metadata = {
  title: { default: "Admin | Hedge Wealth Capital", template: "%s | HWC Admin" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f4f6fb] text-navy">
      <ToastProvider>{children}</ToastProvider>
    </div>
  );
}

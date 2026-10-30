"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, FileText, FolderTree, Images, Inbox, LayoutDashboard, LogOut, Menu, PenSquare, X } from "lucide-react";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/posts", label: "Blog Posts", icon: FileText },
  { href: "/admin/posts/new", label: "New Post", icon: PenSquare },
  { href: "/admin/taxonomy", label: "Categories & Tags", icon: FolderTree },
  { href: "/admin/media", label: "Media Library", icon: Images },
  { href: "/admin/submissions", label: "Form Submissions", icon: Inbox },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const active = (href: string) => (href === "/admin" ? pathname === href : href === "/admin/posts" ? pathname === href || /^\/admin\/posts\/[a-f0-9]{24}/.test(pathname) : pathname.startsWith(href));

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  const sidebar = (
    <div className="flex h-full flex-col bg-navy text-white">
      <div className="flex items-center justify-between px-5 py-5">
        <Link href="/admin" className="rounded-xl bg-white px-3 py-2">
          <Image src="/images/hwc-logo-header.png" alt="Hedge Wealth Capital" width={1642} height={748} className="h-9 w-auto" />
        </Link>
        <button onClick={() => setOpen(false)} className="rounded-lg p-1.5 text-white/70 hover:bg-white/10 lg:hidden" aria-label="Close menu">
          <X className="size-5" />
        </button>
      </div>
      <nav className="mt-2 flex-1 space-y-1 px-3">
        {nav.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition ${active(href) ? "bg-leaf text-navy shadow-[0_3px_0_0_#4d8c22]" : "text-white/75 hover:bg-white/10 hover:text-white"}`}
          >
            <Icon className="size-[18px]" />
            {label}
          </Link>
        ))}
      </nav>
      <div className="space-y-1 border-t border-white/10 p-3">
        <a href="/" target="_blank" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-white/75 hover:bg-white/10 hover:text-white">
          <ExternalLink className="size-[18px]" />
          View website
        </a>
        <button onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-white/75 hover:bg-white/10 hover:text-white">
          <LogOut className="size-[18px]" />
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <div className="lg:pl-64">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 lg:block">{sidebar}</aside>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-navy-950/50" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72">{sidebar}</aside>
        </div>
      )}
      <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-navy/8 bg-white/90 px-4 py-3 backdrop-blur lg:hidden">
        <button onClick={() => setOpen(true)} className="rounded-lg border border-navy/10 p-2" aria-label="Open menu">
          <Menu className="size-5" />
        </button>
        <span className="font-extrabold">HWC Admin</span>
      </header>
      <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
    </div>
  );
}

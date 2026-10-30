"use client";

import { useState } from "react";
import Image from "next/image";
import { Lock, User } from "lucide-react";
import { Button } from "@/components/admin/ui";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username, password }) });
    if (res.ok) {
      const next = new URLSearchParams(window.location.search).get("next");
      window.location.href = next?.startsWith("/admin") ? next : "/admin";
      return;
    }
    const data = await res.json().catch(() => ({}));
    setError(data.error || "Login failed.");
    setLoading(false);
  }

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden px-4">
      <div className="bg-grid absolute inset-0 opacity-70" />
      <div className="absolute -top-40 -left-40 size-[520px] rounded-full bg-navy/10 blur-[120px]" />
      <div className="absolute -right-32 -bottom-40 size-[520px] rounded-full bg-leaf/25 blur-[120px]" />

      <form onSubmit={submit} className="relative w-full max-w-sm rounded-[28px] border border-navy/10 bg-white p-8 shadow-[0_40px_80px_-40px_rgb(25_40_97/0.6)]">
        <Image src="/images/hwc-logo-header.png" alt="Hedge Wealth Capital" width={1642} height={748} className="mx-auto h-16 w-auto" preload />
        <h1 className="mt-6 text-center text-xl font-extrabold text-navy">Admin Panel</h1>
        <p className="mt-1 text-center text-sm text-muted">Sign in to manage the blog and form submissions.</p>

        <div className="mt-7 space-y-3">
          <label className="relative block">
            <span className="sr-only">Username</span>
            <User className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted" />
            <input autoFocus autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="w-full rounded-xl border border-navy/12 bg-navy-50/50 py-3 pr-4 pl-10 text-sm font-semibold outline-none focus:border-leaf focus:bg-white focus:ring-4 focus:ring-leaf/15" />
          </label>
          <label className="relative block">
            <span className="sr-only">Password</span>
            <Lock className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted" />
            <input type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full rounded-xl border border-navy/12 bg-navy-50/50 py-3 pr-4 pl-10 text-sm font-semibold outline-none focus:border-leaf focus:bg-white focus:ring-4 focus:ring-leaf/15" />
          </label>
        </div>

        {error && <p className="mt-4 rounded-xl bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-700">{error}</p>}

        <Button type="submit" loading={loading} className="mt-6 w-full py-3">
          Sign in
        </Button>
      </form>
    </div>
  );
}

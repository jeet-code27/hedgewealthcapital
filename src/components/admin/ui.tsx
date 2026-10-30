"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

/** Fetch JSON from the admin API; throws the server's error message and bounces to login on 401. */
export async function api<T = unknown>(url: string, init?: RequestInit & { json?: unknown }): Promise<T> {
  const { json, ...rest } = init ?? {};
  const res = await fetch(url, {
    ...rest,
    headers: json !== undefined ? { "Content-Type": "application/json", ...rest.headers } : rest.headers,
    body: json !== undefined ? JSON.stringify(json) : rest.body,
  });
  if (res.status === 401) {
    window.location.href = `/admin/login?next=${encodeURIComponent(window.location.pathname)}`;
    throw new Error("Session expired.");
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { error?: string }).error || `Request failed (${res.status})`);
  return data as T;
}

/*
 * Stale-while-revalidate cache for admin GETs: a page shows the last data it saw instantly
 * (no spinner on every navigation) and refreshes in the background.
 */
const cache = new Map<string, unknown>();

export function prefetch(url: string) {
  if (!cache.has(url)) api(url).then((d) => cache.set(url, d), () => {});
}

export function useApiData<T>(url: string) {
  const [data, setState] = useState<T | null>(() => (cache.get(url) as T) ?? null);
  const [error, setError] = useState("");
  const reload = useCallback(() => {
    api<T>(url).then(
      (d) => {
        cache.set(url, d);
        setError("");
        setState(d);
      },
      (e) => setError(e.message),
    );
  }, [url]);
  useEffect(reload, [reload]);
  const setData = useCallback(
    (next: T | null | ((prev: T | null) => T | null)) =>
      setState((prev) => {
        const value = typeof next === "function" ? (next as (p: T | null) => T | null)(prev) : next;
        if (value) cache.set(url, value);
        return value;
      }),
    [url],
  );
  return { data, setData, error, reload };
}

export const inputCls =
  "w-full rounded-xl border border-navy/12 bg-white px-3.5 py-2.5 text-sm font-medium text-navy outline-none transition placeholder:text-muted/60 focus:border-leaf focus:ring-4 focus:ring-leaf/15";

export function Button({
  variant = "primary",
  loading,
  className = "",
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" | "danger" | "leaf"; loading?: boolean }) {
  const styles = {
    primary: "bg-navy text-white shadow-[0_3px_0_0_#0a1233] hover:bg-navy-700",
    leaf: "bg-leaf text-navy shadow-[0_3px_0_0_#4d8c22] hover:brightness-105",
    secondary: "border border-navy/12 bg-white text-navy hover:border-navy/30",
    ghost: "text-navy hover:bg-navy-50",
    danger: "border border-red-200 bg-white text-red-600 hover:bg-red-50",
  }[variant];
  return (
    <button
      {...rest}
      disabled={rest.disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold whitespace-nowrap transition active:translate-y-px disabled:pointer-events-none disabled:opacity-60 ${styles} ${className}`}
    >
      {loading && <Loader2 className="size-4 animate-spin" />}
      {children}
    </button>
  );
}

export function Card({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`rounded-2xl border border-navy/8 bg-white shadow-[0_10px_30px_-24px_rgb(25_40_97/0.5)] ${className}`}>{children}</div>;
}

export function Field({ label, hint, children, className = "" }: { label: string; hint?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 flex items-baseline justify-between gap-2 text-xs font-bold text-navy">
        {label}
        {hint && <span className="font-semibold text-muted">{hint}</span>}
      </span>
      {children}
    </label>
  );
}

export function PageHeader({ title, sub, actions }: { title: string; sub?: string; actions?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">{title}</h1>
        {sub && <p className="mt-1 text-sm text-muted">{sub}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

const badgeColors: Record<string, string> = {
  Published: "bg-leaf-100 text-leaf-600",
  Draft: "bg-amber-50 text-amber-700",
  New: "bg-blue-50 text-blue-700",
  Contacted: "bg-violet-50 text-violet-700",
  "In Progress": "bg-amber-50 text-amber-700",
  Closed: "bg-leaf-100 text-leaf-600",
  Spam: "bg-red-50 text-red-600",
};
export function Badge({ children }: { children: string }) {
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-extrabold ${badgeColors[children] ?? "bg-navy-50 text-navy"}`}>{children}</span>;
}

export function Empty({ title, sub, action }: { title: string; sub?: string; action?: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-navy/15 bg-white px-6 py-14 text-center">
      <p className="font-extrabold text-navy">{title}</p>
      {sub && <p className="mx-auto mt-1 max-w-md text-sm text-muted">{sub}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function Spinner({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-20 text-sm font-semibold text-muted">
      <Loader2 className="size-5 animate-spin text-leaf-600" />
      {label}
    </div>
  );
}

export function ErrorBox({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm font-semibold text-red-700">
      {message}
      {onRetry && (
        <button onClick={onRetry} className="ml-3 underline">
          Retry
        </button>
      )}
    </div>
  );
}

/* ---------- Toasts ---------- */
type Toast = { id: number; text: string; tone: "ok" | "error" };
const ToastCtx = createContext<(text: string, tone?: Toast["tone"]) => void>(() => {});
export const useToast = () => useContext(ToastCtx);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const push = useCallback((text: string, tone: Toast["tone"] = "ok") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, text, tone }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  }, []);
  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="pointer-events-none fixed right-4 bottom-4 z-[100] flex flex-col gap-2">
        {toasts.map((t) => (
          <div key={t.id} role="status" className={`rounded-xl px-4 py-3 text-sm font-bold text-white shadow-xl ${t.tone === "ok" ? "bg-navy" : "bg-red-600"}`}>
            {t.text}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export const fmtDate = (d?: string | Date | null, time = false) =>
  d ? new Date(d).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", ...(time ? { hour: "numeric", minute: "2-digit" } : {}) }) : "—";

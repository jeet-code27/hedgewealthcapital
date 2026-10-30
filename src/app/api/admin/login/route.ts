import { checkCredentials, createSession, SESSION_COOKIE } from "@/lib/server/auth";

// Simple in-memory throttle: 8 failed attempts per IP per 15 minutes.
const failures = new Map<string, { count: number; until: number }>();

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const entry = failures.get(ip);
  if (entry && entry.count >= 8 && entry.until > Date.now()) {
    return Response.json({ error: "Too many attempts. Try again in a few minutes." }, { status: 429 });
  }

  const { username = "", password = "" } = await request.json().catch(() => ({}));
  if (!checkCredentials(String(username), String(password))) {
    const next = entry && entry.until > Date.now() ? entry.count + 1 : 1;
    failures.set(ip, { count: next, until: Date.now() + 15 * 60 * 1000 });
    return Response.json({ error: "Incorrect username or password." }, { status: 401 });
  }

  failures.delete(ip);
  const session = createSession(String(username));
  const res = Response.json({ ok: true });
  res.headers.append(
    "Set-Cookie",
    `${SESSION_COOKIE}=${session.value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${session.maxAge}${process.env.NODE_ENV === "production" ? "; Secure" : ""}`,
  );
  return res;
}

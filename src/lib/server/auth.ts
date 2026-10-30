import { createHmac, timingSafeEqual } from "node:crypto";

export const SESSION_COOKIE = "hwc_admin";
const MAX_AGE = 60 * 60 * 12; // 12 hours

const secret = () => {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s || s.length < 32) throw new Error("ADMIN_SESSION_SECRET must be at least 32 characters.");
  return s;
};
const sign = (payload: string) => createHmac("sha256", secret()).update(payload).digest("base64url");

const safeEqual = (a: string, b: string) => {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
};

export function checkCredentials(username: string, password: string) {
  const u = process.env.ADMIN_USERNAME;
  const p = process.env.ADMIN_PASSWORD;
  if (!u || !p) return false;
  // Evaluate both so timing doesn't reveal which one was wrong.
  const okUser = safeEqual(username, u);
  const okPass = safeEqual(password, p);
  return okUser && okPass;
}

export function createSession(username: string) {
  const payload = Buffer.from(JSON.stringify({ u: username, exp: Math.floor(Date.now() / 1000) + MAX_AGE })).toString("base64url");
  return { value: `${payload}.${sign(payload)}`, maxAge: MAX_AGE };
}

export function verifySession(token: string | undefined): { u: string } | null {
  if (!token) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig || !safeEqual(sig, sign(payload))) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    return typeof data.exp === "number" && data.exp > Date.now() / 1000 ? { u: data.u } : null;
  } catch {
    return null;
  }
}

const cookieValue = (req: Request) =>
  req.headers
    .get("cookie")
    ?.split(/;\s*/)
    .find((c) => c.startsWith(`${SESSION_COOKIE}=`))
    ?.slice(SESSION_COOKIE.length + 1);

/** Returns a 401 response when the request has no valid admin session, otherwise null. */
export function requireAdmin(req: Request): Response | null {
  return verifySession(cookieValue(req)) ? null : Response.json({ error: "Unauthorized" }, { status: 401 });
}

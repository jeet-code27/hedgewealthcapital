import { revalidateTag } from "next/cache";
import { requireAdmin } from "@/lib/server/auth";
import { dbConnect } from "@/lib/server/db";

type Ctx<P> = { params: Promise<P> };

/** Wraps an admin route handler: checks the session, connects to MongoDB and turns errors into JSON. */
export function adminRoute<P = Record<string, never>>(handler: (req: Request, ctx: Ctx<P>) => Promise<Response>) {
  return async (req: Request, ctx: Ctx<P>) => {
    const denied = requireAdmin(req);
    if (denied) return denied;
    try {
      await dbConnect();
      return await handler(req, ctx);
    } catch (err) {
      const e = err as Error & { code?: number };
      console.error("[admin api]", e);
      if (e.code === 11000) return Response.json({ error: "That slug is already in use." }, { status: 409 });
      if (/whitelist|ECONNREFUSED|ENOTFOUND|Server selection/i.test(e.message)) {
        return Response.json({ error: "Can't reach MongoDB. Check MONGODB_URI and that this server's IP is allowed in Atlas → Network Access." }, { status: 503 });
      }
      return Response.json({ error: e.message || "Something went wrong." }, { status: 500 });
    }
  };
}

/** Public blog pages, sitemap and llms.txt read posts under this tag. */
export const revalidatePosts = () => revalidateTag("posts", { expire: 0 });

export const isId = (v: unknown): v is string => typeof v === "string" && /^[a-f0-9]{24}$/i.test(v);
export const str = (v: unknown, max = 500) => (typeof v === "string" ? v.trim().slice(0, max) : "");

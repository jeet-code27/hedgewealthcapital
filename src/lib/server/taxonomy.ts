import { slugify } from "@/lib/post-html";
import { str } from "@/lib/server/admin-api";
import { Author, Category, Tag } from "@/lib/server/models";

/** Categories, tags and authors share one endpoint: ?type=category|tag|author */
export const taxonomies = {
  category: { model: Category, field: "category" },
  tag: { model: Tag, field: "tags" },
  author: { model: Author, field: "author" },
} as const;
export type TaxType = keyof typeof taxonomies;
export const taxType = (req: Request) => new URL(req.url).searchParams.get("type") as TaxType | null;

export function taxInput(type: TaxType, body: Record<string, unknown>) {
  const name = str(body.name, 80);
  const data: Record<string, string> = { name, slug: slugify(str(body.slug, 80) || name) };
  if (type === "category") data.description = str(body.description, 300);
  if (type === "author") Object.assign(data, { role: str(body.role, 80), bio: str(body.bio, 600), avatar: str(body.avatar, 600) });
  return data;
}

import { areas } from "@/lib/areas";
import { services } from "@/lib/services";
import { adminRoute } from "@/lib/server/admin-api";
import { Post } from "@/lib/server/models";

/** Internal link targets for the editor: every site page plus published posts. */
export const GET = adminRoute(async () => {
  const posts = await Post.find({ status: "Published" }).select("title slug").sort({ publishedAt: -1 }).lean();
  return Response.json([
    ...services.map((s) => ({ group: "Loan programs", title: s.name, path: s.path })),
    ...areas.map((a) => ({ group: "Local pages", title: `${a.kind} Loans in ${a.region}`, path: a.path })),
    { group: "Company", title: "Home", path: "/" },
    { group: "Company", title: "About Hedge Wealth Capital", path: "/about-hedge-wealth-capital" },
    { group: "Company", title: "Areas We Serve", path: "/areas-we-serve" },
    { group: "Company", title: "Broker Program", path: "/brokers" },
    { group: "Company", title: "Contact Us", path: "/contact-us" },
    { group: "Company", title: "Prequalify (home form)", path: "/#prequalify" },
    ...posts.map((p) => ({ group: "Blog posts", title: p.title, path: `/blog/${p.slug}` })),
  ]);
});

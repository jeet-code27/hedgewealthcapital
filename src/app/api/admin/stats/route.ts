import { adminRoute } from "@/lib/server/admin-api";
import { Category, Post, Submission } from "@/lib/server/models";
import { mailConfigured } from "@/lib/server/mailer";

export const GET = adminRoute(async () => {
  const weekAgo = new Date(Date.now() - 7 * 864e5);
  void Category;
  const [published, drafts, totalSubs, newSubs, weekSubs, byForm, recentSubs, recentPosts] = await Promise.all([
    Post.countDocuments({ status: "Published" }),
    Post.countDocuments({ status: "Draft" }),
    Submission.countDocuments(),
    Submission.countDocuments({ status: "New" }),
    Submission.countDocuments({ createdAt: { $gte: weekAgo } }),
    Submission.aggregate<{ _id: string; n: number }>([{ $group: { _id: "$form", n: { $sum: 1 } } }]),
    Submission.find().sort({ createdAt: -1 }).limit(6).select("form name email status createdAt").lean(),
    Post.find().sort({ updatedAt: -1 }).limit(5).select("title slug status updatedAt").lean(),
  ]);
  return Response.json({
    published,
    drafts,
    totalSubs,
    newSubs,
    weekSubs,
    byForm: Object.fromEntries(byForm.map((f) => [f._id, f.n])),
    recentSubs,
    recentPosts,
    mail: mailConfigured(),
    cloudinary: Boolean(process.env.CLOUDINARY_API_SECRET),
  });
});

import type { NextConfig } from "next";
import { posts } from "./src/lib/blog";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Blog images uploaded through the admin panel are served from Cloudinary.
  images: { remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }] },
  // Old WordPress URLs → new pages, so existing links and rankings carry over.
  async redirects() {
    return [
      // One canonical host: the bare domain goes to www.
      { source: "/:path*", has: [{ type: "host", value: "hedgewealthcapital.com" }], destination: "https://www.hedgewealthcapital.com/:path*", permanent: true },
      { source: "/news", destination: "/blog", permanent: true },
      { source: "/resources", destination: "/blog", permanent: true },
      ...posts.map((p) => ({ source: `/${p.slug}`, destination: `/blog/${p.slug}`, permanent: true })),
      { source: "/loan-programs/rental-loans", destination: "/dscr-loans", permanent: true },
      { source: "/loan-programs/fix-flip-loans", destination: "/hard-money-loans", permanent: true },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

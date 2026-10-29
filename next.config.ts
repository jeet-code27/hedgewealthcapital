import type { NextConfig } from "next";
import { posts } from "./src/lib/blog";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Old WordPress URLs → new pages, so existing links and rankings carry over.
  async redirects() {
    return [
      { source: "/news", destination: "/blog", permanent: true },
      { source: "/resources", destination: "/blog", permanent: true },
      ...posts.map((p) => ({ source: `/${p.slug}`, destination: `/blog/${p.slug}`, permanent: true })),
      { source: "/loan-programs/rental-loans", destination: "/dscr-loans", permanent: true },
      { source: "/loan-programs/fix-flip-loans", destination: "/hard-money-loans", permanent: true },
      { source: "/loan-programs/ground-up-construction", destination: "/bridge-loans", permanent: true },
      { source: "/loan-programs/multifamily-bridge", destination: "/bridge-loans", permanent: true },
      { source: "/loan-programs", destination: "/#loan-programs", permanent: true },
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

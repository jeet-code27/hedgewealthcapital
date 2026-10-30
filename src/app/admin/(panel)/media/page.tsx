"use client";

import { MediaGrid } from "@/components/admin/MediaPicker";
import { Card, PageHeader } from "@/components/admin/ui";

export default function MediaPage() {
  return (
    <>
      <PageHeader title="Media Library" sub="Images for blog posts, stored in Cloudinary under the hedgewealthcapital/blog folder." />
      <Card className="p-5">
        <MediaGrid />
      </Card>
    </>
  );
}

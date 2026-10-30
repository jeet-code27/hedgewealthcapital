"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PostEditor, { EditorLoading, toForm, type PostForm } from "@/components/admin/PostEditor";
import { api, ErrorBox } from "@/components/admin/ui";

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostForm | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api<Record<string, unknown>>(`/api/admin/posts/${id}`).then((p) => setPost(toForm(p)), (e) => setError(e.message));
  }, [id]);

  if (error) return <ErrorBox message={error} />;
  if (!post) return <EditorLoading />;
  return <PostEditor id={id} initial={post} />;
}

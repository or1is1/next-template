"use client";

import { usePostStore } from "@/feature/post/postStore";
import { useTRPC } from "@/lib/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export function PostList() {
  const { posts, setPost } = usePostStore();
  const { data: postList } = useQuery(useTRPC().post.list.queryOptions());

  useEffect(() => {
    if (postList) {
      setPost(postList);
    }
  }, [postList, setPost]);

  return (
    <div>
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id}>
            {post.content} - {post.createdAt}
          </div>
        ))
      ) : (
        <div>No posts found</div>
      )}
    </div>
  );
}

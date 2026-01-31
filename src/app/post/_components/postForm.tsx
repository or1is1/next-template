"use client";

import type { PostSelect } from "@/feature/post/postEntity";
import { usePostStore } from "@/feature/post/postStore";
import { authClient } from "@/lib/auth/client";
import { useTRPC } from "@/lib/trpc/client";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";

export function PostForm() {
  const session = authClient.useSession();
  const { setPost } = usePostStore();
  const { posts } = usePostStore();

  const createPostMutation = useMutation(
    useTRPC().post.create.mutationOptions({
      onSuccess: (data: PostSelect[]) => {
        const newPost = data[0];
        if (newPost) {
          setPost([...posts, newPost]);
        }
      },
      onError: (error) => {
        alert(`Create post error : ${error.message}`);
      },
    }),
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 페이지 리로드 방지

    const formData = new FormData(e.currentTarget);
    const content = formData.get("content")?.toString() ?? "";

    if (content === "") {
      alert("Content is required");
      return;
    }

    // 이미 생성된 mutation 객체의 mutate 메서드 호출
    createPostMutation.mutate({ content });
  };

  return (
    <>
      {session.data?.session ? (
        <>
          <form
            onSubmit={handleSubmit}
            className="m-8 flex flex-col items-center justify-center gap-2"
          >
            <textarea
              name="content"
              placeholder="Content"
              className="rounded-md border border-gray-300 p-2"
            />
            <button
              type="submit"
              className="cursor-pointer rounded-md bg-blue-500 p-2 text-white"
            >
              Create Post
            </button>
          </form>
          <Link
            href="/"
            className="cursor-pointer text-blue-500 hover:text-blue-600"
          >
            back to home
          </Link>
        </>
      ) : (
        <>
          <p>You are not logged in</p>
          <Link
            href="/sign-in"
            className="cursor-pointer text-blue-500 hover:text-blue-600"
          >
            move to sign in page
          </Link>
        </>
      )}
    </>
  );
}

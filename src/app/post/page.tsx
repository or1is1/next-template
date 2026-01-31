import { getQueryClient, HydrateClient, trpc } from "@/lib/trpc/server";
import { PostForm } from "./_components/postForm";
import { PostList } from "./_components/postList";

export default function PostPage() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.post.list.queryOptions());

  return (
    <HydrateClient>
      <PostForm />
      <PostList />
    </HydrateClient>
  );
}

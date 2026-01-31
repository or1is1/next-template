import "server-only";

import { postRoute } from "@/feature/post/postRoute";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { cache } from "react";
import { createInnerContext, createTRPCRouter } from "./init";
import { makeQueryClient } from "./query-client";

export const appRouter = createTRPCRouter({
  post: postRoute,
});

export type AppRouter = typeof appRouter;

export const getQueryClient = cache(makeQueryClient);

export const trpc = createTRPCOptionsProxy({
  ctx: createInnerContext,
  router: appRouter,
  queryClient: getQueryClient,
});

export function HydrateClient(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {props.children}
    </HydrationBoundary>
  );
}

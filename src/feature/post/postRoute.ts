import "server-only";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/lib/trpc/init";
import { z } from "zod";
import { postRepository } from "./postRepository";

export const postRoute = createTRPCRouter({
  list: publicProcedure.query(async () => {
    return await postRepository.findAll();
  }),
  create: protectedProcedure
    .input(
      z.object({
        content: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await postRepository.create({
        userId: ctx.user.id,
        content: input.content,
      });
    }),
});

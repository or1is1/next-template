import "server-only";

import { db } from "@/lib/db";
import { post } from "@/lib/db/schema";
import type { PostInsert } from "./postEntity";

export const postRepository = {
  findAll: async () => {
    return db.select().from(post);
  },
  create: async (postInsert: PostInsert) => {
    return db.insert(post).values(postInsert).returning();
  },
};

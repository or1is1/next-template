import "server-only";

import { post } from "@/lib/db/schema";

export type PostSelect = typeof post.$inferSelect;

export type PostInsert = typeof post.$inferInsert;

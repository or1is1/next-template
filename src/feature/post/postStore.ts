import "client-only";

import { create } from "zustand";
import { PostSelect } from "./postEntity";

export const usePostStore = create<{
  posts: PostSelect[];
  setPost: (posts: PostSelect[]) => void;
}>((set) => ({
  posts: [],
  setPost: (posts: PostSelect[]) => set({ posts }),
}));

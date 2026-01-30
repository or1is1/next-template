import "server-only";

import { db } from "@/lib/db";
import { env } from "@/lib/env";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { headers } from "next/headers";
import { cache } from "react";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  advanced: {
    defaultCookieAttributes: {
      sameSite: "none",
      secure: true,
    },
  },
  trustedOrigins: [env.NEXT_PUBLIC_APP_URL],
  plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;

export const getSession = cache(async () =>
  auth.api.getSession({ headers: await headers() }),
);

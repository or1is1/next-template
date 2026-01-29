import "server-only";

import { getSession } from "@/lib/auth/server";
import { db } from "@/lib/db";
import { initTRPC, TRPCError } from "@trpc/server";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { cache } from "react";
import superjson from "superjson";

interface CreateInnerContextOptions {
  session?: Awaited<ReturnType<typeof getSession>> | null;
}

export async function createInnerContext(opts?: CreateInnerContextOptions) {
  const isBuildTime = process.env.NEXT_PHASE === "phase-production-build";

  const session = isBuildTime
    ? null
    : opts?.session !== undefined
      ? opts.session
      : await getSession();

  return {
    db,
    session,
    user: session?.user ?? null,
  };
}

export const createTRPCContext = cache(
  async (opts?: FetchCreateContextFnOptions) => {
    const session = await getSession();
    const innerContext = await createInnerContext({ session });

    return {
      ...innerContext,
      req: opts?.req,
      headers: opts?.req?.headers,
      ip: opts?.req?.headers.get("x-forwarded-for") ?? "unknown",
      userAgent: opts?.req?.headers.get("user-agent") ?? "unknown",
    };
  },
);

type InnerContext = Awaited<ReturnType<typeof createInnerContext>>;

export type Context = InnerContext & {
  req?: Request;
  headers?: Headers;
  ip?: string;
  userAgent?: string;
};

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof Error && error.cause.name === "ZodError"
            ? error.cause
            : null,
      },
    };
  },
});

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.session || !ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "로그인이 필요합니다",
    });
  }

  return next({
    ctx: {
      ...ctx,
      session: ctx.session,
      user: ctx.user,
    },
  });
});

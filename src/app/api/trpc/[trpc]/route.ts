import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { TRPCError } from "@trpc/server";
import { createTRPCContext } from "@/lib/trpc/init";
import { appRouter } from "@/lib/trpc/server";

const MAX_BATCH_SIZE = 10;

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: async (opts) => {
      // Batch size 제한
      if (opts.info.calls.length > MAX_BATCH_SIZE) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: `배치 크기 제한(${MAX_BATCH_SIZE})을 초과했습니다`,
        });
      }

      return createTRPCContext(opts);
    },
    onError:
      process.env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
            );
          }
        : undefined,
  });

export { handler as GET, handler as POST };

"use client";

import { authClient } from "@/lib/auth/client";
import Link from "next/link";

export function Sign() {
  const { data: session } = authClient.useSession();

  return (
    <div className="flex flex-col gap-4">
      {session ? (
        <>
          <span>Signed in as {session.user?.name}</span>
          <button
            onClick={() => authClient.signOut()}
            className="cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-white"
          >
            Sign Out
          </button>
        </>
      ) : (
        <Link
          href="/sign-in"
          className="cursor-pointer text-blue-500 hover:text-blue-600"
        >
          Sign In
        </Link>
      )}
    </div>
  );
}

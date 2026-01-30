"use client";

import { authClient } from "@/lib/auth/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FormEvent } from "react";

export function SignUpForm() {
  const { data: session } = authClient.useSession();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = formData.get("email")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";
    const name = formData.get("name")?.toString() ?? "";

    const result = await authClient.signUp.email({
      name,
      email,
      password,
    });

    if (result.error) {
      alert(`Sign Up error : ${result.error.message}`);
    } else {
      redirect("/");
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      {session ? (
        redirect("/")
      ) : (
        <form
          onSubmit={onSubmit}
          className="m-8 flex flex-col items-center justify-center gap-2"
        >
          <input
            type="email"
            name="email"
            className="rounded-md border border-gray-300 p-2"
            placeholder="Email"
          />
          <input
            type="text"
            name="name"
            className="rounded-md border border-gray-300 p-2"
            placeholder="Name"
          />
          <input
            type="password"
            name="password"
            className="rounded-md border border-gray-300 p-2"
            placeholder="Password"
          />
          <button
            type="submit"
            className="cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-white"
          >
            Sign Up
          </button>
        </form>
      )}
      <Link
        href="/sign-in"
        className="cursor-pointer text-blue-500 hover:text-blue-600"
      >
        move to sign in page
      </Link>
      <Link
        href="/"
        className="cursor-pointer text-blue-500 hover:text-blue-600"
      >
        back to home
      </Link>
    </div>
  );
}

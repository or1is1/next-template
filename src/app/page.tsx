import Link from "next/link";
import { Sign } from "./_components/sign";

export default function Home() {
  return (
    <>
      <Sign />
      <Link href="/post" className="cursor-pointer text-blue-500">
        Posts
      </Link>
    </>
  );
}

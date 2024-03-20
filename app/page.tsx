import Link from "@/node_modules/next/link";

export default function Home() {
  return (
    <>
      <div>hi</div>
      <Link href="/login"> go to login page </Link>
    </>
  );
}

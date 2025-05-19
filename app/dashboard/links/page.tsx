import { db } from "@/db/drizzle";
import Link from "next/link";

export default async function Page() {
  const links = await db.query.link.findMany();

  return (
    <div className="flex h-full flex-col items-center justify-center py-2">
      <h1 className="text-2xl font-bold">Links</h1>
      <p className="mt-4 text-lg">Welcome to your links!</p>
      <p className="mt-2 text-sm text-gray-500">
        This is a placeholder for your links content. {links.length}
      </p>
      <Link href="/dashboard/links/new">Add New Link</Link>
    </div>
  );
}

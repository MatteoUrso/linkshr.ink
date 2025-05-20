import Link from "next/link";

export default async function Page() {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold">Links</h1>
      <Link href="/dashboard/links/new">Add New Link</Link>
    </div>
  );
}

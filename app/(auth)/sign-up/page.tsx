import { SignUpCard } from "./_components/sign-up-card";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign Up",
  description:
    "Create your free LinkShrink account and start shortening URLs. Get access to custom links, detailed analytics, and powerful tools to manage your shortened URLs efficiently.",
};

export default function Page() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-2 self-center font-medium",
            "focus-visible:ring-slate-8 focus-visible:ring-1 focus-visible:outline-none"
          )}
          aria-label="LinkShrink Home"
        >
          <div className="bg-indigo-9 flex h-6 w-6 items-center justify-center rounded-md text-white">
            <ExternalLink className="size-4" />
          </div>
          LinkShrink
        </Link>
        <SignUpCard />
      </div>
    </main>
  );
}

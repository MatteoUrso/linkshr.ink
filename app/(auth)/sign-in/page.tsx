import { SignInCard } from "./_components/sign-in-card";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Access your LinkShrink account to manage your shortened URLs, view analytics, and customize your links in our secure dashboard.",
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
        <SignInCard />
      </div>
    </main>
  );
}

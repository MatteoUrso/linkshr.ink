import { SignInForm } from "./_components/sign-in-form";
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
    <main className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link
            href="/"
            className={cn(
              "flex items-center gap-2 font-medium",
              "focus-visible:ring-slate-8 focus-visible:ring-offset-slate-1 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-none"
            )}
            aria-label="LinkShrink Home"
          >
            <div className="bg-indigo-9 flex h-6 w-6 items-center justify-center rounded-md text-white">
              <ExternalLink className="size-4" />
            </div>
            LinkShrink
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignInForm />
          </div>
        </div>
      </div>
      <div className="bg-slate-2 relative hidden lg:block">
        {/* <img
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        /> */}
      </div>
    </main>
  );
}

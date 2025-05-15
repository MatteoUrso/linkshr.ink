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

// TODO: Implement the skip to content link for accessibility

export default function Page() {
  return (
    <main className="grid min-h-svh lg:grid-cols-2">
      {/* <Link
        href="#signin-form"
        className="focus:border-slate-7 focus:bg-slate-2 focus:text-slate-12 sr-only focus:not-sr-only focus:absolute focus:z-50 focus:rounded focus:border focus:p-4"
      >
        Skip to sign in form
      </Link> */}
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
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-2xl font-bold">Login to your account</h1>
              <p className="text-slate-11 text-sm text-balance">
                Enter your email and password to access your account.
              </p>
            </div>
            <SignInForm id="signin-form" />
          </div>
        </div>
      </div>
      <div
        className="bg-slate-2 relative hidden lg:block"
        role="complementary"
        aria-label="Welcome to LinkShrink - Your URL Shortening Solution"
      >
        {/* <img
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        /> */}
      </div>
    </main>
  );
}

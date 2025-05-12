import { SignInForm } from "./_components/sign-in-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Access your LinkShrink account to manage your shortened URLs, view analytics, and customize your links in our secure dashboard.",
};

export default function Page() {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <h1 className="mb-4 text-4xl font-bold">Sign In</h1>
      <SignInForm />
    </main>
  );
}

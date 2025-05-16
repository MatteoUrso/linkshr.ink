import { SignUpForm } from "./_components/sign-up-form";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign Up",
  description:
    "Create your free LinkShrink account and start shortening URLs. Get access to custom links, detailed analytics, and powerful tools to manage your shortened URLs efficiently.",
};

// TODO: Implement the skip to content link for accessibility

export default function Page() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [name, setName] = useState("");

  // const handleSignUp = async () => {
  //   const { data, error } = await signUp.email(
  //     {
  //       email, // user email address
  //       password, // user password -> min 8 characters by default
  //       name, // user display name
  //       // image, // User image URL (optional)
  //       // callbackURL: "/dashboard", // A URL to redirect to after the user verifies their email (optional)
  //     },
  //     {
  //       onRequest: (ctx) => {
  //         //show loading
  //       },
  //       onSuccess: (ctx) => {
  //         alert("User created successfully");
  //         //redirect to the dashboard or sign in page
  //       },
  //       onError: (ctx) => {
  //         // display the error message
  //         alert(ctx.error.message);
  //       },
  //     }
  //   );
  // };

  // For signup, i require name, email and password

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
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-2xl font-bold">Create your account</h1>
              <p className="text-slate-11 text-sm text-balance">
                Enter your email and password to create your account. You can
                also sign up with Google.
              </p>
            </div>
            <SignUpForm id="signup-form" />
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

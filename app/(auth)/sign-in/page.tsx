"use client";

import { signIn } from "@/lib/auth-client";

export default function Page() {
  const handleSignIn = async () => {
    const { data, error } = await signIn.email(
      {
        email: "matteourso100@gmail.com", // user email address
        password: "Lopo9090!", // user password -> min 8 characters by default
      },
      {
        onRequest: (ctx) => {
          //show loading
        },
        onSuccess: (ctx) => {
          alert("User signed in successfully");
          //redirect to the dashboard or sign in page
        },
        onError: (ctx) => {
          // display the error message
          alert(ctx.error.message);
        },
      }
    );
  };

  return (
    <main className="flex h-screen w-full items-center justify-center">
      <button onClick={handleSignIn}>SignIn</button>
    </main>
  );
}

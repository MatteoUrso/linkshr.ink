"use client";

import { signUp } from "@/lib/auth-client";

export default function Page() {
  const handleSignUp = async () => {
    const { data, error } = await signUp.email(
      {
        email: "matteourso100@gmail.com", // user email address
        password: "Lopo9090!", // user password -> min 8 characters by default
        name: "Matteo Urso", // user display name
        // image, // User image URL (optional)
        // callbackURL: "/dashboard", // A URL to redirect to after the user verifies their email (optional)
      },
      {
        onRequest: (ctx) => {
          //show loading
        },
        onSuccess: (ctx) => {
          alert("User created successfully");
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
      <button onClick={handleSignUp}>SignUp</button>
    </main>
  );
}

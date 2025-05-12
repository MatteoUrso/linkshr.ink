"use client";

import { signIn } from "@/lib/auth-client";
import { useState } from "react";

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    const { data, error } = await signIn.email(
      {
        email, // user email address
        password, // user password -> min 8 characters by default
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

    console.log("SignIn data", data);
    console.log("SignIn error", error);
  };

  return <button onClick={handleSignIn}>SignIn</button>;
}

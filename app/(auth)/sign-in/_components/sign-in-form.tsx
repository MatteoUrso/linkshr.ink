"use client";

import { Icons } from "@/components/icons";
import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }).min(1, {
    message: "Email is required",
  }),

  password: z.string().min(8, {
    message: "Password must be at least 8 characters", // min 8 characters by default
  }),
});

type FormFields = z.infer<typeof formSchema>;

export function SignInForm({
  className,
  ...rest
}: React.ComponentPropsWithoutRef<"form">) {
  const router = useRouter();

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: FormFields) => {
    const { error } = await signIn.email(values, {
      onSuccess: () => {
        // TODO: Implement a better way to handle the redirect
        router.replace("/dashboard");
      },
    });

    if (error?.message) {
      form.setError("root", {
        type: "manual",
        message: error.message,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        className={cn("flex flex-col gap-6", className)}
        onSubmit={form.handleSubmit(handleSubmit)}
        noValidate
        {...rest}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  required
                  aria-required="true"
                  {...field}
                />
              </FormControl>
              <FormMessage role="alert" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel>Password</FormLabel>{" "}
                <Link
                  href="/forgot-password"
                  className={cn(
                    "text-slate-12 ml-auto text-sm",
                    "hover:underline hover:underline-offset-1",
                    "focus-visible:ring-slate-8 focus-visible:ring-offset-slate-1 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-none"
                  )}
                >
                  Forgot your password?
                </Link>
              </div>

              <FormControl>
                <PasswordInput
                  placeholder="Password"
                  autoComplete="current-password"
                  required
                  aria-required="true"
                  {...field}
                />
              </FormControl>
              <FormMessage role="alert" />
            </FormItem>
          )}
        />
        {
          // Global error message
          form.formState.errors.root?.message ? (
            <div
              role="alert"
              aria-live="assertive"
              className="text-red-11 text-[0.8rem] font-medium"
            >
              {form.formState.errors.root.message}
            </div>
          ) : null
        }
        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
          aria-busy={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="mr-2 animate-spin" aria-hidden="true" />
              <span>Signing in...</span>
            </>
          ) : (
            "Sign in"
          )}
        </Button>
        <div
          className="relative my-4 text-center"
          role="separator"
          aria-orientation="horizontal"
        >
          <hr className="border-slate-6 absolute top-1/2 w-full" />
          <span className="bg-slate-1 text-slate-11 relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={(e) => {
            e.preventDefault();
            console.log("Google login");
          }}
        >
          <Icons.google aria-hidden="true" />
          Login with Google
        </Button>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className={cn(
              "text-blue-11",
              "hover:underline hover:underline-offset-1",
              "focus-visible:ring-slate-8 focus-visible:ring-offset-slate-1 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-none"
            )}
            aria-label="Sign up for a new account"
          >
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  );
}

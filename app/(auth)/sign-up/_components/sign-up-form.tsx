"use client";

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
import { signUp } from "@/lib/auth-client";
import { USER_CONSTRAINTS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Name is required",
    })
    .max(USER_CONSTRAINTS.NAME_MAX_LENGTH, {
      message: `Name must be at most ${USER_CONSTRAINTS.NAME_MAX_LENGTH} characters`,
    }),

  email: z.string().email({ message: "Please enter a valid email" }).min(1, {
    message: "Email is required",
  }),

  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters", // min 8 characters by default
    })
    .max(128, {
      message: "Password must be at most 128 characters", // max 128 characters by default
    }),
});

type FormFields = z.infer<typeof formSchema>;

export function SignUpForm({
  className,
  ...rest
}: React.ComponentPropsWithoutRef<"form">) {
  const router = useRouter();

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: FormFields) => {
    // image, // User image URL (optional)
    // callbackURL: "/dashboard", // A URL to redirect to after the user verifies their email (optional)
    const { error } = await signUp.email(values, {
      onSuccess: () => {
        // TODO: Implement a better way to handle the redirect
        router.replace("/dashboard");
      },
    });

    // https://www.better-auth.com/docs/plugins/have-i-been-pwned#usage
    if (error?.message) {
      if (error?.code === "PASSWORD_COMPROMISED") {
        form.setError("password", {
          type: "manual",
          message: error.message,
        });
      } else if (error?.code === "USER_ALREADY_EXISTS") {
        form.setError("email", {
          type: "manual",
          message: error.message,
        });
      }
      // see file @/lib/auth.ts for the error code
      else if (error?.code === "NAME_TOO_LONG") {
        form.setError("name", {
          type: "manual",
          message: error.message,
        });
      } else {
        if (error?.message) {
          form.setError("root", {
            type: "manual",
            message: error.message,
          });
        }
      }
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  autoComplete="name"
                  autoCapitalize="words"
                  autoCorrect="off"
                  spellCheck="false"
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  type="email"
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Enter your password"
                  autoComplete="new-password"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck="false"
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
              <span>Signing up...</span>
            </>
          ) : (
            "Sign up"
          )}
        </Button>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className={cn(
              "text-blue-11",
              "hover:underline hover:underline-offset-1",
              "focus-visible:ring-slate-8 focus-visible:ring-offset-slate-1 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-none"
            )}
            aria-label="Sign in to your account"
          >
            Sign in
          </Link>
        </div>
      </form>
    </Form>
  );
}

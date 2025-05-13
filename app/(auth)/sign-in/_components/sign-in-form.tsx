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
import { signIn } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(8), // min 8 characters by default
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
      // TODO: Implement a better way to handle the error
      alert(error.message);
    }
  };

  return (
    <Form {...form}>
      <form
        className={cn("flex flex-col gap-6", className)}
        onSubmit={form.handleSubmit(handleSubmit)}
        {...rest}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-slate-11 text-sm text-balance">
            Enter your email and password to access your account.
          </p>
        </div>
        <div className="grid gap-6">
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
                    autoComplete="on"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
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
                    autoComplete="on"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : null}
            Sign in
          </Button>
          <div className="after:border-slate-6 relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-slate-1 text-slate-11 relative z-10 px-2">
              Or continue with
            </span>
          </div>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              console.log("GitHub login");
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>
            Login with Google
          </Button>
        </div>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className={cn(
              "text-blue-11",
              "hover:underline hover:underline-offset-1",
              "focus-visible:ring-slate-8 focus-visible:ring-offset-slate-1 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-none"
            )}
          >
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  );
}

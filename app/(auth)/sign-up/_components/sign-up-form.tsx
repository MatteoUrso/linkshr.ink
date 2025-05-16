import { cn } from "@/lib/utils";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }).min(1, {
    message: "Email is required",
  }),

  password: z.string().min(8, {
    message: "Password must be at least 8 characters", // min 8 characters by default
  }),
});

export function SignUpForm({
  className,
  ...rest
}: React.ComponentPropsWithoutRef<"form">) {
  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      // onSubmit={form.handleSubmit(handleSubmit)}
      noValidate
      {...rest}
    ></form>
  );
}

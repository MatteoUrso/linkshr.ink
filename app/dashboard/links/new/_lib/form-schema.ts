import { z } from "zod";

export const FormSchema = z.object({
  original_url: z
    .string()
    .url({ message: "Please enter a valid URL including http:// or https://" })
    .min(1, { message: "Original URL is required" }),
});

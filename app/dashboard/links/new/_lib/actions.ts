"use server";

// import { revalidatePath } from 'next/cache';
// import { redirect } from "next/navigation";
import { State } from "../_types/state";
import { FormSchema } from "./form-schema";
import { db } from "@/db/drizzle";
import { link } from "@/db/schema";
import { getAuthSession } from "@/lib//auth-session";
import { eq } from "drizzle-orm";
import { ZodError } from "zod";

export async function createLink(_: State, formData: FormData): Promise<State> {
  try {
    const session = await getAuthSession();
    if (!session) {
      throw new Error("Unauthorized");
    }
    const userId = session.user.id;

    if (!(formData instanceof FormData)) {
      throw new Error("Invalid form data");
    }

    const payload = Object.fromEntries(formData.entries());
    const safeData = FormSchema.parse(payload);
    const shortCode = "prova";

    // Check if the shortCode already exists
    const existingLink = await db.query.link.findFirst({
      where: eq(link.short_code, shortCode),
    });
    if (existingLink) {
      return {
        status: "error",
        message:
          "The short code already exists. Please choose a different one.",
        // errors: [
        //   {
        //     field: "short_code",
        //     message:
        //       "The short code already exists. Please choose a different one.",
        //   },
        // ],
      };
    }

    const insertLink = await db
      .insert(link)
      .values({
        userId: userId,
        original_url: safeData.original_url,
        short_code: shortCode,
      })
      .returning();
    console.log("Insert link result:", insertLink);

    return {
      status: "success",
      message: "Link created successfully!",
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        status: "error",
        message: "Validation error",
        errors: error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      };
    }

    return {
      status: "error",
      message: "An error occurred while creating the link. Please try again.",
    };
  }

  // Revalidate the cache for the links page and redirect the user.
  // revalidatePath("/dashboard/links");
  // redirect("/dashboard/links");
}

"use server";

import { State } from "../_types/state";
import { FormSchema } from "./form-schema";
import { db } from "@/db/drizzle";
import { link } from "@/db/schema";
import { getAuthSession } from "@/lib//auth-session";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
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
      throw new Error("Conflict");
    }

    await db.insert(link).values({
      userId: userId,
      original_url: safeData.original_url,
      short_code: shortCode,
    });

    revalidatePath("/dashboard/links");

    return {
      status: "success",
      message: "Link created successfully!",
    };
  } catch (error) {
    console.error("Error creating link:", error);

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

    if (error instanceof Error && error.message === "Conflict") {
      return {
        status: "error",
        message:
          "The short code already exists. Please choose a different one.",
        errors: [
          {
            field: "short_code",
            message:
              "The short code already exists. Please choose a different one.",
          },
        ],
      };
    }

    return {
      status: "error",
      message: "An error occurred while creating the link. Please try again.",
    };
  }
}

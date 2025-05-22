"use server";

import { FormSchema } from "./form-schema";
import { generateBackHalf } from "./utils";
import { db } from "@/db/drizzle";
import { link } from "@/db/schema";
import { getAuthSession } from "@/lib//auth-session";
import { FormState } from "@/types/form-state";
import { eq } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { ZodError } from "zod";

export async function createLink(
  _: FormState,
  formData: FormData
): Promise<FormState> {
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
    let isBackHalfProvided = false;
    let backHalf = safeData.backHalf?.trim() || "";
    if (backHalf.length > 0) {
      isBackHalfProvided = true;
    } else {
      backHalf = generateBackHalf(); // Generate a new short code if not provided
    }

    // Check if the backHalf already exists
    const existingLink = await db.query.link.findFirst({
      where: eq(link.backHalf, backHalf),
    });
    if (existingLink) {
      throw new Error("Conflict");
    }

    await db.insert(link).values({
      userId: userId,
      originalUrl: safeData.originalUrl,
      title: safeData.title,
      backHalf: backHalf,
      linkUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${backHalf}`,

      hasCustomBackHalf: isBackHalfProvided,

      // TODO: Check if user is a premium user
      utmSource: safeData.utmSource,
      utmMedium: safeData.utmMedium,
      utmCampaign: safeData.utmCampaign,
      utmContent: safeData.utmContent,
      utmTerm: safeData.utmTerm,
    });
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
        message: "Validation error",
        errors: [
          {
            field: "backHalf",
            message:
              "The back-half already exists. Please choose a different one.",
          },
        ],
      };
    }

    return {
      status: "error",
      message: "An error occurred while creating the link. Please try again.",
    };
  }

  // Revalidate the cache for the links page and redirect the user.
  revalidateTag("links");
  revalidatePath("/dashboard/links");
  redirect("/dashboard/links");
}

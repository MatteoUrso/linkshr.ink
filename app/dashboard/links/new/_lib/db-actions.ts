import { db } from "@/db/drizzle";
import { SelectUser, tag } from "@/db/schema";
import { eq } from "drizzle-orm";
import "server-only";

/**
 * @description Fetch all tags associated with a user from the database
 * @param userId The ID of the user whose tags you want to retrieve
 * @returns An array of tag objects associated with the user
 */
export async function getTags(userId: SelectUser["id"]) {
  const links = await db.select().from(tag).where(eq(tag.userId, userId));

  return links;
}

import { db } from "@/db/drizzle";
import { link } from "@/db/schema";
import { eq } from "drizzle-orm";
import "server-only";

/**
 * @description Search for a link in the database by its short code
 * @param shortCode The short code of the link to search for
 * @returns The link object if found, otherwise null
 */
export async function getLinkByShortCode(shortCode: string) {
  const links = await db
    .select()
    .from(link)
    .where(eq(link.shortCode, shortCode))
    .limit(1);

  return links[0] || null;
}

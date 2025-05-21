import { db } from "@/db/drizzle";
import { link } from "@/db/schema";
import { and, eq } from "drizzle-orm";
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
    .where(and(eq(link.shortCode, shortCode), eq(link.archived, false)))
    .limit(1);

  return links[0] || null;
}

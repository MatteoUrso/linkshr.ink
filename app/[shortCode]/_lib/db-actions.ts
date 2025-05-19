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
    .select({
      id: link.id,
      original_url: link.original_url,
      title: link.title,
      utm_source: link.utm_source,
      utm_medium: link.utm_medium,
      utm_campaign: link.utm_campaign,
      utm_term: link.utm_term,
      utm_content: link.utm_content,
    })
    .from(link)
    .where(eq(link.short_code, shortCode))
    .limit(1);

  return links[0] || null;
}

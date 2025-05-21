import { db } from "@/db/drizzle";
import { SelectUser, link } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import "server-only";

/**
 * @description Fetches total links and clicks for a user
 * @param userId - The ID of the user
 * @return An object containing total links and clicks
 */
export async function getTotalLinkStats(
  userId: SelectUser["id"]
): Promise<{ totalLinks: number; totalClicks: number }> {
  const result = await db
    .select({
      totalLinks: sql`count(*)`,
      totalClicks: sql`sum(${link.clicksCount})`,
    })
    .from(link)
    .where(eq(link.userId, userId));

  return {
    totalLinks: Number(result[0]?.totalLinks || 0),
    totalClicks: Number(result[0]?.totalClicks || 0),
  };
}

/**
 * @description Fetches all links for a user
 * @param userId - The ID of the user
 * @return An array of links
 */
export async function getLinks(userId: SelectUser["id"]) {
  const result = await db
    .select({
      id: link.id,
      createdAt: link.createdAt,
      clicksCount: link.clicksCount,
    })
    .from(link)
    .where(eq(link.userId, userId));

  return result;
}

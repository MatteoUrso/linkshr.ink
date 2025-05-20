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

export async function getTotalClicks(
  userId: SelectUser["id"]
): Promise<{ totalClicks: number }> {
  const result = await db
    .select({
      totalClicks: sql`sum(${link.clicksCount})`,
    })
    .from(link)
    .where(eq(link.userId, userId));

  return {
    totalClicks: Number(result[0]?.totalClicks || 0),
  };
}

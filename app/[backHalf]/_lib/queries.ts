import { db } from "@/db/drizzle";
import { SelectLink, link } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import "server-only";

export async function getLinkByBackHalf(backHalf: SelectLink["backHalf"]) {
  const links = await db
    .select()
    .from(link)
    .where(and(eq(link.backHalf, backHalf), eq(link.archived, false)))
    .limit(1);

  return links[0] || null;
}

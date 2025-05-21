import { GetLinksSchema } from "./search-params";
import { db } from "@/db/drizzle";
import { SelectUser, link } from "@/db/schema";
import { unstable_cache } from "@/lib/unstable-cache";
import { and, asc, count, eq } from "drizzle-orm";
import "server-only";

export async function getLinks(
  userId: SelectUser["id"],
  params: GetLinksSchema
) {
  return await unstable_cache(
    async () => {
      const offset = (params.page - 1) * params.limit;

      const where = and(
        eq(link.userId, userId)
        // params?.archived ? eq(link.archived, true) : undefined,
        // params?.has_qr_code ? eq(link.hasQrCode, true) : undefined,
      );

      const orderBy = asc(link.createdAt);

      const { data, total } = await db.transaction(async (tx) => {
        const data = await tx
          .select()
          .from(link)
          .limit(params.limit)
          .offset(offset)
          .where(where)
          .orderBy(orderBy);

        const total = await tx
          .select({ count: count() })
          .from(link)
          .where(where)
          .execute()
          .then((res) => res[0]?.count ?? 0);

        return {
          data,
          total,
        };
      });

      const pageCount = Math.ceil(total / params.limit);
      return { data, pageCount };
    },
    [JSON.stringify(params)],
    {
      revalidate: 1,
      tags: ["links"],
    }
  )();
}

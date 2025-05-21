import { db } from "@/db/drizzle";
import { SelectUser, link } from "@/db/schema";
import { and, asc, count, eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import "server-only";

export type GetLinksParams = {
  page: number;
  limit: number;
};
export async function getLinks(
  userId: SelectUser["id"],
  params: GetLinksParams
) {
  return await unstable_cache(
    async () => {
      // TODO: Remove this timeout
      // This is just for testing purposes to simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const offset = (params.page - 1) * params.limit;

      const where = and(
        eq(link.userId, userId)
        // params?.archived ? eq(link.archived, true) : undefined,
        // params?.has_qr_code ? eq(link.hasQrCode, true) : undefined,
        // params?.has_short_code_custom
        //   ? eq(link.hasShortCodeCustom, true)
        //   : undefined
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

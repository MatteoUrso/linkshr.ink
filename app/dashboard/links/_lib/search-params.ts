import { createSearchParamsCache, parseAsInteger } from "nuqs/server";

export const searchParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(5),
});

export type GetLinksSchema = Awaited<
  ReturnType<typeof searchParamsCache.parse>
>;

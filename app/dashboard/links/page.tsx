import { LinksList } from "./_components/links-list";
import { LinksListFilters } from "./_components/links-list-filters";
import { getLinks, getTags } from "./_lib/queries";
import { searchParamsCache } from "./_lib/search-params";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { WithAuthProps, withAuth } from "@/lib/with-auth";
import { Plus } from "lucide-react";
import Link from "next/link";
import type { SearchParams } from "nuqs/server";
import { Suspense } from "react";

// TODO: Improve loading state

type Props = WithAuthProps & {
  searchParams: Promise<SearchParams>;
};

async function Page(props: Props) {
  const searchParams = await props.searchParams;
  const search = searchParamsCache.parse(searchParams);

  const tags = await getTags(props.user.id);
  console.log("tags", tags);

  const links = getLinks(props.user.id, search);

  return (
    <div className="container mx-auto flex flex-col gap-6 px-4 py-6">
      {/* Header with actions */}
      <section
        aria-labelledby="page-title"
        className="flex flex-col justify-between gap-4 md:flex-row md:items-center"
      >
        <div>
          <h1 id="page-title" className="font-sora text-2xl font-semibold">
            Your Links
          </h1>
          <p className="text-slate-11 mt-1.5 text-sm">
            Manage and track your shortened URLs.
          </p>
        </div>
        <Button asChild className="shrink-0">
          <Link href="/dashboard/links/new">
            <Plus className="h-4 w-4" />
            <span>New Link</span>
          </Link>
        </Button>
      </section>

      <Separator />

      <div className="flex flex-col gap-3">
        {/** Filers */}
        <section aria-labelledby="filters-heading">
          <h2 id="filters-heading" className="sr-only">
            Filters
          </h2>
          <LinksListFilters />
        </section>

        {/* Links list */}
        <section
          aria-labelledby="links-list-heading"
          className="flex flex-col gap-4"
        >
          <h2 id="links-list-heading" className="sr-only">
            Your Links
          </h2>
          <Suspense fallback={<p>LOADING....</p>}>
            <LinksList promise={links} />
          </Suspense>
        </section>
      </div>
    </div>
  );
}

export default withAuth(Page);

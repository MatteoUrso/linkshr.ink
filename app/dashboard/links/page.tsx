import { LinksList } from "./_components/links-list";
import { GetLinksParams, getLinks } from "./_lib/queries";
import { Button } from "@/components/ui/button";
// import { Skeleton } from "@/components/ui/skeleton";
import { WithAuthProps, withAuth } from "@/lib/with-auth";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

// Format numbers using Intl.NumberFormat for compact display
// const formatter = new Intl.NumberFormat(siteConfig.defaultLang, {
//   notation: "compact",
//   compactDisplay: "short",
//   maximumFractionDigits: 1,
// });

// TODO: Improve loading state

async function Page({ user }: WithAuthProps) {
  const params: GetLinksParams = {
    page: 1,
    limit: 5,
  };
  const links = getLinks(user.id, params);

  const linksListId = "links-list";

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

      {/* Links list */}
      <section
        aria-labelledby="links-list-heading"
        className="flex flex-col gap-4"
      >
        <h2 id="links-list-heading" className="sr-only">
          Your Links
        </h2>
        <Suspense fallback={<p>LOADING....</p>}>
          <LinksList id={linksListId} promise={links} />
        </Suspense>
      </section>
    </div>
  );
}

export default withAuth(Page);

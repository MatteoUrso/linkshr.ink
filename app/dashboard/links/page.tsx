import { LinksList } from "./_components/links-list";
import { getLinks, getTotalLinkStats } from "./_lib/db-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";
import { siteConfig } from "@/config/site";
import { WithAuthProps, withAuth } from "@/lib/with-auth";
import { LinkIcon, MousePointerClickIcon, Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Manage Your Shortened Links",
  description:
    "Track clicks, manage and organize all your shortened URLs in one place. Create new links, view analytics, and optimize your marketing campaigns.",
};

// Format numbers using Intl.NumberFormat for compact display
const formatter = new Intl.NumberFormat(siteConfig.defaultLang, {
  notation: "compact",
  compactDisplay: "short",
  maximumFractionDigits: 1,
});

// TODO: Improve loading state

async function Page({ user }: WithAuthProps) {
  // Get basic stats
  const { totalLinks, totalClicks } = await getTotalLinkStats(user.id);
  const stats = [
    {
      title: "Total Links",
      value: totalLinks,
      icon: LinkIcon,
      srOnly: " links created",
    },
    {
      title: "Total Clicks",
      value: totalClicks,
      icon: MousePointerClickIcon,
      srOnly: " total clicks on your links",
    },
  ];

  const links = getLinks(user.id);

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

      {/* Stats overview */}
      <section
        aria-labelledby="stats-heading"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        <h2 id="stats-heading" className="sr-only">
          Link Statistics
        </h2>
        {stats.map((stat) => (
          <article className="h-full" key={stat.title}>
            <Card>
              <CardContent className="flex items-center justify-between p-6">
                <div className="space-y-1">
                  <h3 className="text-slate-11 text-sm font-medium">
                    {stat.title}
                  </h3>
                  <p className="text-2xl font-bold">
                    <span aria-live="polite">
                      {formatter.format(stat.value)}
                    </span>
                    <span className="sr-only">{stat.srOnly}</span>
                  </p>
                </div>
                <div className="bg-slate-3 rounded-full p-2" aria-hidden="true">
                  <stat.icon className="text-slate-11 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </article>
        ))}
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
  );
}

export default withAuth(Page);

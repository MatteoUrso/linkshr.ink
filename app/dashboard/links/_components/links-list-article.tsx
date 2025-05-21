import { getLinks } from "../_lib/queries";
import { cn } from "@/lib/utils";
import { BarChart2, Globe, LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  link: Awaited<ReturnType<typeof getLinks>>["data"][number];
};

export function LinksListArticle({ link }: Props) {
  const detailsId = `link-details-${link.id}`;
  const domain = new URL(link.originalUrl).hostname;
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=32`; // Return favicon for the domain 16x16 size

  return (
    <article className="border-slate-6 flex flex-col gap-3 rounded-md border p-4">
      {/** Header */}
      <header className="flex items-start justify-between bg-red-500">
        <div className="flex items-center gap-2">
          <Image
            src={faviconUrl}
            alt={`Favicon for ${domain}`}
            width={16}
            height={16}
            className="h-4 w-4 rounded"
            aria-hidden="true"
          />
          <h3 className="text-lg font-semibold">
            <Link
              href={`/dashboard/links/${link.shortCode}`}
              className="hover:underline focus-visible:outline-offset-4"
            >
              {link.title}
            </Link>
          </h3>
        </div>
        {!link.archived ? (
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "border-green-6 bg-green-9 inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold text-white transition-colors"
              )}
            >
              <span className="sr-only">Status:</span>Active
            </div>
          </div>
        ) : null}
      </header>

      {/** Link details */}
      <section aria-labelledby={detailsId} className="bg-yellow-500">
        <h4 id={`link-details-${link.id}`} className="sr-only">
          Link Details
        </h4>
        <dl className="grid gap-1 text-sm sm:grid-cols-2">
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Original URL</dt>
            <Globe className="h-4 w-4 text-slate-400" aria-hidden="true" />
            <dd className="truncate text-slate-600" title={link.originalUrl}>
              {link.originalUrl}
            </dd>
          </div>

          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Shortened URL</dt>
            <LinkIcon className="h-4 w-4 text-slate-400" aria-hidden="true" />
            <dd className="flex items-center">
              <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-sm">
                {`linkshr.ink/${link.shortCode}`}
              </code>
              <button
                type="button"
                className="ml-1.5 text-blue-600 hover:text-blue-800 focus-visible:outline-offset-2"
                aria-label="Copy shortened link to clipboard"
              >
                <span className="sr-only">Copy</span>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </button>
            </dd>
          </div>

          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Analytics</dt>
            <BarChart2 className="h-4 w-4 text-slate-400" aria-hidden="true" />
            <dd>
              <span className="font-medium">{link.clicksCount}</span>
              <span className="text-slate-500"> clicks</span>
            </dd>
          </div>
        </dl>
      </section>

      {/** Footer */}
      <footer className="border-slate-6 flex items-center justify-between border-t bg-pink-500 pt-3">
        <div className="text-sm text-slate-500">
          ID: <span className="font-mono text-xs">{link.id}</span>
        </div>

        {/* <div className="flex gap-2">
                    <Link
                      href={`/dashboard/links/${link.id}`}
                      className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 focus-visible:outline-offset-2"
                      aria-label={`View details for ${link.title || "this link"}`}
                    >
                      <span>Details</span>
                    </Link>
                    <Link
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900 focus-visible:outline-offset-2"
                      aria-label={`Visit original URL for ${link.title || "this link"}`}
                    >
                      <span>Visit</span>
                      <ExternalLink className="ml-1 h-3 w-3" aria-hidden="true" />
                    </Link>
                  </div> */}
      </footer>
    </article>
  );
}

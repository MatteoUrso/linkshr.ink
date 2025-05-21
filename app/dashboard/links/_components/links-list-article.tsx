import { formatDate } from "../_lib/format";
import { getLinks } from "../_lib/queries";
import { cn } from "@/lib/utils";
import { Calendar, Copy, LinkIcon } from "lucide-react";
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
      <header>
        <h3 className="text-lg font-semibold">{link.title}</h3>
      </header>

      {/** Link details */}
      <section aria-labelledby={detailsId}>
        <h4 id={`link-details-${link.id}`} className="sr-only">
          Link Details
        </h4>
        <dl className="flex flex-col gap-1.5 text-sm">
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Destination URL</dt>
            <Image
              src={faviconUrl}
              alt="" // Set empty alt text for decorative image
              width={16}
              height={16}
              className="flex-shrink-0 rounded"
              aria-hidden="true"
            />
            <dd className="flex min-w-0 flex-1 items-center">
              <Link
                href={link.originalUrl}
                title={link.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "font-jetbrains inline-block truncate",
                  "hover:text-blue-12",
                  "focus-visible:ring-slate-8 focus-visible:ring-1 focus-visible:outline-none"
                )}
                aria-label={`Open ${domain} in new tab (${link.originalUrl})`}
              >
                {link.originalUrl}
              </Link>
            </dd>
          </div>
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Link URL</dt>
            <LinkIcon className="size-4 flex-shrink-0" aria-hidden="true" />
            <dd className="flex min-w-0 flex-1 items-center">
              <code className="font-jetbrains inline-block truncate">
                {link.linkUrl}
              </code>
              <button
                type="button"
                className="text-slate-11 hover:text-slate-12 focus-visible:ring-slate-8 ml-2 focus-visible:ring-1 focus-visible:outline-none"
                onClick={() => {
                  navigator.clipboard.writeText(link.linkUrl);
                }}
                aria-label={`Copy ${link.linkUrl} to clipboard`}
              >
                <Copy />
              </button>
            </dd>
          </div>
        </dl>
      </section>

      {/** Footer */}
      <footer className="border-slate-6 flex items-center justify-between border-t pt-3">
        <div className="text-slate-11 flex items-center gap-1.5">
          <span className="sr-only">Created at</span>
          <Calendar className="size-3.5 flex-shrink-0" />
          <time
            className="text-xs"
            dateTime={new Date(link.createdAt).toISOString()}
          >
            {formatDate(link.createdAt, {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}
          </time>
        </div>
      </footer>
    </article>
  );
}

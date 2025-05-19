import { getLinkByShortCode } from "./_lib/db-actions";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
// https://nextjs.org/docs/app/api-reference/functions/after
import { after } from "next/server";

type Props = {
  params: Promise<{ shortCode: string }>;
};

// Prevent static generation to ensure the page is always up-to-date
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({
  params,
}: Props): Promise<Metadata | null> {
  const { shortCode } = await params;

  const linkData = await getLinkByShortCode(shortCode);

  if (!linkData) return null;

  return {
    title: linkData.title ? `${linkData.title}` : "Redirect",
    description: `You're being redirected to ${new URL(linkData.original_url).hostname}`,
    // openGraph: {
    //   title: linkData.title || "LinkShrink Redirect",
    //   description: `Redirecting to ${new URL(linkData.original_url).hostname}`,
    //   type: "website",
    // },
  };
}

export default async function Page({ params }: Props) {
  const { shortCode } = await params;

  // 1. Search the link in the database
  const linkData = await getLinkByShortCode(shortCode);

  // 2. Handle link not found
  if (!linkData) notFound();

  // 3. Handle link expiration (future feature)

  // 4. Handle password protection (future feature)

  // 5. Increment click count asynchronously (future feature)

  // 6. Build the final URL with UTM parameters if present
  const originalUrl = new URL(linkData.original_url);
  const utmParams = {
    utm_source: linkData.utm_source,
    utm_medium: linkData.utm_medium,
    utm_campaign: linkData.utm_campaign,
    utm_term: linkData.utm_term,
    utm_content: linkData.utm_content,
  };

  // Add UTM parameters to the URL if they exist
  Object.entries(utmParams).forEach(([key, value]) => {
    if (value) {
      originalUrl.searchParams.set(key, value);
    }
  });

  after(() => {
    console.log("Redirecting to:", originalUrl.toString());
  });

  // 7. Redirect to the original URL
  redirect(originalUrl.toString());
}

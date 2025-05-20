import { CreateNewLinkForm } from "./_components/create-new-link-form";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { withAuth } from "@/lib/with-auth";
import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Create New Link",
  description:
    "Create custom shortened URLs with advanced options like UTM parameters, password protection, and expiration dates. Track clicks and manage your links efficiently with LinkShrink.",
};

function Page() {
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header with navigation */}
      <div className="mb-8">
        <Button
          asChild
          variant="linkNeutral"
          className="focus-visible:ring-offset-slate-1 mb-6 h-fit px-0 py-0 focus-visible:ring-offset-2"
        >
          <Link href="/dashboard/links">
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Links</span>
          </Link>
        </Button>

        <h1 className="font-sora text-2xl font-semibold">Create New Link</h1>
        <p className="text-slate-11 mt-1.5 text-sm">
          Shorten URLs and customize with tracking options and advanced
          settings.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {/* Form section - takes up 2/3 on desktop */}
        <div className="md:col-span-2">
          <CreateNewLinkForm />
        </div>

        {/* Tips sidebar - takes up 1/3 on desktop */}
        <aside className="border-slate-6 h-fit rounded-lg border p-5 md:mt-7">
          <h2 className="font-sora mb-4 text-lg font-medium">Link Tips</h2>

          <ul className="flex flex-col gap-4 text-sm">
            <li>
              <h3 className="font-medium">Use memorable slugs</h3>
              <p className="text-slate-11">
                Short, descriptive URLs get more clicks.
              </p>
            </li>

            <li>
              <h3 className="font-medium">Add UTM parameters</h3>
              <p className="text-slate-11">
                Track campaigns effectively with proper attribution.
              </p>
            </li>

            <li>
              <h3 className="font-medium">Track link performance</h3>
              <p className="text-slate-11">
                Monitor clicks and engagement with analytics.
              </p>
            </li>
          </ul>

          <div className="border-slate-6 mt-6 border-t pt-4">
            <Button
              asChild
              variant="link"
              className="focus-visible:ring-offset-slate-1 h-fit w-fit gap-1 px-0 py-0 focus-visible:ring-offset-2"
            >
              <Link href="/help/link-best-practices">
                View link best practices
                <Icons.ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default withAuth(Page);

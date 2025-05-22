import { CreateNewLinkForm } from "./_components/create-new-link-form";
import { Button } from "@/components/ui/button";
import { withAuth } from "@/lib/with-auth";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

async function Page() {
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header with navigation */}
      <div className="mb-8">
        <Button asChild variant="linkNeutral" className="mb-6">
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
      {/* Form for creating a new link */}
      <CreateNewLinkForm />
    </div>
  );
}

export default withAuth(Page);

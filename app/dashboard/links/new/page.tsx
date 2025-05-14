import { CreateNewLinkForm } from "./_components/create-new-link-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create New Link",
  description:
    "Create custom shortened URLs with advanced options like UTM parameters, password protection, and expiration dates. Track clicks and manage your links efficiently with LinkShrink.",
};

export default function Page() {
  return (
    <div className="container mx-auto px-3 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Create New Link</h1>
        <p className="text-slate-11 mt-1 text-sm">
          Create a shortened URL with custom options, tracking, and advanced
          settings.
        </p>
      </div>
      <CreateNewLinkForm />
    </div>
  );
}

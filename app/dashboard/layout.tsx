import type { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Manage your shortened URLs, view detailed analytics, and access powerful link management tools in your personal LinkShrink dashboard.",
};

type Props = {
  children: React.ReactNode;
  // breadcrumb: React.ReactNode;
};

export default async function DashboardLayout({ children }: Readonly<Props>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  console.log("defaultOpen", defaultOpen);

  return children;
}

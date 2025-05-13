import { AppSidebar } from "./_components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { WithAuthProps, withAuth } from "@/lib/with-auth";
import type { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Manage your shortened URLs, view detailed analytics, and access powerful link management tools in your personal LinkShrink dashboard.",
};

type Props = {
  children: React.ReactNode;
  breadcrumb: React.ReactNode;
};

async function DashboardLayout({
  children,
  breadcrumb,
  user,
}: Readonly<Props> & WithAuthProps) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar
        variant="inset"
        // User info
        name={user.name}
        email={user.email}
        image={user.image}
      />
      <SidebarInset>
        <header className="border-slate-6 flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          {breadcrumb}
          {/* <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb> */}
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}

export default withAuth(DashboardLayout);

import { AppSidebar } from "./_components/app-sidebar";
import { ThemeSwitcher } from "@/components/theme-switcher";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { WithAuthProps, withAuth } from "@/lib/with-auth";
import { cookies } from "next/headers";

type Props = {
  children: React.ReactNode;
};

async function DashboardLayout({
  children,
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
      <SidebarInset className="overflow-hidden">
        <header className="border-slate-6 flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger
            className="-ml-1"
            // Set tabIndex to 1 to make it focusable when user click the trigger the first time
            tabIndex={1}
          />
          {/* <Separator orientation="vertical" className="mr-2 h-4" /> */}
          <ThemeSwitcher className="ml-auto" />

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

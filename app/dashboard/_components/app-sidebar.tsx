import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavTools } from "./nav-tools";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

type Props = React.ComponentProps<typeof Sidebar> & {
  name: string;
  email: string;
  image?: string | null;
};

export function AppSidebar({ name, email, image, ...props }: Props) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
              size="lg"
            >
              <Link href="/dashboard">
                <div className="bg-indigo-9 flex h-6 w-6 items-center justify-center rounded-md text-white">
                  <ExternalLink className="h-4 w-4" />
                </div>
                <span className="text-base font-semibold">LinkShrink</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        <NavTools />
        <NavSecondary className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser name={name} email={email} image={image} />
      </SidebarFooter>
    </Sidebar>
  );
}

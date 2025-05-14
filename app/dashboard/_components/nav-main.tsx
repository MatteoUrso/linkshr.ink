import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  BarChart2Icon,
  ChevronRight,
  LinkIcon,
  MegaphoneIcon,
  QrCodeIcon,
} from "lucide-react";
import Link from "next/link";

const items = [
  {
    title: "Links",
    icon: LinkIcon,
    href: "/dashboard/links",
    // subItems: [
    //   {
    //     title: "All Links",
    //     href: "/dashboard/links",
    //   },
    //   {
    //     title: "Featured Links",
    //     href: "/dashboard/links/featured",
    //   },
    //   {
    //     title: "Archived Links",
    //     href: "/dashboard/links/archived",
    //   },
    // ],
  },
  {
    title: "Analytics",
    icon: BarChart2Icon,
    href: "/dashboard/analytics",
  },
  {
    title: "Campaigns",
    icon: MegaphoneIcon,
    href: "/dashboard/campaigns",
    // subItems: [
    //   {
    //     title: "Active Campaigns",
    //     href: "/dashboard/campaigns/active",
    //   },
    //   {
    //     title: "Campaign Builder",
    //     href: "/dashboard/campaigns/builder",
    //   },
    //   {
    //     title: "Results",
    //     href: "/dashboard/campaigns/results",
    //   },
    // ],
  },
  {
    title: "QR Codes",
    icon: QrCodeIcon,
    href: "/dashboard/qr-codes",
  },
];

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild>
            <SidebarMenuItem>
              <SidebarMenuButton asChild size="lg">
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
              {/* {item.subItems?.length ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                      <ChevronRight />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.subItems.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <Link href={subItem.href}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null} */}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

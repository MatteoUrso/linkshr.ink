"use client";

import { NavItem } from "./nav-item";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import {
  BarChart2Icon,
  LinkIcon,
  MegaphoneIcon,
  QrCodeIcon,
} from "lucide-react";

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
          <NavItem key={item.title} item={item} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

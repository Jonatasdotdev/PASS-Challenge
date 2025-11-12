"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Activity,
  BusFront,
  Package,
  BedDouble,
  Ticket,
  Camera,
  Star,
  Map,
  DollarSign,
  CalendarDays,
  Puzzle,
  MapPin,
  FileText,
  Settings,
  GalleryVerticalEnd,
} from "lucide-react"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  teams: [
    {
      name: "Pass",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
}

function SimpleNav() {
  return (
    <div className="flex flex-col px-2 py-2 text-sm">
      {/* Main */}
      <div className="text-xs capitalize text-muted-foreground px-2 py-2 font-semibold">
        Main
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-accent cursor-pointer">
          <LayoutDashboard className="h-4 w-4" />
          <span>Panel</span>
        </div>
        <div className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-accent cursor-pointer">
          <Activity className="h-4 w-4" />
          <span>Activity</span>
        </div>
      </div>

      {/* Services*/}
      <div className="text-xs capitalize text-muted-foreground px-2 py-2 font-semibold mt-4">
        Services
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 rounded-md bg-accent px-2 py-1.5 cursor-pointer">
          <BusFront className="h-4 w-4" />
          <span>Transfer</span>
        </div>
        <div className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-accent cursor-pointer">
          <Package className="h-4 w-4" />
          <span>Combo</span>
        </div>
        <div className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-accent cursor-pointer">
          <BedDouble className="h-4 w-4" />
          <span>Accommodation</span>
        </div>
        <div className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-accent cursor-pointer">
          <Ticket className="h-4 w-4" />
          <span>Ticket</span>
        </div>
        <div className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-accent cursor-pointer">
          <Camera className="h-4 w-4" />
          <span>Tour</span>
        </div>
        <div className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-accent cursor-pointer">
          <Star className="h-4 w-4" />
          <span>Experience</span>
        </div>
        <div className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-accent cursor-pointer">
          <Map className="h-4 w-4" />
          <span>Circuit</span>
        </div>
      </div>

      {/* Commercial */}
      <div className="text-xs capitalize text-muted-foreground px-2 py-2 font-semibold mt-4">
        Commercial
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-accent cursor-pointer">
          <DollarSign className="h-4 w-4" />
          <span>Tariff</span>
        </div>
        <div className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-accent cursor-pointer">
          <CalendarDays className="h-4 w-4" />
          <span>Availability</span>
        </div>
      </div>

      {/* Complements */}
      <div className="text-xs capitalize text-muted-foreground px-2 py-2 font-semibold mt-4">
        Complements
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-accent cursor-pointer">
          <Puzzle className="h-4 w-4" />
          <span>Slots</span>
        </div>
        <div className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-accent cursor-pointer">
          <MapPin className="h-4 w-4" />
          <span>Perimeters</span>
        </div>
        <div className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-accent cursor-pointer">
          <FileText className="h-4 w-4" />
          <span>Guidelines</span>
        </div>
      </div>

      {/* Organization */}
      <div className="text-xs capitalize text-muted-foreground px-2 py-2 font-semibold mt-4">
        Organization
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-accent cursor-pointer">
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </div>
      </div>
    </div>
  )
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="z-50 [&_[data-sidebar]]:!z-50" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <SimpleNav />
      </SidebarContent>
      <SidebarFooter>
        <div className="p-2 text-xs text-muted-foreground text-center">
          {/* footer */}
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

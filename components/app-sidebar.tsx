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
  Building2,
} from "lucide-react"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar"

const data = {
  teams: [
    {
      name: "Pass",
      logo: Building2,
      plan: "Enterprise",
    },

    {
      name: "Allynsis",
      logo: Building2,
      plan: "Professional",
    },
    {
      name: "Google",
      logo: Building2,
      plan: "Professional",
    }
  ],
  
}

function SimpleNav() {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"
  
  return (
    <div className={`flex flex-col ${isCollapsed ? "items-center py-2" : "px-2 py-2"} text-sm`}>
      {/* Main */}
      {!isCollapsed && (
        <div className="text-xs capitalize text-muted-foreground px-2 py-2 font-semibold">
          Main
        </div>
      )}
      <div className={`flex flex-col ${isCollapsed ? "gap-1" : "gap-1"}`}>
        <div
          className={`flex items-center gap-2 rounded-md ${
            isCollapsed ? "justify-center px-2 py-2 hover:bg-accent" : "px-2 py-1.5 hover:bg-accent"
          } cursor-pointer`}
        >
          <LayoutDashboard className="h-4 w-4" />
          {!isCollapsed && <span>Panel</span>}
        </div>
        <div
          className={`flex items-center gap-2 rounded-md ${
            isCollapsed ? "justify-center px-2 py-2 hover:bg-accent" : "px-2 py-1.5 hover:bg-accent"
          } cursor-pointer`}
        >
          <Activity className="h-4 w-4" />
          {!isCollapsed && <span>Activity</span>}
        </div>
      </div>

      {/* Services */}
      {!isCollapsed && (
        <div className="text-xs capitalize text-muted-foreground px-2 py-2 font-semibold mt-4">
          Services
        </div>
      )}
      {isCollapsed && <div className="my-3" />}
      
      <div className={`flex flex-col ${isCollapsed ? "gap-1" : "gap-1"}`}>
        <div
          className={`flex items-center gap-2 rounded-md ${
            isCollapsed ? "justify-center px-2 py-2 bg-accent" : "bg-accent px-2 py-1.5"
          } cursor-pointer`}
        >
          <BusFront className="h-4 w-4" />
          {!isCollapsed && <span>Transfer</span>}
        </div>
        <div
          className={`flex items-center gap-2 rounded-md ${
            isCollapsed ? "justify-center px-2 py-2 hover:bg-accent" : "px-2 py-1.5 hover:bg-accent"
          } cursor-pointer`}
        >
          <Package className="h-4 w-4" />
          {!isCollapsed && <span>Combo</span>}
        </div>
        <div
          className={`flex items-center gap-2 rounded-md ${
            isCollapsed ? "justify-center px-2 py-2 hover:bg-accent" : "px-2 py-1.5 hover:bg-accent"
          } cursor-pointer`}
        >
          <BedDouble className="h-4 w-4" />
          {!isCollapsed && <span>Accommodation</span>}
        </div>
        <div
          className={`flex items-center gap-2 rounded-md ${
            isCollapsed ? "justify-center px-2 py-2 hover:bg-accent" : "px-2 py-1.5 hover:bg-accent"
          } cursor-pointer`}
        >
          <Ticket className="h-4 w-4" />
          {!isCollapsed && <span>Ticket</span>}
        </div>
        <div
          className={`flex items-center gap-2 rounded-md ${
            isCollapsed ? "justify-center px-2 py-2 hover:bg-accent" : "px-2 py-1.5 hover:bg-accent"
          } cursor-pointer`}
        >
          <Camera className="h-4 w-4" />
          {!isCollapsed && <span>Tour</span>}
        </div>
        <div
          className={`flex items-center gap-2 rounded-md ${
            isCollapsed ? "justify-center px-2 py-2 hover:bg-accent" : "px-2 py-1.5 hover:bg-accent"
          } cursor-pointer`}
        >
          <Star className="h-4 w-4" />
          {!isCollapsed && <span>Experience</span>}
        </div>
        <div
          className={`flex items-center gap-2 rounded-md ${
            isCollapsed ? "justify-center px-2 py-2 hover:bg-accent" : "px-2 py-1.5 hover:bg-accent"
          } cursor-pointer`}
        >
          <Map className="h-4 w-4" />
          {!isCollapsed && <span>Circuit</span>}
        </div>
      </div>

      {/* Commercial */}
      {!isCollapsed && (
        <div className="text-xs capitalize text-muted-foreground px-2 py-2 font-semibold mt-4">
          Commercial
        </div>
      )}
      {isCollapsed && <div className="my-3" />}
      
      <div className={`flex flex-col ${isCollapsed ? "gap-1" : "gap-1"}`}>
        <div
          className={`flex items-center gap-2 rounded-md ${
            isCollapsed ? "justify-center px-2 py-2 hover:bg-accent" : "px-2 py-1.5 hover:bg-accent"
          } cursor-pointer`}
        >
          <DollarSign className="h-4 w-4" />
          {!isCollapsed && <span>Tariff</span>}
        </div>
        <div
          className={`flex items-center gap-2 rounded-md ${
            isCollapsed ? "justify-center px-2 py-2 hover:bg-accent" : "px-2 py-1.5 hover:bg-accent"
          } cursor-pointer`}
        >
          <CalendarDays className="h-4 w-4" />
          {!isCollapsed && <span>Availability</span>}
        </div>
      </div>

      {/* Complements - sem Puzzle no modo colapsado */}
      {!isCollapsed && (
        <div className="text-xs capitalize text-muted-foreground px-2 py-2 font-semibold mt-4">
          Complements
        </div>
      )}
      {!isCollapsed && (
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
      )}

      {/* Organization */}
      {!isCollapsed && (
        <div className="text-xs capitalize text-muted-foreground px-2 py-2 font-semibold mt-4">
          Organization
        </div>
      )}
      {!isCollapsed && (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-accent cursor-pointer">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </div>
        </div>
      )}
    </div>
  )
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"
  
  return (
    <Sidebar 
      className="z-50 [&_[data-sidebar]]:!z-50 [&_[data-sidebar=rail]]:hidden" 
      {...props}
    >
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <SimpleNav />
      </SidebarContent>
      <SidebarFooter>
        {isCollapsed ? (
          <div className="flex flex-col items-center py-2 gap-3">
            <div className="flex items-center justify-center gap-2 rounded-md px-2 py-2 hover:bg-accent cursor-pointer">
              <Puzzle className="h-4 w-4" />
            </div>
            <div className="flex items-center justify-center gap-2 rounded-md px-2 py-2 hover:bg-accent cursor-pointer">
              <Settings className="h-4 w-4" />
            </div>
          </div>
        ) : (
          <div className="p-2 text-xs text-muted-foreground text-center">
            {/* footer */}
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
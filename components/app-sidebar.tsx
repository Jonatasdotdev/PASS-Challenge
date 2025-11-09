"use client"
import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  HandCoins,
  CircleDollarSign,
} from "lucide-react"
import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  teams: [
    {
      name: "PASS",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Pass Bussiness",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Pass Corp",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Serviços",
      url: "#",
      icon: HandCoins,
      isActive: true,
      items: [
        {
          title: "Transfer",
          url: "#",
        },
        {
          title: "Combo",
          url: "#",
        },
        {
          title: "Hospedagem",
          url: "#",
        },
        {
          title: "Ingresso",
          url: "#",
        },
        {
          title: "Passeio",
          url: "#",
        },
        {
          title: "Experiência",
          url: "#",
        },
        {
          title: "Circuito",
          url: "#",
        }
      ],
    },
    {
      title: "Comercial",
      url: "#",
      icon: CircleDollarSign,
      items: [
        {
          title: "Tarifário",
          url: "#",
        },
        {
          title: "Disponibilidade",
          url: "#",
        },
        
      ],
    },
    {
      title: "Complementos",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Slots",
          url: "#",
        },
        {
          title: "Perimetros",
          url: "#",
        },
        {
          title: "Diretrizes",
          url: "#",
        },
        
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" className="z-50 [&_[data-sidebar]]:!z-50" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <div className="p-2 text-xs text-muted-foreground text-center">
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
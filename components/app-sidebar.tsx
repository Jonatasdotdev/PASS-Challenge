"use client"
import * as React from "react"
import {
  LayoutDashboard,
  Activity,
  DollarSign,
  ChevronDown,
  ChevronRight,
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

export const navItems = [
  { id: "painel", label: "Panel", href: "/", icon: LayoutDashboard },
  { id: "atividade", label: "Activity", href: "/atividade", icon: Activity },
  { id: "contas-a-pagar", label: "À Pagar", href: "/contas-a-pagar", icon: DollarSign },
  { id: "settings", label: "Settings", href: "/settings", icon: Settings },
];

function SimpleNav() {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"
  const [isContasOpen, setIsContasOpen] = React.useState(true)
  
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

      {/* Financeiro - NOVA SEÇÃO */}
      {!isCollapsed && (
        <div className="text-xs capitalize text-muted-foreground px-2 py-2 font-semibold mt-4">
          Financeiro
        </div>
      )}
      {isCollapsed && <div className="my-3" />}
      
      <div className={`flex flex-col ${isCollapsed ? "gap-1" : "gap-1"}`}>
        {/* Contas com Dropdown */}
        {!isCollapsed ? (
          <>
            <div
              className="flex items-center justify-between rounded-md px-2 py-1.5 hover:bg-accent cursor-pointer"
              onClick={() => setIsContasOpen(!isContasOpen)}
            >
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                <span>Contas</span>
              </div>
              {isContasOpen ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </div>
            
            {/* Dropdown de Contas */}
            {isContasOpen && (
              <div className="ml-4 flex flex-col gap-1 border-l border-border pl-2">
                <div
                  className="flex items-center gap-2 rounded-md px-2 py-1.5 bg-accent cursor-pointer"
                >
                  <DollarSign className="h-3 w-3" />
                  <span className="text-xs">À Pagar</span>
                </div>
                {/*À Receber*/}
                <div
                  className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-accent cursor-pointer"
                >
                  <DollarSign className="h-3 w-3" />
                  <span className="text-xs">À Receber</span>
                </div> 
              </div>
            )}
          </>
        ) : (
          // Modo colapsado - mostra apenas o ícone de Contas
          <div
            className="flex items-center justify-center px-2 py-2 bg-accent rounded-md cursor-pointer"
            title="Contas"
          >
            <DollarSign className="h-4 w-4" />
          </div>
        )}
      </div>

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
"use client";

import { Grip, Users, Truck, Store, Network, BarChart3, Building2, Link2, Plug } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AppItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
}

const apps: AppItem[] = [
  { name: "Workspace", icon: Users },
  { name: "Transfer", icon: Truck },
  { name: "Marketplace", icon: Store },
  { name: "Flow", icon: Network },
  { name: "Balance", icon: BarChart3 },
  { name: "Office", icon: Building2 },
  { name: "Channel", icon: Link2 },
  { name: "Connect", icon: Plug },
];

export default function PassAppsMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
        >
          <Grip className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-4">
        <div className="grid grid-cols-3 gap-3">
          {apps.map((app) => {
            const Icon = app.icon;
            return (
              <button
                key={app.name}
                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors group"
              >
                <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center group-hover:bg-muted/70 transition-colors">
                  <Icon className="h-6 w-6 text-muted-foreground" />
                </div>
                <span className="text-xs font-medium">
                  {app.name}
                </span>
              </button>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


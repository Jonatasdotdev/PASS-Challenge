"use client";

import { Grip, Users, Truck, Store, Network, BarChart3, Building2, Link2, Plug } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors"
        >
          <Grip className="h-5 w-5 text-black dark:text-white transition-colors" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-80 p-4 bg-white dark:bg-[#2a2a2a] border-gray-200 dark:border-[#3a3a3a] max-w-[80vw] sm:max-w-lg">
        <div className="grid grid-cols-3 gap-3">
          {apps.map((app) => {
            const Icon = app.icon;
            return (
              <button
                key={app.name}
                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-[#3a3a3a] transition-colors group"
              >
                <div className="h-12 w-12 rounded-lg bg-gray-100 dark:bg-[#3a3a3a] flex items-center justify-center group-hover:bg-gray-200 dark:group-hover:bg-[#4a4a4a] transition-colors">
                  <Icon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                </div>
                <span className="text-xs font-medium text-gray-900 dark:text-white">
                  {app.name}
                </span>
              </button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}


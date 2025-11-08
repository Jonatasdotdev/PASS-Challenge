"use client";

import { useState } from "react";
import { Search, Bell, Settings, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "@/components/theme-provider";
import PassAppsMenu from "@/components/pass-apps-menu";
import ProfileMenu from "@/components/profile-menu";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { open } = useSidebar();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" style={{ marginLeft: open ? '16rem' : '0' }}>
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center gap-4 flex-1">
          <SidebarTrigger />
          <h1 className="font-semibold">Contas a Pagar</h1>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar... (⌘K)"
              className="pl-9 h-9 md:w-[300px] lg:w-[400px]"
              onFocus={() => setSearchOpen(true)}
              onBlur={() => setSearchOpen(false)}
            />
          </div>

          {/* Language Selector */}
          <Select defaultValue="pt">
            <SelectTrigger className="w-[100px] h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pt">Português</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            title="Alternar tema"
            className="h-9 w-9"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
          >
            <Bell className="h-4 w-4" />
          </Button>

          {/* Settings */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
          >
            <Settings className="h-4 w-4" />
          </Button>

          {/* Pass Apps Menu */}
          <PassAppsMenu />

          {/* Profile Menu */}
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
}


"use client";

import { useState } from "react";
import { Search, Bell, Settings, Sun, Moon, Menu } from "lucide-react";
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

interface HeaderProps {
  onSidebarToggle?: () => void;
  sidebarOpen?: boolean;
}

export default function Header({ onSidebarToggle, sidebarOpen = true }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-[#2a2a2a] z-30 transition-[background-color,border-color] duration-300" style={{ paddingLeft: sidebarOpen ? '16rem' : '1rem' }}>
      <div className="flex items-center justify-between h-full px-6">
        {/* Left side - Sidebar Toggle & Page Title */}
        <div className="flex items-center gap-4 flex-1">
          {onSidebarToggle && (
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors"
              onClick={onSidebarToggle}
            >
              <Menu className="h-5 w-5 text-black dark:text-white transition-colors" />
            </Button>
          )}
          <h1 className="text-base font-normal text-gray-900 dark:text-white">Contas a Pagar</h1>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar... CTRL+K"
              className="pl-10 bg-gray-50 dark:bg-[#2a2a2a] border-gray-200 dark:border-[#3a3a3a] text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-500 focus:border-blue-600 focus:ring-blue-600"
              onFocus={() => setSearchOpen(true)}
              onBlur={() => setSearchOpen(false)}
            />
          </div>

          {/* Language Selector */}
          <Select defaultValue="pt">
            <SelectTrigger className="w-[120px] bg-gray-50 dark:bg-[#2a2a2a] border-gray-200 dark:border-[#3a3a3a] text-gray-900 dark:text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-[#2a2a2a] border-gray-200 dark:border-[#3a3a3a]">
              <SelectItem value="pt" className="text-gray-900 dark:text-white">Português</SelectItem>
              <SelectItem value="en" className="text-gray-900 dark:text-white">English</SelectItem>
            </SelectContent>
          </Select>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            title="Alternar tema"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-black dark:text-white transition-colors" />
            ) : (
              <Moon className="h-5 w-5 text-black dark:text-white transition-colors" />
            )}
          </Button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors"
          >
            <Bell className="h-5 w-5 text-black dark:text-white transition-colors" />
          </Button>

          {/* Settings */}
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors"
          >
            <Settings className="h-5 w-5 text-black dark:text-white transition-colors" />
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


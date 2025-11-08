"use client";

import { useState } from "react";
import { Search, Bell, Settings, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-[#1a1a1a] border-b border-[#2a2a2a] z-30">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left side - Search */}
        <div className="flex items-center gap-4 flex-1">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar... CTRL+K"
              className="pl-10 bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-gray-500 focus:border-blue-600 focus:ring-blue-600"
              onFocus={() => setSearchOpen(true)}
              onBlur={() => setSearchOpen(false)}
            />
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <Select defaultValue="pt">
            <SelectTrigger className="w-[120px] bg-[#2a2a2a] border-[#3a3a3a] text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#2a2a2a] border-[#3a3a3a]">
              <SelectItem value="pt">Português</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-300 hover:bg-[#2a2a2a] hover:text-white"
          >
            <Bell className="h-5 w-5" />
          </Button>

          {/* Settings */}
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-300 hover:bg-[#2a2a2a] hover:text-white"
          >
            <Settings className="h-5 w-5" />
          </Button>

          {/* User Avatar */}
          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
            <span className="text-white text-sm font-semibold">JD</span>
          </div>
        </div>
      </div>
    </header>
  );
}


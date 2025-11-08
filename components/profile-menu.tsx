"use client";

import { Settings, LogOut, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function ProfileMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 rounded-full bg-blue-600 hover:bg-blue-700 p-0"
        >
          <span className="text-white text-sm font-semibold">JD</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-64 bg-white dark:bg-[#2a2a2a] border-gray-200 dark:border-[#3a3a3a]"
      >
        <DropdownMenuLabel className="px-4 py-3">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              Jonathan Doe
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              jonhdoe@example.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-200 dark:bg-[#3a3a3a]" />
        <DropdownMenuItem className="px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#3a3a3a] cursor-pointer">
          <div className="flex items-center gap-3">
            <Settings className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            <span className="text-sm">Conta</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem className="px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#3a3a3a] cursor-pointer">
          <div className="flex items-center gap-3">
            <Settings className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            <span className="text-sm">Configurações</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-gray-200 dark:bg-[#3a3a3a]" />
        <DropdownMenuItem className="px-4 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-[#3a3a3a] cursor-pointer">
          <div className="flex items-center gap-3">
            <LogOut className="h-4 w-4" />
            <span className="text-sm">Log out</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


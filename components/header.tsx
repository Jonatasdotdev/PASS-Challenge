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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { useTheme } from "@/components/theme-provider";
import PassAppsMenu from "@/components/pass-apps-menu";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import Link from "next/link";

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { state } = useSidebar(); 

  const user = {
    name: "Jônatas",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  };

  const isCollapsed = state === "collapsed";

  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-6">
        {/* Left side - Sidebar Trigger and Breadcrumb */}
        <div className="flex items-center gap-4 flex-1">
          <SidebarTrigger className="h-8 w-8 flex-shrink-0" />
          
          {/* Breadcrumb Navigation */}
          <Breadcrumb className="flex-shrink-0">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/" className="text-sm truncate">
                    Dashboard
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-sm truncate">Contas a Pagar</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Center - Search Bar -  */}
        <div className="flex justify-center flex-1">
          <div className="relative w-full max-w-56 min-w-0">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar... (⌘K)"
              className="pl-9 h-8 w-full"
              onFocus={() => setSearchOpen(true)}
              onBlur={() => setSearchOpen(false)}
            />
          </div>
            </div>
        {/* Right side - Actions */}
        <div className="flex items-center justify-end gap-3 flex-1">
          {/* Language Selector - Hide on very small screens */}
          <div className={`${isCollapsed ? 'sm:block' : 'lg:block'}`}>
            <Select defaultValue="pt">
              <SelectTrigger className="w-[120px] h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pt">Português</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            title="Alternar tema"
            className="h-8 w-8"
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
            className="h-8 w-8"
          >
            <Bell className="h-4 w-4" />
          </Button>

          {/* Settings - Hide on small screens when sidebar expanded */}
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${isCollapsed ? 'flex' : 'hidden lg:flex'}`}
          >
            <Settings className="h-4 w-4" />
          </Button>

          {/* Pass Apps Menu */}
          <PassAppsMenu />

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 p-0"
              >
                <Avatar className="h-6 w-6">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-xs">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 rounded-lg"
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Configurações
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell className="mr-2 h-4 w-4" />
                  Notificações
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span className="text-destructive">Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
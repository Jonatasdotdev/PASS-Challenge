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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Label } from "@radix-ui/react-select";

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
   <header className="sticky top-0 py-0 z-10 w-full border-b rounded-t-xl bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-[#0a0a0a]">
      <div className="flex h-12 items-center px-4 sm:px-6">
        {/* Left side - Sidebar Trigger, Title and Breadcrumb */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
          <SidebarTrigger className="h-8 w-8 flex-shrink-0" />

           {/* Separador vertical*/}
            <div className="h-3 w-px bg-border hidden sm:block"></div>
  
          {/* Título pequeno */}
          <div className="flex items-center gap-2">
            <h1 className="text-xs font-normal text-foreground hidden sm:block truncate">
              Contas a Pagar
            </h1>
          </div>
            
            
          
          {/* Breadcrumb Navigation - Hide on very small screens */}
          <Breadcrumb className="flex-shrink-0 hidden xs:flex">
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
                <BreadcrumbPage className="text-sm truncate">Financeiro</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Center - Search Bar - Hide on mobile, show in sheet */}
        <div className="hidden sm:flex justify-center flex-1">
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
        <div className="flex items-center justify-end gap-2 sm:gap-3 flex-1">
          {/* Mobile Search Trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 sm:hidden flex"
              >
                <Search className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="h-32">
              <div className="flex flex-col gap-4 pt-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Buscar..."
                    className="pl-9 h-10 w-full text-base"
                  />
                </div>
              </div>
            </SheetContent>
          </Sheet>

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

          {/* Language Selector */}
          <div className="hidden sm:block">
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

          {/* Notifications */}
          
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
          >
            <Bell className="h-4 w-4" />
          </Button>
          

          {/* Pass Apps Menu */}
          <Button asChild variant="ghost" size="icon" className="h-8 w-8">
            <span>
              <PassAppsMenu />
            </span>
          </Button>
      
            <Sheet>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col gap-6 pt-6">
                {/* User Info */}
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="text-sm">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Language Selector Mobile */}
                  <div className="space-y-2">
                    <Label className="text-sm">Idioma</Label>
                    <Select defaultValue="pt">
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pt">Português</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="h-4 w-4 mr-2" />
                      Configurações
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Bell className="h-4 w-4 mr-2" />
                      Notificações
                    </Button>
                  </div>

                  {/* Pass Apps in Mobile */}
                  <div className="border-t pt-4">
                    <PassAppsMenu />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* User Profile - Desktop only */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 p-0 hidden sm:flex"
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
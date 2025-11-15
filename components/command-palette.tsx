"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator, CommandDialog } from "@/components/ui/command";
import { navItems } from "./app-sidebar";

type Item = {
  id: string;
  label: string;
  href?: string;
  icon?: React.ComponentType<any>;
};

export default function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const router = useRouter();
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  // Toggle com Ctrl/Cmd+K
  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const isK = e.key.toLowerCase() === "k";
      if ((e.ctrlKey || e.metaKey) && isK) {
        e.preventDefault();
        setOpen((v) => !v);
        if (!open) {
          setTimeout(() => inputRef.current?.focus(), 0);
        }
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const items: Item[] = navItems as Item[];

  function onSelect(it: Item) {
    setOpen(false);
    setValue("");
    if (it.href) router.push(it.href);
  }

  const groups = {
    Main: ["Panel", "Activity"],
    Services: ["Transfer", "Combo", "Accommodation", "Ticket", "Tour", "Experience", "Circuit"],
    Commercial: ["Tariff", "Availability"],
    Complements: ["Slots", "Perimeters", "Guidelines"],
    Organization: ["Settings"],
  };

  const groupEntries = Object.entries(groups);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="border border-input relative flex h-8 w-full max-w-[280px] items-center gap-2 rounded-md bg-transparent px-3 py-1 text-sm ring-offset-background transition-colors hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className="flex-1 text-left text-muted-foreground font-normal text-xs">
          Buscar...
        </span>
        <kbd className="pointer-events-none hidden select-none items-center gap-0.5 rounded-sm border bg-transparent px-2 py-0 font-sans text-[9px] font-normal text-muted-foreground opacity-100 sm:flex h-4">
          <span className="text-[9px]">CTRL+</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="rounded-lg text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-3.5 [&_[cmdk-input-wrapper]_svg]:w-3.5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-1.5">
          <CommandInput
            ref={inputRef}
            placeholder="Digite um comando ou pesquise..."
            value={value}
            onValueChange={setValue}
            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground border-0"
          />

          <CommandList className="max-h-[280px] overflow-y-auto">
            <CommandEmpty className="py-6 text-center text-sm text-foreground">
              Nenhum resultado encontrado.
            </CommandEmpty>

            {groupEntries.map(([groupHeading, labels], index) => {
              const groupItems = items.filter((it) => labels.includes(it.label));
              if (groupItems.length === 0) return null;

              return (
                <React.Fragment key={groupHeading}>
                  <CommandGroup
                    className="text-foreground overflow-hidden p-2 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-normal [&_[cmdk-group-heading]]:text-foreground"
                    heading={groupHeading}
                              >
                    {groupItems.map((it) => {
                      const Icon = it.icon;
                      return (
                        <CommandItem
                            key={it.id}
                            onSelect={() => onSelect(it)}
                            className="data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground relative flex cursor-pointer items-center gap-3 rounded-md px-2 py-1.5 text-sm outline-none select-none"
                          >
                            {Icon && <Icon className="h-3.5 w-3.5 text-foreground" />}
                            <span className="text-xs font-normal text-foreground">{it.label}</span>
                          </CommandItem>
                      );
                    })}
                  </CommandGroup>

                  {/* separator */}
                  {index < groupEntries.length - 1 && (
                    <CommandSeparator className="bg-border -mx-1 h-px" />
                  )}
                </React.Fragment>
              );
            })}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
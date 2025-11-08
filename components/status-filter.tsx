"use client";

import * as React from "react";
import { Check, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

interface StatusOption {
  value: string;
  label: string;
  count?: number;
}

interface StatusFilterProps {
  value: string[];
  onChange: (value: string[]) => void;
  options: StatusOption[];
}

export function StatusFilter({ value, onChange, options }: StatusFilterProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

  const selectedLabels = value.length > 0
    ? options
        .filter((opt) => value.includes(opt.value))
        .map((opt) => opt.label)
        .join(", ")
    : "Status";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[140px] justify-between bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#2a2a2a] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#2a2a2a] hover:text-gray-900 dark:hover:text-white"
        >
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span className="truncate">{selectedLabels}</span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px] p-0 bg-white dark:bg-[#2a2a2a] border-gray-200 dark:border-[#3a3a3a]">
        <Command className="bg-white dark:bg-[#2a2a2a]">
          <CommandInput
            placeholder="Filtrar status..."
            className="bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white border-gray-200 dark:border-[#3a3a3a]"
          />
          <CommandList>
            <CommandEmpty>Nenhum status encontrado.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = value.includes(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => handleSelect(option.value)}
                    className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#3a3a3a] cursor-pointer"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <div
                          className={cn(
                            "flex h-4 w-4 items-center justify-center rounded-sm border border-gray-300 dark:border-[#4a4a4a]",
                            isSelected
                              ? "bg-blue-600 border-blue-600"
                              : "bg-white dark:bg-[#1a1a1a]"
                          )}
                        >
                          {isSelected && (
                            <Check className="h-3 w-3 text-white" />
                          )}
                        </div>
                        <span>{option.label}</span>
                      </div>
                      {option.count !== undefined && (
                        <span className="text-gray-500 dark:text-gray-400 text-sm">
                          {option.count}
                        </span>
                      )}
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}


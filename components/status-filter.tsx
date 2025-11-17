"use client";

import * as React from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox"; 
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
  const [query, setQuery] = React.useState("");

  const handleSelect = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

 
  const selectedLabels = React.useMemo(() => {
    if (value.length === 0) return "Status";
    if (value.length === 1) {
      const option = options.find(opt => opt.value === value[0]);
      return option?.label || "Status";
    }
    return `${value.length} selecionados`;
  }, [value, options]);

  // filtra opções localmente pelo input
  const visibleOptions = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-8 min-w-[120px] max-w-[160px] justify-between bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#2a2a2a] text-black dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#2a2a2a] hover:text-gray-900 dark:hover:text-white"
        >
          <div className="flex items-center gap-2 truncate">
            <Filter className="h-4 w-4 flex-shrink-0" />
            <span className="truncate text-xs">{selectedLabels}</span>
          </div>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="z-[9999] w-[240px] p-0 bg-white dark:bg-[#171717] border-gray-200 dark:border-[#2a2a2a]"
        align="start"
      >
       
        <div className="p-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filtrar status..."
            className="w-full px-2 py-1 text-sm bg-transparent text-gray-900 dark:text-white outline-none placeholder:text-gray-500 dark:placeholder:text-gray-400"
          />
        </div>
        
        {/* Separator horizontal */}
        <div className="h-px bg-gray-200 dark:bg-[#2a2a2a] w-full" />

        {/* Lista de opções*/}
        <div className="max-h-56 overflow-auto p-1">
          {visibleOptions.length === 0 ? (
            <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
              Nenhum status encontrado.
            </div>
          ) : (
            visibleOptions.map((option) => {
              const isSelected = value.includes(option.value);
              return (
                <div
                  key={option.value}
                  className={cn(
                    "flex items-center space-x-2 p-2 rounded-md transition-colors cursor-pointer",
                    "hover:bg-gray-100 dark:hover:bg-[#1a1a1a]",
                    isSelected && "bg-blue-50 dark:bg-blue-900/20"
                  )}
                  onClick={() => handleSelect(option.value)}
                >
                  <Checkbox
                    id={`checkbox-${option.value}`}
                    checked={isSelected}
                    onCheckedChange={() => handleSelect(option.value)}
                    className="h-3 w-3"
                  />
                  <label
                    htmlFor={`checkbox-${option.value}`}
                    className="flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-900 dark:text-white cursor-pointer select-none"
                  >
                    {option.label}
                  </label>
                  {option.count !== undefined && (
                    <span className="text-gray-500 dark:text-gray-400 text-xs bg-gray-100 dark:bg-[#1a1a1a] px-1.5 py-0.5 rounded">
                      {option.count}
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
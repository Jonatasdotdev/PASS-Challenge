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

  const selectedLabels =
    value.length > 0
      ? options
          .filter((opt) => value.includes(opt.value))
          .map((opt) => opt.label)
          .join(", ")
      : "Status";

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
          className="h-8 w-[120px] justify-between border-dashed bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#2a2a2a] text-black dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#2a2a2a] hover:text-gray-900 dark:hover:text-white"
        >
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span className="truncate">{selectedLabels}</span>
          </div>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="z-[9999] w-[240px] p-2 bg-white dark:bg-[#2a2a2a] border-gray-200 dark:border-[#3a3a3a]"
      >
        {/* Input de filtro simples */}
        <div className="px-1 pb-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filtrar status..."
            className="w-full rounded-md border px-2 py-1 text-sm bg-white dark:bg-[#2a2a2a] border-gray-200 dark:border-[#3a3a3a] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Lista de opções*/}
        <div className="max-h-56 overflow-auto">
          {visibleOptions.length === 0 ? (
            <div className="px-2 py-2 text-sm text-gray-500 dark:text-gray-400">Nenhum status encontrado.</div>
          ) : (
            visibleOptions.map((option) => {
              const isSelected = value.includes(option.value);
              return (
                <div
                  key={option.value}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-50 dark:hover:bg-[#2a2a2a] rounded-md"
                >
                  <Checkbox
                    id={`checkbox-${option.value}`}
                    checked={isSelected}
                    onCheckedChange={() => handleSelect(option.value)}
                  />
                  <label
                    htmlFor={`checkbox-${option.value}`}
                    className="flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-900 dark:text-white cursor-pointer"
                  >
                    {option.label}
                  </label>
                  {option.count !== undefined && (
                    <span className="text-gray-500 dark:text-gray-400 text-sm">{option.count}</span>
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
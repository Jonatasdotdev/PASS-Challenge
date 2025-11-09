"use client";

import * as React from "react";
import { Check, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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
          className="h-8 w-[140px] justify-between bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#2a2a2a] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#2a2a2a] hover:text-gray-900 dark:hover:text-white"
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

        {/* Lista de opções (botões) */}
        <div className="max-h-56 overflow-auto">
          {visibleOptions.length === 0 ? (
            <div className="px-2 py-2 text-sm text-gray-500 dark:text-gray-400">Nenhum status encontrado.</div>
          ) : (
            visibleOptions.map((option) => {
              const isSelected = value.includes(option.value);
              return (
                <button
                  key={option.value}
                  type="button"
                  // prevenir mousedown para não fechar o popover / perder foco
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    handleSelect(option.value);
                    // manter o popover aberto (não chamamos setOpen(false))
                  }}
                  className="w-full text-left px-2 py-2 hover:bg-gray-50 dark:hover:bg-[#2a2a2a] rounded-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "flex h-4 w-4 items-center justify-center rounded-sm border border-gray-300 dark:border-[#4a4a4a] transition-colors",
                          isSelected ? "bg-blue-600 border-blue-600" : "bg-white dark:bg-[#1a1a1a]"
                        )}
                      >
                        {isSelected && <Check className="h-3 w-3 text-white" />}
                      </div>
                      <span className="text-sm text-gray-900 dark:text-white">{option.label}</span>
                    </div>
                    {option.count !== undefined && (
                      <span className="text-gray-500 dark:text-gray-400 text-sm">{option.count}</span>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

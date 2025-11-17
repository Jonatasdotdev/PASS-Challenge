import { useState, useEffect, useRef } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Search, X, Check } from "lucide-react";

export function KeywordPicker({
  keywords,
  setKeywords,
  isEditing,
  textLabel,
  inputSmall,
  baseBoxSmall,
}: {
  keywords: string[];
  setKeywords: (updater: (prev: string[]) => string[]) => void;
  isEditing: boolean;
  textLabel: string;
  inputSmall: string;
  baseBoxSmall: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);


  const available = keywords;
  const filtered = (available || []).filter((k) =>
    k.toLowerCase().includes(query.toLowerCase())
  );

  const addKeyword = (value?: string) => {
    const v = (value ?? query).trim();
    if (!v) return;
    setKeywords((prev) => (prev.includes(v) ? prev : [...prev, v]));
    setQuery("");
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const toggleKeyword = (k: string) => {
    setKeywords((prev) => (prev.includes(k) ? prev.filter(x => x !== k) : [...prev, k]));
  };

  const removeKeyword = (k: string) => {
    setKeywords((prev) => prev.filter(x => x !== k));
  };

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [open]);

  return (
    <div className="mt-4">
      <Label className={textLabel}>Tags</Label>

      <Popover open={open} onOpenChange={(v) => { setOpen(v); if (!v) setQuery(""); }}>
        <PopoverTrigger asChild>
          <button
            type="button"
           
            className={`w-full flex items-center gap-2 px-2 py-1 rounded-md border ${isEditing ? "border-gray-300 dark:border-[#1f1f1f] hover:border-gray-400 dark:hover:border-white/40" : "border-transparent"} bg-transparent text-left`}
            aria-haspopup="dialog"
            aria-expanded={open}
            disabled={!isEditing}
          >
            <div className="flex-1 flex flex-wrap gap-1 items-center">
              {keywords.length === 0 ? (
                <span className="text-xs text-gray-400 dark:text-gray-500">Nenhuma tag</span>
              ) : (
                keywords.map((kw) => (
                  <span
                    key={kw}
                   
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[hsl(var(--chip-bg))] text-xs text-black dark:text-gray-200 border border-gray-300 dark:border-[#1f1f1f]"
                  >
                    <span className="max-w-[12rem] truncate">{kw}</span>
                    {isEditing && (
                      <button
                        onClick={(e) => { e.stopPropagation(); removeKeyword(kw); }}
                        className="h-4 w-4 flex items-center justify-center p-0"
                        aria-label={`Remover ${kw}`}
                      >
                        <X className="h-3 w-3 text-gray-400" />
                      </button>
                    )}
                  </span>
                ))
              )}
            </div>

            <div className="flex items-center gap-2">
              {keywords.length > 0 && (
                <button
                  type="button"
                  className="h-6 w-6 flex items-center justify-center rounded-md hover:bg-gray-200/5"
                  onClick={(e) => { e.stopPropagation(); setKeywords(() => []); }}
                  aria-label="Limpar tags"
                >
                  <X className="h-4 w-4 text-gray-400" />
                </button>
              )}
            </div>
          </button>
        </PopoverTrigger>

       
        <PopoverContent className="w-[718px]  p-1 bg-[hsl(var(--popover))] text-[hsl(var(--popover-foreground))] border border-gray-300 dark:border-[#1f1f1f] rounded-md shadow-lg">
      
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") { e.preventDefault(); addKeyword(); }
                if (e.key === "Escape") { setOpen(false); }
              }}
              placeholder="Digite aqui para buscar ou criar tags"
             
              className="w-full h-7 pl-9 pr-3 rounded-md bg-transparent text-sm placeholder:text-gray-500 focus:outline-none"
              autoComplete="off"
              aria-label="Pesquisar ou adicionar tag"
            />
          </div>

          {/* separator  */}
          <hr className="my-1 border-t border-gray-300 dark:border-[#1f1f1f]" />

          
          <div className="mt-1 max-h-44 overflow-auto rounded-md">
            {filtered.length === 0 ? (
              <div className="px-2 py-1 text-xs text-muted-foreground">
                {query ? (
                  <div className="flex items-center justify-between">
                    <span>Criar tag “{query}”</span>
                    <span
                      onClick={() => addKeyword(query)}
                      className="text-xs cursor-pointer text-[hsl(var(--popover-foreground))] hover:underline"
                      role="button"
                      tabIndex={0}
                    >
                      Criar
                    </span>
                  </div>
                ) : (
                  <span>Nenhuma tag disponível</span>
                )}
              </div>
            ) : (
              filtered.map((k) => {
                const selected = keywords.includes(k);
                return (
                  <button
                    key={k}
                    onClick={() => toggleKeyword(k)}
                   
                    className={`w-full text-left flex items-center justify-between px-3 py-1.5 text-sm rounded-md hover:bg-[hsl(var(--secondary))]`}
                    aria-pressed={selected}
                  >
                    <div className="truncate">{k}</div>
                    <div className="flex items-center gap-2">
                      {selected && <Check className="h-4 w-4 text-[hsl(var(--popover-foreground))]" />}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

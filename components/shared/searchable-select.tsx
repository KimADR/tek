"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { cn, sortFrenchStrings } from "@/lib/utils";

interface SearchableSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: string[];
  label: string;
  placeholder: string;
  searchPlaceholder?: string;
  allLabel?: string;
  className?: string;
}

export function SearchableSelect({
  value,
  onValueChange,
  options,
  label,
  placeholder,
  searchPlaceholder,
  allLabel = "Toutes",
  className,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const sortedOptions = useMemo(
    () => sortFrenchStrings(options),
    [options],
  );

  const filteredOptions = useMemo(() => {
    if (!search.trim()) {
      return sortedOptions;
    }

    const searchValue = search.trim().toLowerCase();
    return sortedOptions.filter((option) =>
      option.toLowerCase().includes(searchValue),
    );
  }, [search, sortedOptions]);

  const selectedLabel = value === allLabel ? placeholder : value;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setSearch("");
    }
  }, [isOpen]);

  const handleSelection = (option: string) => {
    onValueChange(option);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className={cn("relative", className)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="flex h-10 w-full items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-3 text-left text-sm text-slate-700 transition hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setIsOpen((current) => !current)}
      >
        <span className={cn(value === allLabel ? "text-slate-500" : "text-slate-900")}>{selectedLabel}</span>
        <ChevronDown className="h-4 w-4 text-slate-500" />
      </button>

      {isOpen && (
        <div
          className="absolute left-0 z-20 mt-2 w-full min-w-[260px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg"
          style={{ maxWidth: "calc(100vw - 2rem)" }}
        >
          <div className="flex items-center gap-3 border-b border-slate-200 px-3 py-3">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              type="search"
              value={search}
              autoFocus
              onChange={(event) => setSearch(event.target.value)}
              placeholder={searchPlaceholder ?? `Rechercher ${label.toLowerCase()}...`}
              className="h-10 w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              aria-label={`Rechercher ${label.toLowerCase()}`}
            />
          </div>
          <ul role="listbox" className="max-h-[280px] overflow-auto p-1">
            <li>
              <button
                type="button"
                onClick={() => handleSelection(allLabel)}
                className="flex h-10 w-full items-center rounded-lg px-3 text-left text-sm text-slate-700 transition hover:bg-slate-100"
                title={placeholder}
              >
                {placeholder}
              </button>
            </li>
            {filteredOptions.length === 0 ? (
              <li className="px-3 py-3 text-sm text-slate-500">Aucun résultat trouvé</li>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = option === value;
                return (
                  <li key={option}>
                    <button
                      type="button"
                      onClick={() => handleSelection(option)}
                      className={cn(
                        "flex h-10 w-full items-center justify-between rounded-lg px-3 text-left text-sm transition",
                        isSelected ? "bg-blue-50 text-slate-900" : "text-slate-700 hover:bg-slate-100",
                      )}
                      title={option}
                    >
                      <span className="max-w-[calc(100%-32px)] truncate">{option}</span>
                      {isSelected && <Check className="h-4 w-4 text-blue-600" />}
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

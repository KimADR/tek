"use client";

import { cn } from "@/lib/utils";

interface FilterCount {
  all: number;
  planned: number;
  ongoing: number;
  completed: number;
  cancelled: number;
}

interface SessionStatusTabsProps {
  activeStatus: string;
  onStatusChange: (status: string) => void;
  counts: FilterCount;
}

const filters = [
  { key: "Tous", label: "Toutes", countKey: "all" },
  { key: "Prévue", label: "Prévues", countKey: "planned" },
  { key: "En cours", label: "En cours", countKey: "ongoing" },
  { key: "Terminée", label: "Terminées", countKey: "completed" },
  { key: "Annulée", label: "Annulées", countKey: "cancelled" },
];

export function SessionStatusTabs({
  activeStatus,
  onStatusChange,
  counts,
}: SessionStatusTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 lg:gap-3">
      {filters.map(({ key, label, countKey }) => {
        const count = counts[countKey as keyof FilterCount];
        const isActive = activeStatus === key;

        return (
          <button
            key={key}
            onClick={() => onStatusChange(key)}
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
              "whitespace-nowrap flex-shrink-0",
              isActive
                ? "bg-blue-600 text-white border-blue-600 shadow-sm hover:bg-blue-700 active:bg-blue-800"
                : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50 active:bg-slate-100",
            )}
            title={`Afficher les sessions ${label.toLowerCase()}`}
          >
            <span>{label}</span>
            <span
              className={cn(
                "inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-semibold",
                isActive
                  ? "bg-blue-400 text-blue-900"
                  : "bg-slate-100 text-slate-600",
              )}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

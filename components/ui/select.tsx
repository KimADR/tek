import { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "h-10 w-full appearance-none rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-normal text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 disabled:bg-slate-50 disabled:text-slate-500",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}

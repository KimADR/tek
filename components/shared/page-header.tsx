import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  icon,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-end md:justify-between",
        className
      )}
    >
      <div className="min-w-0 flex-1 max-w-3xl">
        <div className="mb-2 flex items-center gap-3">
          {icon && <div className="flex-shrink-0">{icon}</div>}
          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">{title}</h1>
        </div>
        {description && (
          <p className="mt-1 text-sm leading-relaxed text-slate-600 md:text-base">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex-shrink-0">{actions}</div>}
    </div>
  );
}

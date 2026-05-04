import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
  variant?: "default" | "compact";
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  variant = "default",
}: EmptyStateProps) {
  const isCompact = variant === "compact";

  return (
    <Card className={cn("border border-slate-200", isCompact && "bg-slate-50")}>
      <CardContent
        className={cn(
          "flex flex-col items-center justify-center text-center",
          isCompact ? "py-8" : "py-16"
        )}
      >
        {icon && (
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-slate-100">
            <div className="text-slate-400">{icon}</div>
          </div>
        )}
        {!icon && (
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-slate-100">
            <svg
              className="h-8 w-8 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
        )}
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <p className="mt-2 max-w-sm text-sm text-slate-600">{description}</p>
        {action && <div className="mt-6">{action}</div>}
      </CardContent>
    </Card>
  );
}

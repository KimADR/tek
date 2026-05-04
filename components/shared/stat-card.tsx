import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "blue" | "green" | "yellow" | "red" | "neutral" | "purple" | "orange";

interface Trend {
  value: number;
  isPositive: boolean;
}

interface StatCardProps {
  label?: string;
  title?: string;
  value: string | number;
  icon: ReactNode;
  trend?: Trend;
  variant?: Variant;
}

const variantStyles: Record<Variant, { bg: string; icon: string; border: string }> = {
  blue: { bg: "bg-blue-50", icon: "text-blue-700 bg-blue-100", border: "border-blue-100" },
  green: { bg: "bg-green-50", icon: "text-green-700 bg-green-100", border: "border-green-100" },
  yellow: { bg: "bg-amber-50", icon: "text-amber-700 bg-amber-100", border: "border-amber-100" },
  red: { bg: "bg-red-50", icon: "text-red-700 bg-red-100", border: "border-red-100" },
  neutral: { bg: "bg-slate-50", icon: "text-slate-700 bg-slate-100", border: "border-slate-100" },
  purple: { bg: "bg-purple-50", icon: "text-purple-700 bg-purple-100", border: "border-purple-100" },
  orange: { bg: "bg-orange-50", icon: "text-orange-700 bg-orange-100", border: "border-orange-100" },
};

export function StatCard({
  label,
  title,
  value,
  icon,
  trend,
  variant = "blue",
}: StatCardProps) {
  const styles = variantStyles[variant];
  const displayLabel = label || title || "Statistique";

  return (
    <Card className={cn("overflow-hidden border", styles.bg, styles.border)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">{displayLabel}</p>
            <p className="mt-3 text-3xl font-bold text-slate-900">{value}</p>
            {trend && (
              <p
                className={cn(
                  "text-xs font-semibold mt-2",
                  trend.isPositive ? "text-green-600" : "text-red-600"
                )}
              >
                {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
              </p>
            )}
          </div>
          <div className={cn("rounded-lg p-3 flex-shrink-0", styles.icon)}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

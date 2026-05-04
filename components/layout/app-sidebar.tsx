"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType } from "react";
import {
  Award,
  BarChart3,
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
} from "lucide-react";
import { appRoutes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { useDashboardData } from "@/hooks/use-dashboard-data";
import { useToast } from "@/components/shared/toast-provider";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  "Tableau de bord": LayoutDashboard,
  Formations: BookOpen,
  Sessions: CalendarDays,
  Participants: Users,
  Présences: ClipboardCheck,
  Certificats: Award,
  Rapports: BarChart3,
  Paramètres: Settings,
};

export function AppSidebar({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const { data } = useDashboardData();
  const user = data?.currentUser;
  const { pushToast } = useToast();

  const handleLogout = () => {
    pushToast("Déconnexion en cours...");
    // Logic de déconnexion à implémenter
  };

  return (
    <aside className={cn("flex w-full flex-col border-b border-slate-800 bg-slate-900 p-4 md:sticky md:top-0 md:h-screen md:w-64 md:border-b-0 md:border-r", className)}>
      {/* Logo Section */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white shadow-sm flex-shrink-0">
          TF
        </div>
        <div className="hidden md:block">
          <p className="text-sm font-semibold text-white">TekFutura</p>
          <p className="text-xs text-slate-400">Formations</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {appRoutes.map((route) => {
          const Icon = iconMap[route.label];
          const active = pathname === route.href;

          return (
            <Link
              key={route.href}
              href={route.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                active
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-300 hover:bg-slate-800",
              )}
            >
              {Icon ? <Icon className="h-4 w-4 flex-shrink-0" /> : null}
              <span className="hidden md:inline">{route.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="border-t border-slate-800 pt-3 space-y-2">
        {user && (
          <div className="hidden md:block px-2.5 py-2 rounded-lg bg-slate-800/50">
            <p className="text-xs font-semibold text-white truncate">{user.nom ?? "Utilisateur"}</p>
            <p className="text-xs text-slate-400 mt-0.5 truncate">{user.role ?? "Admin"}</p>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="w-full justify-start text-xs text-slate-400 hover:text-slate-300 hover:bg-slate-800 px-2.5"
        >
          <LogOut className="h-3.5 w-3.5 mr-2 flex-shrink-0" />
          <span className="hidden md:inline">Déconnexion</span>
        </Button>
      </div>
    </aside>
  );
}

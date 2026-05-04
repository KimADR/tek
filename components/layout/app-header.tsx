"use client";

import { Bell, Search } from "lucide-react";
import { Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDashboardData } from "@/hooks/use-dashboard-data";
import { useToast } from "@/components/shared/toast-provider";

export function AppHeader({ onMenuToggle }: { onMenuToggle?: () => void }) {
  const { data } = useDashboardData();
  const user = data?.currentUser;
  const { pushToast } = useToast();

  const handleNotification = () => {
    pushToast("Vous n'avez pas de nouvelles notifications");
  };

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white px-4 py-3 md:px-6">
      <div className="flex items-center justify-between gap-4">
        {/* Center: Search (takes left space) */}
        <div className="flex flex-1 items-center gap-2">
          <button
            type="button"
            onClick={onMenuToggle}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 md:hidden"
            aria-label="Ouvrir le menu"
          >
            <Menu className="h-4 w-4" />
          </button>
          <div className="relative hidden max-w-md lg:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              className="pl-9"
              placeholder="Rechercher une formation, session..."
              type="search"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {/* Notification Button */}
          <button
            onClick={handleNotification}
            className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-all duration-200 hover:bg-slate-50 hover:text-slate-900"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          {/* Separator */}
          <div className="h-6 w-px bg-slate-200"></div>

          {/* User Avatar & Name */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white flex-shrink-0">
              {user?.nom?.charAt(0).toUpperCase() ?? "U"}
            </div>
            <div className="hidden md:block min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">{user?.nom ?? "Utilisateur"}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

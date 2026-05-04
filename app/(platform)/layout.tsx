"use client";

import { useState } from "react";
import { useEffect } from "react";
import { ReactNode } from "react";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppHeader } from "@/components/layout/app-header";
import { ToastProvider } from "@/components/shared/toast-provider";

export default function PlatformLayout({ children }: { children: ReactNode }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (!mobileSidebarOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileSidebarOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileSidebarOpen]);

  return (
    <ToastProvider>
      <div className="min-h-screen bg-slate-50 md:flex">
        <div className="hidden md:block">
          <AppSidebar />
        </div>
        {mobileSidebarOpen ? (
          <div className="fixed inset-0 z-40 md:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-slate-900/40"
              aria-label="Fermer le menu"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative h-full w-64 max-w-[85vw]">
              <AppSidebar className="h-full border-r border-slate-800 border-b-0" onNavigate={() => setMobileSidebarOpen(false)} />
            </div>
          </div>
        ) : null}
        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <AppHeader onMenuToggle={() => setMobileSidebarOpen(true)} />
          <main className="flex-1 overflow-x-hidden p-4 md:p-8">{children}</main>
        </div>
      </div>
    </ToastProvider>
  );
}

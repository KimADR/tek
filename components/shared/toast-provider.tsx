"use client";

import { createContext, ReactNode, useContext, useMemo, useState } from "react";

interface ToastItem {
  id: string;
  title: string;
}

interface ToastContextValue {
  pushToast: (title: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const value = useMemo(
    () => ({
      pushToast(title: string) {
        const id = Math.random().toString(36).slice(2, 9);
        setToasts((current) => [...current, { id, title }]);
        window.setTimeout(() => {
          setToasts((current) => current.filter((toast) => toast.id !== id));
        }, 2500);
      },
    }),
    [],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed right-4 bottom-4 z-50 space-y-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-900 shadow-lg"
          >
            {toast.title}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }

  return context;
}

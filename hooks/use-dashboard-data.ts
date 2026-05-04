"use client";

import { useCallback } from "react";
import { getDashboardOverview } from "@/lib/api";
import { useAsyncResource } from "@/hooks/use-async-resource";

export function useDashboardData() {
  const loader = useCallback(
    () => getDashboardOverview().then((response) => response.data),
    [],
  );

  return useAsyncResource(loader);
}

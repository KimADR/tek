"use client";

import { useCallback } from "react";
import { listCertificates } from "@/lib/api";
import { useAsyncResource } from "@/hooks/use-async-resource";

export function useCertificatesData() {
  const loader = useCallback(
    () => listCertificates().then((response) => response.data),
    [],
  );
  const resource = useAsyncResource(loader);

  return {
    ...resource,
    certificates: resource.data ?? [],
  };
}

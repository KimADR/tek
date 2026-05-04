"use client";

import { useCallback } from "react";
import { createFormation, listFormations } from "@/lib/api";
import { FormationPayload } from "@/types";
import { useAsyncResource } from "@/hooks/use-async-resource";

export function useFormationsData() {
  const loader = useCallback(
    () => listFormations().then((response) => response.data),
    [],
  );
  const resource = useAsyncResource(loader);

  const addFormation = async (payload: FormationPayload) => {
    const response = await createFormation(payload);
    await resource.refresh();
    return response;
  };

  return {
    ...resource,
    formations: resource.data ?? [],
    addFormation,
  };
}

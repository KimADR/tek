"use client";

import { useCallback } from "react";
import { createSession, getSessionById, listSessions } from "@/lib/api";
import { SessionPayload } from "@/types";
import { useAsyncResource } from "@/hooks/use-async-resource";

export function useSessionsData() {
  const loader = useCallback(
    () => listSessions().then((response) => response.data),
    [],
  );
  const resource = useAsyncResource(loader);

  const addSession = async (payload: SessionPayload) => {
    const response = await createSession(payload);
    await resource.refresh();
    return response;
  };

  return {
    ...resource,
    sessions: resource.data ?? [],
    addSession,
  };
}

export function useSessionDetail(id: string) {
  const loader = useCallback(
    () => getSessionById(id).then((response) => response.data),
    [id],
  );
  return useAsyncResource(loader);
}

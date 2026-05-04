"use client";

import { useCallback } from "react";
import { createParticipant, listParticipants } from "@/lib/api";
import { ParticipantPayload } from "@/types";
import { useAsyncResource } from "@/hooks/use-async-resource";

export function useParticipantsData() {
  const loader = useCallback(
    () => listParticipants().then((response) => response.data),
    [],
  );
  const resource = useAsyncResource(loader);

  const addParticipant = async (payload: ParticipantPayload) => {
    const response = await createParticipant(payload);
    await resource.refresh();
    return response;
  };

  return {
    ...resource,
    participants: resource.data ?? [],
    addParticipant,
  };
}

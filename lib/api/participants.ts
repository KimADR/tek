"use client";

import { ApiItemResponse, ApiListResponse, Participant, ParticipantPayload } from "@/types";
import { createId, readState, writeState } from "@/lib/api/base";

export async function listParticipants(): Promise<ApiListResponse<Participant>> {
  const state = await readState();
  return { data: state.participants, total: state.participants.length };
}

export async function createParticipant(
  payload: ParticipantPayload,
): Promise<ApiItemResponse<Participant>> {
  const next = await writeState((state) => {
    const participant: Participant = {
      id: createId("p"),
      ...payload,
    };
    state.participants = [participant, ...state.participants];
    if (!state.entreprises.includes(payload.entreprise)) {
      state.entreprises = [...state.entreprises, payload.entreprise];
    }
    return state;
  });

  return { data: next.participants[0], message: "Participant ajouté" };
}

"use client";

import { ApiItemResponse, ApiListResponse, Formation, FormationPayload } from "@/types";
import { createId, readState, writeState } from "@/lib/api/base";

export async function listFormations(): Promise<ApiListResponse<Formation>> {
  const state = await readState();
  return { data: state.formations, total: state.formations.length };
}

export async function createFormation(
  payload: FormationPayload,
): Promise<ApiItemResponse<Formation>> {
  const next = await writeState((state) => {
    const formation: Formation = {
      id: createId("f"),
      ...payload,
      sessionsCount: 0,
    };
    state.formations = [formation, ...state.formations];
    if (!state.formationsPopulaires.some((item) => item.nom === payload.categorie)) {
      state.formationsPopulaires = [
        ...state.formationsPopulaires,
        { nom: payload.categorie, participants: 0 },
      ];
    }
    return state;
  });

  return { data: next.formations[0], message: "Formation enregistrée" };
}

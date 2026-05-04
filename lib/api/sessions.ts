"use client";

import { ApiItemResponse, ApiListResponse, Session, SessionPayload } from "@/types";
import { createId, readState, writeState } from "@/lib/api/base";

export async function listSessions(): Promise<ApiListResponse<Session>> {
  const state = await readState();
  return { data: state.sessions, total: state.sessions.length };
}

export async function getSessionById(id: string): Promise<ApiItemResponse<Session | null>> {
  const state = await readState();
  return { data: state.sessions.find((session) => session.id === id) ?? null };
}

export async function createSession(payload: SessionPayload): Promise<ApiItemResponse<Session>> {
  const next = await writeState((state) => {
    const session: Session = {
      id: createId("s"),
      ...payload,
    };
    state.sessions = [session, ...state.sessions];
    state.formations = state.formations.map((formation) =>
      formation.id === payload.formationId
        ? { ...formation, sessionsCount: formation.sessionsCount + 1 }
        : formation,
    );
    return state;
  });

  return { data: next.sessions[0], message: "Session planifiée" };
}

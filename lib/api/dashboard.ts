"use client";

import { ApiItemResponse } from "@/types";
import { readState } from "@/lib/api/base";

export async function getDashboardOverview(): Promise<
  ApiItemResponse<{
    dashboardStats: ReturnType<typeof mapStats>;
    inscriptionsParMois: ReturnType<typeof mapInscriptions>;
    formationsPopulaires: ReturnType<typeof mapPopular>;
    repartitionCategories: ReturnType<typeof mapCategories>;
    evolutionPresence: ReturnType<typeof mapPresence>;
    sessionsRecentes: ReturnType<typeof mapRecentSessions>;
    currentUser: { nom: string; role: string; email: string };
  }>
> {
  const state = await readState();

  return {
    data: {
      dashboardStats: mapStats(state.dashboardStats),
      inscriptionsParMois: mapInscriptions(state.inscriptionsParMois),
      formationsPopulaires: mapPopular(state.formationsPopulaires),
      repartitionCategories: mapCategories(state.repartitionCategories),
      evolutionPresence: mapPresence(state.evolutionPresence),
      sessionsRecentes: mapRecentSessions(state.sessions),
      currentUser: state.currentUser,
    },
  };
}

function mapStats(stats: Awaited<ReturnType<typeof readState>>["dashboardStats"]) {
  return stats;
}

function mapInscriptions(inscriptions: Awaited<ReturnType<typeof readState>>["inscriptionsParMois"]) {
  return inscriptions;
}

function mapPopular(data: Awaited<ReturnType<typeof readState>>["formationsPopulaires"]) {
  return data;
}

function mapCategories(data: Awaited<ReturnType<typeof readState>>["repartitionCategories"]) {
  return data;
}

function mapPresence(data: Awaited<ReturnType<typeof readState>>["evolutionPresence"]) {
  return data;
}

function mapRecentSessions(sessions: Awaited<ReturnType<typeof readState>>["sessions"]) {
  return [...sessions].sort((a, b) => a.dateDebut.localeCompare(b.dateDebut)).slice(-4).reverse();
}

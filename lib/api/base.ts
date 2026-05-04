"use client";

import { initialAppState, computeDashboardStats } from "@/lib/mock-data";
import { AppState } from "@/types";

const STORAGE_KEY = "tekfutura-mvp-state";
const DEFAULT_DELAY_MS = 400;

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export async function simulateNetwork<T>(data: T, delay = DEFAULT_DELAY_MS) {
  await new Promise((resolve) => setTimeout(resolve, delay));
  return data;
}

export function loadAppState(): AppState {
  if (typeof window === "undefined") {
    return clone(initialAppState);
  }

  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    const seeded = clone(initialAppState);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    return seeded;
  }

  const parsed = JSON.parse(saved) as AppState;
  return {
    ...parsed,
    dashboardStats: computeDashboardStats(parsed),
  };
}

export function saveAppState(state: AppState) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
  return state;
}

export async function readState() {
  return simulateNetwork(loadAppState());
}

export async function writeState(updater: (state: AppState) => AppState) {
  const current = loadAppState();
  const next = updater(clone(current));
  next.dashboardStats = computeDashboardStats(next);
  saveAppState(next);
  return simulateNetwork(next);
}

export function createId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

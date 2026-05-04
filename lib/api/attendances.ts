"use client";

import { ApiItemResponse, AttendanceEntry } from "@/types";
import { readState, writeState } from "@/lib/api/base";

export async function getAttendanceBySession(
  sessionId: string,
): Promise<ApiItemResponse<AttendanceEntry[]>> {
  const state = await readState();
  return { data: state.attendanceBySession[sessionId] ?? [] };
}

export async function saveAttendanceBySession(
  sessionId: string,
  entries: AttendanceEntry[],
): Promise<ApiItemResponse<AttendanceEntry[]>> {
  const next = await writeState((state) => {
    state.attendanceBySession[sessionId] = entries;
    return state;
  });

  return {
    data: next.attendanceBySession[sessionId] ?? [],
    message: "Présences enregistrées",
  };
}

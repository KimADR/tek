"use client";

import { useCallback } from "react";
import { getAttendanceBySession, saveAttendanceBySession } from "@/lib/api";
import { AttendanceEntry } from "@/types";
import { useAsyncResource } from "@/hooks/use-async-resource";

export function useAttendanceData(sessionId: string) {
  const loader = useCallback(
    () => getAttendanceBySession(sessionId).then((response) => response.data),
    [sessionId],
  );
  const resource = useAsyncResource(loader);

  const saveAttendance = async (entries: AttendanceEntry[]) => {
    const response = await saveAttendanceBySession(sessionId, entries);
    await resource.refresh();
    return response;
  };

  return {
    ...resource,
    attendance: resource.data ?? [],
    saveAttendance,
  };
}

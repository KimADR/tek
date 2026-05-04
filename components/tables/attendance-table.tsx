"use client";

import { useMemo } from "react";
import { AttendanceEntry, AttendanceStatus } from "@/types";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface EnrichedAttendanceEntry extends AttendanceEntry {
  entreprise?: string;
  poste?: string;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getStatusColor(statut: AttendanceStatus): string {
  switch (statut) {
    case "Présent":
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "Absent":
      return "bg-red-100 text-red-700 border-red-200";
    case "Retard":
      return "bg-orange-100 text-orange-700 border-orange-200";
    default:
      return "bg-slate-100 text-slate-700 border-slate-200";
  }
}

export function AttendanceTable({
  data,
  onUpdate,
}: {
  data: EnrichedAttendanceEntry[];
  onUpdate?: (participantId: string, field: "statut" | "remarque", value: string) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="border-b border-slate-200 bg-slate-50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-700">
              Participant
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-700">
              Entreprise
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-700">
              Statut
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-700">
              Remarque
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {data.map((row) => (
            <tr key={row.participantId} className="hover:bg-slate-50 transition-colors">
              {/* Participant with Avatar */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-semibold">
                    {getInitials(row.participantNom)}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-900">{row.participantNom}</span>
                    {row.poste && <span className="text-xs text-slate-500">{row.poste}</span>}
                  </div>
                </div>
              </td>
              {/* Entreprise */}
              <td className="px-6 py-4">
                <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                  {row.entreprise || "—"}
                </span>
              </td>
              {/* Status Select */}
              <td className="px-6 py-4 w-40">
                <div
                  className={cn(
                    "inline-block rounded-full px-3 py-1 text-xs font-semibold border",
                    getStatusColor(row.statut)
                  )}
                >
                  <Select
                    value={row.statut}
                    onChange={(event) =>
                      onUpdate?.(row.participantId, "statut", event.target.value as AttendanceStatus)
                    }
                    className="bg-transparent border-0 p-0 h-auto text-xs font-semibold"
                  >
                    <option>Présent</option>
                    <option>Absent</option>
                    <option>Retard</option>
                  </Select>
                </div>
              </td>
              {/* Remarque */}
              <td className="px-6 py-4">
                <Input
                  value={row.remarque ?? ""}
                  onChange={(event) =>
                    onUpdate?.(row.participantId, "remarque", event.target.value)
                  }
                  placeholder="Ajouter une remarque..."
                  className="text-xs"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import { AttendanceStatus, FormationStatus, SessionStatus } from "@/types";
import { cn } from "@/lib/utils";

type StatusValue =
  | FormationStatus
  | SessionStatus
  | AttendanceStatus
  | "Disponible"
  | "En attente"
  | "Complétée"
  | "Généré";

const labelMap: Record<StatusValue, string> = {
  // Formation status (technical to display)
  ACTIVE: "Actif",
  INACTIVE: "Inactif",
  // Session status
  "Prévue": "Prévue",
  "En cours": "En cours",
  "Terminée": "Terminée",
  "Complétée": "Complétée",
  "Annulée": "Annulée",
  // Attendance status
  "Présent": "Présent",
  "Absent": "Absent",
  "Retard": "Retard",
  // Certificate status
  "Disponible": "Disponible",
  "En attente": "En attente",
  "Généré": "Généré",
};

const styles: Record<StatusValue, string> = {
  // Formation status
  ACTIVE: "bg-green-50 text-green-700 border border-green-200",
  INACTIVE: "bg-slate-100 text-slate-700 border border-slate-200",
  // Session status
  "Prévue": "bg-blue-50 text-blue-700 border border-blue-200",
  "En cours": "bg-amber-50 text-amber-700 border border-amber-200",
  "Terminée": "bg-purple-50 text-purple-700 border border-purple-200",
  "Complétée": "bg-purple-50 text-purple-700 border border-purple-200",
  "Annulée": "bg-red-50 text-red-700 border border-red-200",
  // Attendance status
  "Présent": "bg-green-50 text-green-700 border border-green-200",
  "Absent": "bg-red-50 text-red-700 border border-red-200",
  "Retard": "bg-orange-50 text-orange-700 border border-orange-200",
  // Certificate status
  "Disponible": "bg-green-50 text-green-700 border border-green-200",
  "En attente": "bg-slate-100 text-slate-700 border border-slate-200",
  "Généré": "bg-green-50 text-green-700 border border-green-200",
};

export function StatusBadge({ value }: { value: StatusValue }) {
  const displayLabel = labelMap[value] || value;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        styles[value]
      )}
    >
      {displayLabel}
    </span>
  );
}

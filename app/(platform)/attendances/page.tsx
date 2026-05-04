"use client";

import { useMemo, useState } from "react";
import { sessions, participants } from "@/lib/mock-data";
import { PageHeader } from "@/components/shared/page-header";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/shared/stat-card";
import { AttendanceTable } from "@/components/tables/attendance-table";
import { useAttendanceData } from "@/hooks/use-attendance-data";
import { useSessionsData } from "@/hooks/use-sessions-data";
import { usePagination } from "@/hooks/use-pagination";
import { TablePagination } from "@/components/shared/table-pagination";
import { AttendanceEntry, AttendanceStatus } from "@/types";
import { useToast } from "@/components/shared/toast-provider";
import { EmptyState } from "@/components/shared/empty-state";
import { Calendar, Users, CheckCircle, XCircle, AlertCircle, Percent } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AttendancesPage() {
  const [sessionId, setSessionId] = useState("s2");
  const [date, setDate] = useState("2026-04-22");
  const [allAttendance, setAllAttendance] = useState<AttendanceEntry[]>([]);
  const { pushToast } = useToast();
  const { sessions: liveSessions } = useSessionsData();
  const { attendance, loading, saveAttendance } = useAttendanceData(sessionId);

  // Initialize state from hook data
  useMemo(() => {
    if (attendance.length > 0 && allAttendance.length === 0) {
      setAllAttendance(attendance);
    }
  }, [attendance, allAttendance.length]);

  const sessionOptions = useMemo(
    () => (liveSessions.length ? liveSessions : sessions),
    [liveSessions],
  );

  const currentSession = useMemo(
    () => sessionOptions.find((s) => s.id === sessionId),
    [sessionId, sessionOptions],
  );

  // Enrich attendance data with participant company info
  const enrichedAttendance = useMemo(
    () =>
      allAttendance.map((entry) => {
        const participant = participants.find((p) => p.id === entry.participantId);
        return {
          ...entry,
          entreprise: participant?.entreprise || "Entreprise inconnue",
          poste: participant?.poste || "",
        };
      }),
    [allAttendance],
  );

  const pagination = usePagination({ data: enrichedAttendance, itemsPerPage: 6 });

  const handleUpdateAttendance = (participantId: string, field: "statut" | "remarque", value: string) => {
    setAllAttendance((current) =>
      current.map((item) =>
        item.participantId === participantId ? { ...item, [field]: value } : item
      )
    );
  };

  // Calculate resume from all attendance data
  const resume = useMemo(() => {
    const presents = allAttendance.filter((row) => row.statut === "Présent").length;
    const absents = allAttendance.filter((row) => row.statut === "Absent").length;
    const retards = allAttendance.filter((row) => row.statut === "Retard").length;
    const taux = allAttendance.length ? Math.round((presents / allAttendance.length) * 100) : 0;
    return { presents, absents, retards, taux };
  }, [allAttendance]);

  const handleSave = async () => {
    await saveAttendance(allAttendance);
    pushToast("Présences enregistrées avec succès.");
  };

  const handleSessionChange = (newSessionId: string) => {
    setSessionId(newSessionId);
    setAllAttendance([]);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Présences"
        description="Suivi journalier des présences par session de formation"
      />

      {/* Control Card */}
      <Card className="overflow-hidden">
        <CardContent>
        <div className="grid grid-cols-1 gap-x-6 gap-y-3 lg:grid-cols-[1.1fr_1.1fr_1fr]">
          {/* Row 1: Labels */}
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-700">Session</label>
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-700">Date</label>
          <div className="hidden lg:block" />

          {/* Row 2: Inputs and Button */}
          <Select value={sessionId} onChange={(event) => handleSessionChange(event.target.value)} className="h-14">
            {sessionOptions.map((session) => (
              <option key={session.id} value={session.id}>
                {session.formationTitre}
              </option>
            ))}
          </Select>

          <div className="relative">
            <Input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="pl-10 h-14"
            />
            <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          <Button onClick={handleSave} className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14">
            Enregistrer les présences
          </Button>

          {/* Row 3: Helper text */}
          {currentSession && (
            <p className="text-xs text-slate-600">
              <span className="font-medium">{currentSession.formateur}</span> • Lieu:{" "}
              <span className="font-medium">{currentSession.lieu}</span>
            </p>
          )}
        </div>
        </CardContent>
      </Card>

      {loading ? (
        <EmptyState
          title="Chargement des présences..."
          description="Lecture simulée des feuilles de présence."
        />
      ) : allAttendance.length === 0 ? (
        <EmptyState
          title="Aucun participant pour cette session"
          description="Sélectionnez une session avec des participants."
        />
      ) : (
        <>
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Présents"
              value={resume.presents}
              icon={<CheckCircle className="h-5 w-5" />}
              variant="green"
            />
            <StatCard
              label="Absents"
              value={resume.absents}
              icon={<XCircle className="h-5 w-5" />}
              variant="red"
            />
            <StatCard
              label="Retards"
              value={resume.retards}
              icon={<AlertCircle className="h-5 w-5" />}
              variant="orange"
            />
            <StatCard
              label="Taux de présence"
              value={`${resume.taux}%`}
              icon={<Percent className="h-5 w-5" />}
              variant="blue"
            />
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xs">
            <AttendanceTable
              data={pagination.paginatedData as AttendanceEntry[]}
              onUpdate={handleUpdateAttendance}
            />
            {pagination.totalPages > 1 && (
              <TablePagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={pagination.goToPage}
                startIndex={pagination.startIndex}
                endIndex={pagination.endIndex}
                totalItems={pagination.totalItems}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

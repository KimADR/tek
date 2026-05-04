"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { SessionForm } from "@/components/forms/session-form";
import { useSessionsData } from "@/hooks/use-sessions-data";
import { usePagination } from "@/hooks/use-pagination";
import { TablePagination } from "@/components/shared/table-pagination";
import { EmptyState } from "@/components/shared/empty-state";
import { SessionCard } from "@/components/sessions/session-card";
import { SessionStatusTabs } from "@/components/sessions/session-status-tabs";
import {
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { Session } from "@/types";

export default function SessionsPage() {
  const [status, setStatus] = useState("Tous");
  const { sessions, loading, addSession } = useSessionsData();

  const data = useMemo(
    () => sessions.filter((session) => status === "Tous" || session.statut === status),
    [sessions, status],
  );

  const pagination = usePagination({ data, itemsPerPage: 6 });

  // Calculate statistics
  const stats = useMemo(() => ({
    total: sessions.length,
    planned: sessions.filter((s) => s.statut === "Prévue").length,
    inProgress: sessions.filter((s) => s.statut === "En cours").length,
    completed: sessions.filter((s) => s.statut === "Terminée").length,
    cancelled: sessions.filter((s) => s.statut === "Annulée").length,
  }), [sessions]);

  // Filter counts for the tabs
  const filterCounts = useMemo(() => ({
    all: sessions.length,
    planned: stats.planned,
    ongoing: stats.inProgress,
    completed: stats.completed,
    cancelled: stats.cancelled,
  }), [sessions, stats]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sessions"
        description="Calendrier opérationnel, statut des cohortes et informations logistiques"
        actions={<SessionForm onSubmit={(payload) => addSession(payload).then(() => undefined)} />}
      />

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Sessions prévues"
          value={stats.planned}
          icon={<AlertCircle className="h-5 w-5" />}
          variant="blue"
        />
        <StatCard
          label="Sessions en cours"
          value={stats.inProgress}
          icon={<Clock className="h-5 w-5" />}
          variant="yellow"
        />
        <StatCard
          label="Sessions terminées"
          value={stats.completed}
          icon={<CheckCircle2 className="h-5 w-5" />}
          variant="green"
        />
        <StatCard
          label="Sessions annulées"
          value={stats.cancelled}
          icon={<XCircle className="h-5 w-5" />}
          variant="red"
        />
      </div>

      {/* Status Filter Tabs */}
      <SessionStatusTabs
        activeStatus={status}
        onStatusChange={setStatus}
        counts={filterCounts}
      />

      {/* Sessions Grid */}
      {loading ? (
        <EmptyState
          title="Chargement des sessions..."
          description="Récupération simulée depuis le service planning."
        />
      ) : data.length === 0 ? (
        <EmptyState
          title="Aucune session"
          description={`Aucune session trouvée pour le filtre "${status}".`}
        />
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">
            {pagination.paginatedData.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>

          {/* Pagination */}
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
      )}
    </div>
  );
}

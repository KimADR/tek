"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/status-badge";
import { useToast } from "@/components/shared/toast-provider";
import { Session } from "@/types";
import { formatDate } from "@/lib/utils";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  User,
  FileCheck,
  Eye,
} from "lucide-react";

interface SessionCardProps {
  session: Session;
}

function calculateDays(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return Math.max(1, diffDays);
}

export function SessionCard({ session }: SessionCardProps) {
  const { pushToast } = useToast();
  const days = calculateDays(session.dateDebut, session.dateFin);

  const handleAttendances = () => {
    pushToast("Redirection vers les présences");
  };

  const handleCertificates = () => {
    pushToast("Redirection vers les certificats");
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
      {/* Header with title and status badge */}
      <div className="px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-slate-900 line-clamp-2 leading-tight">
              {session.formationTitre}
            </h3>
          </div>
          <div className="flex-shrink-0 ml-2">
            <StatusBadge value={session.statut} />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="px-5 py-4 space-y-3 flex-1">
        {/* Formateur */}
        <div className="flex items-center gap-2.5 min-w-0">
          <User className="h-4 w-4 text-slate-400 flex-shrink-0" />
          <span className="text-xs text-slate-700 truncate">{session.formateur}</span>
        </div>

        {/* Lieu */}
        <div className="flex items-center gap-2.5 min-w-0">
          <MapPin className="h-4 w-4 text-slate-400 flex-shrink-0" />
          <span className="text-xs text-slate-700 truncate">{session.lieu}</span>
        </div>

        {/* Dates */}
        <div className="flex items-start gap-2.5">
          <Calendar className="h-4 w-4 text-slate-400 flex-shrink-0 mt-0.5" />
          <span className="text-xs text-slate-600">
            {formatDate(session.dateDebut)} → {formatDate(session.dateFin)}
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-100 my-2" />

        {/* Stats grid - 2 columns */}
        <div className="grid grid-cols-2 gap-3">
          {/* Participants */}
          <div className="bg-slate-50 rounded-md p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <Users className="h-3.5 w-3.5 text-slate-500" />
              <span className="text-xs text-slate-500 font-medium">Participants</span>
            </div>
            <p className="text-sm font-semibold text-slate-900">
              {session.participantsCount}
            </p>
          </div>

          {/* Duration */}
          <div className="bg-slate-50 rounded-md p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <Clock className="h-3.5 w-3.5 text-slate-500" />
              <span className="text-xs text-slate-500 font-medium">Durée</span>
            </div>
            <p className="text-sm font-semibold text-slate-900">
              {days} {days === 1 ? "jour" : "jours"}
            </p>
          </div>
        </div>
      </div>

      {/* Actions footer */}
      <div className="px-4 py-3 border-t border-slate-100 bg-slate-50 flex gap-2">
        <Link href={`/sessions/${session.id}`} className="flex-1 min-w-0">
          <Button
            variant="outline"
            size="sm"
            className="w-full px-2 py-1.5 h-auto text-xs gap-1"
            title="Afficher les détails"
          >
            <Eye className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="truncate">Détails</span>
          </Button>
        </Link>
        <button
          onClick={handleAttendances}
          className="flex-1 min-w-0 inline-flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 active:bg-slate-100 text-xs font-medium transition-all duration-200 flex-shrink-0"
          title="Voir les présences"
        >
          <Users className="h-3.5 w-3.5 flex-shrink-0" />
          <span className="truncate">Présences</span>
        </button>
        <button
          onClick={handleCertificates}
          className="flex-1 min-w-0 inline-flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 active:bg-slate-100 text-xs font-medium transition-all duration-200 flex-shrink-0"
          title="Voir les certificats"
        >
          <FileCheck className="h-3.5 w-3.5 flex-shrink-0" />
          <span className="truncate">Certificats</span>
        </button>
      </div>
    </Card>
  );
}

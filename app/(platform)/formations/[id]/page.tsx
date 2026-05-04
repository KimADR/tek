"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { formations, sessions as allSessions, participants as allParticipants } from "@/lib/mock-data";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/status-badge";
import { DataTable } from "@/components/tables/data-table";
import { ArrowLeft, Clock, Layers, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";
import { useToast } from "@/components/shared/toast-provider";
import { EmptyState } from "@/components/shared/empty-state";

export default function FormationDetailPage() {
  const params = useParams();
  const formationId = params.id as string;
  const { pushToast } = useToast();

  // Find formation
  const formation = formations.find((f) => f.id === formationId);

  if (!formation) {
    return (
      <div className="space-y-6">
        <PageHeader title="Formation non trouvée" description="Veuillez vérifier l'URL" />
        <Link href="/formations">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux formations
          </Button>
        </Link>
      </div>
    );
  }

  // Find related sessions
  const relatedSessions = allSessions.filter((s) => s.formationId === formationId);

  // Find participants in related sessions
  const participantIds = new Set<string>();
  relatedSessions.forEach((session) => {
    allParticipants.forEach((p) => {
      if (p.formationsSuivies.includes(formation.titre)) {
        participantIds.add(p.id);
      }
    });
  });
  const relatedParticipants = allParticipants.filter((p) => participantIds.has(p.id));

  return (
    <div className="min-w-0 space-y-6">
      <div className="flex min-w-0 items-start justify-between gap-4">
        <div className="min-w-0">
          <Link href="/formations" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-3">
            <ArrowLeft className="h-4 w-4" />
            Retour aux formations
          </Link>
          <PageHeader
            title={formation.titre}
            description={formation.description}
          />
        </div>
      </div>

      {/* Overview */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-blue-100 p-2">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-600">Durée</p>
                <p className="text-lg font-bold text-slate-900 mt-1">{formation.dureeHeures} heures</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-green-100 p-2">
                <Layers className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-600">Catégorie</p>
                <p className="text-lg font-bold text-slate-900 mt-1 truncate">{formation.categorie}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-purple-100 p-2">
                <Layers className="h-5 w-5 text-purple-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-600">Sessions</p>
                <p className="text-lg font-bold text-slate-900 mt-1">{relatedSessions.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-amber-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-amber-100 p-2">
                <Users className="h-5 w-5 text-amber-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-600">Statut</p>
                <div className="mt-2">
                  <StatusBadge value={formation.statut} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button className="w-full sm:w-auto" onClick={() => pushToast("Modification de la formation ouverte")}>
          Modifier
        </Button>
        <Button className="w-full sm:w-auto" variant="outline" onClick={() => pushToast("Planification d'une nouvelle session ouverte")}>
          Planifier une session
        </Button>
      </div>

      {/* Sessions */}
      <Card>
        <CardHeader className="border-b border-slate-200 font-semibold text-slate-900">
          Sessions liées ({relatedSessions.length})
        </CardHeader>
        <CardContent>
          {relatedSessions.length === 0 ? (
            <p className="py-6 text-center text-slate-600 text-sm">
              Aucune session n'a encore été planifiée pour cette formation.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-[680px] w-full text-left text-sm">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-700">
                      Formateur
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-700">
                      Date début
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-700">
                      Date fin
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-700">
                      Lieu
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-700">
                      Participants
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-700">
                      Statut
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {relatedSessions.map((session) => (
                    <tr key={session.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 text-slate-900">{session.formateur}</td>
                      <td className="px-4 py-3 text-slate-600">{formatDate(session.dateDebut)}</td>
                      <td className="px-4 py-3 text-slate-600">{formatDate(session.dateFin)}</td>
                      <td className="px-4 py-3 text-slate-600">{session.lieu}</td>
                      <td className="px-4 py-3 text-slate-600">{session.participantsCount}</td>
                      <td className="px-4 py-3">
                        <StatusBadge value={session.statut} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Participants */}
      <Card>
        <CardHeader className="border-b border-slate-200 font-semibold text-slate-900">
          Participants inscrits ({relatedParticipants.length})
        </CardHeader>
        <CardContent>
          {relatedParticipants.length === 0 ? (
            <p className="py-6 text-center text-slate-600 text-sm">
              Aucun participant n'est encore inscrit à cette formation.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-[700px] w-full text-left text-sm">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-700">
                      Nom
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-700">
                      Email
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-700">
                      Entreprise
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-700">
                      Poste
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {relatedParticipants.map((participant) => (
                    <tr key={participant.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 text-slate-900 font-medium">{participant.nomComplet}</td>
                      <td className="px-4 py-3 text-slate-600">{participant.email}</td>
                      <td className="px-4 py-3 text-slate-600">{participant.entreprise}</td>
                      <td className="px-4 py-3 text-slate-600">{participant.poste}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

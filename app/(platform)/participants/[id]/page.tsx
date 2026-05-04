"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { participants, formations, attendanceBySession, certificates } from "@/lib/mock-data";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Phone, Briefcase, Building2 } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { useToast } from "@/components/shared/toast-provider";
import { EmptyState } from "@/components/shared/empty-state";
import { StatusBadge } from "@/components/shared/status-badge";

export default function ParticipantDetailPage() {
  const params = useParams();
  const participantId = params.id as string;
  const { pushToast } = useToast();

  // Find participant
  const participant = participants.find((p) => p.id === participantId);

  if (!participant) {
    return (
      <div className="space-y-6">
        <PageHeader title="Participant non trouvé" description="Veuillez vérifier l'URL" />
        <Link href="/participants">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux participants
          </Button>
        </Link>
      </div>
    );
  }

  // Find formations followed
  const formationsFollowed = formations.filter((f) =>
    participant.formationsSuivies.includes(f.titre)
  );

  // Find certificates
  const participantCerts = certificates.filter((c) => c.participantId === participantId);

  // Find attendance records
  const attendanceRecords: Array<{
    sessionId: string;
    participantId: string;
    participantNom: string;
    statut: string;
    remarque?: string;
  }> = [];
  Object.entries(attendanceBySession).forEach(([sessionId, entries]) => {
    entries.forEach((entry) => {
      if (entry.participantId === participantId) {
        attendanceRecords.push({
          sessionId,
          ...entry,
        });
      }
    });
  });

  return (
    <div className="min-w-0 space-y-6">
      <div className="flex min-w-0 items-start justify-between gap-4">
        <div className="min-w-0">
          <Link href="/participants" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-3">
            <ArrowLeft className="h-4 w-4" />
            Retour aux participants
          </Link>
          <PageHeader
            title={participant.nomComplet}
            description={participant.poste}
          />
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-blue-100 p-2">
                <Mail className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-600">Email</p>
                <p className="text-sm font-semibold text-slate-900 mt-1 truncate">{participant.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-green-100 p-2">
                <Phone className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-600">Téléphone</p>
                <p className="text-sm font-semibold text-slate-900 mt-1">{participant.telephone}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-purple-100 p-2">
                <Briefcase className="h-5 w-5 text-purple-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-600">Poste</p>
                <p className="text-sm font-semibold text-slate-900 mt-1 truncate">{participant.poste}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-amber-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-amber-100 p-2">
                <Building2 className="h-5 w-5 text-amber-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-600">Entreprise</p>
                <p className="text-sm font-semibold text-slate-900 mt-1 truncate">{participant.entreprise}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button className="w-full sm:w-auto" onClick={() => pushToast("Modification du participant ouverte")}>
          Modifier
        </Button>
        <Button className="w-full sm:w-auto" variant="outline" onClick={() => pushToast("Suppression du participant confirmée")}>
          Supprimer
        </Button>
      </div>

      {/* Formations Followed */}
      <Card>
        <CardHeader className="border-b border-slate-200 font-semibold text-slate-900">
          Formations suivies ({formationsFollowed.length})
        </CardHeader>
        <CardContent>
          {formationsFollowed.length === 0 ? (
            <p className="py-6 text-center text-slate-600 text-sm">
              Aucune formation suivie pour le moment.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {formationsFollowed.map((formation) => (
                <Link key={formation.id} href={`/formations/${formation.id}`}>
                  <div className="min-w-0 rounded-lg border border-slate-200 p-4 transition-colors hover:border-blue-300 hover:bg-blue-50">
                    <h4 className="font-semibold text-slate-900 truncate">{formation.titre}</h4>
                    <div className="flex items-center gap-2 mt-2">
                      <StatusBadge value={formation.statut} />
                      <span className="text-xs text-slate-600">{formation.dureeHeures}h</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Certificates */}
      <Card>
        <CardHeader className="border-b border-slate-200 font-semibold text-slate-900">
          Certificats ({participantCerts.length})
        </CardHeader>
        <CardContent>
          {participantCerts.length === 0 ? (
            <p className="py-6 text-center text-slate-600 text-sm">
              Aucun certificat n'a été généré pour le moment.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-[620px] w-full text-left text-sm">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-700">
                      Numéro
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-700">
                      Formation
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-700">
                      Date d'émission
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-700">
                      Statut
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {participantCerts.map((cert) => (
                    <tr key={cert.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 text-slate-900 font-mono text-xs">{cert.numero}</td>
                      <td className="px-4 py-3 text-slate-600">{cert.formation}</td>
                      <td className="px-4 py-3 text-slate-600">{formatDate(cert.dateEmission)}</td>
                      <td className="px-4 py-3">
                        <StatusBadge value={cert.statut} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Attendance History */}
      <Card>
        <CardHeader className="border-b border-slate-200 font-semibold text-slate-900">
          Historique de présence ({attendanceRecords.length})
        </CardHeader>
        <CardContent>
          {attendanceRecords.length === 0 ? (
            <p className="py-6 text-center text-slate-600 text-sm">
              Aucun enregistrement de présence pour le moment.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-[460px] w-full text-left text-sm">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-700">
                      Statut
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-700">
                      Remarque
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {attendanceRecords.map((record, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3">
                        <StatusBadge value={record.statut as any} />
                      </td>
                      <td className="px-4 py-3 text-slate-600">{record.remarque || "-"}</td>
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

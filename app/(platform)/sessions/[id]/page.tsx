"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/status-badge";
import { Tabs } from "@/components/shared/tabs";
import { DataTable } from "@/components/tables/data-table";
import { formatDate } from "@/lib/utils";
import { useSessionDetail } from "@/hooks/use-sessions-data";
import { useAttendanceData } from "@/hooks/use-attendance-data";
import { useCertificatesData } from "@/hooks/use-certificates-data";
import { useParticipantsData } from "@/hooks/use-participants-data";
import { EmptyState } from "@/components/shared/empty-state";
import { useToast } from "@/components/shared/toast-provider";

export default function SessionDetailsPage() {
  const params = useParams<{ id: string }>();
  const sessionId = params.id;
  const { data: session, loading } = useSessionDetail(sessionId);
  const { attendance } = useAttendanceData(sessionId);
  const { certificates } = useCertificatesData();
  const { participants } = useParticipantsData();
  const { pushToast } = useToast();

  const relatedCertificates = useMemo(
    () => certificates.filter((certificate) => certificate.formation === session?.formationTitre),
    [certificates, session?.formationTitre],
  );

  const relatedParticipants = useMemo(
    () => participants.slice(0, session?.participantsCount || 0),
    [participants, session?.participantsCount],
  );

  if (loading) {
    return <EmptyState title="Chargement de la session..." description="Préparation de la vue détaillée." />;
  }

  if (!session) {
    return (
      <EmptyState
        title="Session introuvable"
        description="La session demandée n'existe pas ou n'est plus disponible."
      />
    );
  }

  const tabs = [
    {
      id: "informations",
      label: "Informations",
      content: (
        <Card>
          <CardContent className="grid gap-4 sm:grid-cols-2 pt-6">
            <div>
              <p className="text-sm text-slate-600 mb-1">Formation</p>
              <p className="font-medium">{session.formationTitre}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">Formateur</p>
              <p className="font-medium">{session.formateur}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">Lieu</p>
              <p className="font-medium">{session.lieu}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">Statut</p>
              <StatusBadge value={session.statut} />
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">Date début</p>
              <p className="font-medium">{formatDate(session.dateDebut)}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">Date fin</p>
              <p className="font-medium">{formatDate(session.dateFin)}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">Nombre de participants inscrits</p>
              <p className="font-medium">{session.participantsCount}</p>
            </div>
          </CardContent>
        </Card>
      ),
    },
    {
      id: "participants",
      label: "Participants",
      content: (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button size="sm" onClick={() => pushToast("Ajout de participant en préparation...")}>
              Ajouter un participant
            </Button>
          </div>
          {relatedParticipants.length > 0 ? (
            <DataTable
              columns={[
                { key: "nomComplet", title: "Nom complet" },
                { key: "entreprise", title: "Entreprise" },
                { key: "email", title: "Email" },
                { key: "telephone", title: "Téléphone" },
                { key: "poste", title: "Poste" },
              ]}
              data={relatedParticipants}
            />
          ) : (
            <EmptyState title="Aucun participant" description="Aucun participant inscrit pour cette session." />
          )}
        </div>
      ),
    },
    {
      id: "presences",
      label: "Présences",
      content: (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Link href="/attendances">
              <Button size="sm" onClick={() => pushToast("Redirection vers la page des présences...")}>
                Enregistrer les présences
              </Button>
            </Link>
          </div>
          {attendance.length > 0 ? (
            <DataTable
              columns={[
                { key: "participantNom", title: "Participant" },
                { key: "statut", title: "Statut", render: (row: any) => <StatusBadge value={row.statut} /> },
                { key: "remarque", title: "Remarque" },
              ]}
              data={attendance}
            />
          ) : (
            <EmptyState title="Aucune présence enregistrée" description="Aucune présence n'a été enregistrée pour cette session." />
          )}
        </div>
      ),
    },
    {
      id: "certificats",
      label: "Certificats",
      content: (
        <div className="space-y-4">
          <div className="flex gap-2 justify-end">
            <Button size="sm" variant="outline" onClick={() => pushToast("Génération des certificats en préparation...")}>
              Générer les certificats
            </Button>
            <Button size="sm" onClick={() => pushToast("Téléchargement des certificats en préparation...")}>
              Télécharger en PDF
            </Button>
          </div>
          {relatedCertificates.length > 0 ? (
            <DataTable
              columns={[
                { key: "numero", title: "Numéro" },
                { key: "participantNom", title: "Participant" },
                { key: "dateEmission", title: "Date d'émission", render: (row: any) => formatDate(row.dateEmission) },
                { key: "statut", title: "Statut", render: (row: any) => <StatusBadge value={row.statut} /> },
              ]}
              data={relatedCertificates}
            />
          ) : (
            <EmptyState title="Aucun certificat" description="Aucun certificat n'a été généré pour cette session." />
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="min-w-0 space-y-6">
      <PageHeader
        title={`Session: ${session.formationTitre}`}
        description={`${formatDate(session.dateDebut)} - ${formatDate(session.dateFin)} | ${session.lieu}`}
        actions={
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap">
            <Button className="w-full sm:w-auto" size="sm" onClick={() => pushToast("Ajout de participant en préparation...")}>
              Ajouter un participant
            </Button>
            <Link href="/attendances">
              <Button className="w-full sm:w-auto" variant="outline" size="sm">
                Enregistrer les présences
              </Button>
            </Link>
            <Button className="w-full sm:w-auto" variant="outline" size="sm" onClick={() => pushToast("Génération des certificats en préparation...")}>
              Générer les certificats
            </Button>
          </div>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-600 mb-1">Nombre de participants</p>
            <p className="text-2xl font-bold">{session.participantsCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-600 mb-1">Taux de présence</p>
            <p className="text-2xl font-bold">{attendance.length > 0 ? Math.round((attendance.filter((a) => a.statut === "Présent").length / attendance.length) * 100) : 0}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-600 mb-1">Certificats générés</p>
            <p className="text-2xl font-bold">{relatedCertificates.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-600 mb-1">Durée (jours)</p>
            <p className="text-2xl font-bold">
              {Math.ceil(
                (new Date(session.dateFin).getTime() - new Date(session.dateDebut).getTime()) /
                  (1000 * 60 * 60 * 24),
              )}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs tabs={tabs} />
    </div>
  );
}

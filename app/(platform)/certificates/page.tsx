"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/tables/data-table";
import { StatusBadge } from "@/components/shared/status-badge";
import { formatDate } from "@/lib/utils";
import { CertificatePreview } from "@/components/certificates/certificate-preview";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { useCertificatesData } from "@/hooks/use-certificates-data";
import { usePagination } from "@/hooks/use-pagination";
import { TablePagination } from "@/components/shared/table-pagination";
import { useToast } from "@/components/shared/toast-provider";
import { Download, Trash2 } from "lucide-react";
import { Certificate } from "@/types";
import { Card, CardContent } from "@/components/ui/card";

export default function CertificatesPage() {
  const [query, setQuery] = useState("");
  const { certificates, loading } = useCertificatesData();
  const { pushToast } = useToast();

  const data = useMemo(
    () =>
      certificates.filter((item) =>
        `${item.numero}${item.participantNom}${item.formation}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [certificates, query],
  );

  const pagination = usePagination({ data, itemsPerPage: 6 });

  const handleDownload = (certificateId: string) => {
    pushToast("Téléchargement du certificat en préparation...");
  };

  const handleDelete = (certificateId: string) => {
    pushToast("Certificat supprimé");
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Certificats" description="Gestion et vérification des certificats émis" />
      <Card className="overflow-hidden">
        <CardContent>
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher par participant, formation ou numéro..."
          />
        </CardContent>
      </Card>
      {loading ? (
        <EmptyState title="Chargement des certificats..." description="Connexion simulée au registre documentaire." />
      ) : (
        <div className="overflow-hidden rounded-lg border border-slate-200">
          <DataTable
            columns={[
              { key: "numero", title: "Numéro" },
              { key: "participantNom", title: "Participant" },
              { key: "formation", title: "Formation" },
              { key: "dateEmission", title: "Date d'émission", render: (row: any) => formatDate(row.dateEmission) },
              { key: "statut", title: "Statut", render: (row: any) => <StatusBadge value={row.statut} /> },
              {
                key: "actions",
                title: "Actions",
                render: (row: any) => (
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownload(row.id)}
                      title="Télécharger PDF"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(row.id)}
                      className="text-red-600 hover:text-red-700"
                      title="Supprimer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ),
              },
            ]}
            data={pagination.paginatedData}
          />
          <TablePagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={pagination.goToPage}
            startIndex={pagination.startIndex}
            endIndex={pagination.endIndex}
            totalItems={pagination.totalItems}
          />
        </div>
      )}
      {pagination.paginatedData[0] ? (
        <CertificatePreview certificate={pagination.paginatedData[0] as any} />
      ) : (
        <EmptyState title="Aucun certificat trouvé" description="Essayez un autre critère de recherche." />
      )}
    </div>
  );
}

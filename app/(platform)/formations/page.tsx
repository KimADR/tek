"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { FormationForm } from "@/components/forms/formation-form";
import { FormationCard } from "@/components/formations/formation-card";
import { useFormationsData } from "@/hooks/use-formations-data";
import { usePagination } from "@/hooks/use-pagination";
import { TablePagination } from "@/components/shared/table-pagination";
import { EmptyState } from "@/components/shared/empty-state";
import { useToast } from "@/components/shared/toast-provider";
import { BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function FormationsPage() {
  const [query, setQuery] = useState("");
  const [categorie, setCategorie] = useState("Toutes");
  const { formations, loading, addFormation } = useFormationsData();
  const { pushToast } = useToast();

  const categories = useMemo(
    () => ["Toutes", ...new Set(formations.map((formation) => formation.categorie))],
    [formations],
  );

  const data = useMemo(
    () =>
      formations.filter(
        (formation) =>
          formation.titre.toLowerCase().includes(query.toLowerCase()) &&
          (categorie === "Toutes" || formation.categorie === categorie),
      ),
    [categorie, formations, query],
  );

  const pagination = usePagination({ data, itemsPerPage: 6 });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Formations"
        description="Catalogue, catégories et statut du portefeuille TekFutura"
        actions={<FormationForm onSubmit={(payload) => addFormation(payload).then(() => undefined)} />}
      />
      
      <Card className="overflow-hidden">
        <CardContent className="grid gap-4 md:grid-cols-3">
          <Input
            placeholder="Rechercher une formation..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="md:col-span-2"
          />
          <Select value={categorie} onChange={(event) => setCategorie(event.target.value)}>
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </Select>
        </CardContent>
      </Card>

      {/* Contenu */}
      {loading ? (
        <EmptyState 
          title="Chargement des formations..." 
          description="Simulation d'un appel API en cours." 
        />
      ) : data.length === 0 ? (
        <EmptyState 
          title="Aucune formation trouvée" 
          description={query || categorie !== "Toutes" 
            ? "Essayez un autre critère de recherche." 
            : "Commencez par ajouter une formation."
          }
          icon={<BookOpen className="h-6 w-6" />}
        />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pagination.paginatedData.map((formation) => (
              <FormationCard
                key={formation.id}
                formation={formation}
                onEdit={() => pushToast("Modification prévue dans la prochaine version.")}
              />
            ))}
          </div>
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
        </>
      )}
    </div>
  );
}

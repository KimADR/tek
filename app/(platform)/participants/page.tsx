"use client";

import { useMemo, useState } from "react";
import { entreprises, formations } from "@/lib/mock-data";
import { PageHeader } from "@/components/shared/page-header";
import { ParticipantForm } from "@/components/forms/participant-form";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StatCard } from "@/components/shared/stat-card";
import { SearchableSelect } from "@/components/shared/searchable-select";
import { useParticipantsData } from "@/hooks/use-participants-data";
import { usePagination } from "@/hooks/use-pagination";
import { TablePagination } from "@/components/shared/table-pagination";
import { EmptyState } from "@/components/shared/empty-state";
import { ParticipantCard } from "@/components/participants/participant-card";
import { sortFrenchStrings } from "@/lib/utils";
import {
  Users,
  Building2,
  TrendingUp,
  BookOpen,
  X,
} from "lucide-react";
import { Participant } from "@/types";

export default function ParticipantsPage() {
  const [query, setQuery] = useState("");
  const [entreprise, setEntreprise] = useState("Toutes");
  const [formation, setFormation] = useState("Toutes");
  const [statut, setStatut] = useState("Tous");
  const { participants, loading, addParticipant } = useParticipantsData();

  const entrepriseOptions = useMemo(() => {
    const uniqueEntreprises = Array.from(
      new Set([...entreprises, ...participants.map((item) => item.entreprise)]),
    );
    return sortFrenchStrings(uniqueEntreprises);
  }, [participants]);

  const formationOptions = useMemo(() => {
    const allFormations = new Set<string>();
    participants.forEach((p) => {
      p.formationsSuivies.forEach((f) => allFormations.add(f));
    });
    return sortFrenchStrings(Array.from(allFormations));
  }, [participants]);

  // Filter logic
  const data = useMemo(
    () =>
      participants.filter((participant) => {
        // Search filter - across multiple fields
        const searchLower = query.toLowerCase();
        const matchesSearch =
          searchLower === "" ||
          participant.nomComplet.toLowerCase().includes(searchLower) ||
          participant.email.toLowerCase().includes(searchLower) ||
          participant.telephone.includes(searchLower) ||
          participant.entreprise.toLowerCase().includes(searchLower) ||
          participant.poste.toLowerCase().includes(searchLower);

        // Company filter
        const matchesEntreprise = entreprise === "Toutes" || participant.entreprise === entreprise;

        // Formation filter
        const matchesFormation =
          formation === "Toutes" ||
          participant.formationsSuivies.includes(formation);

        // Status filter
        const matchesStatut =
          statut === "Tous" || participant.statut === statut;

        return matchesSearch && matchesEntreprise && matchesFormation && matchesStatut;
      }),
    [entreprise, formation, participants, query, statut],
  );

  const pagination = usePagination({ data, itemsPerPage: 6 });

  // Calculate statistics
  const stats = useMemo(() => {
    const uniqueCompanies = new Set(participants.map((p) => p.entreprise)).size;
    const activeParticipants = participants.filter((p) => p.formationsSuivies.length > 0).length;
    const totalFormations = participants.reduce((acc, p) => acc + p.formationsSuivies.length, 0);

    return {
      total: participants.length,
      companies: uniqueCompanies,
      active: activeParticipants,
      formations: totalFormations,
    };
  }, [participants]);

  // Reset filters
  const handleResetFilters = () => {
    setQuery("");
    setEntreprise("Toutes");
    setFormation("Toutes");
    setStatut("Tous");
    pagination.goToPage(1);
  };

  const hasActiveFilters = query !== "" || entreprise !== "Toutes" || formation !== "Toutes" || statut !== "Tous";

  return (
    <div className="space-y-6">
      <PageHeader
        title="Participants"
        description="Répertoire central des apprenants, entreprises et fonctions occupées"
        actions={
          <ParticipantForm
            onSubmit={(payload) => addParticipant(payload).then(() => undefined)}
            entrepriseOptions={entrepriseOptions.filter((item) => item !== "Toutes")}
          />
        }
      />

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total participants"
          value={stats.total}
          icon={<Users className="h-5 w-5" />}
          variant="blue"
        />
        <StatCard
          label="Entreprises"
          value={stats.companies}
          icon={<Building2 className="h-5 w-5" />}
          variant="purple"
        />
        <StatCard
          label="Participants actifs"
          value={stats.active}
          icon={<TrendingUp className="h-5 w-5" />}
          variant="green"
        />
        <StatCard
          label="Formations suivies"
          value={stats.formations}
          icon={<BookOpen className="h-5 w-5" />}
          variant="orange"
        />
      </div>

      {/* Filter Card */}
      <Card className="overflow-hidden">
        <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
          {/* Search Input */}
          <div className="xl:col-span-2">
            <Input
              placeholder="Rechercher un participant..."
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                pagination.goToPage(1);
              }}
              className="text-sm"
            />
          </div>

          {/* Company Filter */}
          <SearchableSelect
            value={entreprise}
            onValueChange={(value) => {
              setEntreprise(value);
              pagination.goToPage(1);
            }}
            options={entrepriseOptions}
            label="Entreprise"
            placeholder="Toutes les entreprises"
            searchPlaceholder="Rechercher une entreprise..."
            className="w-full"
          />

          {/* Formation Filter */}
          <SearchableSelect
            value={formation}
            onValueChange={(value) => {
              setFormation(value);
              pagination.goToPage(1);
            }}
            options={formationOptions}
            label="Formation"
            placeholder="Toutes les formations"
            searchPlaceholder="Rechercher une formation..."
            className="w-full"
          />

          {/* Status Filter */}
          <Select
            value={statut}
            onChange={(event) => {
              setStatut(event.target.value);
              pagination.goToPage(1);
            }}
          >
            <option value="Tous">Tous les statuts</option>
            <option value="Actif">Actif</option>
            <option value="En formation">En formation</option>
            <option value="Certifié">Certifié</option>
            <option value="Inactif">Inactif</option>
          </Select>

          {/* Reset Button */}
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetFilters}
              className="flex items-center justify-center gap-2 text-slate-700"
              title="Réinitialiser les filtres"
            >
              <X className="h-4 w-4" />
              <span className="hidden sm:inline">Réinitialiser</span>
            </Button>
          )}
        </div>

        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2">
            {query !== "" && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  pagination.goToPage(1);
                }}
                className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700 transition hover:bg-slate-200"
              >
                Rechercher : "{query}"
                <X className="h-3.5 w-3.5" />
              </button>
            )}
            {entreprise !== "Toutes" && (
              <button
                type="button"
                onClick={() => {
                  setEntreprise("Toutes");
                  pagination.goToPage(1);
                }}
                className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700 transition hover:bg-slate-200"
              >
                Entreprise : {entreprise}
                <X className="h-3.5 w-3.5" />
              </button>
            )}
            {formation !== "Toutes" && (
              <button
                type="button"
                onClick={() => {
                  setFormation("Toutes");
                  pagination.goToPage(1);
                }}
                className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700 transition hover:bg-slate-200"
              >
                Formation : {formation}
                <X className="h-3.5 w-3.5" />
              </button>
            )}
            {statut !== "Tous" && (
              <button
                type="button"
                onClick={() => {
                  setStatut("Tous");
                  pagination.goToPage(1);
                }}
                className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700 transition hover:bg-slate-200"
              >
                Statut : {statut}
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        )}

        {/* Results count */}
        {data.length > 0 && (
          <div className="text-xs text-slate-600">
            <span className="font-medium text-slate-900">{data.length}</span> participant{data.length > 1 ? "s" : ""} trouvé{data.length > 1 ? "s" : ""}
          </div>
        )}
        </CardContent>
      </Card>

      {/* Participants Grid */}
      {loading ? (
        <EmptyState
          title="Chargement des participants..."
          description="Connexion simulée au référentiel apprenants."
        />
      ) : data.length === 0 ? (
        <EmptyState
          title="Aucun participant trouvé"
          description="Aucun participant ne correspond à vos critères de recherche."
        />
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 2xl:grid-cols-3">
            {pagination.paginatedData.map((participant) => (
              <ParticipantCard key={participant.id} participant={participant} />
            ))}
          </div>

          {/* Pagination */}
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
    </div>
  );
}

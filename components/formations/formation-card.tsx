"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/status-badge";
import { Formation } from "@/types";
import { cn } from "@/lib/utils";
import { Clock, Layers, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/components/shared/toast-provider";

interface FormationCardProps {
  formation: Formation;
  onEdit?: (formation: Formation) => void;
}

export function FormationCard({ formation, onEdit }: FormationCardProps) {
  const { pushToast } = useToast();

  const handleDelete = () => {
    pushToast(`Formation "${formation.titre}" supprimée`);
  };

  return (
    <Card className={cn(
      "hover:shadow-md transition-all duration-200 cursor-pointer group h-full flex flex-col",
      formation.statut === "ACTIVE" ? "border-blue-200 bg-blue-50/30" : "opacity-75"
    )}>
      <CardContent className="flex flex-col h-full">
        {/* Header avec statut */}
        <div className="flex items-start justify-between mb-4 pt-2">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              {formation.titre}
            </h3>
            <p className="text-sm text-slate-500 mt-1">{formation.categorie}</p>
          </div>
          <StatusBadge value={formation.statut} />
        </div>

        {/* Description */}
        {formation.description && (
          <p className="text-sm text-slate-600 mb-4 flex-1 line-clamp-2">
            {formation.description}
          </p>
        )}

        {/* Détails */}
        <div className="grid grid-cols-2 gap-3 mb-6 py-3 border-t border-slate-200 border-b">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-slate-400" />
            <span className="text-sm font-medium text-slate-700">
              {formation.dureeHeures} h
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-slate-400" />
            <span className="text-sm font-medium text-slate-700">
              {formation.sessionsCount} session{formation.sessionsCount > 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Footer avec actions */}
        <div className="flex gap-2 mt-auto">
          <Link href={`/formations/${formation.id}`} className="flex-1">
            <Button className="w-full" size="sm">
              Détails
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="px-3"
            onClick={() => {
              onEdit?.(formation);
              pushToast(`Modification de "${formation.titre}" ouverte`);
            }}
            title="Modifier"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="px-3 text-red-600 hover:text-red-700"
            title="Supprimer"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

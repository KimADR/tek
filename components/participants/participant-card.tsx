"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/shared/toast-provider";
import { Participant } from "@/types";
import { Mail, Phone, Building2, BookOpen, Edit, Eye } from "lucide-react";

interface ParticipantCardProps {
  participant: Participant;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase())
    .join("")
    .slice(0, 2);
}

export function ParticipantCard({ participant }: ParticipantCardProps) {
  const { pushToast } = useToast();
  const initials = getInitials(participant.nomComplet);

  const handleEdit = () => {
    pushToast("Fonctionnalité prévue dans la prochaine version.");
  };

  // Color rotation for avatars - using proper contrasting colors
  const avatarColors = [
    "bg-blue-600",
    "bg-indigo-600",
    "bg-purple-600",
    "bg-pink-600",
    "bg-emerald-600",
    "bg-cyan-600",
  ];
  
  const colorIndex = participant.id.charCodeAt(2) % avatarColors.length;
  const avatarColor = avatarColors[colorIndex];

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 flex flex-col h-full border-slate-200">
      {/* Header with avatar and info */}
      <div className="px-6 py-5 border-b border-slate-100 bg-white">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div
            className={`w-14 h-14 rounded-full ${avatarColor} flex items-center justify-center flex-shrink-0 font-bold text-lg text-white shadow-sm`}
          >
            {initials}
          </div>

          {/* Name and position */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-slate-900 line-clamp-1">
              {participant.nomComplet}
            </h3>
            <p className="text-xs text-slate-500 truncate mt-1">
              {participant.poste}
            </p>
          </div>
        </div>

        {/* Entreprise badge below */}
        <div className="mt-3 flex items-center gap-2">
          <Building2 className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium truncate">
            {participant.entreprise}
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="px-6 py-5 space-y-3.5 flex-1">
        {/* Email */}
        <div className="flex items-center gap-3 min-w-0">
          <Mail className="h-4 w-4 text-slate-400 flex-shrink-0" />
          <a
            href={`mailto:${participant.email}`}
            className="text-xs text-blue-600 hover:text-blue-700 truncate"
            title={participant.email}
          >
            {participant.email}
          </a>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-3 min-w-0">
          <Phone className="h-4 w-4 text-slate-400 flex-shrink-0" />
          <a
            href={`tel:${participant.telephone}`}
            className="text-xs text-slate-700 hover:text-slate-900 truncate"
          >
            {participant.telephone}
          </a>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-100" />

        {/* Formations section */}
        {participant.formationsSuivies.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <BookOpen className="h-4 w-4 text-slate-400 flex-shrink-0" />
              <span className="text-xs font-medium text-slate-700">
                {participant.formationsSuivies.length} formation{participant.formationsSuivies.length > 1 ? "s" : ""}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {participant.formationsSuivies.slice(0, 2).map((formation, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-1.5 rounded-md bg-blue-50 text-blue-700 text-xs font-medium line-clamp-1 border border-blue-100"
                  title={formation}
                >
                  {formation.length > 22 ? `${formation.slice(0, 19)}...` : formation}
                </span>
              ))}
              {participant.formationsSuivies.length > 2 && (
                <span className="inline-flex items-center px-2.5 py-1.5 rounded-md bg-slate-100 text-slate-600 text-xs font-medium border border-slate-200">
                  +{participant.formationsSuivies.length - 2}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Actions footer */}
      <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex gap-2">
        <Link href={`/participants/${participant.id}`} className="flex-1 min-w-0">
          <Button
            variant="outline"
            size="sm"
            className="w-full px-3 py-2 h-auto text-xs gap-1.5 font-medium"
            title="Voir le profil"
          >
            <Eye className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="truncate">Voir profil</span>
          </Button>
        </Link>
        <button
          onClick={handleEdit}
          className="flex-1 min-w-0 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 active:bg-slate-100 text-xs font-medium transition-all duration-200"
          title="Modifier le participant"
        >
          <Edit className="h-3.5 w-3.5 flex-shrink-0" />
          <span className="truncate">Modifier</span>
        </button>
      </div>
    </Card>
  );
}

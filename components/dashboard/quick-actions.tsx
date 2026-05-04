"use client";

import Link from "next/link";
import { GraduationCap, Users, FileText, BarChart3, Calendar, CheckSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const actions = [
  {
    title: "Créer une formation",
    description: "Ajouter une nouvelle formation",
    icon: <GraduationCap className="h-5 w-5" />,
    href: "/formations",
    variant: "default" as const,
  },
  {
    title: "Créer une session",
    description: "Planifier une nouvelle session",
    icon: <Calendar className="h-5 w-5" />,
    href: "/sessions",
    variant: "outline" as const,
  },
  {
    title: "Ajouter un participant",
    description: "Inscrire un nouveau participant",
    icon: <Users className="h-5 w-5" />,
    href: "/participants",
    variant: "outline" as const,
  },
  {
    title: "Générer des certificats",
    description: "Créer des certificats de formation",
    icon: <FileText className="h-5 w-5" />,
    href: "/certificates",
    variant: "outline" as const,
  },
  {
    title: "Marquer les présences",
    description: "Gérer les présences des sessions",
    icon: <CheckSquare className="h-5 w-5" />,
    href: "/attendances",
    variant: "outline" as const,
  },
  {
    title: "Voir les rapports",
    description: "Consulter les statistiques détaillées",
    icon: <BarChart3 className="h-5 w-5" />,
    href: "/reports",
    variant: "outline" as const,
  },
];

export function QuickActions() {
  return (
    <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
      {actions.map((action) => (
        <Card key={action.title} className="hover:shadow-sm transition-shadow">
          <CardContent className="p-2">
            <Link href={action.href} className="block">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 rounded-lg text-slate-700 flex-shrink-0">
                  {action.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-slate-900 leading-tight">{action.title}</p>
                  <p className="text-[11px] text-slate-500 leading-tight">{action.description}</p>
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
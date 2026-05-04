"use client";

import Link from "next/link";
import { Users, GraduationCap, CalendarCheck2, ScrollText, Activity, Plus, ArrowRight, Eye } from "lucide-react";
import { StatCard } from "@/components/shared/stat-card";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardCharts } from "@/components/dashboard/dashboard-charts";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { formatDate } from "@/lib/utils";
import { StatusBadge } from "@/components/shared/status-badge";
import { useDashboardData } from "@/hooks/use-dashboard-data";
import { EmptyState } from "@/components/shared/empty-state";

export default function DashboardPage() {
  const { data, loading } = useDashboardData();

  const topCategory = data?.repartitionCategories?.[0]?.name ?? "Informatique";
  const dashboardDate = new Date().toLocaleDateString("fr-FR");

  if (loading || !data) {
    return <EmptyState title="Chargement du tableau de bord..." description="Agrégation simulée des indicateurs TekFutura." />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tableau de bord"
        description={`Vue globale des activités de formation TekFutura • ${new Date().toLocaleDateString('fr-FR')}`}
        actions={
          <Link href="/formations">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle formation
            </Button>
          </Link>
        }
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Formations actives" value={data.dashboardStats.totalFormations} icon={<GraduationCap className="h-5 w-5" />} variant="blue" trend={{ value: 12, isPositive: true }} />
        <StatCard label="Sessions en cours" value={data.dashboardStats.sessionsEnCours} icon={<CalendarCheck2 className="h-5 w-5" />} variant="green" trend={{ value: 8, isPositive: true }} />
        <StatCard label="Participants inscrits" value={data.dashboardStats.participantsInscrits} icon={<Users className="h-5 w-5" />} variant="yellow" trend={{ value: 15, isPositive: true }} />
        <StatCard label="Certificats générés" value={data.dashboardStats.certificatsGeneres} icon={<ScrollText className="h-5 w-5" />} variant="red" trend={{ value: 5, isPositive: true }} />
        <StatCard label="Taux de présence moyen" value={`${data.dashboardStats.tauxPresenceMoyen}%`} icon={<Activity className="h-5 w-5" />} variant="purple" trend={{ value: 3, isPositive: false }} />
      </section>

      <section className="grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">Vue au {dashboardDate}</div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">Taux moyen mensuel : {data.dashboardStats.tauxPresenceMoyen}%</div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">Catégorie la plus suivie : {topCategory}</div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-900">Actions rapides</h2>
        <p className="text-sm text-slate-500 mb-4">Accès direct aux principales actions TekFutura.</p>
        <QuickActions />
      </section>

      <DashboardCharts 
        inscriptionsParMois={data.inscriptionsParMois} 
        formationsPopulaires={data.formationsPopulaires}
        repartitionCategories={data.repartitionCategories}
        evolutionPresence={data.evolutionPresence}
      />

      <section className="grid gap-4 lg:grid-cols-2">
        <Card className="h-full min-w-0 overflow-hidden">
          <CardHeader className="flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="font-semibold text-slate-900">Sessions récentes</p>
              <p className="text-xs text-slate-500">Suivi des dernières sessions actives</p>
            </div>
            <Link href="/sessions">
              <Button variant="outline" size="sm">Voir tout</Button>
            </Link>
          </CardHeader>
          <CardContent className="divide-y divide-slate-200">
            {data.sessionsRecentes.map((session) => (
              <div key={session.id} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                <div className="min-w-0">
                  <p className="font-medium text-slate-900 text-sm">{session.formationTitre}</p>
                  <p className="text-xs text-slate-600 mt-1">
                    {session.formateur} • {formatDate(session.dateDebut)} • {session.lieu}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge value={session.statut} />
                  <Link href="/sessions" aria-label="Voir détails de la session">
                    <Button variant="outline" size="sm" className="inline-flex items-center justify-center p-2 text-xs">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="h-full min-w-0 overflow-hidden">
          <CardHeader className="flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="font-semibold text-slate-900">Prochaines sessions</p>
              <p className="text-xs text-slate-500">Sessions planifiées à court terme</p>
            </div>
            <Link href="/sessions">
              <Button variant="outline" size="sm">Voir tout</Button>
            </Link>
          </CardHeader>
          <CardContent className="divide-y divide-slate-200">
            {data.sessionsRecentes.filter((s) => s.statut === "Prévue").slice(0, 4).map((session) => (
              <div key={session.id} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                <div className="min-w-0">
                  <p className="font-medium text-slate-900 text-sm">{session.formationTitre}</p>
                  <p className="text-xs text-slate-600 mt-1">
                    {formatDate(session.dateDebut)} • {session.lieu}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{session.formateur}</p>
                </div>
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <StatusBadge value={session.statut} />
                  <Link href="/sessions">
                    <Button variant="outline" size="sm" className="inline-flex items-center gap-1 px-3 py-1.5 text-xs whitespace-nowrap flex-shrink-0 min-w-max">
                      Voir détails
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

    </div>
  );
}

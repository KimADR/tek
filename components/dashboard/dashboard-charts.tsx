"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useClientReady } from "@/hooks/use-client-ready";

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

const defaultRepartition = [
  { name: "Informatique", value: 35 },
  { name: "Management", value: 28 },
  { name: "Sécurité", value: 22 },
  { name: "Maintenance", value: 18 },
  { name: "Data", value: 15 }
];

const defaultPresence = [
  { month: "Jan", rate: 78 },
  { month: "Fév", rate: 82 },
  { month: "Mar", rate: 75 },
  { month: "Avr", rate: 86 },
  { month: "Mai", rate: 80 },
  { month: "Juin", rate: 88 }
];

const defaultInscriptions = [
  { mois: "Jan", inscriptions: 18 },
  { mois: "Fév", inscriptions: 22 },
  { mois: "Mar", inscriptions: 19 },
  { mois: "Avr", inscriptions: 28 },
  { mois: "Mai", inscriptions: 24 },
  { mois: "Juin", inscriptions: 31 }
];

export function DashboardCharts({
  inscriptionsParMois,
  formationsPopulaires,
  repartitionCategories = [],
  evolutionPresence = [],
}: {
  inscriptionsParMois: { mois: string; inscriptions: number }[];
  formationsPopulaires: { nom: string; participants: number }[];
  repartitionCategories?: { name: string; value: number }[];
  evolutionPresence?: { month: string; rate: number }[];
}) {
  const mounted = useClientReady();

  const repartitionData = repartitionCategories.length > 0 ? repartitionCategories : defaultRepartition;
  const presenceData = evolutionPresence.length > 0 ? evolutionPresence : defaultPresence;
  const chartData = inscriptionsParMois.length > 0 ? inscriptionsParMois.map((item) => ({
    ...item,
    mois: item.mois === 'Fev' || item.mois === 'Fév' ? 'Fév' : item.mois,
  })) : defaultInscriptions;
  const averageInscriptions = Math.round(
    chartData.reduce((total, item) => total + item.inscriptions, 0) / Math.max(chartData.length, 1),
  );
  const mid = Math.floor(chartData.length / 2);
  const firstHalf = chartData.slice(0, mid);
  const secondHalf = chartData.slice(mid);
  const firstAvg = firstHalf.reduce((tot, item) => tot + item.inscriptions, 0) / Math.max(firstHalf.length, 1);
  const secondAvg = secondHalf.reduce((tot, item) => tot + item.inscriptions, 0) / Math.max(secondHalf.length, 1);
  const trendValue = Math.round(((secondAvg - firstAvg) / Math.max(firstAvg, 1)) * 100);
  const trendLabel = firstHalf.length > 0 ? `${trendValue >= 0 ? '+' : ''}${trendValue}% ce semestre` : 'Progression positive';

  const normalizeFormationName = (name: string) =>
    name
      .replace(/Securite/gi, 'Sécurité')
      .replace(/Developpement/gi, 'Développement')
      .replace(/competences/gi, 'compétences')
      .replace(/metiers/gi, 'métiers')
      .replace(/prevention/gi, 'prévention');

  const getFormationDomain = (name: string) => {
    const normalized = name.toLowerCase();

    if (normalized.includes('sécurité') || normalized.includes('securite')) {
      return 'Sécurité · Formation chantier';
    }
    if (normalized.includes('management')) {
      return 'Management · Formation métier';
    }
    if (normalized.includes('maintenance')) {
      return 'Maintenance · Formation industrielle';
    }
    if (normalized.includes('agile')) {
      return 'Agile · Gestion de projet';
    }
    if (normalized.includes('informatique')) {
      return 'Informatique · Transformation numérique';
    }
    if (normalized.includes('data')) {
      return 'Data · Transformation digitale';
    }

    return 'Formation métier';
  };

  const topFormations = [...formationsPopulaires]
    .sort((a, b) => b.participants - a.participants)
    .slice(0, 5)
    .map((item) => ({
      ...item,
      nom: normalizeFormationName(item.nom),
      domaine: getFormationDomain(item.nom),
    }));

  if (!mounted) {
    return <div className="grid gap-6 lg:grid-cols-2" />;
  }

  const InscriptionTooltip = ({ active, payload, label }: TooltipProps<number, string> & { payload?: Array<{ value?: number }>; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          <p className="text-sm font-semibold text-slate-900">{label}</p>
          <p className="mt-1 text-sm text-slate-600">{payload[0].value} inscriptions</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-col gap-4 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-slate-900">Évolution des inscriptions</h3>
            <p className="text-xs text-slate-500">Nombre d’inscriptions enregistrées par mois</p>
          </div>
          <div className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-semibold text-emerald-700">
            {trendLabel}
          </div>
        </CardHeader>
        <CardContent className="h-[270px] min-h-0 px-5 pt-4 pb-4">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={100}>
            <AreaChart data={chartData} margin={{ top: 20, right: 24, left: 24, bottom: 20 }}>
              <defs>
                <linearGradient id="inscriptionsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity={0.24} />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity={0.04} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#e2e8f0" strokeDasharray="3 3" opacity={0.45} />
              <XAxis dataKey="mois" axisLine={false} tickLine={false} tickMargin={10} stroke="#94a3b8" fontSize={12} />
              <YAxis axisLine={false} tickLine={false} tickMargin={10} stroke="#94a3b8" fontSize={12} width={40} domain={["dataMin - 5", "dataMax + 5"]} />
              <Tooltip content={<InscriptionTooltip />} />
              <ReferenceLine
                y={averageInscriptions}
                stroke="#cbd5e1"
                strokeDasharray="4 4"
                label={{ value: `Moyenne : ${averageInscriptions}`, position: 'insideTopLeft', fill: '#64748b', fontSize: 12 }}
              />
              <Area
                type="monotone"
                dataKey="inscriptions"
                stroke="#2563eb"
                fill="url(#inscriptionsGradient)"
                strokeWidth={3}
                dot={{ fill: '#2563eb', stroke: '#ffffff', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#2563eb', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="border-b border-slate-200 pb-2">
          <div>
            <h3 className="font-semibold text-slate-900">Formations les plus suivies</h3>
            <p className="text-xs text-slate-500">Classement des formations selon le nombre d’inscrits</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 py-4">
          {topFormations.map((formation, index) => {
            const maxParticipants = topFormations[0]?.participants || 1;
            const percentage = Math.max(8, Math.round((formation.participants / maxParticipants) * 100));
            const isTop = index === 0;

            return (
              <div key={formation.nom} className="space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-2xl text-sm font-semibold ${isTop ? 'bg-sky-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700'}`}>
                      #{index + 1}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900">{formation.nom}</p>
                      <p className="text-[11px] text-slate-500">{formation.domaine}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-900">{formation.participants}</p>
                    <p className="text-[11px] text-slate-500">inscrits</p>
                  </div>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className={`h-full rounded-full ${isTop ? 'bg-sky-600' : 'bg-sky-300'}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="border-b border-slate-200 pb-2">
          <h3 className="font-semibold text-slate-900">Répartition par catégorie</h3>
        </CardHeader>
        <CardContent className="h-56 pt-2">
          <div className="flex h-full flex-col gap-3 lg:flex-row">
            <div className="flex-1 min-h-0 min-w-0">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={100}>
                <PieChart>
                  <Pie
                    data={repartitionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={42}
                    outerRadius={68}
                    paddingAngle={2}
                    dataKey="value"
                    nameKey="name"
                  >
                    {repartitionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                    labelStyle={{ color: '#374151' }}
                    formatter={(value) => [`${value}%`, 'Répartition']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid flex-shrink-0 gap-1 min-w-[170px] text-sm text-slate-700">
              {repartitionData.map((entry, index) => (
                <div key={entry.name} className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                  <span className="inline-flex h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="min-w-0 truncate text-xs text-slate-700">{entry.name}</span>
                  <span className="text-[11px] text-slate-500">{entry.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="border-b border-slate-200 pb-2">
          <h3 className="font-semibold text-slate-900">Évolution du taux de présence</h3>
          <p className="text-xs text-slate-500">Suivi mensuel du taux moyen de présence</p>
        </CardHeader>
        <CardContent className="h-56 min-h-0 pt-2">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={100}>
            <LineChart data={presenceData}>
              <CartesianGrid strokeDasharray="2 2" stroke="#f1f5f9" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" domain={[70, 100]} fontSize={12} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                labelStyle={{ color: '#374151' }}
                formatter={(value) => [`${value}%`, 'Taux de présence']}
              />
              <Line type="monotone" dataKey="rate" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', strokeWidth: 1, r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

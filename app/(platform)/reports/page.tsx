"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowRight, Building, CalendarCheck2, GraduationCap, Users, TrendingUp, BookOpen, Award, RotateCcw } from "lucide-react";
import {
  formations,
  entreprises,
  sessions,
  participants,
  certificates,
  inscriptionsParMois,
  formationsPopulaires,
  dashboardStats,
} from "@/lib/mock-data";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { useToast } from "@/components/shared/toast-provider";

const periodOptions = ["Derniers 6 mois", "Dernier trimestre", "Dernier mois"];

const attendanceData = sessions.map((session) => ({
  id: session.id,
  title: session.formationTitre,
  taux: session.statut === "Terminée" ? 90 : session.statut === "En cours" ? 82 : 74,
  date: session.dateDebut,
}));

const sessionPresenceData = [...attendanceData]
  .sort((a, b) => b.taux - a.taux)
  .filter((item, index, self) => self.findIndex((entry) => entry.title === item.title) === index)
  .slice(0, 5);

const displayedSessionPresence = sessionPresenceData.slice(0, 5);
const sessionAveragePresence = Math.round(
  displayedSessionPresence.reduce((acc, item) => acc + item.taux, 0) / Math.max(displayedSessionPresence.length, 1),
);
const excellentSessions = displayedSessionPresence.filter((item) => item.taux >= 85).length;
const watchSessions = displayedSessionPresence.filter((item) => item.taux >= 70 && item.taux < 85).length;
const lowSessions = displayedSessionPresence.filter((item) => item.taux < 70).length;

const sortedFormationOptions = [...formations]
  .map((formation) => formation.titre)
  .sort((a, b) => a.localeCompare(b, "fr"));

const sortedCompanyOptions = [...entreprises].sort((a, b) => a.localeCompare(b, "fr"));

const sortedSessionOptions = Array.from(new Set(sessions.map((session) => session.formationTitre))).sort((a, b) => a.localeCompare(b, "fr"));

const entrepriseParticipants = [
  { name: "Entreprise Alpha", value: 12 },
  { name: "Groupe Industriel Mada", value: 9 },
  { name: "Société Chantier Plus", value: 7 },
  { name: "TekFutura Interne", value: 4 },
];

const enterpriseColors = ["#2563eb", "#7c3aed", "#f59e0b", "#10b981"];
const enterpriseTotal = entrepriseParticipants.reduce((total, item) => total + item.value, 0);

function ExecutiveTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value?: number }>;
  label?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;

  const entry = payload[0];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_18px_40px_rgba(15,23,42,0.08)] min-w-[180px]">
      <p className="text-[10px] uppercase tracking-[0.28em] text-slate-500">Entreprise</p>
      <p className="mt-1 text-sm font-semibold text-slate-900">{label}</p>
      <p className="mt-1 text-sm text-slate-500">{`${entry.value} participants`}</p>
    </div>
  );
}

const topFormations = [...formationsPopulaires].sort((a, b) => b.participants - a.participants).slice(0, 4);

const certificatesThisMonth = 4;
const certificateTrend = [
  { mois: "Jan", certificats: 2 },
  { mois: "Fév", certificats: 3 },
  { mois: "Mar", certificats: 2 },
  { mois: "Avr", certificats: 5 },
  { mois: "Mai", certificats: 4 },
  { mois: "Juin", certificats: 6 },
];

const certificateTotal = certificateTrend.reduce((acc, item) => acc + item.certificats, 0);
const certificateAverage = Number((certificateTotal / certificateTrend.length).toFixed(1));
const certificateAverageLabel = certificateAverage.toString().replace('.', ',');
const bestCertificateMonth = certificateTrend.reduce((best, item) => (item.certificats > best.certificats ? item : best), certificateTrend[0]).mois;

const bestPresence = 90;
const topCompany = "Entreprise Alpha";
const topFormation = "Management";

export default function ReportsPage() {
  const { pushToast } = useToast();
  const [period, setPeriod] = useState(periodOptions[0]);
  const [formationFilter, setFormationFilter] = useState("Toutes les formations");
  const [companyFilter, setCompanyFilter] = useState("Toutes les entreprises");
  const [sessionFilter, setSessionFilter] = useState("Toutes les sessions");

  const filtersPristine =
    period === periodOptions[0] &&
    formationFilter === "Toutes les formations" &&
    companyFilter === "Toutes les entreprises" &&
    sessionFilter === "Toutes les sessions";

  return (
    <div className="space-y-6">
      <PageHeader
        title="Rapports"
        description="Indicateurs de performance des formations TekFutura"
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" onClick={() => pushToast("Téléchargement PDF en préparation...")}>Exporter PDF</Button>
            <Button onClick={() => pushToast("Téléchargement Excel en préparation...")}>Exporter Excel</Button>
          </div>
        }
      />

      <Card className="overflow-hidden">
        <CardHeader className="border-b border-slate-200 py-4 px-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">Filtres</p>
              <p className="text-xs text-slate-500">Affinez le rapport par période, formation, entreprise et session.</p>
            </div>
            <p className="text-xs text-slate-500">Options compactes et claires.</p>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 px-5 py-4 lg:grid-cols-5">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Période</label>
            <Select value={period} onChange={(event) => setPeriod(event.target.value)}>
              <option>Derniers 6 mois</option>
              <option>Dernier trimestre</option>
              <option>Dernier mois</option>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Formation</label>
            <Select value={formationFilter} onChange={(event) => setFormationFilter(event.target.value)}>
              <option>Toutes les formations</option>
              {sortedFormationOptions.map((formation) => (
                <option key={formation} title={formation}>{formation}</option>
              ))}
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Entreprise</label>
            <Select value={companyFilter} onChange={(event) => setCompanyFilter(event.target.value)}>
              <option>Toutes les entreprises</option>
              {sortedCompanyOptions.map((company) => (
                <option key={company} title={company}>{company}</option>
              ))}
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Session</label>
            <Select value={sessionFilter} onChange={(event) => setSessionFilter(event.target.value)}>
              <option>Toutes les sessions</option>
              {sortedSessionOptions.map((session, index) => (
                <option key={`${session}-${index}`} title={session}>{session}</option>
              ))}
            </Select>
          </div>

          <div className="flex items-end justify-end">
            <Button
              variant="secondary"
              size="sm"
              className="w-full sm:w-auto"
              disabled={filtersPristine}
              onClick={() => {
                setPeriod(periodOptions[0]);
                setFormationFilter("Toutes les formations");
                setCompanyFilter("Toutes les entreprises");
                setSessionFilter("Toutes les sessions");
              }}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Réinitialiser
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <CompactStatCard
          label="Formations actives"
          value={formations.filter((formation) => formation.statut === "ACTIVE").length}
          icon={<GraduationCap className="h-5 w-5" />}
          variant="blue"
          trend={{ value: 12, isPositive: true }}
        />
        <CompactStatCard
          label="Sessions enregistrées"
          value={sessions.length}
          icon={<CalendarCheck2 className="h-5 w-5" />}
          variant="green"
          trend={{ value: 8, isPositive: true }}
        />
        <CompactStatCard
          label="Participants totaux"
          value={participants.length}
          icon={<Users className="h-5 w-5" />}
          variant="purple"
          trend={{ value: 6, isPositive: true }}
        />
        <CompactStatCard
          label="Taux moyen de présence"
          value={`${dashboardStats.tauxPresenceMoyen}%`}
          icon={<Building className="h-5 w-5" />}
          variant="yellow"
          trend={{ value: 4, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="min-w-0">
          <ChartCard title="Inscriptions mensuelles" subtitle="Volume des nouvelles inscriptions par mois">
            <AreaChart data={inscriptionsParMois} margin={{ top: 20, right: 22, left: 18, bottom: 10 }}>
              <defs>
                <linearGradient id="inscriptionsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity={0.28} />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity={0.04} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#e2e8f0" strokeDasharray="4 4" />
              <XAxis dataKey="mois" axisLine={false} tickLine={false} stroke="#94a3b8" tick={{ fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} stroke="#94a3b8" tick={{ fontSize: 12 }} width={34} domain={["dataMin - 5", "dataMax + 5"]} />
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, boxShadow: '0 12px 28px rgba(15, 23, 42, 0.08)' }}
                labelStyle={{ color: '#0f172a' }}
                formatter={(value) => [`${value} inscriptions`, '']}
              />
              <ReferenceLine y={Math.round(inscriptionsParMois.reduce((acc, item) => acc + item.inscriptions, 0) / Math.max(inscriptionsParMois.length, 1))} stroke="#cbd5e1" strokeDasharray="4 4" />
              <Area type="monotone" dataKey="inscriptions" stroke="#2563eb" fill="url(#inscriptionsGradient)" strokeWidth={3} dot={{ fill: '#2563eb', stroke: '#fff', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
            </AreaChart>
          </ChartCard>
        </div>

        <div className="min-w-0">
          <ChartCard title="Synthèse des performances" subtitle="Points clés de la période" chart={false}>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <MiniSummaryCard icon={<TrendingUp className="h-4 w-4" />} label="Meilleur taux de présence" value={`${bestPresence}%`} detail="Session la plus performante" bgColor="bg-green-50" />
              <MiniSummaryCard icon={<BookOpen className="h-4 w-4" />} label="Formation la plus suivie" value={topFormation} detail="Classement par inscriptions" bgColor="bg-blue-50" />
              <MiniSummaryCard icon={<Building className="h-4 w-4" />} label="Entreprise la plus représentée" value={topCompany} detail="Participants actifs" bgColor="bg-purple-50" />
              <MiniSummaryCard icon={<Award className="h-4 w-4" />} label="Certificats ce mois-ci" value={`${certificatesThisMonth}`} detail="Générés ce mois" bgColor="bg-orange-50" />
            </div>
          </ChartCard>
        </div>

        <div className="min-w-0">
          <ChartCard title="Formations les plus demandées" subtitle="Leaderboard des formations les plus suivies" chart={false}>
            <div className="flex h-full flex-col gap-4 overflow-hidden">
              {topFormations.map((formation, index) => {
                const ratio = topFormations[0]?.participants ? (formation.participants / topFormations[0].participants) * 100 : 0;
                const label = formation.nom === 'Agile'
                  ? 'Gestion de projet Agile'
                  : formation.nom === 'Sécurité'
                  ? 'Sécurité et prévention sur chantier'
                  : formation.nom === 'Maintenance'
                  ? 'Maintenance industrielle'
                  : formation.nom === 'Management'
                  ? 'Management des structures de production'
                  : `${formation.nom} · Formation métier`;

                return (
                  <div key={formation.nom} className="space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className={`flex h-9 w-9 items-center justify-center rounded-2xl text-sm font-semibold ${index === 0 ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                          #{index + 1}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-900" title={label}>{label}</p>
                          <p className="text-[11px] text-slate-500">{formation.nom} · Formation métier</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-slate-900">{formation.participants}</p>
                        <p className="text-[11px] text-slate-500">inscrits</p>
                      </div>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
                      <div className={`h-full rounded-full ${index === 0 ? 'bg-sky-600' : 'bg-sky-300'}`} style={{ width: `${Math.max(18, Math.round(ratio))}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </ChartCard>
        </div>

        <div className="min-w-0">
          <ChartCard title="Participants par entreprise" subtitle="Répartition des entreprises engagées" chart={false}>
            <div className="grid h-full gap-6 xl:grid-cols-[220px_minmax(0,1fr)]">
              <div className="flex shrink-0 items-center justify-center">
                <div className="relative h-[200px] w-[200px] max-w-[200px] max-h-[200px]">
                  <PieChart width={200} height={200}>
                    <Pie
                      data={entrepriseParticipants}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={4}
                      startAngle={90}
                      endAngle={-270}
                    >
                      {entrepriseParticipants.map((entry, index) => (
                        <Cell key={entry.name} fill={enterpriseColors[index % enterpriseColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      cursor={{ fill: 'rgba(15, 23, 42, 0.05)' }}
                      content={<ExecutiveTooltip />}
                    />
                  </PieChart>
                </div>
              </div>

              <div className="flex min-w-0 flex-col justify-center gap-4 overflow-hidden">
                <div className="space-y-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900">Répartition</p>
                  <p className="text-xs text-slate-500">Quatre entreprises représentées, lecture rapide et compacte.</p>
                </div>
                <ul className="space-y-2 text-sm">
                  {entrepriseParticipants.map((company, index) => {
                    const percentage = Math.round((company.value / enterpriseTotal) * 100);
                    return (
                      <li key={company.name} className="grid w-full grid-cols-[12px_minmax(0,1fr)_auto_auto] items-center gap-3 text-slate-700">
                        <span className="inline-flex h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: enterpriseColors[index % enterpriseColors.length] }} />
                        <span className="min-w-0 truncate font-medium text-slate-900" title={company.name}>{company.name}</span>
                        <span className="whitespace-nowrap text-right text-slate-500">{percentage}%</span>
                        <span className="whitespace-nowrap text-right font-semibold text-slate-900">{company.value}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </ChartCard>
        </div>

        <div className="min-w-0">
          <ChartCard
            title="Taux de présence par session"
            subtitle="Sessions classées par taux de présence moyen"
            chart={false}
            action={
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-700">
                  Moyenne : {sessionAveragePresence}%
                </span>
                <Button variant="outline" size="sm" className="gap-1 text-slate-700 hover:text-slate-900">
                  Voir tout
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            }
          >
            <div className="flex h-full flex-col gap-3 overflow-hidden">
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                <span className="inline-flex items-center gap-2">
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  Vert : ≥ 85%
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-amber-400" />
                  Orange : 70–84%
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
                  Rouge : &lt; 70%
                </span>
              </div>
              <div className="flex-1 space-y-3 overflow-hidden">
                {displayedSessionPresence.map((item) => {
                  const color = item.taux >= 85 ? 'bg-emerald-500' : item.taux >= 70 ? 'bg-amber-400' : 'bg-red-500';
                  return (
                    <div key={item.id} className="space-y-1">
                      <div className="flex items-center justify-between gap-3 text-sm">
                        <p className="min-w-0 truncate font-semibold text-slate-900" title={item.title}>{item.title}</p>
                        <span className="text-sm font-semibold text-slate-700">{item.taux}%</span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
                        <div className={`${color} h-full rounded-full`} style={{ width: `${item.taux}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="text-sm text-slate-600">
                <span className="font-semibold text-slate-900">{excellentSessions} sessions excellentes</span>
                <span className="mx-2">·</span>
                <span>{watchSessions + lowSessions} sessions à surveiller</span>
              </div>
            </div>
          </ChartCard>
        </div>

        <div className="min-w-0">
          <ChartCard
            title="Certificats par mois"
            subtitle="Nombre de certificats générés au cours des 6 derniers mois"
            chart={false}
            action={
              <span className="inline-flex rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
                +50% ce semestre
              </span>
            }
          >
            <div className="flex h-full flex-col gap-4">
              <div className="h-[260px] min-h-0 min-w-0">
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={100}>
                  <AreaChart data={certificateTrend} margin={{ top: 20, right: 22, left: 18, bottom: 10 }}>
                    <defs>
                      <linearGradient id="certificatsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.26} />
                        <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0.04} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} stroke="#e2e8f0" strokeDasharray="4 4" />
                    <XAxis dataKey="mois" axisLine={false} tickLine={false} stroke="#94a3b8" tick={{ fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} stroke="#94a3b8" tick={{ fontSize: 12 }} width={34} />
                    <ReferenceLine
                      y={certificateAverage}
                      stroke="#0ea5e9"
                      strokeDasharray="4 4"
                      strokeOpacity={0.6}
                      label={{ value: `Moyenne : ${certificateAverageLabel}`, position: 'insideTopRight', fill: '#0ea5e9', fontSize: 11, fontWeight: 700, opacity: 0.8 }}
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, boxShadow: '0 12px 28px rgba(15, 23, 42, 0.08)' }}
                      labelStyle={{ color: '#0f172a' }}
                      formatter={(value) => [`${value} certificats`, '']}
                      labelFormatter={(label) => `Mois : ${label}`}
                    />
                    <Area type="monotone" dataKey="certificats" stroke="#0ea5e9" fill="url(#certificatsGradient)" strokeWidth={3} dot={{ fill: '#0ea5e9', stroke: '#fff', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white px-2 py-2 text-sm">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">Total</p>
                  <p className="mt-1 text-base font-semibold text-slate-900">{certificateTotal}</p>
                </div>
                <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white px-2 py-2 text-sm">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">Meilleur mois</p>
                  <p className="mt-1 text-base font-semibold text-slate-900">{bestCertificateMonth}</p>
                </div>
                <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white px-2 py-2 text-sm">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">Moyenne</p>
                  <p className="mt-1 text-base font-semibold text-slate-900">{certificateAverageLabel}/mois</p>
                </div>
              </div>
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}

function MiniSummaryCard({ icon, label, value, detail, bgColor }: { icon: ReactNode; label: string; value: string; detail: string; bgColor: string }) {
  return (
    <div className={`rounded-xl border border-slate-200 ${bgColor} p-3 relative`}>
      <div className="absolute top-3 right-3 text-slate-400">{icon}</div>
      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-2 text-lg font-semibold text-slate-900 truncate" title={value}>{value}</p>
      <p className="mt-1 text-xs text-slate-500">{detail}</p>
    </div>
  );
}

function ChartCard({
  title,
  subtitle,
  action,
  children,
  chart = true,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  chart?: boolean;
}) {
  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="flex flex-col gap-3 border-b border-slate-200 pb-4 px-5 pt-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900">{title}</p>
          {subtitle ? <p className="text-xs text-slate-500">{subtitle}</p> : null}
        </div>
        {action ? <div className="min-w-0 flex-shrink-0">{action}</div> : null}
      </CardHeader>
      <CardContent className="h-[340px] min-h-0 px-5 py-5">
        {chart ? (
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={100}>
            {children}
          </ResponsiveContainer>
        ) : (
          <div className="h-full">{children}</div>
        )}
      </CardContent>
    </Card>
  );
}

function CompactStatCard({
  label,
  value,
  icon,
  variant = "blue",
  trend,
}: {
  label: string;
  value: string | number;
  icon: ReactNode;
  variant?: "blue" | "green" | "yellow" | "purple";
  trend?: { value: number; isPositive: boolean };
}) {
  const variantStyles: Record<string, { bg: string; icon: string; border: string }> = {
    blue: { bg: "bg-blue-50", icon: "text-blue-700 bg-blue-100", border: "border-blue-100" },
    green: { bg: "bg-emerald-50", icon: "text-emerald-700 bg-emerald-100", border: "border-emerald-100" },
    yellow: { bg: "bg-amber-50", icon: "text-amber-700 bg-amber-100", border: "border-amber-100" },
    purple: { bg: "bg-purple-50", icon: "text-purple-700 bg-purple-100", border: "border-purple-100" },
  };

  const styles = variantStyles[variant] ?? variantStyles.blue;

  return (
    <Card className={`h-full overflow-hidden border ${styles.bg} ${styles.border}`}>
      <CardContent className="px-4 py-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900 truncate">{value}</p>
            {trend ? (
              <p className={`mt-2 text-xs font-semibold ${trend.isPositive ? "text-emerald-600" : "text-red-600"}`}>
                {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
              </p>
            ) : null}
          </div>
          <div className={`rounded-lg p-2 ${styles.icon}`}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}

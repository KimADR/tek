import { ShieldCheck, FileText, Shield, Database, UserCheck } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export default function SettingsPage() {
  return (
    <div className="min-w-0 space-y-6">
      <PageHeader
        title="Paramètres"
        description="Configuration générale de la plateforme TekFutura. Gérez les rôles, la sécurité, les certificats et les sauvegardes de la plateforme."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="overflow-hidden">
          <CardHeader className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
            <div className="flex min-w-0 items-start gap-3">
              <span className="rounded-2xl bg-sky-50 p-2 text-sky-600">
                <UserCheck className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-base font-semibold text-slate-900">Gestion des rôles</h2>
                <p className="mt-1 text-sm text-slate-500">Définissez les accès des utilisateurs selon leur responsabilité.</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Rôle actif</label>
              <Select defaultValue="Administrateur">
                <option>Administrateur</option>
                <option>Direction</option>
                <option>Formateur</option>
              </Select>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">Permissions</p>
              <div className="mt-3 space-y-2 text-sm text-slate-700">
                {[
                  "Gérer les formations",
                  "Gérer les participants",
                  "Générer les certificats",
                  "Consulter les rapports",
                ].map((permission) => (
                  <div key={permission} className="flex items-center gap-3">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-sky-100 text-sky-600 text-[10px] font-semibold">
                      ✓
                    </span>
                    <span>{permission}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Button variant="outline" className="w-full sm:w-auto">
                Mettre à jour les permissions
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
            <div className="flex min-w-0 items-start gap-3">
              <span className="rounded-2xl bg-sky-50 p-2 text-sky-600">
                <FileText className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-base font-semibold text-slate-900">Préférences certificat</h2>
                <p className="mt-1 text-sm text-slate-500">Personnalisez les informations affichées sur les certificats.</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Signature du directeur</label>
                <Input placeholder="Ex. Marie Dupont" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Mention légale</label>
                <Input placeholder="Ex. Certificat valide sous réserve..." />
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-500">
              Ces informations seront utilisées lors de la génération automatique des certificats.
            </p>
            <div>
              <Button className="w-full sm:w-auto">Enregistrer les préférences</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
            <div className="flex min-w-0 items-start gap-3">
              <span className="rounded-2xl bg-sky-50 p-2 text-sky-600">
                <Shield className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-base font-semibold text-slate-900">Sécurité</h2>
                <p className="mt-1 text-sm text-slate-500">Renforcez la protection des accès à la plateforme.</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Durée de session inactive</label>
                <div className="flex items-center gap-3">
                  <Input placeholder="120" defaultValue="120" className="max-w-[120px]" />
                  <span className="text-sm text-slate-500">minutes</span>
                </div>
              </div>
              <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                Recommandé
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Double authentification</p>
                    <p className="text-sm text-slate-500">Recommandé pour les comptes administrateurs.</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Activer
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
            <div className="flex min-w-0 items-start gap-3">
              <span className="rounded-2xl bg-sky-50 p-2 text-sky-600">
                <Database className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-base font-semibold text-slate-900">Sauvegarde</h2>
                <p className="mt-1 text-sm text-slate-500">Protégez les données de la plateforme avec des sauvegardes régulières.</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2 text-sm text-slate-600">
              <p>Dernière sauvegarde : <span className="font-semibold text-slate-900">27/04/2026 à 14:30</span></p>
              <p className="flex items-center gap-2">
                Statut :
                <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">À jour</span>
              </p>
              <p>Sauvegarde automatique : activée</p>
              <p>Fréquence : Tous les jours à 23:00</p>
            </div>
            <div>
              <Button className="w-full sm:w-auto">
                Lancer une sauvegarde
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="flex items-start gap-3 border-b border-slate-200 pb-4">
          <span className="rounded-2xl bg-slate-100 p-2 text-slate-600">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-base font-semibold text-slate-900">Informations système</h2>
            <p className="mt-1 text-sm text-slate-500">Détails succincts sur l’environnement et le statut de la plateforme.</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { label: "Version plateforme", value: "1.0.0" },
              { label: "Environnement", value: "Développement" },
              { label: "Dernière mise à jour", value: "30/04/2026" },
              { label: "Statut", value: "Opérationnel" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">{item.label}</p>
                <p className="mt-2 font-semibold text-slate-900">{item.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

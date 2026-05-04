import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BrandMark } from "@/components/shared/brand-mark";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen bg-slate-50 p-4 lg:grid-cols-[1.2fr_0.8fr]">
      <section className="hidden flex-col justify-between rounded-lg bg-slate-900 p-12 text-white lg:flex">
        <BrandMark light />
        <div className="max-w-lg">
          <h1 className="text-4xl font-bold leading-tight">
            Centralisez le suivi des formations, sessions, présences et certificats.
          </h1>
          <p className="mt-4 text-slate-300 text-lg">
            Un espace professionnel et sobre pensé pour la direction, l&apos;administration et les formateurs.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
            <p className="text-2xl font-bold">6</p>
            <p className="text-slate-400 text-xs mt-1">Formations actives</p>
          </div>
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
            <p className="text-2xl font-bold">5</p>
            <p className="text-slate-400 text-xs mt-1">Sessions planifiées</p>
          </div>
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
            <p className="text-2xl font-bold">86%</p>
            <p className="text-slate-400 text-xs mt-1">Taux de présence</p>
          </div>
        </div>
      </section>

      <section className="flex items-center justify-center">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-4">
            <div className="lg:hidden">
              <BrandMark />
            </div>
            <div className="inline-flex w-fit items-center gap-2 rounded-md bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 border border-emerald-200">
              <ShieldCheck className="h-3.5 w-3.5" />
              Accès sécurisé
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Connexion</h1>
              <p className="text-sm text-slate-600 mt-1">Plateforme de suivi des formations</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Email</label>
              <Input type="email" placeholder="exemple@tekfutura.mg" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Mot de passe</label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <Link href="/dashboard" className="block">
              <Button className="w-full justify-between">
                Se connecter
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-600">
              Environnement MVP. Les données sont mockées et persistées localement pour la démonstration.
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Activity, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BrandMark } from "@/components/shared/brand-mark";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen bg-slate-50">
      {/* Colonne gauche - Branding minimal */}
      <section className="hidden lg:flex lg:w-1/2 flex-col justify-center p-12 bg-slate-900 text-white">
        <div className="max-w-sm space-y-6">
          {/* Logo TekFutura */}
          <BrandMark light />

          {/* Titre principal */}
          <h1 className="text-3xl font-bold leading-tight">
            Pilotez vos formations avec clarté.
          </h1>

          {/* Sous-titre court */}
          <p className="text-slate-300 text-base leading-relaxed">
            Centralisez sessions, participants, présences et certificats dans une interface professionnelle.
          </p>

          {/* Trois statistiques minimales */}
          <div className="flex gap-6 pt-2">
            <div className="text-center">
              <div className="flex justify-center mb-1">
                <Zap className="h-4 w-4 text-blue-400" />
              </div>
              <p className="text-lg font-bold text-white">6</p>
              <p className="text-slate-400 text-xs">Formations actives</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-1">
                <Activity className="h-4 w-4 text-blue-400" />
              </div>
              <p className="text-lg font-bold text-white">7</p>
              <p className="text-slate-400 text-xs">Sessions suivies</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-1">
                <TrendingUp className="h-4 w-4 text-emerald-400" />
              </div>
              <p className="text-lg font-bold text-white">86%</p>
              <p className="text-slate-400 text-xs">Présence moyenne</p>
            </div>
          </div>

          {/* Phrase de réassurance */}
          <p className="text-xs text-slate-500 pt-4">
            Prototype MVP conçu pour valider le parcours métier avant intégration backend.
          </p>
        </div>
      </section>

      {/* Colonne droite - Formulaire de connexion */}
      <section className="flex w-full lg:w-1/2 items-center justify-center p-8">
        {/* Logo mobile */}
        <div className="lg:hidden mb-8">
          <BrandMark />
        </div>

        <Card className="w-full max-w-sm border border-slate-200 bg-white shadow-lg rounded-2xl">
          <CardHeader className="space-y-4 pb-6">
            {/* Badge sécurité discret */}
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 border border-emerald-200/50 w-fit">
              <ShieldCheck className="h-3.5 w-3.5" />
              Accès sécurisé
            </div>

            {/* Titres */}
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-slate-900">Connexion</h1>
              <p className="text-slate-600 text-sm">
                Accédez à votre espace TekFutura
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-5">
            {/* Champ Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-700">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="exemple@tekfutura.mg"
                className="h-10"
              />
            </div>

            {/* Champ Mot de passe */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-slate-700">
                  Mot de passe
                </label>
                <Link
                  href="#"
                  className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Oublié ?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="h-10"
              />
            </div>

            {/* Bouton connexion */}
            <Link href="/dashboard" className="block pt-1">
              <Button className="w-full h-10 justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700">
                Se connecter
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>

            {/* Note MVP discrète */}
            <div className="text-center pt-2">
              <p className="text-xs text-slate-500">
                Environnement MVP · Données de démonstration
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

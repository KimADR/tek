import { Card, CardContent } from "@/components/ui/card";
import { Certificate } from "@/types";
import { formatDate } from "@/lib/utils";

export function CertificatePreview({ certificate }: { certificate: Certificate }) {
  return (
    <Card className="border-2 border-blue-200 bg-gradient-to-br from-white via-blue-50/30 to-white">
      <CardContent className="py-12 text-center">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">TekFutura</p>
          <div className="mt-2 h-1 w-16 bg-blue-600 mx-auto rounded-full"></div>
        </div>
        <h3 className="mt-4 text-3xl font-bold text-slate-900">Certificat de formation</h3>
        <div className="mt-8 space-y-2">
          <p className="text-sm text-slate-600">Ce certificat est remis à</p>
          <p className="text-2xl font-bold text-slate-900">{certificate.participantNom}</p>
        </div>
        <div className="mt-6 space-y-2">
          <p className="text-sm text-slate-600">pour la formation</p>
          <p className="text-lg font-semibold text-slate-900">{certificate.formation}</p>
        </div>
        <div className="mt-8 border-t border-slate-200 pt-4">
          <p className="text-xs text-slate-600">N° {certificate.numero} • {formatDate(certificate.dateEmission)}</p>
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SessionPayload } from "@/types";
import { useToast } from "@/components/shared/toast-provider";
import { Modal } from "@/components/ui/modal";

const initialForm: SessionPayload = {
  formationId: "",
  formationTitre: "",
  formateur: "",
  dateDebut: "",
  dateFin: "",
  lieu: "",
  participantsCount: 0,
  statut: "Prévue",
};

export function SessionForm({
  onSubmit,
}: {
  onSubmit: (payload: SessionPayload) => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<SessionPayload>(initialForm);
  const { pushToast } = useToast();

  return (
    <>
      <Button onClick={() => setOpen(true)}>Ajouter une session</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Planifier une session"
        description="Renseignez la formation, le formateur, les dates et les informations logistiques."
      >
        <div className="grid gap-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Identifiant formation">
              <Input
                placeholder="Ex: f1"
                value={form.formationId}
                onChange={(event) => setForm((current) => ({ ...current, formationId: event.target.value }))}
              />
            </Field>
            <Field label="Formation">
              <Input
                placeholder="Ex: Management des structures"
                value={form.formationTitre}
                onChange={(event) =>
                  setForm((current) => ({ ...current, formationTitre: event.target.value }))
                }
              />
            </Field>
          </div>
          <div className="pt-2 border-t border-slate-200/50">
            <Field label="Formateur">
              <Input
                placeholder="Nom du formateur"
                value={form.formateur}
                onChange={(event) => setForm((current) => ({ ...current, formateur: event.target.value }))}
              />
            </Field>
          </div>
          <div className="grid gap-6 md:grid-cols-2 pt-2 border-t border-slate-200/50">
            <Field label="Date de début">
              <Input
                type="date"
                value={form.dateDebut}
                onChange={(event) => setForm((current) => ({ ...current, dateDebut: event.target.value }))}
              />
            </Field>
            <Field label="Date de fin">
              <Input
                type="date"
                value={form.dateFin}
                onChange={(event) => setForm((current) => ({ ...current, dateFin: event.target.value }))}
              />
            </Field>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Lieu">
              <Input
                placeholder="Ex: Antananarivo"
                value={form.lieu}
                onChange={(event) => setForm((current) => ({ ...current, lieu: event.target.value }))}
              />
            </Field>
            <Field label="Participants prévus">
              <Input
                placeholder="Nombre de participants"
                type="number"
                value={form.participantsCount}
                onChange={(event) =>
                  setForm((current) => ({ ...current, participantsCount: Number(event.target.value) }))
                }
              />
            </Field>
          </div>
          <div className="pt-2 border-t border-slate-200/50">
            <Field label="Statut">
              <Select
                value={form.statut}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    statut: event.target.value as SessionPayload["statut"],
                  }))
                }
              >
                <option>Prévue</option>
                <option>En cours</option>
                <option>Terminée</option>
                <option>Annulée</option>
              </Select>
            </Field>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-6">
            <p className="text-xs text-slate-400">Les dates, le lieu et le statut resteront modifiables ensuite.</p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Annuler
              </Button>
              <Button
                disabled={saving}
                onClick={async () => {
                  setSaving(true);
                  await onSubmit(form);
                  pushToast("Session enregistrée");
                  setForm(initialForm);
                  setOpen(false);
                  setSaving(false);
                }}
              >
                {saving ? "Enregistrement..." : "Enregistrer"}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-slate-900">{label}</span>
      {children}
    </label>
  );
}

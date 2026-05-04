"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/shared/toast-provider";
import { FormationPayload } from "@/types";
import { Modal } from "@/components/ui/modal";

const initialForm: FormationPayload = {
  titre: "",
  categorie: "",
  dureeHeures: 8,
  statut: "ACTIVE",
  description: "",
};

export function FormationForm({
  onSubmit,
}: {
  onSubmit: (payload: FormationPayload) => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<FormationPayload>(initialForm);
  const { pushToast } = useToast();

  return (
    <>
      <Button onClick={() => setOpen(true)}>Ajouter une formation</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Ajouter une formation"
        description="Créez une nouvelle offre de formation avec ses informations principales."
      >
        <div className="grid gap-6">
          <Field label="Titre de la formation">
            <Input
              placeholder="Ex: Gestion de projet Agile"
              value={form.titre}
              onChange={(event) => setForm((current) => ({ ...current, titre: event.target.value }))}
            />
          </Field>
          <div className="grid gap-6 md:grid-cols-2 pt-2 border-t border-slate-200/50">
            <Field label="Catégorie">
              <Input
                placeholder="Ex: Gestion de projet"
                value={form.categorie}
                onChange={(event) => setForm((current) => ({ ...current, categorie: event.target.value }))}
              />
            </Field>
            <Field label="Durée">
              <Input
                placeholder="Durée (heures)"
                type="number"
                value={form.dureeHeures}
                onChange={(event) =>
                  setForm((current) => ({ ...current, dureeHeures: Number(event.target.value) }))
                }
              />
            </Field>
          </div>
          <div className="pt-2 border-t border-slate-200/50">
            <Field label="Description">
              <Input
                placeholder="Résumé professionnel de la formation"
                value={form.description}
                onChange={(event) =>
                  setForm((current) => ({ ...current, description: event.target.value }))
                }
              />
            </Field>
          </div>
          <Field label="Statut">
            <Select
              value={form.statut}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  statut: event.target.value as FormationPayload["statut"],
                }))
              }
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </Select>
          </Field>
          <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-6">
            <p className="text-xs text-slate-400">Les informations pourront être reliées à l&apos;API plus tard.</p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Annuler
              </Button>
              <Button
                disabled={saving}
                onClick={async () => {
                  setSaving(true);
                  await onSubmit(form);
                  pushToast("Formation enregistrée");
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

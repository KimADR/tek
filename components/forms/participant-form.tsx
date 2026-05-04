"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { entreprises } from "@/lib/mock-data";
import { ParticipantPayload } from "@/types";
import { useToast } from "@/components/shared/toast-provider";
import { Modal } from "@/components/ui/modal";

const initialForm: ParticipantPayload = {
  nomComplet: "",
  email: "",
  telephone: "",
  entreprise: entreprises[0],
  poste: "",
  formationsSuivies: [],
};

export function ParticipantForm({
  onSubmit,
  entrepriseOptions,
}: {
  onSubmit: (payload: ParticipantPayload) => Promise<void>;
  entrepriseOptions: string[];
}) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<ParticipantPayload>(initialForm);
  const { pushToast } = useToast();

  return (
    <>
      <Button onClick={() => setOpen(true)}>Ajouter un participant</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Ajouter un participant"
        description="Créez un profil participant avec ses coordonnées et son entreprise."
      >
        <div className="grid gap-6">
          <Field label="Nom complet">
            <Input
              placeholder="Ex: Rina Ando"
              value={form.nomComplet}
              onChange={(event) =>
                setForm((current) => ({ ...current, nomComplet: event.target.value }))
              }
            />
          </Field>
          <div className="grid gap-6 md:grid-cols-2 pt-2 border-t border-slate-200/50">
            <Field label="Email">
              <Input
                placeholder="exemple@entreprise.mg"
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              />
            </Field>
            <Field label="Téléphone">
              <Input
                placeholder="+261 34 00 000 00"
                value={form.telephone}
                onChange={(event) =>
                  setForm((current) => ({ ...current, telephone: event.target.value }))
                }
              />
            </Field>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Entreprise">
              <Select
                value={form.entreprise}
                onChange={(event) =>
                  setForm((current) => ({ ...current, entreprise: event.target.value }))
                }
              >
                {entrepriseOptions.map((entreprise) => (
                  <option key={entreprise}>{entreprise}</option>
                ))}
              </Select>
            </Field>
            <Field label="Poste">
              <Input
                placeholder="Ex: Chef d'équipe"
                value={form.poste}
                onChange={(event) => setForm((current) => ({ ...current, poste: event.target.value }))}
              />
            </Field>
          </div>
          <div className="pt-2 border-t border-slate-200/50">
            <Field label="Formations suivies">
              <Input
                placeholder="Séparez les formations par une virgule"
                value={form.formationsSuivies.join(", ")}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    formationsSuivies: event.target.value
                      .split(",")
                      .map((item) => item.trim())
                      .filter(Boolean),
                  }))
                }
              />
            </Field>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-6">
            <p className="text-xs text-slate-400">Le profil sera visible immédiatement dans la liste des participants.</p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Annuler
              </Button>
              <Button
                disabled={saving}
                onClick={async () => {
                  setSaving(true);
                  await onSubmit(form);
                  pushToast("Participant enregistré");
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

import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/admin/CrudPage";
import { L10nField, TextField, emptyL10n } from "@/components/admin/fields";
import type { FigureRow, L10n } from "@/lib/admin.server";

export const Route = createFileRoute("/admin/chiffres")({
  component: FiguresAdmin,
});

function FiguresAdmin() {
  return (
    <CrudPage<FigureRow>
      table="key_figures"
      title="Chiffres clés"
      description="Indicateurs d'impact affichés sur le site."
      makeEmpty={() => ({ id: "", value: "", label: emptyL10n(), sort_order: 0 })}
      rowTitle={(f) => f.value}
      rowSubtitle={(f) => (f.label as L10n)?.fr ?? ""}
      renderForm={(f, set) => (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="Valeur (ex. 12 000+)"
              value={f.value}
              required
              onChange={(v) => set({ ...f, value: v })}
            />
            <TextField
              label="Ordre d'affichage"
              type="number"
              value={String(f.sort_order)}
              onChange={(v) => set({ ...f, sort_order: Number(v) || 0 })}
            />
          </div>
          <L10nField
            label="Libellé"
            value={f.label}
            onChange={(v) => set({ ...f, label: v })}
          />
        </>
      )}
    />
  );
}

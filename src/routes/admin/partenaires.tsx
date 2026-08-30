import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/admin/CrudPage";
import { L10nField, TextField, emptyL10n } from "@/components/admin/fields";
import type { L10n, PartnerRow } from "@/lib/admin.server";

export const Route = createFileRoute("/admin/partenaires")({
  component: PartnersAdmin,
});

function PartnersAdmin() {
  return (
    <CrudPage<PartnerRow>
      table="partners"
      title="Partenaires"
      description="Institutions et organisations présentées sur la page Partenaires."
      makeEmpty={() => ({ id: "", name: emptyL10n(), type: emptyL10n(), sort_order: 0 })}
      rowTitle={(p) => (p.name as L10n)?.fr || "Sans nom"}
      rowSubtitle={(p) => (p.type as L10n)?.fr ?? ""}
      renderForm={(p, set) => (
        <>
          <L10nField
            label="Nom du partenaire"
            value={p.name}
            onChange={(v) => set({ ...p, name: v })}
          />
          <L10nField
            label="Type / catégorie"
            value={p.type}
            onChange={(v) => set({ ...p, type: v })}
          />
          <TextField
            label="Ordre d'affichage"
            type="number"
            value={String(p.sort_order)}
            onChange={(v) => set({ ...p, sort_order: Number(v) || 0 })}
          />
        </>
      )}
    />
  );
}

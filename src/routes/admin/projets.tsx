import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/admin/CrudPage";
import {
  ImageField,
  L10nField,
  L10nListField,
  TextField,
  emptyL10n,
  emptyL10nList,
} from "@/components/admin/fields";
import type { L10n, ProjectRow } from "@/lib/admin.server";

export const Route = createFileRoute("/admin/projets")({
  component: ProjectsAdmin,
});

const selectCls =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30";

function ProjectsAdmin() {
  return (
    <CrudPage<ProjectRow>
      table="projects"
      title="Projets"
      description="Projets réalisés et à venir, avec leurs contenus trilingues."
      makeEmpty={() => ({
        id: "",
        slug: "",
        status: "upcoming",
        sort_order: 0,
        cover_url: "",
        cover_alt: emptyL10n(),
        title: emptyL10n(),
        summary: emptyL10n(),
        location: emptyL10n(),
        period: emptyL10n(),
        context: emptyL10n(),
        problem: emptyL10n(),
        objectives: emptyL10nList(),
        beneficiaries: emptyL10n(),
        activities: emptyL10nList(),
        results: emptyL10n(),
        partners: emptyL10n(),
        gallery: [],
      })}
      rowTitle={(p) => (p.title as L10n)?.fr || p.slug}
      rowSubtitle={(p) =>
        `${p.status === "done" ? "Réalisé" : "À venir"} — /projets/${p.slug}`
      }
      renderForm={(p, set) => (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="Identifiant (slug, URL)"
              value={p.slug}
              required
              onChange={(v) =>
                set({
                  ...p,
                  slug: v
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[̀-ͯ]/g, "")
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-+|-+$/g, ""),
                })
              }
            />
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Statut</label>
              <select
                value={p.status}
                onChange={(e) => set({ ...p, status: e.target.value as "done" | "upcoming" })}
                className={selectCls}
              >
                <option value="done">Réalisé</option>
                <option value="upcoming">À venir</option>
              </select>
            </div>
            <TextField
              label="Ordre d'affichage"
              type="number"
              value={String(p.sort_order)}
              onChange={(v) => set({ ...p, sort_order: Number(v) || 0 })}
            />
          </div>
          <ImageField
            label="Image de couverture"
            value={p.cover_url}
            onChange={(v) => set({ ...p, cover_url: v })}
          />
          <L10nField
            label="Description de l'image (accessibilité)"
            value={p.cover_alt}
            onChange={(v) => set({ ...p, cover_alt: v })}
          />
          <L10nField label="Titre" value={p.title} onChange={(v) => set({ ...p, title: v })} />
          <L10nField
            label="Résumé"
            multiline
            value={p.summary}
            onChange={(v) => set({ ...p, summary: v })}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <L10nField
              label="Lieu"
              value={p.location}
              onChange={(v) => set({ ...p, location: v })}
            />
            <L10nField
              label="Période"
              value={p.period}
              onChange={(v) => set({ ...p, period: v })}
            />
          </div>
          <L10nField
            label="Contexte"
            multiline
            value={p.context}
            onChange={(v) => set({ ...p, context: v })}
          />
          <L10nField
            label="Problématique"
            multiline
            value={p.problem}
            onChange={(v) => set({ ...p, problem: v })}
          />
          <L10nListField
            label="Objectifs"
            value={p.objectives}
            onChange={(v) => set({ ...p, objectives: v })}
          />
          <L10nField
            label="Bénéficiaires"
            value={p.beneficiaries}
            onChange={(v) => set({ ...p, beneficiaries: v })}
          />
          <L10nListField
            label="Activités"
            value={p.activities}
            onChange={(v) => set({ ...p, activities: v })}
          />
          <L10nField
            label="Résultats"
            multiline
            value={p.results}
            onChange={(v) => set({ ...p, results: v })}
          />
          <L10nField
            label="Partenaires"
            multiline
            value={p.partners}
            onChange={(v) => set({ ...p, partners: v })}
          />
        </>
      )}
    />
  );
}

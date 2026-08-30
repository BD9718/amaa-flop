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
import type { L10n, NewsRow } from "@/lib/admin.server";

export const Route = createFileRoute("/admin/actualites")({
  component: NewsAdmin,
});

function NewsAdmin() {
  return (
    <CrudPage<NewsRow>
      table="news"
      title="Actualités"
      description="Communiqués et articles publiés sur le site."
      makeEmpty={() => ({
        id: "",
        slug: "",
        category: "institutionnel",
        published_on: new Date().toISOString().slice(0, 10),
        cover_url: "",
        title: emptyL10n(),
        excerpt: emptyL10n(),
        body: emptyL10nList(),
      })}
      rowTitle={(n) => (n.title as L10n)?.fr || n.slug}
      rowSubtitle={(n) => `${n.category} — ${n.published_on}`}
      renderForm={(n, set) => (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <TextField
              label="Identifiant (slug, URL)"
              value={n.slug}
              required
              onChange={(v) =>
                set({
                  ...n,
                  slug: v
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[̀-ͯ]/g, "")
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-+|-+$/g, ""),
                })
              }
            />
            <TextField
              label="Catégorie"
              value={n.category}
              onChange={(v) => set({ ...n, category: v })}
            />
            <TextField
              label="Date de publication"
              type="date"
              value={n.published_on}
              onChange={(v) => set({ ...n, published_on: v })}
            />
          </div>
          <ImageField
            label="Image de couverture"
            value={n.cover_url}
            onChange={(v) => set({ ...n, cover_url: v })}
          />
          <L10nField label="Titre" value={n.title} onChange={(v) => set({ ...n, title: v })} />
          <L10nField
            label="Extrait (résumé court)"
            multiline
            value={n.excerpt}
            onChange={(v) => set({ ...n, excerpt: v })}
          />
          <L10nListField
            label="Corps de l'article (un paragraphe par ligne)"
            value={n.body}
            onChange={(v) => set({ ...n, body: v })}
          />
        </>
      )}
    />
  );
}

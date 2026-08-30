import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/admin/CrudPage";
import { ImageField, L10nField, TextField, emptyL10n } from "@/components/admin/fields";
import type { GalleryRow, L10n } from "@/lib/admin.server";

export const Route = createFileRoute("/admin/galerie")({
  component: GalleryAdmin,
});

const selectCls =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30";

const CATEGORIES = [
  { value: "assainissement", label: "Assainissement" },
  { value: "sensibilisation", label: "Sensibilisation" },
  { value: "formation", label: "Formation" },
  { value: "environnement", label: "Environnement" },
];

function GalleryAdmin() {
  return (
    <CrudPage<GalleryRow>
      table="gallery_items"
      title="Galerie"
      description="Photographies affichées dans la galerie publique."
      makeEmpty={() => ({
        id: "",
        image_url: "",
        category: "assainissement",
        caption: emptyL10n(),
        sort_order: 0,
      })}
      rowTitle={(g) => (g.caption as L10n)?.fr || g.image_url}
      rowSubtitle={(g) => CATEGORIES.find((c) => c.value === g.category)?.label ?? g.category}
      renderForm={(g, set) => (
        <>
          <ImageField
            label="Photographie"
            value={g.image_url}
            onChange={(v) => set({ ...g, image_url: v })}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Catégorie</label>
              <select
                value={g.category}
                onChange={(e) => set({ ...g, category: e.target.value })}
                className={selectCls}
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <TextField
              label="Ordre d'affichage"
              type="number"
              value={String(g.sort_order)}
              onChange={(v) => set({ ...g, sort_order: Number(v) || 0 })}
            />
          </div>
          <L10nField
            label="Légende"
            value={g.caption}
            onChange={(v) => set({ ...g, caption: v })}
          />
        </>
      )}
    />
  );
}

import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { deleteContentFn, listContentFn, upsertContentFn } from "@/lib/admin.functions";

type Table = "projects" | "news" | "gallery_items" | "partners" | "key_figures";

export function CrudPage<T extends Record<string, unknown>>({
  table,
  title,
  description,
  makeEmpty,
  rowTitle,
  rowSubtitle,
  renderForm,
}: {
  table: Table;
  title: string;
  description: string;
  makeEmpty: () => T;
  rowTitle: (row: T) => string;
  rowSubtitle?: (row: T) => string;
  renderForm: (value: T, onChange: (v: T) => void) => React.ReactNode;
}) {
  const list = useServerFn(listContentFn);
  const upsert = useServerFn(upsertContentFn);
  const remove = useServerFn(deleteContentFn);
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<T | null>(null);
  const [formError, setFormError] = useState("");

  const { data: rows, isLoading } = useQuery({
    queryKey: ["admin", table],
    queryFn: () => list({ data: { table } }) as unknown as Promise<T[]>,
  });

  const saveMutation = useMutation({
    mutationFn: (row: T) => upsert({ data: { table, row } }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["admin", table] });
      setEditing(null);
      setFormError("");
    },
    onError: (e) => setFormError(e instanceof Error ? e.message : "Erreur lors de l'enregistrement."),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => remove({ data: { table, id } }),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["admin", table] }),
  });

  if (editing) {
    return (
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-display text-xl font-semibold text-foreground">
            {(editing as { id?: string }).id ? "Modifier" : "Ajouter"} — {title}
          </h1>
          <button
            type="button"
            onClick={() => setEditing(null)}
            className="rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent/50"
          >
            Annuler
          </button>
        </div>
        <div className="space-y-4 rounded-xl border border-border bg-card p-5">
          {renderForm(editing, setEditing)}
          {formError && (
            <p role="alert" className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {formError}
            </p>
          )}
          <div className="flex justify-end gap-2 border-t border-border pt-4">
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="rounded-md border border-border px-4 py-2 text-sm text-muted-foreground"
            >
              Annuler
            </button>
            <button
              type="button"
              disabled={saveMutation.isPending}
              onClick={() => saveMutation.mutate(editing)}
              className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-dark disabled:opacity-60"
            >
              {saveMutation.isPending ? "Enregistrement…" : "Enregistrer"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl font-semibold text-foreground">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setFormError("");
            setEditing(makeEmpty());
          }}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-dark"
        >
          <Plus className="size-4" aria-hidden="true" />
          Ajouter
        </button>
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Chargement…</p>
      ) : !rows?.length ? (
        <p className="rounded-lg border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground">
          Aucun élément pour le moment.
        </p>
      ) : (
        <ul className="divide-y divide-border rounded-xl border border-border bg-card">
          {rows.map((row) => {
            const id = (row as { id?: string }).id ?? "";
            return (
              <li key={id} className="flex items-center justify-between gap-4 px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{rowTitle(row)}</p>
                  {rowSubtitle && (
                    <p className="truncate text-xs text-muted-foreground">{rowSubtitle(row)}</p>
                  )}
                </div>
                <div className="flex shrink-0 gap-1">
                  <button
                    type="button"
                    aria-label="Modifier"
                    onClick={() => {
                      setFormError("");
                      setEditing(row);
                    }}
                    className="rounded-md p-2 text-muted-foreground hover:bg-accent/60 hover:text-primary"
                  >
                    <Pencil className="size-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Supprimer"
                    onClick={() => {
                      if (window.confirm("Supprimer définitivement cet élément ?")) {
                        deleteMutation.mutate(id);
                      }
                    }}
                    className="rounded-md p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MailOpen, Mail, Trash2 } from "lucide-react";
import { deleteMessageFn, listMessagesFn, setMessageReadFn } from "@/lib/admin.functions";
import type { MessageRow } from "@/lib/admin.server";

export const Route = createFileRoute("/admin/messages")({
  component: MessagesPage,
});

function MessagesPage() {
  const list = useServerFn(listMessagesFn);
  const setRead = useServerFn(setMessageReadFn);
  const remove = useServerFn(deleteMessageFn);
  const queryClient = useQueryClient();

  const { data: messages, isLoading } = useQuery({
    queryKey: ["admin", "messages"],
    queryFn: () => list(),
  });

  const invalidate = () => void queryClient.invalidateQueries({ queryKey: ["admin", "messages"] });
  const readMutation = useMutation({
    mutationFn: (v: { id: string; read: boolean }) => setRead({ data: v }),
    onSuccess: invalidate,
  });
  const deleteMutation = useMutation({
    mutationFn: (id: string) => remove({ data: { id } }),
    onSuccess: invalidate,
  });

  return (
    <div>
      <h1 className="font-display text-xl font-semibold text-foreground">Messages de contact</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Messages envoyés via le formulaire de contact du site.
      </p>

      {isLoading ? (
        <p className="mt-6 text-sm text-muted-foreground">Chargement…</p>
      ) : !messages?.length ? (
        <p className="mt-6 rounded-lg border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground">
          Aucun message pour le moment.
        </p>
      ) : (
        <ul className="mt-6 space-y-3">
          {messages.map((m: MessageRow) => (
            <li
              key={m.id}
              className={`rounded-xl border bg-card p-4 ${
                m.is_read ? "border-border" : "border-primary/40 shadow-soft"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">
                    {m.name}{" "}
                    <a href={`mailto:${m.email}`} className="font-normal text-primary" dir="ltr">
                      &lt;{m.email}&gt;
                    </a>
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-foreground/80">{m.subject}</p>
                  <p className="mt-2 whitespace-pre-line text-sm text-muted-foreground">
                    {m.message}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {new Date(m.created_at).toLocaleString("fr-FR")}
                  </p>
                </div>
                <div className="flex shrink-0 gap-1">
                  <button
                    type="button"
                    aria-label={m.is_read ? "Marquer non lu" : "Marquer lu"}
                    title={m.is_read ? "Marquer non lu" : "Marquer lu"}
                    onClick={() => readMutation.mutate({ id: m.id, read: !m.is_read })}
                    className="rounded-md p-2 text-muted-foreground hover:bg-accent/60 hover:text-primary"
                  >
                    {m.is_read ? <Mail className="size-4" /> : <MailOpen className="size-4" />}
                  </button>
                  <button
                    type="button"
                    aria-label="Supprimer"
                    onClick={() => {
                      if (window.confirm("Supprimer ce message ?")) deleteMutation.mutate(m.id);
                    }}
                    className="rounded-md p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

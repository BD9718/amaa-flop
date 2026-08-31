import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { FolderKanban, Hash, Image, Mail, Newspaper, Users } from "lucide-react";
import { getOverviewFn } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const fetchOverview = useServerFn(getOverviewFn);
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "overview"],
    queryFn: async () => {
      // The bearer token only exists client-side; skip the call without a session.
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) return null;
      return fetchOverview();
    },
    retry: false,
  });


  const cards = [
    { label: "Projets", value: data?.projects, to: "/admin/projets", icon: FolderKanban },
    { label: "Actualités", value: data?.news, to: "/admin/actualites", icon: Newspaper },
    { label: "Photos de galerie", value: data?.gallery, to: "/admin/galerie", icon: Image },
    { label: "Partenaires", value: data?.partners, to: "/admin/partenaires", icon: Users },
    { label: "Chiffres clés", value: data?.figures, to: "/admin/chiffres", icon: Hash },
    {
      label: "Messages non lus",
      value: data?.unreadMessages,
      to: "/admin/messages",
      icon: Mail,
    },
  ];

  return (
    <div>
      <h1 className="font-display text-xl font-semibold text-foreground">Vue d'ensemble</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Gérez le contenu du site dans les trois langues. Les modifications sont visibles
        immédiatement sur le site public.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.to}
            to={c.to}
            className="rounded-xl border border-border bg-card p-5 shadow-soft transition-colors hover:border-primary/40"
          >
            <div className="flex items-center justify-between">
              <c.icon className="size-5 text-primary" aria-hidden="true" />
              <span className="font-display text-3xl font-semibold text-foreground">
                {isLoading ? "…" : (c.value ?? 0)}
              </span>
            </div>
            <p className="mt-2 text-sm font-medium text-muted-foreground">{c.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

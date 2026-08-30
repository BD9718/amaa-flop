import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  FolderKanban,
  Image,
  LayoutDashboard,
  LogOut,
  Mail,
  Newspaper,
  Users,
  Hash,
  Globe,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getAdminMeFn } from "@/lib/admin.functions";
import { Logo } from "@/components/site/Logo";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Administration — AMAA" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLayout,
});

const navItems = [
  { to: "/admin", label: "Vue d'ensemble", icon: LayoutDashboard, exact: true },
  { to: "/admin/projets", label: "Projets", icon: FolderKanban },
  { to: "/admin/actualites", label: "Actualités", icon: Newspaper },
  { to: "/admin/galerie", label: "Galerie", icon: Image },
  { to: "/admin/partenaires", label: "Partenaires", icon: Users },
  { to: "/admin/chiffres", label: "Chiffres clés", icon: Hash },
  { to: "/admin/messages", label: "Messages", icon: Mail },
];

function AdminLayout() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const fetchMe = useServerFn(getAdminMeFn);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-me"],
    queryFn: async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) return { isAdmin: false, email: "" };
      return fetchMe();
    },
    staleTime: 60_000,
    retry: false,
  });

  useEffect(() => {
    if (pathname === "/admin/login") return;
    if (!isLoading && (isError || !data || !data.isAdmin)) {
      void (async () => {
        if (data && !data.isAdmin) {
          // Signed in but not an admin: sign out to avoid confusion.
          await supabase.auth.signOut();
        }
        navigate({ to: "/admin/login" });
      })();
    }
  }, [data, isLoading, isError, pathname, navigate]);

  if (pathname === "/admin/login") return <Outlet />;

  if (isLoading || !data?.isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary/40">
        <p className="text-sm text-muted-foreground">Vérification des accès…</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-secondary/40">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-card md:flex">
        <div className="border-b border-border p-4">
          <Logo />
          <p className="mt-1 text-xs text-muted-foreground">Back-office</p>
        </div>
        <nav className="flex-1 space-y-1 p-3" aria-label="Administration">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.exact ?? false }}
              activeProps={{ className: "bg-accent text-primary" }}
              className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent/60 hover:text-primary"
            >
              <item.icon className="size-4" aria-hidden="true" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-border p-3">
          <Link
            to="/"
            className="mb-2 flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-primary"
          >
            <Globe className="size-4" aria-hidden="true" />
            Voir le site
          </Link>
          <button
            type="button"
            onClick={async () => {
              await supabase.auth.signOut();
              navigate({ to: "/admin/login" });
            }}
            className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-destructive"
          >
            <LogOut className="size-4" aria-hidden="true" />
            Déconnexion
          </button>
          <p className="mt-2 truncate px-3 text-xs text-muted-foreground">{data.email}</p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile top bar */}
        <div className="flex items-center justify-between border-b border-border bg-card px-4 py-3 md:hidden">
          <Logo />
          <button
            type="button"
            onClick={async () => {
              await supabase.auth.signOut();
              navigate({ to: "/admin/login" });
            }}
            className="text-sm text-muted-foreground"
          >
            Déconnexion
          </button>
        </div>
        <nav
          aria-label="Administration"
          className="flex gap-1 overflow-x-auto border-b border-border bg-card px-3 py-2 md:hidden"
        >
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.exact ?? false }}
              activeProps={{ className: "bg-accent text-primary" }}
              className="whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium text-foreground/80"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

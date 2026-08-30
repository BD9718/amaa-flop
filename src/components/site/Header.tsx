import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { getDict, localeNames, localeShort, locales, type Locale } from "@/i18n";

const navItems = [
  { to: "/$locale", key: "home" as const, exact: true },
  { to: "/$locale/about", key: "about" as const },
  { to: "/$locale/actions", key: "actions" as const },
  { to: "/$locale/projects", key: "projects" as const },
  { to: "/$locale/news", key: "news" as const },
  { to: "/$locale/gallery", key: "gallery" as const },
  { to: "/$locale/partners", key: "partners" as const },
];

export function Header({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  function switchLocale(next: Locale) {
    const rest = pathname.replace(/^\/(fr|ar|en)/, "");
    try {
      window.localStorage.setItem("amaa-locale", next);
      document.cookie = `amaa-locale=${next};path=/;max-age=31536000`;
    } catch {
      /* storage unavailable */
    }
    navigate({ to: `/${next}${rest}` as string, replace: false });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="container-page flex h-18 items-center justify-between gap-4 py-3">
        <Link to="/$locale" params={{ locale }} aria-label="AMAA">
          <Logo />
        </Link>

        <nav aria-label={t.nav.menu} className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              to={item.to}
              params={{ locale }}
              activeOptions={{ exact: item.exact ?? false }}
              activeProps={{ className: "text-primary bg-accent/70" }}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent/50 hover:text-primary"
            >
              {t.nav[item.key]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div
            role="group"
            aria-label={t.nav.language}
            className="hidden items-center rounded-full border border-border bg-card p-0.5 sm:flex"
          >
            {locales.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => switchLocale(l)}
                aria-current={l === locale ? "true" : undefined}
                title={localeNames[l]}
                className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${
                  l === locale
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {localeShort[l]}
              </button>
            ))}
          </div>

          <Link
            to="/$locale/contact"
            params={{ locale }}
            className="hidden rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition-colors hover:bg-primary-dark md:inline-flex"
          >
            {t.nav.cta}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={t.nav.menu}
            className="inline-flex size-10 items-center justify-center rounded-md border border-border text-foreground lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-card lg:hidden">
          <nav aria-label={t.nav.menu} className="container-page flex flex-col py-3">
            {[...navItems, { to: "/$locale/contact", key: "contact" as const }].map((item) => (
              <Link
                key={item.key}
                to={item.to}
                params={{ locale }}
                activeProps={{ className: "text-primary" }}
                className="border-b border-border/60 py-3 text-sm font-medium text-foreground/85 last:border-0"
              >
                {t.nav[item.key]}
              </Link>
            ))}
            <div className="flex gap-2 pt-3 sm:hidden">
              {locales.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => switchLocale(l)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                    l === locale ? "border-primary text-primary" : "border-border text-muted-foreground"
                  }`}
                >
                  {localeNames[l]}
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

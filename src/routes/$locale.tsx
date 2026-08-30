import { Outlet, createFileRoute, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { dir, isLocale, normalizeLocale } from "@/i18n";

export const Route = createFileRoute("/$locale")({
  beforeLoad: ({ params }) => {
    if (!isLocale(params.locale)) throw notFound();
  },
  component: LocaleLayout,
});

function LocaleLayout() {
  const { locale: raw } = Route.useParams();
  const locale = normalizeLocale(raw);
  const direction = dir(locale);

  useEffect(() => {
    const html = document.documentElement;
    html.lang = locale;
    html.dir = direction;
  }, [locale, direction]);

  return (
    <div dir={direction} lang={locale} className="flex min-h-screen flex-col bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        {locale === "ar" ? "تخطَّ إلى المحتوى" : locale === "en" ? "Skip to content" : "Aller au contenu"}
      </a>
      <Header locale={locale} />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer locale={locale} />
    </div>
  );
}

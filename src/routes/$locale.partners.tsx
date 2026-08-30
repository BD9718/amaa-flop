import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { partners } from "@/content/data";
import { media } from "@/content/media";
import { getDict, normalizeLocale } from "@/i18n";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/$locale/partners")({
  head: ({ params }) => {
    const t = getDict(params.locale);
    return pageHead({
      locale: params.locale,
      path: "/partners",
      title: t.meta.partners.title,
      description: t.meta.partners.description,
      image: media.oasis,
    });
  },
  component: PartnersPage,
});

function PartnersPage() {
  const locale = normalizeLocale(Route.useParams().locale);
  const t = getDict(locale);

  return (
    <>
      <PageHeader kicker={t.nav.partners} title={t.partners.title} lead={t.partners.lead} />

      <section className="container-page py-20">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((p) => (
            <li
              key={p.name.fr}
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-6 shadow-soft"
            >
              <span
                aria-hidden="true"
                className="grid size-14 shrink-0 place-items-center rounded-lg bg-accent font-display text-sm text-accent-foreground"
              >
                {p.name[locale].slice(0, 2)}
              </span>
              <div>
                <h2 className="text-base font-semibold">{p.name[locale]}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{p.type[locale]}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-2xl text-sm text-muted-foreground">{t.partners.note}</p>
      </section>
    </>
  );
}

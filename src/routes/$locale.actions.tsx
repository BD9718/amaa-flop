import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { media } from "@/content/media";
import { getDict, normalizeLocale } from "@/i18n";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/$locale/actions")({
  head: ({ params }) => {
    const t = getDict(params.locale);
    return pageHead({
      locale: params.locale,
      path: "/actions",
      title: t.meta.actions.title,
      description: t.meta.actions.description,
      image: media.beachWaste,
    });
  },
  component: ActionsPage,
});

const covers = [media.vidangeTruck, media.beachWaste, media.cleanWater];

function ActionsPage() {
  const locale = normalizeLocale(Route.useParams().locale);
  const t = getDict(locale);

  return (
    <>
      <PageHeader kicker={t.nav.actions} title={t.actions.title} lead={t.actions.lead} />

      <div className="container-page space-y-20 py-20">
        {t.actions.items.map((item, i) => (
          <section
            key={item.slug}
            id={item.slug}
            className="grid scroll-mt-28 gap-10 md:grid-cols-2 md:items-start"
          >
            <img
              src={covers[i] ?? media.oasis}
              alt={item.title}
              loading="lazy"
              className={`aspect-4/3 w-full rounded-xl object-cover shadow-soft ${
                i % 2 === 1 ? "md:order-2" : ""
              }`}
            />
            <div>
              <h2 className="text-3xl font-semibold text-balance-tight">{item.title}</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{item.text}</p>

              <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.14em] text-primary">
                {t.actions.objectives}
              </h3>
              <ul className="mt-3 space-y-2">
                {item.objectives.map((o) => (
                  <li key={o} className="flex items-start gap-2 text-sm text-foreground/85">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    {o}
                  </li>
                ))}
              </ul>

              <h3 className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-primary">
                {t.actions.methods}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {item.methods.map((m) => (
                  <li
                    key={m}
                    className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground"
                  >
                    {m}
                  </li>
                ))}
              </ul>

              <h3 className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-primary">
                {t.actions.impact}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.impact}</p>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}

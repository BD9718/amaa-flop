import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SectionTitle } from "@/components/site/PageHeader";
import { media } from "@/content/media";
import { getDict, normalizeLocale } from "@/i18n";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/$locale/about")({
  head: ({ params }) => {
    const t = getDict(params.locale);
    return pageHead({
      locale: params.locale,
      path: "/about",
      title: t.meta.about.title,
      description: t.meta.about.description,
      image: media.oasis,
    });
  },
  component: AboutPage,
});

function AboutPage() {
  const locale = normalizeLocale(Route.useParams().locale);
  const t = getDict(locale);

  return (
    <>
      <PageHeader kicker={t.nav.about} title={t.about.title} lead={t.about.lead} />

      <section id="history" className="container-page grid gap-10 py-20 md:grid-cols-2 md:items-center">
        <div>
          <SectionTitle title={t.about.historyTitle} lead={t.about.historyText} />
        </div>
        <img
          src={media.oasis}
          alt={t.about.historyTitle}
          loading="lazy"
          className="aspect-4/3 w-full rounded-xl object-cover shadow-soft"
        />
      </section>

      <section id="mission" className="border-y border-border bg-secondary/50 py-20">
        <div className="container-page">
          <SectionTitle title={t.about.missionTitle} lead={t.about.missionText} align="center" />
        </div>
      </section>

      <section id="values" className="container-page py-20">
        <SectionTitle title={t.about.valuesTitle} />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.about.values.map((v) => (
            <article key={v.title} className="rounded-xl border border-border bg-card p-6 shadow-soft">
              <h3 className="text-lg font-semibold text-primary">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="team" className="container-page pb-24">
        <SectionTitle title={t.about.teamTitle} lead={t.about.teamNote} />
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.about.team.map((m, i) => (
            <li key={i} className="rounded-xl border border-border bg-card p-6 text-center shadow-soft">
              <span
                aria-hidden="true"
                className="mx-auto grid size-16 place-items-center rounded-full bg-accent font-display text-xl text-accent-foreground"
              >
                AMAA
              </span>
              <h3 className="mt-4 text-base font-semibold">{m.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{m.role}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

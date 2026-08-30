import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/content/data";
import { getDict, normalizeLocale } from "@/i18n";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/$locale/projects/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ params, loaderData }) => {
    const t = getDict(params.locale);
    const locale = normalizeLocale(params.locale);
    if (!loaderData) {
      return {
        meta: [{ title: t.projects.title }, { name: "robots", content: "noindex" }],
      };
    }
    const p = loaderData.project;
    return pageHead({
      locale: params.locale,
      path: `/projects/${p.slug}`,
      title: `${p.title[locale]} — AMAA`,
      description: p.summary[locale],
      image: p.cover,
    });
  },
  component: ProjectDetail,
  notFoundComponent: ProjectNotFound,
});

function ProjectNotFound() {
  return (
    <div className="container-page py-24 text-center">
      <h1 className="text-2xl font-semibold">404</h1>
      <p className="mt-2 text-muted-foreground">Projet introuvable / المشروع غير موجود / Project not found</p>
    </div>
  );
}

function ProjectDetail() {
  const params = Route.useParams();
  const locale = normalizeLocale(params.locale);
  const t = getDict(locale);
  const { project: p } = Route.useLoaderData();

  const blocks: { label: string; value: string }[] = [
    { label: t.projects.fields.context, value: p.context[locale] },
    { label: t.projects.fields.problem, value: p.problem[locale] },
    { label: t.projects.fields.beneficiaries, value: p.beneficiaries[locale] },
    { label: t.projects.fields.results, value: p.results[locale] },
    { label: t.projects.fields.partners, value: p.partners[locale] },
  ];

  return (
    <article>
      <header className="relative isolate overflow-hidden bg-primary-dark text-primary-foreground">
        <img
          src={p.cover}
          alt={p.coverAlt[locale]}
          className="absolute inset-0 size-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/85 to-primary-dark/50" />
        <div className="container-page relative py-20 md:py-24">
          <Link
            to="/$locale/projects"
            params={{ locale }}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary-foreground/85 hover:text-primary-foreground"
          >
            <ArrowLeft className="size-4 rtl:rotate-180" aria-hidden="true" />
            {t.projects.backToList}
          </Link>
          <span className="mt-6 inline-flex rounded-full bg-leaf px-3 py-1 text-xs font-semibold text-leaf-foreground">
            {p.status === "done" ? t.common.statusDone : t.common.statusUpcoming}
          </span>
          <h1 className="mt-4 max-w-3xl text-3xl font-semibold text-balance-tight md:text-5xl">
            {p.title[locale]}
          </h1>
          <p className="mt-5 max-w-2xl leading-relaxed text-primary-foreground/85">{p.summary[locale]}</p>
          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 text-sm">
            <div>
              <dt className="text-primary-foreground/70">{t.projects.fields.location}</dt>
              <dd className="mt-1 font-medium">{p.location[locale]}</dd>
            </div>
            <div>
              <dt className="text-primary-foreground/70">{t.projects.fields.period}</dt>
              <dd className="mt-1 font-medium">{p.period[locale]}</dd>
            </div>
          </dl>
        </div>
      </header>

      <div className="container-page grid gap-12 py-16 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="space-y-10">
          {blocks.map((b) => (
            <section key={b.label}>
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">{b.label}</h2>
              <p className="mt-3 leading-relaxed text-foreground/85">{b.value}</p>
            </section>
          ))}
        </div>

        <aside className="space-y-8">
          <section className="rounded-xl border border-border bg-card p-6 shadow-soft">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">
              {t.projects.fields.objectives}
            </h2>
            <ul className="mt-3 list-disc space-y-2 ps-5 text-sm text-foreground/85">
              {p.objectives[locale].map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </section>
          <section className="rounded-xl border border-border bg-card p-6 shadow-soft">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">
              {t.projects.fields.activities}
            </h2>
            <ul className="mt-3 list-disc space-y-2 ps-5 text-sm text-foreground/85">
              {p.activities[locale].map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </section>
        </aside>
      </div>

      {p.gallery.length > 0 && (
        <section className="container-page pb-24">
          <h2 className="text-2xl font-semibold">{t.projects.fields.gallery}</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
            {p.gallery.map((g) => (
              <img
                key={g.src + g.alt.fr}
                src={g.src}
                alt={g.alt[locale]}
                loading="lazy"
                className="aspect-4/3 w-full rounded-lg object-cover shadow-soft"
              />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

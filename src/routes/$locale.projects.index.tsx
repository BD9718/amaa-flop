import { Link, createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { type Project } from "@/content/data";
import { media } from "@/content/media";
import { getDict, normalizeLocale, type Locale } from "@/i18n";
import { projectsQuery } from "@/lib/public.queries";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/$locale/projects/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(projectsQuery()),
  head: ({ params }) => {
    const t = getDict(params.locale);
    return pageHead({
      locale: params.locale,
      path: "/projects",
      title: t.meta.projects.title,
      description: t.meta.projects.description,
      image: media.vidangeTruck,
    });
  },
  component: ProjectsPage,
});

function ProjectCard({ project, locale }: { project: Project; locale: Locale }) {
  const t = getDict(locale);
  return (
    <article className="overflow-hidden rounded-xl border border-border bg-card shadow-soft transition-shadow hover:shadow-lift">
      <img
        src={project.cover}
        alt={project.coverAlt[locale]}
        loading="lazy"
        className="aspect-16/10 w-full object-cover"
      />
      <div className="p-6">
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
            project.status === "done"
              ? "bg-accent text-accent-foreground"
              : "bg-secondary text-secondary-foreground"
          }`}
        >
          {project.status === "done" ? t.common.statusDone : t.common.statusUpcoming}
        </span>
        <h3 className="mt-3 text-xl font-semibold">{project.title[locale]}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.summary[locale]}</p>
        <dl className="mt-4 space-y-1.5 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="size-3.5 text-primary" aria-hidden="true" />
            <dt className="sr-only">{t.projects.fields.location}</dt>
            <dd>{project.location[locale]}</dd>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays className="size-3.5 text-primary" aria-hidden="true" />
            <dt className="sr-only">{t.projects.fields.period}</dt>
            <dd>{project.period[locale]}</dd>
          </div>
        </dl>
        <Link
          to="/$locale/projects/$slug"
          params={{ locale, slug: project.slug }}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          {t.common.readMore}
          <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

function ProjectsPage() {
  const locale = normalizeLocale(Route.useParams().locale);
  const t = getDict(locale);
  const { data: projects } = useSuspenseQuery(projectsQuery());
  const done = projects.filter((p) => p.status === "done");
  const upcoming = projects.filter((p) => p.status === "upcoming");

  return (
    <>
      <PageHeader kicker={t.nav.projects} title={t.projects.title} lead={t.projects.lead} />

      <section className="container-page py-20">
        <h2 className="text-2xl font-semibold md:text-3xl">{t.projects.doneTitle}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {done.map((p) => (
            <ProjectCard key={p.slug} project={p} locale={locale} />
          ))}
        </div>
      </section>

      <section className="container-page pb-24">
        <h2 className="text-2xl font-semibold md:text-3xl">{t.projects.upcomingTitle}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((p) => (
            <ProjectCard key={p.slug} project={p} locale={locale} />
          ))}
        </div>
      </section>
    </>
  );
}

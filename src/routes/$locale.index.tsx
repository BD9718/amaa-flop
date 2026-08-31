import { Link, createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, Droplets, GraduationCap, Megaphone } from "lucide-react";
import { SectionTitle } from "@/components/site/PageHeader";
import { galleryCategories } from "@/content/data";
import { media } from "@/content/media";
import { getDict, normalizeLocale } from "@/i18n";
import { galleryQuery, newsQuery, partnersQuery, projectsQuery } from "@/lib/public.queries";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/$locale/")({
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(projectsQuery()),
      context.queryClient.ensureQueryData(newsQuery()),
      context.queryClient.ensureQueryData(galleryQuery()),
      context.queryClient.ensureQueryData(partnersQuery()),
    ]);
  },
  head: ({ params }) => {
    const t = getDict(params.locale);
    return pageHead({
      locale: params.locale,
      path: "",
      title: t.meta.home.title,
      description: t.meta.home.description,
      image: media.vidangeTruck,
    });
  },
  component: HomePage,
});

const actionIcons = [Droplets, Megaphone, GraduationCap];

function HomePage() {
  const locale = normalizeLocale(Route.useParams().locale);
  const t = getDict(locale);
  const { data: projects } = useSuspenseQuery(projectsQuery());
  const { data: news } = useSuspenseQuery(newsQuery());
  const { data: gallery } = useSuspenseQuery(galleryQuery());
  const { data: partners } = useSuspenseQuery(partnersQuery());
  const featured = projects.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-primary-dark text-primary-foreground">
        <img
          src={media.vidangeTruck}
          alt={projects[0]?.coverAlt[locale] ?? t.home.heroKicker}
          className="absolute inset-0 size-full object-cover opacity-35"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/85 to-primary-dark/45" />
        <div className="container-page relative py-24 md:py-32">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf">{t.home.heroKicker}</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.1] text-balance-tight md:text-6xl">
            {t.home.heroTitle}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground/85 md:text-lg">
            {t.home.heroText}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/$locale/projects"
              params={{ locale }}
              className="inline-flex items-center gap-2 rounded-md bg-background px-5 py-3 text-sm font-semibold text-primary shadow-lift transition-transform hover:-translate-y-0.5"
            >
              {t.home.heroCta}
              <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
            </Link>
            <Link
              to="/$locale/contact"
              params={{ locale }}
              className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/40 px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              {t.home.heroCta2}
            </Link>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="container-page grid gap-10 py-20 md:grid-cols-2 md:items-center">
        <div>
          <SectionTitle title={t.home.introTitle} lead={t.home.introText} />
          <Link
            to="/$locale/about"
            params={{ locale }}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            {t.common.learnMore}
            <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
          </Link>
        </div>
        <img
          src={media.cleanWater}
          alt={gallery[1]?.caption[locale] ?? t.home.introTitle}
          loading="lazy"
          className="aspect-4/3 w-full rounded-xl object-cover shadow-soft"
        />
      </section>


      {/* Actions */}
      <section className="container-page py-20">
        <SectionTitle title={t.home.actionsTitle} lead={t.home.actionsText} align="center" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {t.actions.items.map((item, i) => {
            const Icon = actionIcons[i] ?? Droplets;
            return (
              <article
                key={item.slug}
                className="group rounded-xl border border-border bg-card p-7 shadow-soft transition-shadow hover:shadow-lift"
              >
                <span className="grid size-11 place-items-center rounded-lg bg-accent text-accent-foreground">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                <Link
                  to="/$locale/actions"
                  params={{ locale }}
                  hash={item.slug}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                >
                  {t.common.learnMore}
                  <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      {/* Projects */}
      <section className="bg-secondary/40 py-20">
        <div className="container-page">
          <SectionTitle title={t.home.projectsTitle} lead={t.home.projectsText} />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featured.map((p) => (
              <article key={p.slug} className="overflow-hidden rounded-xl border border-border bg-card shadow-soft">
                <img
                  src={p.cover}
                  alt={p.coverAlt[locale]}
                  loading="lazy"
                  className="aspect-16/10 w-full object-cover"
                />
                <div className="p-6">
                  <span className="inline-flex rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground">
                    {p.status === "done" ? t.common.statusDone : t.common.statusUpcoming}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold">{p.title[locale]}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.summary[locale]}</p>
                  <Link
                    to="/$locale/projects/$slug"
                    params={{ locale, slug: p.slug }}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                  >
                    {t.common.readMore}
                    <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="container-page py-20">
        <SectionTitle title={t.home.newsTitle} />
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {news.slice(0, 3).map((a) => (
            <li key={a.slug} className="rounded-xl border border-border bg-card p-6 shadow-soft">
              <time dateTime={a.date} className="text-xs font-semibold uppercase tracking-wider text-primary">
                {new Intl.DateTimeFormat(locale === "ar" ? "ar-MR" : locale, {
                  dateStyle: "long",
                }).format(new Date(a.date))}
              </time>
              <h3 className="mt-3 text-lg font-semibold">{a.title[locale]}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.excerpt[locale]}</p>
              <Link
                to="/$locale/news/$slug"
                params={{ locale, slug: a.slug }}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary"
              >
                {t.common.readMore}
                <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Gallery preview */}
      <section className="container-page pb-20">
        <SectionTitle title={t.home.galleryTitle} />
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {gallery.slice(0, 8).map((g) => (
            <figure key={g.src + g.category} className="overflow-hidden rounded-lg border border-border">
              <img
                src={g.src}
                alt={g.caption[locale]}
                loading="lazy"
                className="aspect-square w-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <figcaption className="bg-card px-3 py-2 text-xs text-muted-foreground">
                {galleryCategories.find((c) => c.key === g.category)?.label[locale]}
              </figcaption>
            </figure>
          ))}
        </div>
        <Link
          to="/$locale/gallery"
          params={{ locale }}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"
        >
          {t.gallery.title}
          <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
        </Link>
      </section>

      {/* Partners */}
      <section className="border-y border-border bg-secondary/50 py-16">
        <div className="container-page">
          <h2 className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {t.home.partnersTitle}
          </h2>
          <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {partners.slice(0, 6).map((p) => (
              <li
                key={p.name.fr}
                className="grid h-20 place-items-center rounded-lg border border-border bg-card px-3 text-center text-xs font-medium text-muted-foreground"
              >
                {p.name[locale]}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-20">
        <div className="rounded-2xl bg-primary-dark px-8 py-14 text-center text-primary-foreground shadow-lift md:px-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold text-balance-tight md:text-4xl">
            {t.home.ctaTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/85">{t.home.ctaText}</p>
          <Link
            to="/$locale/contact"
            params={{ locale }}
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-background px-6 py-3 text-sm font-semibold text-primary shadow-soft"
          >
            {t.home.ctaButton}
            <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}

import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/site/PageHeader";
import { news, newsCategories, type NewsArticle } from "@/content/data";
import { media } from "@/content/media";
import { getDict, normalizeLocale } from "@/i18n";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/$locale/news/")({
  head: ({ params }) => {
    const t = getDict(params.locale);
    return pageHead({
      locale: params.locale,
      path: "/news",
      title: t.meta.news.title,
      description: t.meta.news.description,
      image: media.cleanWater,
    });
  },
  component: NewsPage,
});

function NewsPage() {
  const locale = normalizeLocale(Route.useParams().locale);
  const t = getDict(locale);
  const [category, setCategory] = useState<NewsArticle["category"] | "all">("all");

  const items = [...news]
    .filter((a) => category === "all" || a.category === category)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  const fmt = new Intl.DateTimeFormat(locale === "ar" ? "ar-MR" : locale, { dateStyle: "long" });

  return (
    <>
      <PageHeader kicker={t.nav.news} title={t.news.title} lead={t.news.lead} />

      <section className="container-page py-16">
        <div role="group" aria-label={t.news.filterCategory} className="flex flex-wrap gap-2">
          {[{ key: "all" as const, label: t.common.all }, ...newsCategories.map((c) => ({ key: c.key, label: c.label[locale] }))].map(
            (c) => (
              <button
                key={c.key}
                type="button"
                onClick={() => setCategory(c.key)}
                aria-pressed={category === c.key}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  category === c.key
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:text-primary"
                }`}
              >
                {c.label}
              </button>
            ),
          )}
        </div>

        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((a) => (
            <li
              key={a.slug}
              className="overflow-hidden rounded-xl border border-border bg-card shadow-soft transition-shadow hover:shadow-lift"
            >
              <img src={a.cover} alt={a.title[locale]} loading="lazy" className="aspect-16/10 w-full object-cover" />
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs">
                  <span className="rounded-full bg-accent px-2.5 py-1 font-semibold text-accent-foreground">
                    {newsCategories.find((c) => c.key === a.category)?.label[locale]}
                  </span>
                  <time dateTime={a.date} className="text-muted-foreground">
                    {fmt.format(new Date(a.date))}
                  </time>
                </div>
                <h2 className="mt-3 text-lg font-semibold">{a.title[locale]}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.excerpt[locale]}</p>
                <Link
                  to="/$locale/news/$slug"
                  params={{ locale, slug: a.slug }}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                >
                  {t.common.readMore}
                  <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

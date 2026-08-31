import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { newsCategories } from "@/content/data";
import { getDict, normalizeLocale } from "@/i18n";
import { newsArticleQuery } from "@/lib/public.queries";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/$locale/news/$slug")({
  loader: async ({ params, context }) => {
    const article = await context.queryClient.ensureQueryData(newsArticleQuery(params.slug));
    if (!article) throw notFound();
    return { article };
  },
  head: ({ params, loaderData }) => {
    const t = getDict(params.locale);
    const locale = normalizeLocale(params.locale);
    if (!loaderData) {
      return { meta: [{ title: t.news.title }, { name: "robots", content: "noindex" }] };
    }
    const a = loaderData.article;
    return pageHead({
      locale: params.locale,
      path: `/news/${a.slug}`,
      title: `${a.title[locale]} — AMAA`,
      description: a.excerpt[locale],
      image: a.cover,
      ogType: "article",
    });
  },
  component: ArticlePage,
  notFoundComponent: ArticleNotFound,
});

function ArticleNotFound() {
  return (
    <div className="container-page py-24 text-center">
      <h1 className="text-2xl font-semibold">404</h1>
      <p className="mt-2 text-muted-foreground">Article introuvable / المقال غير موجود / Article not found</p>
    </div>
  );
}

function ArticlePage() {
  const locale = normalizeLocale(Route.useParams().locale);
  const t = getDict(locale);
  const { article: a } = Route.useLoaderData();
  const fmt = new Intl.DateTimeFormat(locale === "ar" ? "ar-MR" : locale, { dateStyle: "long" });

  return (
    <article className="container-page py-16">
      <Link
        to="/$locale/news"
        params={{ locale }}
        className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
      >
        <ArrowLeft className="size-4 rtl:rotate-180" aria-hidden="true" />
        {t.news.backToList}
      </Link>

      <header className="mt-8 max-w-3xl">
        <div className="flex items-center gap-3 text-xs">
          <span className="rounded-full bg-accent px-2.5 py-1 font-semibold text-accent-foreground">
            {newsCategories.find((c) => c.key === a.category)?.label[locale]}
          </span>
          <span className="text-muted-foreground">
            {t.news.published} <time dateTime={a.date}>{fmt.format(new Date(a.date))}</time>
          </span>
        </div>
        <h1 className="mt-4 text-3xl font-semibold text-balance-tight md:text-5xl">{a.title[locale]}</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{a.excerpt[locale]}</p>
      </header>

      <img
        src={a.cover}
        alt={a.title[locale]}
        className="mt-10 aspect-16/9 w-full rounded-xl object-cover shadow-soft"
      />

      <div className="mt-10 max-w-3xl space-y-5 leading-relaxed text-foreground/85">
        {a.body[locale].map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </article>
  );
}

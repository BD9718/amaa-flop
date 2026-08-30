import { createFileRoute } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { PageHeader } from "@/components/site/PageHeader";
import { gallery, galleryCategories, type GalleryItem } from "@/content/data";
import { media } from "@/content/media";
import { getDict, normalizeLocale } from "@/i18n";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/$locale/gallery")({
  head: ({ params }) => {
    const t = getDict(params.locale);
    return pageHead({
      locale: params.locale,
      path: "/gallery",
      title: t.meta.gallery.title,
      description: t.meta.gallery.description,
      image: media.beachWaste,
    });
  },
  component: GalleryPage,
});

function GalleryPage() {
  const locale = normalizeLocale(Route.useParams().locale);
  const t = getDict(locale);
  const [category, setCategory] = useState<GalleryItem["category"] | "all">("all");
  const [index, setIndex] = useState<number | null>(null);

  const items = gallery.filter((g) => category === "all" || g.category === category);

  const close = useCallback(() => setIndex(null), []);

  useEffect(() => {
    if (index === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") setIndex((i) => (i === null ? i : (i + 1) % items.length));
      if (e.key === "ArrowLeft") setIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, items.length, close]);

  const active = index === null ? null : items[index];

  return (
    <>
      <PageHeader kicker={t.nav.gallery} title={t.gallery.title} lead={t.gallery.lead} />

      <section className="container-page py-16">
        <div role="group" aria-label={t.news.filterCategory} className="flex flex-wrap gap-2">
          {[
            { key: "all" as const, label: t.common.all },
            ...galleryCategories.map((c) => ({ key: c.key, label: c.label[locale] })),
          ].map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => {
                setCategory(c.key);
                setIndex(null);
              }}
              aria-pressed={category === c.key}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                category === c.key
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:text-primary"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((g, i) => (
            <li key={g.src + g.category}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="group block w-full overflow-hidden rounded-xl border border-border bg-card text-start shadow-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <img
                  src={g.src}
                  alt={g.caption[locale]}
                  loading="lazy"
                  className="aspect-4/3 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="block px-4 py-3 text-sm text-muted-foreground">{g.caption[locale]}</span>
              </button>
            </li>
          ))}
        </ul>

        {items.length === 0 && (
          <p className="mt-10 text-sm text-muted-foreground">{t.common.empty}</p>
        )}
      </section>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.caption[locale]}
          className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-foreground/90 p-4"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label={t.common.close}
            className="absolute end-4 top-4 grid size-10 place-items-center rounded-full bg-background/90 text-foreground"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
          <img
            src={active.src}
            alt={active.caption[locale]}
            className="max-h-[80vh] w-auto max-w-full rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="mt-4 max-w-2xl text-center text-sm text-background">{active.caption[locale]}</p>
        </div>
      )}
    </>
  );
}

import { locales, normalizeLocale } from "@/i18n";
import { siteOrigin } from "@/content/media";

export function pageHead(opts: {
  locale: string | undefined;
  path: string; // path after the locale segment, e.g. "/about" or ""
  title: string;
  description: string;
  image?: string;
}) {
  const locale = normalizeLocale(opts.locale);
  const url = `${siteOrigin}/${locale}${opts.path}`;
  const meta = [
    { title: opts.title },
    { name: "description", content: opts.description },
    { property: "og:title", content: opts.title },
    { property: "og:description", content: opts.description },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: locale === "ar" ? "ar_MR" : locale === "en" ? "en_US" : "fr_FR" },
    { name: "twitter:card", content: "summary_large_image" },
  ];
  if (opts.image) {
    const abs = opts.image.startsWith("http") ? opts.image : `${siteOrigin}${opts.image}`;
    meta.push({ property: "og:image", content: abs }, { name: "twitter:image", content: abs });
  }
  return {
    meta,
    links: [
      { rel: "canonical", href: url },
      ...locales.map((l) => ({
        rel: "alternate",
        hrefLang: l,
        href: `${siteOrigin}/${l}${opts.path}`,
      })),
      { rel: "alternate", hrefLang: "x-default", href: `${siteOrigin}/fr${opts.path}` },
    ],
  };
}

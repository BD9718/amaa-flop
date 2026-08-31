import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { GalleryItem, NewsArticle, Project } from "@/content/data";
import { supabasePublishableKey, supabaseUrl } from "@/lib/env";

type L10n = Record<"fr" | "ar" | "en", string>;
type L10nList = Record<"fr" | "ar" | "en", string[]>;

export type Partner = {
  name: L10n;
  type: L10n;
  logoUrl: string | null;
  website: string | null;
};

export type KeyFigure = {
  value: string;
  label: L10n;
};

function publicClient() {
  // Lazy import keeps the Supabase client out of the client bundle.
  return import("@supabase/supabase-js").then(({ createClient }) =>
    createClient(supabaseUrl(), supabasePublishableKey(), {
      auth: { persistSession: false, autoRefreshToken: false },
    }),
  );
}

type ProjectRow = {
  slug: string;
  status: string;
  is_published: boolean;
  cover_url: string | null;
  cover_alt: L10n;
  title: L10n;
  summary: L10n;
  location: L10n;
  period: L10n;
  context: L10n;
  problem: L10n;
  objectives: L10nList;
  beneficiaries: L10n;
  activities: L10nList;
  results: L10n;
  partners: L10n;
  gallery: { src: string; alt: L10n }[];
};

function mapProject(r: ProjectRow): Project {
  return {
    slug: r.slug,
    status: r.status === "done" ? "done" : "upcoming",
    cover: r.cover_url ?? "",
    coverAlt: r.cover_alt,
    title: r.title,
    summary: r.summary,
    location: r.location,
    period: r.period,
    context: r.context,
    problem: r.problem,
    objectives: r.objectives,
    beneficiaries: r.beneficiaries,
    activities: r.activities,
    results: r.results,
    partners: r.partners,
    gallery: r.gallery ?? [],
  };
}

type NewsRow = {
  slug: string;
  category: string;
  published_on: string;
  cover_url: string | null;
  title: L10n;
  excerpt: L10n;
  body: L10nList;
};

function mapNews(r: NewsRow): NewsArticle {
  return {
    slug: r.slug,
    date: r.published_on,
    category: (["institutionnel", "terrain", "formation"].includes(r.category)
      ? r.category
      : "institutionnel") as NewsArticle["category"],
    cover: r.cover_url ?? "",
    title: r.title,
    excerpt: r.excerpt,
    body: r.body,
  };
}

export const listProjects = createServerFn({ method: "GET" }).handler(async (): Promise<Project[]> => {
  const supabase = await publicClient();
  const { data, error } = await supabase
    .from("projects")
    .select(
      "slug,status,is_published,cover_url,cover_alt,title,summary,location,period,context,problem,objectives,beneficiaries,activities,results,partners,gallery",
    )
    .eq("is_published", true)
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return (data as unknown as ProjectRow[]).map(mapProject);
});

export const getProject = createServerFn({ method: "GET" })
  .inputValidator((slug) => z.string().parse(slug))
  .handler(async ({ data: slug }): Promise<Project | null> => {
    const supabase = await publicClient();
    const { data, error } = await supabase
      .from("projects")
      .select(
        "slug,status,is_published,cover_url,cover_alt,title,summary,location,period,context,problem,objectives,beneficiaries,activities,results,partners,gallery",
      )
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return data ? mapProject(data as unknown as ProjectRow) : null;
  });

export const listNews = createServerFn({ method: "GET" }).handler(async (): Promise<NewsArticle[]> => {
  const supabase = await publicClient();
  const { data, error } = await supabase
    .from("news")
    .select("slug,category,published_on,cover_url,title,excerpt,body")
    .eq("is_published", true)
    .order("published_on", { ascending: false });
  if (error) throw new Error(error.message);
  return (data as unknown as NewsRow[]).map(mapNews);
});

export const getNewsArticle = createServerFn({ method: "GET" })
  .inputValidator((slug) => z.string().parse(slug))
  .handler(async ({ data: slug }): Promise<NewsArticle | null> => {
    const supabase = await publicClient();
    const { data, error } = await supabase
      .from("news")
      .select("slug,category,published_on,cover_url,title,excerpt,body")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return data ? mapNews(data as unknown as NewsRow) : null;
  });

export const listGallery = createServerFn({ method: "GET" }).handler(async (): Promise<GalleryItem[]> => {
  const supabase = await publicClient();
  const { data, error } = await supabase
    .from("gallery_items")
    .select("image_url,category,caption")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return (data as { image_url: string; category: string; caption: L10n }[]).map((r) => ({
    src: r.image_url,
    category: (["assainissement", "sensibilisation", "environnement"].includes(r.category)
      ? r.category
      : "assainissement") as GalleryItem["category"],
    caption: r.caption,
  }));
});

export const listPartners = createServerFn({ method: "GET" }).handler(async (): Promise<Partner[]> => {
  const supabase = await publicClient();
  const { data, error } = await supabase
    .from("partners")
    .select("name,type,logo_url,website")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return (data as { name: L10n; type: L10n; logo_url: string | null; website: string | null }[]).map((r) => ({
    name: r.name,
    type: r.type,
    logoUrl: r.logo_url,
    website: r.website,
  }));
});

export const listKeyFigures = createServerFn({ method: "GET" }).handler(async (): Promise<KeyFigure[]> => {
  const supabase = await publicClient();
  const { data, error } = await supabase
    .from("key_figures")
    .select("value,label")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return data as KeyFigure[];
});

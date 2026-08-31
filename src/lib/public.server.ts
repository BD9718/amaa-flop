import { createClient } from "@supabase/supabase-js";
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

export type KeyFigure = { value: string; label: L10n };

type ProjectRow = {
  slug: string;
  status: string;
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

type NewsRow = {
  slug: string;
  category: string;
  published_on: string;
  cover_url: string | null;
  title: L10n;
  excerpt: L10n;
  body: L10nList;
};

function publicClient() {
  const key = supabasePublishableKey();
  return createClient(supabaseUrl(), key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
          headers.delete("Authorization");
        }
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });
}

function mapProject(row: ProjectRow): Project {
  return {
    slug: row.slug,
    status: row.status === "done" ? "done" : "upcoming",
    cover: row.cover_url ?? "",
    coverAlt: row.cover_alt,
    title: row.title,
    summary: row.summary,
    location: row.location,
    period: row.period,
    context: row.context,
    problem: row.problem,
    objectives: row.objectives,
    beneficiaries: row.beneficiaries,
    activities: row.activities,
    results: row.results,
    partners: row.partners,
    gallery: row.gallery ?? [],
  };
}

function mapNews(row: NewsRow): NewsArticle {
  return {
    slug: row.slug,
    date: row.published_on,
    category: (["institutionnel", "terrain", "formation"].includes(row.category)
      ? row.category
      : "institutionnel") as NewsArticle["category"],
    cover: row.cover_url ?? "",
    title: row.title,
    excerpt: row.excerpt,
    body: row.body,
  };
}

export async function listProjectsServer(): Promise<Project[]> {
  const { data, error } = await publicClient()
    .from("projects")
    .select("slug,status,is_published,cover_url,cover_alt,title,summary,location,period,context,problem,objectives,beneficiaries,activities,results,partners,gallery")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return (data as unknown as ProjectRow[]).map(mapProject);
}

export async function getProjectServer(slug: string): Promise<Project | null> {
  const { data, error } = await publicClient()
    .from("projects")
    .select("slug,status,is_published,cover_url,cover_alt,title,summary,location,period,context,problem,objectives,beneficiaries,activities,results,partners,gallery")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data ? mapProject(data as unknown as ProjectRow) : null;
}

export async function listNewsServer(): Promise<NewsArticle[]> {
  const { data, error } = await publicClient()
    .from("news")
    .select("slug,category,published_on,cover_url,title,excerpt,body")
    .eq("is_published", true)
    .order("published_on", { ascending: false });
  if (error) throw new Error(error.message);
  return (data as unknown as NewsRow[]).map(mapNews);
}

export async function getNewsArticleServer(slug: string): Promise<NewsArticle | null> {
  const { data, error } = await publicClient()
    .from("news")
    .select("slug,category,published_on,cover_url,title,excerpt,body")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data ? mapNews(data as unknown as NewsRow) : null;
}

export async function listGalleryServer(): Promise<GalleryItem[]> {
  const { data, error } = await publicClient()
    .from("gallery_items")
    .select("image_url,category,caption")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return (data as { image_url: string; category: string; caption: L10n }[]).map((row) => ({
    src: row.image_url,
    category: (["assainissement", "sensibilisation", "environnement"].includes(row.category)
      ? row.category
      : "assainissement") as GalleryItem["category"],
    caption: row.caption,
  }));
}

export async function listPartnersServer(): Promise<Partner[]> {
  const { data, error } = await publicClient()
    .from("partners")
    .select("name,type,logo_url,website")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return (data as { name: L10n; type: L10n; logo_url: string | null; website: string | null }[]).map((row) => ({
    name: row.name,
    type: row.type,
    logoUrl: row.logo_url,
    website: row.website,
  }));
}

export async function listKeyFiguresServer(): Promise<KeyFigure[]> {
  const { data, error } = await publicClient()
    .from("key_figures")
    .select("value,label")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return data as KeyFigure[];
}
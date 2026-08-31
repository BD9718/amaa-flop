import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { supabasePublishableKey, supabaseUrl } from "@/lib/env";

const BASE_URL = "https://amaa-connect-hub.lovable.app";
const LOCALES = ["fr", "ar", "en"] as const;
const STATIC_PATHS = ["", "/about", "/actions", "/projects", "/news", "/gallery", "/partners", "/contact"];

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

function makeClient() {
  return { url: supabaseUrl(), key: supabasePublishableKey() };
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [];
        for (const locale of LOCALES) {
          for (const path of STATIC_PATHS) {
            entries.push({
              path: `/${locale}${path}`,
              changefreq: path === "" ? "weekly" : "monthly",
              priority: path === "" ? "1.0" : "0.7",
            });
          }
        }

        const { createClient } = await import("@supabase/supabase-js");
        const { url, key } = makeClient();
        const supabase = createClient(url, key, {
          auth: { persistSession: false, autoRefreshToken: false },
          global: {
            fetch: (input, init) => {
              const headers = new Headers(init?.headers);
              if (key.startsWith("sb_") && headers.get("Authorization") === "Bearer " + key) {
                headers.delete("Authorization");
              }
              headers.set("apikey", key);
              return fetch(input, { ...init, headers });
            },
          },
        });

        for (const table of ["projects", "news"] as const) {
          const pageSize = 1000;
          for (let offset = 0; ; offset += pageSize) {
            const { data, error } = await supabase
              .from(table)
              .select("slug")
              .eq("is_published", true)
              .order("slug")
              .range(offset, offset + pageSize - 1);
            if (error) break;
            const rows = data ?? [];
            for (const row of rows) {
              for (const locale of LOCALES) {
                entries.push({
                  path: `/${locale}/${table === "projects" ? "projects" : "news"}/${encodeURIComponent(row.slug)}`,
                  changefreq: "monthly",
                  priority: "0.6",
                });
              }
            }
            if (rows.length < pageSize) break;
          }
        }

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...entries.map((e) =>
            [
              `  <url>`,
              `    <loc>${BASE_URL}${e.path}</loc>`,
              e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
              e.priority ? `    <priority>${e.priority}</priority>` : null,
              `  </url>`,
            ]
              .filter(Boolean)
              .join("\n"),
          ),
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});

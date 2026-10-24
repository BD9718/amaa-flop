import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { supabasePublishableKey, supabaseUrl } from "@/lib/env";

// Temporary diagnostics: reports which backend the deployed server talks to
// and whether the projects table is reachable. Remove after verification.
export const Route = createFileRoute("/api/public/diag")({
  server: {
    handlers: {
      GET: async () => {
        const url = supabaseUrl();
        const key = supabasePublishableKey();
        let queryResult: unknown;
        try {
          const client = createClient(url, key, {
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
          const { data, error } = await client.from("projects").select("slug").limit(1);
          queryResult = error ? { error: error.message } : { data };
        } catch (e) {
          queryResult = { exception: e instanceof Error ? e.message : String(e) };
        }
        return Response.json({
          supabaseHost: new URL(url).host,
          keyPrefix: key.slice(0, 20),
          queryResult,
        });
      },
    },
  },
});

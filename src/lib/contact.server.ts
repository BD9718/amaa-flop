import { createClient } from "@supabase/supabase-js";
import { supabasePublishableKey, supabaseUrl } from "@/lib/env";

export async function submitContactMessageServer(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const key = supabasePublishableKey();
  const client = createClient(supabaseUrl(), key, {
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
  const { error } = await client.from("contact_messages").insert(data);
  if (error) throw new Error("send_failed");
  return { ok: true };
}
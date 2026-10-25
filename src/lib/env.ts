/**
 * Backend connection constants for server-side code.
 *
 * The URL and publishable key are public values (safe to embed) — they only
 * grant the access allowed by the database's row-level security policies.
 * They are pinned on purpose: the Vercel dashboard held stale env vars
 * pointing to an old backend, which overrode the correct values and broke
 * every data page. Never read them from process.env.
 */

const BACKEND_URL = "https://gfhbytrfrwzkhfbsiptw.supabase.co";
const BACKEND_PUBLISHABLE_KEY = "sb_publishable_yvqYc_SeYk7dQs-BdLBxGQ_c4dQ3OFt";

export function supabaseUrl(): string {
  return BACKEND_URL;
}

export function supabasePublishableKey(): string {
  return BACKEND_PUBLISHABLE_KEY;
}

/**
 * Backend connection constants for server-side code.
 *
 * The URL and publishable key are public values (safe to embed) — they only
 * grant the access allowed by the database's row-level security policies.
 * Environment variables take precedence when set (Lovable Cloud injects them);
 * the literals below make the app work on external hosts (Vercel, etc.)
 * without any extra configuration.
 */

const FALLBACK_URL = "https://gfhbytrfrwzkhfbsiptw.supabase.co";
const FALLBACK_PUBLISHABLE_KEY = "sb_publishable_yvqYc_SeYk7dQs-BdLBxGQ_c4dQ3OFt";

export function supabaseUrl(): string {
  return process.env["SUPABASE_URL"] ?? process.env["VITE_SUPABASE_URL"] ?? FALLBACK_URL;
}

export function supabasePublishableKey(): string {
  return (
    process.env["SUPABASE_PUBLISHABLE_KEY"] ??
    process.env["VITE_SUPABASE_PUBLISHABLE_KEY"] ??
    FALLBACK_PUBLISHABLE_KEY
  );
}

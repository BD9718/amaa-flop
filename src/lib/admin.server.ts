// Server-only helpers for the admin back-office.
// All functions run with the caller's session (RLS enforced as the user),
// after an explicit admin-role verification.

export type L10n = { fr: string; ar: string; en: string };
export type L10nList = { fr: string[]; ar: string[]; en: string[] };
export type GalleryPhoto = { src: string; alt: L10n };

export type ProjectRow = {
  id: string;
  slug: string;
  status: "done" | "upcoming";
  sort_order: number;
  cover_url: string;
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
  gallery: GalleryPhoto[];
};

export type NewsRow = {
  id: string;
  slug: string;
  category: string;
  published_on: string;
  cover_url: string;
  title: L10n;
  excerpt: L10n;
  body: L10nList;
};

export type GalleryRow = {
  id: string;
  image_url: string;
  category: string;
  caption: L10n;
  sort_order: number;
};

export type PartnerRow = {
  id: string;
  name: L10n;
  type: L10n;
  sort_order: number;
};

export type FigureRow = {
  id: string;
  value: string;
  label: L10n;
  sort_order: number;
};

export type MessageRow = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
};

type Ctx = { supabase: any; userId: string };

export async function requireAdmin(ctx: Ctx) {
  const { data, error } = await ctx.supabase.rpc("has_role", {
    _user_id: ctx.userId,
    _role: "admin",
  });
  if (error) throw new Error(`Role check failed: ${error.message}`);
  if (!data) throw new Error("Forbidden: admin role required");
}

export async function getAdminMe(ctx: Ctx) {
  const { data } = await ctx.supabase.rpc("has_role", {
    _user_id: ctx.userId,
    _role: "admin",
  });
  const {
    data: { user },
  } = await ctx.supabase.auth.getUser();
  return { isAdmin: Boolean(data), email: user?.email ?? "" };
}

export async function getOverview(ctx: Ctx) {
  const count = async (table: string) => {
    const { count: c } = await ctx.supabase
      .from(table)
      .select("*", { count: "exact", head: true });
    return c ?? 0;
  };
  const [projects, news, gallery, partners, figures] = await Promise.all([
    count("projects"),
    count("news"),
    count("gallery_items"),
    count("partners"),
    count("key_figures"),
  ]);
  const { count: unread } = await ctx.supabase
    .from("contact_messages")
    .select("*", { count: "exact", head: true })
    .eq("read", false);
  return { projects, news, gallery, partners, figures, unreadMessages: unread ?? 0 };
}

export async function listRows(ctx: Ctx, table: string, orderBy: string) {
  const { data, error } = await ctx.supabase.from(table).select("*").order(orderBy);
  if (error) throw new Error(error.message);
  return data;
}

export async function upsertRow(ctx: Ctx, table: string, row: Record<string, unknown>) {
  const payload = { ...row };
  if (!payload["id"]) delete payload["id"];
  const { data, error } = await ctx.supabase.from(table).upsert(payload).select().single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteRow(ctx: Ctx, table: string, id: string) {
  const { error } = await ctx.supabase.from(table).delete().eq("id", id);
  if (error) throw new Error(error.message);
  return { ok: true };
}

export async function listMessages(ctx: Ctx) {
  const { data, error } = await ctx.supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data as MessageRow[];
}

export async function setMessageRead(ctx: Ctx, id: string, read: boolean) {
  const { error } = await ctx.supabase.from("contact_messages").update({ read }).eq("id", id);
  if (error) throw new Error(error.message);
  return { ok: true };
}

const EXT_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

export async function uploadMedia(
  ctx: Ctx,
  input: { fileName: string; contentType: string; dataBase64: string },
) {
  const ext = EXT_BY_TYPE[input.contentType];
  if (!ext) throw new Error("Type de fichier non supporté (JPEG, PNG, WebP, AVIF uniquement).");
  const buffer = Buffer.from(input.dataBase64, "base64");
  if (buffer.byteLength > 10 * 1024 * 1024) throw new Error("Fichier trop volumineux (10 Mo max).");
  const base =
    input.fileName
      .replace(/\.[^.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "image";
  const path = `${Date.now()}-${base}.${ext}`;
  const { error } = await ctx.supabase.storage.from("media").upload(path, buffer, {
    contentType: input.contentType,
    upsert: false,
  });
  if (error) throw new Error(error.message);
  return { path, url: await signMediaUrl(ctx, path) };
}

export async function signMediaUrl(ctx: Ctx, path: string): Promise<string> {
  if (!path || path.startsWith("http") || path.startsWith("/")) return path;
  const { data, error } = await ctx.supabase.storage
    .from("media")
    .createSignedUrl(path, 60 * 60 * 24 * 365);
  if (error) throw new Error(error.message);
  return data.signedUrl;
}

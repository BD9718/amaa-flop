import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import {
  deleteRow,
  getAdminMe,
  getOverview,
  listMessages,
  listRows,
  requireAdmin,
  setMessageRead,
  uploadMedia,
  upsertRow,
  signMediaUrl,
} from "./admin.server";

const CONTENT_TABLES = ["projects", "news", "gallery_items", "partners", "key_figures"] as const;
const tableSchema = z.enum(CONTENT_TABLES);
const ORDER_BY: Record<(typeof CONTENT_TABLES)[number], string> = {
  projects: "sort_order",
  news: "published_on",
  gallery_items: "sort_order",
  partners: "sort_order",
  key_figures: "sort_order",
};

export const getAdminMeFn = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => getAdminMe(context as any));

export const getOverviewFn = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requireAdmin(context as any);
    return getOverview(context as any);
  });

export const listContentFn = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => z.object({ table: tableSchema }).parse(data))
  .handler(async ({ context, data }) => {
    await requireAdmin(context as any);
    return listRows(context as any, data.table, ORDER_BY[data.table]);
  });

export const upsertContentFn = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) =>
    z.object({ table: tableSchema, row: z.record(z.string(), z.unknown()) }).parse(data),
  )
  .handler(async ({ context, data }) => {
    await requireAdmin(context as any);
    return upsertRow(context as any, data.table, data.row);
  });

export const deleteContentFn = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => z.object({ table: tableSchema, id: z.string() }).parse(data))
  .handler(async ({ context, data }) => {
    await requireAdmin(context as any);
    return deleteRow(context as any, data.table, data.id);
  });

export const listMessagesFn = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requireAdmin(context as any);
    return listMessages(context as any);
  });

export const setMessageReadFn = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => z.object({ id: z.string(), read: z.boolean() }).parse(data))
  .handler(async ({ context, data }) => {
    await requireAdmin(context as any);
    return setMessageRead(context as any, data.id, data.read);
  });

export const deleteMessageFn = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => z.object({ id: z.string() }).parse(data))
  .handler(async ({ context, data }) => {
    await requireAdmin(context as any);
    return deleteRow(context as any, "contact_messages", data.id);
  });

export const uploadMediaFn = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) =>
    z
      .object({
        fileName: z.string().min(1),
        contentType: z.string().min(1),
        dataBase64: z.string().min(1),
      })
      .parse(data),
  )
  .handler(async ({ context, data }) => {
    await requireAdmin(context as any);
    return uploadMedia(context as any, data);
  });

export const signMediaUrlFn = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => z.object({ path: z.string().min(1) }).parse(data))
  .handler(async ({ context, data }) => {
    await requireAdmin(context as any);
    return { url: await signMediaUrl(context as any, data.path) };
  });

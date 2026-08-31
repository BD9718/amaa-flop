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
  .validator((data) =>
    z
      .object({ table: z.enum(["projects", "news", "gallery_items", "partners", "key_figures"]) })
      .parse(data),
  )
  .handler(async ({ context, data }) => {
    await requireAdmin(context as any);
    return listRows(
      context as any,
      data.table,
      data.table === "news" ? "published_on" : "sort_order",
    );
  });

export const upsertContentFn = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data) =>
    z
      .object({
        table: z.enum(["projects", "news", "gallery_items", "partners", "key_figures"]),
        row: z.record(z.string(), z.unknown()),
      })
      .parse(data),
  )
  .handler(async ({ context, data }) => {
    await requireAdmin(context as any);
    return upsertRow(context as any, data.table, data.row);
  });

export const deleteContentFn = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data) =>
    z
      .object({
        table: z.enum(["projects", "news", "gallery_items", "partners", "key_figures"]),
        id: z.string(),
      })
      .parse(data),
  )
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
  .validator((data) => z.object({ id: z.string(), read: z.boolean() }).parse(data))
  .handler(async ({ context, data }) => {
    await requireAdmin(context as any);
    return setMessageRead(context as any, data.id, data.read);
  });

export const deleteMessageFn = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data) => z.object({ id: z.string() }).parse(data))
  .handler(async ({ context, data }) => {
    await requireAdmin(context as any);
    return deleteRow(context as any, "contact_messages", data.id);
  });

export const uploadMediaFn = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data) =>
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
  .validator((data) => z.object({ path: z.string().min(1) }).parse(data))
  .handler(async ({ context, data }) => {
    await requireAdmin(context as any);
    return { url: await signMediaUrl(context as any, data.path) };
  });

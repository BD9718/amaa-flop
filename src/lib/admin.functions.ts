import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { AdminContext } from "./admin.server";
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
  .handler(async ({ context }) => getAdminMe(context as AdminContext));

export const getOverviewFn = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const adminContext = context as AdminContext;
    await requireAdmin(adminContext);
    return getOverview(adminContext);
  });

export const listContentFn = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .validator((data) =>
    z
      .object({ table: z.enum(["projects", "news", "gallery_items", "partners", "key_figures"]) })
      .parse(data),
  )
  .handler(async ({ context, data }) => {
    const adminContext = context as AdminContext;
    await requireAdmin(adminContext);
    return listRows(
      adminContext,
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
    const adminContext = context as AdminContext;
    await requireAdmin(adminContext);
    return upsertRow(adminContext, data.table, data.row);
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
    const adminContext = context as AdminContext;
    await requireAdmin(adminContext);
    return deleteRow(adminContext, data.table, data.id);
  });

export const listMessagesFn = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const adminContext = context as AdminContext;
    await requireAdmin(adminContext);
    return listMessages(adminContext);
  });

export const setMessageReadFn = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data) => z.object({ id: z.string(), read: z.boolean() }).parse(data))
  .handler(async ({ context, data }) => {
    const adminContext = context as AdminContext;
    await requireAdmin(adminContext);
    return setMessageRead(adminContext, data.id, data.read);
  });

export const deleteMessageFn = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data) => z.object({ id: z.string() }).parse(data))
  .handler(async ({ context, data }) => {
    const adminContext = context as AdminContext;
    await requireAdmin(adminContext);
    return deleteRow(adminContext, "contact_messages", data.id);
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
    const adminContext = context as AdminContext;
    await requireAdmin(adminContext);
    return uploadMedia(adminContext, data);
  });

export const signMediaUrlFn = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .validator((data) => z.object({ path: z.string().min(1) }).parse(data))
  .handler(async ({ context, data }) => {
    const adminContext = context as AdminContext;
    await requireAdmin(adminContext);
    return { url: await signMediaUrl(adminContext, data.path) };
  });

import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_news",
  title: "Lister les actualités",
  description: "Liste les actualités de l'AMAA (slug, date, catégorie, titres et chapôs trilingues).",
  inputSchema: {
    limit: z.number().int().min(1).max(100).default(20).describe("Nombre maximum d'actualités."),
  },
  outputSchema: { news: z.array(z.any()) },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Non authentifié" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("news")
      .select("slug,date,category,is_published,title,excerpt")
      .order("date", { ascending: false })
      .limit(limit ?? 20);
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
      structuredContent: { news: data ?? [] },
    };
  },
});
